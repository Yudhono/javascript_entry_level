// Monaco-based editors with live preview
(function () {
  // default snippets
  const defaults = {
    buttons: {
      html: `<button class="btn primary">Primary</button>\n<button class="btn outline">Outline</button>\n<button class="btn ghost">Ghost</button>\n<button class="btn small">Small</button>`,
      css: `.btn { padding:10px 16px; border-radius:8px; border:none; cursor:pointer; }\n.btn.primary { background:#2563eb; color:#fff }\n.btn.outline { background:transparent; border:1px solid #2563eb; color:#2563eb }\n.btn.ghost { background:transparent; color:#333 }\n.btn.small { padding:6px 10px; font-size:14px }`,
    },
    cards: {
      html: `<div class="card">\n  <img src="https://picsum.photos/seed/cards/320/160" alt="thumb">\n  <div class="card-body">\n    <h3>Card title</h3>\n    <p>Short description</p>\n  </div>\n</div>`,
      css: `.card { border-radius:12px; overflow:hidden; box-shadow:0 6px 18px rgba(0,0,0,0.08); background:#fff }\n.card img { width:100%; display:block }\n.card-body { padding:14px }`,
    },
    forms: {
      html: `<form class="simple-form" onsubmit="event.preventDefault()">\n  <label>Full name <input type=\"text\" placeholder=\"Your name\"></label>\n  <label>Email <input type=\"email\" placeholder=\"you@example.com\"></label>\n  <div style=\"display:flex;gap:8px;\">\n    <button class=\"btn primary\">Submit</button>\n    <button class=\"btn outline\" type=\"reset\">Reset</button>\n  </div>\n</form>`,
      css: `.simple-form label { display:block; margin-bottom:10px }\n.simple-form input { width:100%; padding:8px; border-radius:6px; border:1px solid #d1d9e6 }\n.simple-form { max-width:360px }`,
    },
    select: {
      html: `<div class=\"select-wrap\">\n  <select>\n    <option>Choose an option</option>\n    <option>Option A</option>\n    <option>Option B</option>\n  </select>\n</div>`,
      css: `.select-wrap select { padding:8px 12px; border-radius:8px; border:1px solid #cbd5e1; }`,
    },
    tables: {
      html: `<table class="demo-table">\n  <thead>\n    <tr><th>Item</th><th>Description</th><th>Price</th></tr>\n  </thead>\n  <tbody>\n    <tr><td>Alpha</td><td>Sample row description</td><td>$12</td></tr>\n    <tr><td>Beta</td><td>Another sample</td><td>$20</td></tr>\n    <tr><td>Gamma</td><td>Yet another row</td><td>$7</td></tr>\n  </tbody>\n</table>`,
      css: `.demo-table { width:100%; border-collapse:collapse; font-family:inherit }\n.demo-table th, .demo-table td { padding:10px 12px; border-bottom:1px solid #e6eef8; text-align:left }\n.demo-table thead th { background:#f6f9ff; color:#243b55; font-weight:700 }\n.demo-table tbody tr:hover { background:#fbfcff }`,
    },
  };

  // store editor instances
  const editors = {};

  // helper to build preview document
  function buildPreview(html, css) {
    return `<!doctype html><html><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><style>body{font-family:system-ui,Arial,Helvetica,sans-serif;padding:12px;background:transparent}</style><style>${css}</style></head><body>${html}</body></html>`;
  }

  // write to iframe
  function writePreview(key) {
    const iframe = document.getElementById(`${key}-preview`);
    if (!iframe) return;
    const html = editors[`${key}-html`].getValue();
    const css = editors[`${key}-css`].getValue();
    const content = buildPreview(html, css);
    try {
      const ifdoc = iframe.contentDocument || iframe.contentWindow.document;
      ifdoc.open();
      ifdoc.write(content);
      ifdoc.close();
    } catch (err) {
      iframe.setAttribute("srcdoc", content);
    }
  }

  // copy both html+css to clipboard (simple combined)
  function copyBoth(key) {
    const html = editors[`${key}-html`].getValue();
    const css = editors[`${key}-css`].getValue();
    const combined = `${html}\n\n/* CSS */\n${css}`;
    navigator.clipboard
      .writeText(combined)
      .then(() => {
        const btn = document.querySelector(`.copy-code[data-key="${key}"]`);
        if (!btn) return;
        const old = btn.innerText;
        btn.innerText = "Copied";
        setTimeout(() => (btn.innerText = old), 1400);
      })
      .catch(() => alert("Copy failed"));
  }

  // reset editors to defaults
  function reset(key) {
    const def = defaults[key];
    if (!def) return;
    editors[`${key}-html`].setValue(def.html);
    editors[`${key}-css`].setValue(def.css);
    writePreview(key);
  }

  // attach button handlers (delegated)
  document.addEventListener("click", (e) => {
    const run = e.target.closest(".run-live");
    if (run) {
      const key = run.getAttribute("data-key");
      writePreview(key);
    }
    const resetBtn = e.target.closest(".reset-live");
    if (resetBtn) {
      reset(resetBtn.getAttribute("data-key"));
    }
    const copyBtn = e.target.closest(".copy-code");
    if (copyBtn) {
      copyBoth(copyBtn.getAttribute("data-key"));
    }
    const formatBtn = e.target.closest(".format-code");
    if (formatBtn) {
      const key = formatBtn.getAttribute("data-key");
      // try to run format action on both editors if available
      try {
        const h = editors[`${key}-html`];
        const c = editors[`${key}-css`];
        if (h && h.getAction)
          h.getAction("editor.action.formatDocument")?.run();
        if (c && c.getAction)
          c.getAction("editor.action.formatDocument")?.run();
      } catch (err) {
        console.warn("Format action failed", err);
      }
    }
  });

  // load monaco and create editors
  function initMonaco() {
    if (window.monaco) {
      createEditors();
      return;
    }
    // Monaco loader config
    require.config({
      paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs" },
    });
    require(["vs/editor/editor.main"], function () {
      createEditors();
    });
  }

  function createEditors() {
    document.querySelectorAll(".monaco-editor").forEach((el) => {
      const id = el.id;
      const lang = el.getAttribute("data-language") || "html";
      const valueKey = `${id}`; // e.g., buttons-html
      const initialKey = id.replace("-html", "").replace("-css", "");
      const initial = defaults[initialKey] || { html: "", css: "" };
      const value = id.endsWith("-html") ? initial.html : initial.css;

      const editor = monaco.editor.create(el, {
        value: value,
        language: lang === "css" ? "css" : "html",
        theme: "vs-dark",
        automaticLayout: true,
        minimap: { enabled: false },
        fontSize: 13,
        lineNumbers: "on",
      });

      editors[id] = editor;

      // wire auto-run
      const keyBase = initialKey;
      const checkbox = document.querySelector(
        `.auto-run[data-key="${keyBase}"]`
      );
      if (checkbox) {
        editor.onDidChangeModelContent(() => {
          if (checkbox.checked) writePreview(keyBase);
        });
      }
    });

    // initialize previews
    Object.keys(defaults).forEach((k) => writePreview(k));
  }

  // keyboard accessibility for details summary
  document.addEventListener("keydown", (ev) => {
    if (
      ev.target.tagName === "SUMMARY" &&
      (ev.key === "Enter" || ev.key === " ")
    ) {
      ev.preventDefault();
      const d = ev.target.parentElement;
      d.open = !d.open;
    }
  });

  // Re-layout Monaco editors and refresh preview when a details block is toggled open
  document.addEventListener("toggle", (ev) => {
    const details = ev.target;
    if (
      !details ||
      !details.matches ||
      !details.matches("details.editor-details")
    )
      return;
    if (!details.open) return;
    // find monaco editor containers inside this details and call layout()
    const monacoContainers = details.querySelectorAll(".monaco-editor");
    monacoContainers.forEach((container) => {
      const id = container.id;
      const ed = editors[id];
      if (ed && typeof ed.layout === "function") {
        // small timeout to let the details expand animation/layout finish
        setTimeout(() => {
          try {
            ed.layout();
            // if this is the HTML editor, focus it so the user can start typing
            if (id.endsWith("-html") && typeof ed.focus === "function") {
              try {
                ed.focus();
                // move cursor to start and reveal it
                if (typeof ed.setPosition === "function") {
                  ed.setPosition({ lineNumber: 1, column: 1 });
                }
                if (typeof ed.revealPositionInCenter === "function") {
                  ed.revealPositionInCenter({ lineNumber: 1, column: 1 });
                } else if (typeof ed.revealPosition === "function") {
                  ed.revealPosition({ lineNumber: 1, column: 1 });
                }
              } catch (e) {
                // ignore focus errors
              }
            }
          } catch (err) {
            // ignore
          }
        }, 80);
      }
    });
    // also re-run preview for this component (use the first editor id to derive key)
    const first = monacoContainers[0];
    if (first && first.id) {
      const key = first.id.split("-")[0];
      if (key) writePreview(key);
    }
  });

  // start
  window.addEventListener("DOMContentLoaded", initMonaco);
})();
