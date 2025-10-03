// Monaco-based HTML/CSS playground with formatting (Prettier) and autocomplete
const TEMPLATES = {
  basic: {
    html: `<!doctype html>\n<html>\n  <head>\n    <meta charset=\"utf-8\">\n    <meta name=\"viewport\" content=\"width=device-width,initial-scale=1\">\n  </head>\n  <body>\n    <header>\n      <h1>My Simple Page</h1>\n      <p>Welcome to the starter template.</p>\n    </header>\n    <main>\n      <section>\n        <h2>About</h2>\n        <p>This is a small example to practice HTML & CSS.</p>\n      </section>\n    </main>\n  </body>\n</html>`,
    css: `body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial; margin:16px; color:#1f2937; }\nheader { background:#fff3f2; padding:16px; border-radius:8px; border:1px solid #fee2e2; }\nh1 { margin:0; color:#ef4444; }\n`,
  },
  card: {
    html: `<!doctype html>\n<html><body>\n  <div class=\"card\">\n    <img src=\"https://via.placeholder.com/300x140\" alt=\"placeholder\">\n    <h3>Card title</h3>\n    <p>Short description about this card.</p>\n  </div>\n</body></html>`,
    css: `.card{width:320px;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 6px 18px rgba(0,0,0,0.06);}\n.card img{display:block;width:100%;height:auto;}\n.card h3{margin:12px 16px 4px;}\n.card p{margin:0 16px 16px;color:#374151;font-size:0.95rem;}`,
  },
  layout: {
    html: `<!doctype html>\n<html><body>\n  <div class=\"row\">\n    <div class=\"col\">Column 1</div>\n    <div class=\"col\">Column 2</div>\n    <div class=\"col\">Column 3</div>\n  </div>\n</body></html>`,
    css: `.row{display:flex;gap:12px;}\n.col{flex:1;background:#f8fafc;padding:16px;border:1px solid #e6eef8;border-radius:8px;text-align:center}`,
  },
};

const preview = document.getElementById("preview");
let autoRun = false;
let autoRunTimer = null;
let monacoHtml = null;
let monacoCss = null;
let monacoRequireLoaded = false;

// Ensure Prettier and required parser plugins are loaded. Returns a promise that resolves when ready.
function ensurePrettier() {
  if (window.prettier && window.prettierPlugins) return Promise.resolve();
  return new Promise((resolve, reject) => {
    const urls = [
      "https://unpkg.com/prettier@2.8.8/standalone.js",
      "https://unpkg.com/prettier@2.8.8/parser-html.js",
      "https://unpkg.com/prettier@2.8.8/parser-postcss.js",
    ];
    let loaded = 0;
    function onLoad() {
      loaded += 1;
      if (loaded === urls.length) {
        // small delay to ensure globals are available
        setTimeout(() => {
          if (window.prettier) resolve();
          else reject(new Error("Prettier failed to initialize"));
        }, 50);
      }
    }
    function onError(e) {
      reject(e);
    }
    urls.forEach((u) => {
      // if already loaded, treat as loaded
      if (document.querySelector(`script[src="${u}"]`)) {
        onLoad();
        return;
      }
      const s = document.createElement("script");
      s.src = u;
      s.onload = onLoad;
      s.onerror = onError;
      document.head.appendChild(s);
    });
  });
}

function renderPreview() {
  const html = monacoHtml
    ? monacoHtml.getValue()
    : document.getElementById("htmlCode")?.value || "";
  const css = monacoCss
    ? monacoCss.getValue()
    : document.getElementById("cssCode")?.value || "";
  const cssTag = `<style>\n${css}\n</style>`;
  // If user HTML lacks </head>, inject CSS at top of body
  let src = html;
  if (src.includes("</head>")) {
    src = src.replace("</head>", `${cssTag}</head>`);
  } else if (src.includes("<body>")) {
    src = src.replace("<body>", `<head>${cssTag}</head><body>`);
  } else {
    // fallback: wrap content
    src = `<!doctype html><html><head>${cssTag}</head><body>${src}</body></html>`;
  }
  preview.srcdoc = src;
}

