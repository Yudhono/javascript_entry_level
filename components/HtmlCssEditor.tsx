"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    prettier: any;
    prettierPlugins: any;
    monaco: any;
    require: any;
  }
}

const EXAMPLES = {
  structure: {
    easy: {
      html: "<!doctype html>\n<html>\n  <body>\n    <h1>Hello</h1>\n    <p>A paragraph.</p>\n  </body>\n</html>",
      css: "",
    },
    medium: {
      html: '<!doctype html>\n<html>\n  <body>\n    <h1>Image & Link</h1>\n    <a href="https://example.com">Visit</a>\n    <img src="https://picsum.photos/150/150" alt="pic">\n  </body>\n</html>',
      css: "",
    },
    hard: {
      html: '<!doctype html>\n<html>\n  <body>\n    <div class="card">\n      <img src="https://picsum.photos/300/140">\n      <h3>Card title</h3>\n      <p>Card text</p>\n    </div>\n  </body>\n</html>',
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
      html: '<h2>Image</h2>\n<img src="https://picsum.photos/300/150" alt="placeholder">',
      css: "img{display:block;margin:8px 0;max-width:100%;height:auto;} ",
    },
    medium: {
      html: '<figure>\n  <img src="https://picsum.photos/600/300" alt="hero">\n  <figcaption>A responsive image with caption</figcaption>\n</figure>',
      css: "figure{max-width:640px;}figure img{width:100%;height:auto;border-radius:8px;}figcaption{color:#6b7280;font-size:0.95rem;margin-top:6px;}",
    },
    hard: {
      html: '<div class="media-card">\n  <div class="thumb" style="background:url(https://picsum.photos/600/400) center/cover no-repeat;"></div>\n  <h3>Media card</h3>\n  <p>Uses object-fit to crop image</p>\n</div>',
      css: ".media-card{width:320px;border:1px solid #e5e7eb;border-radius:8px;overflow:hidden}.media-card .thumb{height:160px;background:url(https://picsum.photos/600/400) center/cover no-repeat}",
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

const HtmlCssEditor: React.FC = () => {
  const htmlEditorRef = useRef<HTMLDivElement>(null);
  const cssEditorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    const TEMPLATES = {
      basic: {
        html: `<!doctype html>\n<html>\n  <head>\n    <meta charset="utf-8">\n    <meta name="viewport" content="width=device-width,initial-scale=1">\n  </head>\n  <body>\n    <header>\n      <h1>My Simple Page</h1>\n      <p>Welcome to the starter template.</p>\n    </header>\n    <main>\n      <section>\n        <h2>About</h2>\n        <p>This is a small example to practice HTML & CSS.</p>\n      </section>\n    </main>\n  </body>\n</html>`,
        css: `body { font-family: system-ui, -apple-system, "Segoe UI", Roboto, Arial; margin:16px; color:#1f2937; }\nheader { background:#fff3f2; padding:16px; border-radius:8px; border:1px solid #fee2e2; }\nh1 { margin:0; color:#ef4444; }\n`,
      },
      card: {
        html: `<!doctype html>\n<html><body>\n  <div class="card">\n    <img src="https://picsum.photos/300/140" alt="placeholder">\n    <h3>Card title</h3>\n    <p>Short description about this card.</p>\n  </div>\n</body></html>`,
        css: `.card{width:320px;border-radius:10px;overflow:hidden;border:1px solid #e5e7eb;box-shadow:0 6px 18px rgba(0,0,0,0.06);}\n.card img{display:block;width:100%;height:auto;}\n.card h3{margin:12px 16px 4px;}\n.card p{margin:0 16px 16px;color:#374151;font-size:0.95rem;}`,
      },
      layout: {
        html: `<!doctype html>\n<html><body>\n  <div class="row">\n    <div class="col">Column 1</div>\n    <div class="col">Column 2</div>\n    <div class="col">Column 3</div>\n  </div>\n</body></html>`,
        css: `.row{display:flex;gap:12px;}\n.col{flex:1;background:#f8fafc;padding:16px;border:1px solid #e6eef8;border-radius:8px;text-align:center}`,
      },
    };

    let monacoHtml: any = null;
    let monacoCss: any = null;
    let autoRun = false;
    let autoRunTimer: NodeJS.Timeout | null = null;

    const loadMonaco = () => {
      if (window.monaco) {
        initEditors();
        return;
      }

      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs/loader.js";
      script.onload = () => {
        (window as any).require.config({
          paths: {
            vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs",
          },
        });
        (window as any).require(["vs/editor/editor.main"], () => {
          initEditors();
        });
      };
      document.head.appendChild(script);
    };

    const initEditors = () => {
      if (!htmlEditorRef.current || !cssEditorRef.current) return;

      monacoHtml = (window as any).monaco.editor.create(htmlEditorRef.current, {
        value: TEMPLATES.basic.html,
        language: "html",
        theme: "vs-light",
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      });

      monacoCss = (window as any).monaco.editor.create(cssEditorRef.current, {
        value: TEMPLATES.basic.css,
        language: "css",
        theme: "vs-light",
        fontSize: 14,
        minimap: { enabled: false },
        scrollBeyondLastLine: false,
        automaticLayout: true,
      });

      monacoHtml.onDidChangeModelContent(() => {
        if (autoRun) {
          if (autoRunTimer) clearTimeout(autoRunTimer);
          autoRunTimer = setTimeout(runPreview, 500);
        }
      });

      monacoCss.onDidChangeModelContent(() => {
        if (autoRun) {
          if (autoRunTimer) clearTimeout(autoRunTimer);
          autoRunTimer = setTimeout(runPreview, 500);
        }
      });

      // Load Prettier
      loadPrettier();
    };

    const loadPrettier = () => {
      if (window.prettier) return;

      const scripts = [
        "https://unpkg.com/prettier@2.8.8/standalone.js",
        "https://unpkg.com/prettier@2.8.8/parser-html.js",
        "https://unpkg.com/prettier@2.8.8/parser-postcss.js",
      ];

      let loaded = 0;
      scripts.forEach((url) => {
        const script = document.createElement("script");
        script.src = url;
        script.onload = () => {
          loaded++;
          if (loaded === scripts.length) {
            enableFormatButton();
          }
        };
        document.head.appendChild(script);
      });
    };

    const enableFormatButton = () => {
      const formatBtn = document.getElementById("formatBtn");
      if (formatBtn) {
        formatBtn.textContent = "Format";
        formatBtn.removeAttribute("disabled");
        formatBtn.onclick = formatCode;
      }
    };

    const runPreview = () => {
      if (!previewRef.current || !monacoHtml || !monacoCss) return;

      const html = monacoHtml.getValue();
      const css = monacoCss.getValue();
      const fullHtml = html.replace("</head>", `<style>${css}</style></head>`);
      previewRef.current.srcdoc = fullHtml;
    };

    const resetEditors = () => {
      if (monacoHtml) monacoHtml.setValue(TEMPLATES.basic.html);
      if (monacoCss) monacoCss.setValue(TEMPLATES.basic.css);
      runPreview();
    };

    const formatCode = () => {
      if (!window.prettier || !monacoHtml || !monacoCss) return;

      try {
        const html = monacoHtml.getValue();
        const css = monacoCss.getValue();

        const formattedHtml = window.prettier.format(html, {
          parser: "html",
          plugins: window.prettierPlugins,
        });

        const formattedCss = window.prettier.format(css, {
          parser: "css",
          plugins: window.prettierPlugins,
        });

        monacoHtml.setValue(formattedHtml);
        monacoCss.setValue(formattedCss);
        runPreview();
      } catch (e) {
        console.error("Formatting failed:", e);
      }
    };

    const setAutoRun = (checked: boolean) => {
      autoRun = checked;
      if (autoRun) runPreview();
    };

    const loadTemplate = (template: string) => {
      const tpl = TEMPLATES[template as keyof typeof TEMPLATES];
      if (tpl && monacoHtml && monacoCss) {
        monacoHtml.setValue(tpl.html);
        monacoCss.setValue(tpl.css);
        runPreview();
      }
    };

    // Expose functions globally for onclick handlers
    (window as any).runPreview = runPreview;
    (window as any).resetEditors = resetEditors;
    (window as any).setAutoRun = setAutoRun;
    (window as any).loadTemplate = loadTemplate;
    (window as any).loadExample = (topic: string, level: string) => {
      const example =
        EXAMPLES[topic as keyof typeof EXAMPLES]?.[
          level as keyof (typeof EXAMPLES)[keyof typeof EXAMPLES]
        ];
      if (example && monacoHtml && monacoCss) {
        monacoHtml.setValue(example.html);
        monacoCss.setValue(example.css || "");
        runPreview();
      }
    };

    loadMonaco();

    return () => {
      if (monacoHtml) monacoHtml.dispose();
      if (monacoCss) monacoCss.dispose();
    };
  }, []);

  return (
    <div className="editor-section">
      <div className="instructions">
        <p>
          Edit the HTML and CSS panels. Click <b>Run</b> to update the preview.
          Enable <b>Auto-run</b> to update live as you type.
        </p>
        <ul>
          <li>HTML goes into the left panel, CSS into the right.</li>
          <li>
            The preview uses an isolated iframe, so changes are safe and
            immediate.
          </li>
          <li>Use the Load buttons to try guided exercises.</li>
        </ul>
      </div>

      <div className="editor-toolbar">
        <div
          style={{
            display: "flex",
            gap: "8px",
            alignItems: "center",
            flexWrap: "wrap",
          }}
        >
          <button
            className="run-btn"
            onClick={() => (window as any).runPreview()}
          >
            Run ▶
          </button>
          <button
            className="reset-btn"
            onClick={() => (window as any).resetEditors()}
          >
            Reset
          </button>
          <button id="formatBtn" className="format-btn" disabled>
            Loading…
          </button>
          <label
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              marginLeft: "6px",
            }}
          >
            Auto-run{" "}
            <input
              id="autoRun"
              type="checkbox"
              onChange={(e) => (window as any).setAutoRun(e.target.checked)}
            />
          </label>
          <select
            id="templateSelect"
            onChange={(e) => (window as any).loadTemplate(e.target.value)}
          >
            <option value="basic">Starter: Basic Page</option>
            <option value="card">Starter: Card Component</option>
            <option value="layout">Starter: Flex Layout</option>
          </select>
        </div>
        <div style={{ marginLeft: "auto", color: "#666", fontSize: "0.95em" }}>
          Tip: Press Ctrl/Cmd + Enter to run
        </div>
      </div>

      <div className="editor-grid">
        <div className="panel preview-panel">
          <div className="panel-label">Preview</div>
          <iframe
            ref={previewRef}
            sandbox="allow-same-origin allow-forms allow-scripts"
            srcDoc=""
            frameBorder="0"
          ></iframe>
        </div>
        <div className="panel html-panel">
          <div className="panel-label">HTML</div>
          <div
            ref={htmlEditorRef}
            style={{ height: "260px", borderRadius: "6px", overflow: "hidden" }}
          ></div>
        </div>
        <div className="panel css-panel">
          <div className="panel-label">CSS</div>
          <div
            ref={cssEditorRef}
            style={{ height: "260px", borderRadius: "6px", overflow: "hidden" }}
          ></div>
        </div>
      </div>
    </div>
  );
};

export default HtmlCssEditor;
