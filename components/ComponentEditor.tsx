"use client";

import React, { useEffect, useRef } from "react";

interface ComponentEditorProps {
  componentKey: string;
  initialHtml: string;
  initialCss: string;
}

const ComponentEditor: React.FC<ComponentEditorProps> = ({
  componentKey,
  initialHtml,
  initialCss,
}) => {
  const htmlEditorRef = useRef<HTMLDivElement>(null);
  const cssEditorRef = useRef<HTMLDivElement>(null);
  const previewRef = useRef<HTMLIFrameElement>(null);

  useEffect(() => {
    let monacoHtml: any = null;
    let monacoCss: any = null;

    const loadMonaco = () => {
      if (window.require) {
        window.require.config({
          paths: {
            vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs",
          },
        });

        window.require(["vs/editor/editor.main"], () => {
          if (htmlEditorRef.current && cssEditorRef.current) {
            monacoHtml = window.monaco.editor.create(htmlEditorRef.current, {
              value: initialHtml,
              language: "html",
              theme: "vs-light",
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            });

            monacoCss = window.monaco.editor.create(cssEditorRef.current, {
              value: initialCss,
              language: "css",
              theme: "vs-light",
              fontSize: 14,
              minimap: { enabled: false },
              scrollBeyondLastLine: false,
              automaticLayout: true,
            });

            const updatePreview = () => {
              if (previewRef.current) {
                const html = monacoHtml.getValue();
                const css = monacoCss.getValue();
                const fullHtml = `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <style>${css}</style>
</head>
<body>
  ${html}
</body>
</html>`;
                previewRef.current.srcdoc = fullHtml;
              }
            };

            monacoHtml.onDidChangeModelContent(updatePreview);
            monacoCss.onDidChangeModelContent(updatePreview);

            // Initial preview
            updatePreview();
          }
        });
      }
    };

    if (!window.monaco) {
      const script = document.createElement("script");
      script.src =
        "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs/loader.js";
      script.onload = loadMonaco;
      document.head.appendChild(script);
    } else {
      loadMonaco();
    }

    return () => {
      if (monacoHtml) monacoHtml.dispose();
      if (monacoCss) monacoCss.dispose();
    };
  }, [initialHtml, initialCss]);

  return (
    <div className="editor-row">
      <div className="editor-column">
        <div className="monaco-label">HTML</div>
        <div
          ref={htmlEditorRef}
          className="monaco-editor"
          style={{ height: "200px" }}
        ></div>
      </div>
      <div className="editor-column">
        <div className="monaco-label">CSS</div>
        <div
          ref={cssEditorRef}
          className="monaco-editor"
          style={{ height: "200px" }}
        ></div>
      </div>
      <div className="editor-preview">
        <div className="monaco-label">Preview</div>
        <iframe
          ref={previewRef}
          className="preview-iframe"
          sandbox="allow-same-origin allow-scripts"
        ></iframe>
      </div>
    </div>
  );
};

export default ComponentEditor;