function runPreview() {
  if (!preview) return;
  renderPreview();
}

function resetEditors() {
  loadTemplate("basic");
  if (monacoHtml) monacoHtml.focus();
}

function setAutoRun(enabled) {
  autoRun = enabled;
  if (autoRun) {
    autoRunTimer = setInterval(() => renderPreview(), 800);
  } else if (autoRunTimer) {
    clearInterval(autoRunTimer);
    autoRunTimer = null;
  }
}

function loadTemplate(name) {
  const tpl = TEMPLATES[name] || TEMPLATES.basic;
  if (monacoHtml) monacoHtml.setValue(tpl.html);
  else
    document.getElementById("htmlCode") &&
      (document.getElementById("htmlCode").value = tpl.html);
  if (monacoCss) monacoCss.setValue(tpl.css);
  else
    document.getElementById("cssCode") &&
      (document.getElementById("cssCode").value = tpl.css);
  renderPreview();
}

// Guided examples for exercises
const EXAMPLES = {
  structure: {
    easy: {
      html: "<!doctype html>\n<html>\n  <body>\n    <h1>Hello</h1>\n    <p>A paragraph.</p>\n  </body>\n</html>",
      css: "",
    },
    medium: {
      html: '<!doctype html>\n<html>\n  <body>\n    <h1>Image & Link</h1>\n    <a href="https://example.com">Visit</a>\n    <img src="https://via.placeholder.com/150" alt="pic">\n  </body>\n</html>',
      css: "",
    },
    hard: {
      html: '<!doctype html>\n<html>\n  <body>\n    <div class="card">\n      <img src="https://via.placeholder.com/300x140">\n      <h3>Card title</h3>\n      <p>Card text</p>\n    </div>\n  </body>\n</html>',
      css: ".card{width:320px;border:1px solid #ddd;padding:10px;border-radius:8px;}",
    },
  },
  box: {
    easy: {
      html: '<div class="box">I am a box</div>',
      css: ".box{background:#fff3cd;padding:12px;border:1px solid #ffeeba;border-radius:6px;}",
    },
    medium: {
      html: '<div class="box">Box with padding and radius</div>',
      css: ".box{padding:20px;border-radius:10px;border:1px solid #e2e8f0;background:#f8fafc;}",
    },
    hard: {
      html: '<div class="container">\n  <div class="item">One</div>\n  <div class="item">Two</div>\n  <div class="item">Three</div>\n</div>',
      css: ".container{display:flex;gap:12px}.item{flex:1;padding:12px;border:1px solid #e5e7eb;border-radius:8px;background:#fff}",
    },
  },
  typography: {
    easy: {
      html: "<h1>Heading</h1><p>Try changing color</p>",
      css: "h1{color:#ff6b6b;font-family: Arial, sans-serif;}",
    },
    medium: {
      html: '<div class="hero">\n  <h1>Gradient background</h1>\n</div>',
      css: ".hero{padding:24px;border-radius:10px;background:linear-gradient(90deg,#ff9a9e,#fecfef);color:#1f2937}",
    },
    hard: {
      html: "<h1>Responsive</h1><p>Resize window to see change</p>",
      css: "h1{font-size:clamp(20px,4vw,36px)}p{font-size:clamp(14px,2vw,18px)}",
    },
  },
  images: {
    easy: {
      html: '<h2>Image</h2>\n<img src="https://via.placeholder.com/300x150" alt="placeholder">',
      css: "img{display:block;margin:8px 0;max-width:100%;height:auto;} ",
    },
    medium: {
      html: '<figure>\n  <img src="https://via.placeholder.com/600x300" alt="hero">\n  <figcaption>A responsive image with caption</figcaption>\n</figure>',
      css: "figure{max-width:640px;}figure img{width:100%;height:auto;border-radius:8px;}figcaption{color:#6b7280;font-size:0.95rem;margin-top:6px;}",
    },
    hard: {
      html: '<div class="media-card">\n  <div class="thumb"></div>\n  <h3>Media card</h3>\n  <p>Uses object-fit to crop image</p>\n</div>',
      css: ".media-card{width:320px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden}.media-card .thumb{height:160px;background:url(https://via.placeholder.com/600x400) center/cover no-repeat}",
    },
  },
  layout: {
    easy: {
      html: '<div class="row">\n  <div class="col">Col 1</div>\n  <div class="col">Col 2</div>\n</div>',
      css: ".row{display:flex;gap:12px}.col{flex:1;padding:12px;border:1px solid #e6eef8;border-radius:6px;background:#fff}",
    },
    medium: {
      html: '<div class="wrap">\n  <div class="item">1</div>\n  <div class="item">2</div>\n  <div class="item">3</div>\n  <div class="item">4</div>\n</div>',
      css: ".wrap{display:flex;flex-wrap:wrap;gap:8px}.item{flex:1 1 140px;padding:12px;border:1px solid #e5e7eb;border-radius:6px;text-align:center}",
    },
    hard: {
      html: '<div class="grid">\n  <div class="g">A</div>\n  <div class="g">B</div>\n  <div class="g">C</div>\n  <div class="g">D</div>\n</div>',
      css: ".grid{display:grid;grid-template-columns:repeat(3,1fr);gap:12px}.g{background:#fff;padding:16px;border:1px solid #e6eef8;border-radius:6px}",
    },
  },
  styling: {
    easy: {
      html: "<h2>Styled heading</h2><p>Change colors and fonts.</p>",
      css: "h2{color:#0ea5e9;font-family:Georgia, serif}p{color:#374151}",
    },
    medium: {
      html: '<div class="card">\n  <h3>Fancy card</h3>\n  <p>With shadow and gradient</p>\n</div>',
      css: ".card{padding:16px;border-radius:10px;background:linear-gradient(135deg,#fff,#f1f5f9);box-shadow:0 8px 20px rgba(16,24,40,0.06)}.card h3{margin:0 0 6px}",
    },
    hard: {
      html: '<div class="vars">\n  <h3>CSS variables</h3>\n  <p>Using var() for colors</p>\n</div>',
      css: ":root{--brand:#ef4444;--muted:#6b7280} .vars{padding:16px;border-radius:8px;background:#fff;color:var(--muted)}.vars h3{color:var(--brand)}",
    },
  },
  forms: {
    easy: {
      html: '<form>\n  <label>Name: <input type="text" name="name"></label>\n  <button>Submit</button>\n</form>',
      css: "form{display:flex;flex-direction:column;gap:8px;max-width:320px}input{padding:8px;border-radius:6px;border:1px solid #cbd5e1}",
    },
    medium: {
      html: '<form>\n  <label>Email: <input type="email" required></label>\n  <label>Age: <input type="number" min="1" max="120"></label>\n  <button>Send</button>\n</form>',
      css: "form{display:flex;flex-direction:column;gap:10px;max-width:340px}input{padding:8px;border-radius:6px;border:1px solid #cbd5e1}",
    },
    hard: {
      html: '<form class="styled">\n  <label>Username<input></label>\n  <label>Password<input type="password"></label>\n  <button>Login</button>\n</form>',
      css: ".styled{max-width:360px;padding:12px;border-radius:8px;border:1px solid #e6eef8;background:#fff}.styled input{display:block;width:100%;padding:8px;margin-top:6px;border:1px solid #e2e8f0;border-radius:6px}",
    },
  },
  projects: {
    easy: {
      html: "<header><h1>My Page</h1></header>\n<main><p>Start building here.</p></main>",
      css: "header{background:#fff3f2;padding:12px;border-radius:8px}main{padding:12px}",
    },
    medium: {
      html: '<div class="gallery">\n  <div class="card">Item 1</div>\n  <div class="card">Item 2</div>\n  <div class="card">Item 3</div>\n</div>',
      css: ".gallery{display:flex;gap:12px}.card{flex:1;padding:16px;border-radius:8px;border:1px solid #e6eef8;background:#fff;text-align:center}",
    },
    hard: {
      html: '<div class="landing">\n  <h1>Landing</h1>\n  <p>Header, hero, and features</p>\n</div>',
      css: ".landing{padding:20px;text-align:center}.landing h1{font-size:2rem}",
    },
  },
};

