import React from "react";
import Header from "../components/Header";
import dynamic from "next/dynamic";

// Dynamically import the editor component to avoid SSR issues
const HtmlCssEditor = dynamic(() => import("../components/HtmlCssEditor"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

const HtmlCssPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="content-wrapper">
          <div className="learning-section">
            <h1>Learn HTML & CSS</h1>
            <div className="subtitle">
              Beginner friendly guide with short examples and a live editor to
              practice — just like CodePen.
            </div>

            <div
              className="learning-path"
              style={{ borderLeftColor: "#ff6b6b" }}
            >
              <h2 style={{ color: "#ff6b6b" }}>HTML & CSS Learning Path</h2>
              <ol>
                <li>
                  <b>Introduction</b> — HTML structure (elements, tags,
                  attributes)
                </li>
                <li>
                  <b>Text & Links</b> — headings, paragraphs, anchors
                </li>
                <li>
                  <b>Images & Media</b> — <code>&lt;img&gt;</code>, responsive
                  images
                </li>
                <li>
                  <b>Box Model</b> — margin, border, padding, width/height
                </li>
                <li>
                  <b>Layout Basics</b> — display, position, flexbox
                </li>
                <li>
                  <b>Styling</b> — colors, fonts, backgrounds
                </li>
                <li>
                  <b>Forms & Inputs</b> — basic form elements
                </li>
                <li>
                  <b>Practice Projects</b> — small page components & experiments
                </li>
              </ol>
              <div style={{ marginTop: "10px" }}>
                Tip: use the editor to edit HTML & CSS and press Run or enable
                Auto-run to see changes live.
              </div>
            </div>

            <div className="examples-exercises">
              <h2 style={{ color: "#ff6b6b" }}>Examples & Exercises</h2>

              <details>
                <summary>
                  <b>1. Simple page structure</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre>
                    &lt;!doctype html&gt;\n&lt;html&gt;\n &lt;body&gt;\n
                    &lt;h1&gt;Hello&lt;/h1&gt;\n &lt;p&gt;A
                    paragraph.&lt;/p&gt;\n &lt;/body&gt;\n&lt;/html&gt;
                  </pre>

                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("structure", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create a heading and paragraph.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("structure", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Add a link and image.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("structure", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Build a small card with heading, image, and text.
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <b>2. Box model & layout</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre>
                    .box &#123; padding:16px; border:1px solid #ccc; margin:8px;
                    &#125;
                  </pre>

                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("box", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Make a colored box.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("box", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Add padding and border radius.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("box", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Use flexbox to align items horizontally.
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <b>3. Typography & colors</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre>
                    h1 &#123; color:#ff6b6b; font-family: Arial, sans-serif;
                    &#125;
                  </pre>

                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("typography", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Change heading color and font.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("typography", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Add a background gradient.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("typography", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create a simple responsive typography scale.
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <b>4. Images & Media</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre>
                    &lt;img src="https://picsum.photos/300/150"
                    alt="placeholder"&gt;
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("images", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Insert an image and make it responsive.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("images", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Add a caption under an image.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("images", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create a media card with cropped thumbnail.
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <b>5. Layout Basics</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre>.row &#123; display:flex; gap:12px; &#125;</pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("layout", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create two columns with flexbox.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("layout", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Wrap items and make them responsive.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("layout", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Build a CSS grid layout.
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <b>6. Styling</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre>h2 &#123; color:#0ea5e9; &#125;</pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("styling", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Change heading color & font.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("styling", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create a card with shadow and gradient.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("styling", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Use CSS variables for colors.
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <b>7. Forms & Inputs</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre>&lt;label&gt;Name: &lt;input /&gt;&lt;/label&gt;</pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("forms", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Basic text input.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("forms", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Email and number inputs with validation.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("forms", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Styled login form.
                    </div>
                  </div>
                </div>
              </details>

              <details>
                <summary>
                  <b>8. Practice Projects</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Ideas:</b>
                  <ul>
                    <li>Simple landing header</li>
                    <li>Small gallery or card grid</li>
                    <li>Responsive hero section</li>
                  </ul>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("projects", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Starter page.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("projects", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Gallery layout.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExample("projects", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Small landing starter.
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>

          <HtmlCssEditor />
        </div>
      </div>
    </div>
  );
};

export default HtmlCssPage;