function loadExample(topic, level) {
  const t = EXAMPLES[topic] && EXAMPLES[topic][level];
  if (t) {
    if (monacoHtml) monacoHtml.setValue(t.html);
    if (monacoCss) monacoCss.setValue(t.css || "");
    renderPreview();
  }
}

// Keyboard shortcuts
// Initialize Monaco via AMD loader when available
function initMonacoEditors() {
  if (!window.require) {
    console.warn("Monaco loader not available");
    loadTemplate("basic");
    return;
  }
  if (monacoRequireLoaded) return;
  monacoRequireLoaded = true;
  window.require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs" },
  });
  window.require(["vs/editor/editor.main"], function () {
    try {
      monacoHtml = monaco.editor.create(document.getElementById("htmlEditor"), {
        value: TEMPLATES.basic.html,
        language: "html",
        automaticLayout: true,
        minimap: { enabled: false },
      });

      monacoCss = monaco.editor.create(document.getElementById("cssEditor"), {
        value: TEMPLATES.basic.css,
        language: "css",
        automaticLayout: true,
        minimap: { enabled: false },
      });

      // Run on Ctrl/Cmd+Enter inside editors
      monacoHtml.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        runPreview
      );
      monacoCss.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        runPreview
      );

      // Auto-run from editors
      monacoHtml.onDidChangeModelContent(() => {
        if (autoRun) renderPreview();
      });
      monacoCss.onDidChangeModelContent(() => {
        if (autoRun) renderPreview();
      });

      // Formatting (Prettier) — expose a format function
      window.formatEditors = async function formatEditors() {
        try {
          // Ensure Prettier is loaded; if not, load it dynamically
          await ensurePrettier();
          const plugins = window.prettierPlugins || prettierPlugins;
          if (!window.prettier) throw new Error("prettier not available");
          if (monacoHtml) {
            const raw = monacoHtml.getValue();
            const formatted = window.prettier.format(raw, {
              parser: "html",
              plugins,
            });
            monacoHtml.setValue(formatted);
          }
          if (monacoCss) {
            const rawCss = monacoCss.getValue();
            const formattedCss = window.prettier.format(rawCss, {
              parser: "css",
              plugins,
            });
            monacoCss.setValue(formattedCss);
          }
        } catch (e) {
          console.warn("Formatting failed", e);
          throw e;
        }
      };

      // Enable format button once Prettier & Monaco are initialized
      const formatBtn = document.getElementById("formatBtn");
      if (formatBtn) {
        formatBtn.disabled = false;
        formatBtn.textContent = "Format";
        formatBtn.addEventListener("click", async () => {
          try {
            formatBtn.disabled = true;
            const original = formatBtn.textContent;
            formatBtn.textContent = "Formatting…";
            await window.formatEditors();
            formatBtn.textContent = "Done";
            setTimeout(() => {
              formatBtn.textContent = "Format";
              formatBtn.disabled = false;
            }, 700);
          } catch (err) {
            console.warn("Format failed", err);
            formatBtn.textContent = "Format";
            formatBtn.disabled = false;
          }
        });
      }

      // Simple Format button binding: add to window so UI can call it if desired
      window.runPreview = runPreview;
      window.loadExample = loadExample;
      window.loadTemplate = loadTemplate;
      window.resetEditors = resetEditors;
      window.setAutoRun = setAutoRun;

      // initial content
      loadTemplate("basic");
      renderPreview();
    } catch (err) {
      console.error("Monaco init failed", err);
      loadTemplate("basic");
    }
  });
}

// Wait for DOM ready then init Monaco
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMonacoEditors);
} else {
  initMonacoEditors();
}

// Expose runPreview globally for toolbar button
window.runPreview = runPreview;
