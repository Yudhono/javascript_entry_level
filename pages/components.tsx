import React from "react";
import Header from "../components/Header";
import ComponentEditor from "../components/ComponentEditor";

const ComponentsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <main
        className="main-container"
        style={{ paddingTop: "28px", paddingBottom: "28px" }}
      >
        <h1>Components</h1>
        <p className="subtitle">
          UI component library — live examples, editable HTML/CSS (Monaco) and
          previews.
        </p>

        <section className="components-grid">
          {/* Buttons */}
          <article className="component">
            <h2>Buttons</h2>
            <div className="example-row">
              <button className="btn primary">Primary</button>
              <button className="btn outline">Outline</button>
              <button className="btn ghost">Ghost</button>
              <button className="btn small">Small</button>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="buttons">
                  Run
                </button>
                <button className="reset-live" data-key="buttons">
                  Reset
                </button>
                <button className="format-code" data-key="buttons">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input
                    type="checkbox"
                    className="auto-run"
                    data-key="buttons"
                  />
                </label>
                <button className="copy-code" data-key="buttons">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="buttons"
                initialHtml={`<button class="btn primary">Primary</button>
<button class="btn outline">Outline</button>
<button class="btn ghost">Ghost</button>
<button class="btn small">Small</button>`}
                initialCss={`.btn { padding: 10px 16px; border-radius: 8px; border: none; cursor: pointer; font-weight: 600; }
.btn.primary { background: #2563eb; color: white; }
.btn.outline { background: transparent; border: 1px solid #2563eb; color: #2563eb; }
.btn.ghost { background: transparent; color: #333; }
.btn.small { padding: 6px 12px; font-size: 0.9rem; }`}
              />
            </details>
          </article>

          {/* Navigation / Navbar */}
          <article className="component">
            <h2>Navigation / Navbar</h2>
            <div className="example-row">
              <nav className="demo-navbar" aria-label="Demo navigation">
                <div className="brand">Brand</div>
                <div className="nav-links">
                  <a href="#">Home</a>
                  <a href="#">Docs</a>
                  <a href="#">Components</a>
                </div>
                <div className="nav-cta">
                  <button className="btn primary">Sign up</button>
                </div>
              </nav>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="navbar">
                  Run
                </button>
                <button className="reset-live" data-key="navbar">
                  Reset
                </button>
                <button className="format-code" data-key="navbar">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input
                    type="checkbox"
                    className="auto-run"
                    data-key="navbar"
                  />
                </label>
                <button className="copy-code" data-key="navbar">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="navbar"
                initialHtml={`<nav class="demo-navbar" aria-label="Demo navigation">
  <div class="brand">Brand</div>
  <div class="nav-links">
    <a href="#">Home</a>
    <a href="#">Docs</a>
    <a href="#">Components</a>
  </div>
  <div class="nav-cta"><button class="btn primary">Sign up</button></div>
</nav>`}
                initialCss={`.demo-navbar { display: flex; align-items: center; justify-content: space-between; padding: 12px 16px; background: #fff; border-radius: 8px; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.brand { font-weight: bold; font-size: 1.2rem; }
.nav-links { display: flex; gap: 16px; }
.nav-links a { text-decoration: none; color: #333; }
.nav-cta { margin-left: auto; }`}
              />
            </details>
          </article>

          {/* Cards */}
          <article className="component">
            <h2>Cards</h2>
            <div className="example-row">
              <div className="card">
                <img
                  src="https://picsum.photos/seed/cards/320/160"
                  alt="thumb"
                />
                <div className="card-body">
                  <h3>Card title</h3>
                  <p>Short description goes here. Supports actions below.</p>
                  <div style={{ marginTop: "10px" }}>
                    <button className="btn primary">Action</button>
                  </div>
                </div>
              </div>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="cards">
                  Run
                </button>
                <button className="reset-live" data-key="cards">
                  Reset
                </button>
                <button className="format-code" data-key="cards">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input
                    type="checkbox"
                    className="auto-run"
                    data-key="cards"
                  />
                </label>
                <button className="copy-code" data-key="cards">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="cards"
                initialHtml={`<div class="card">
  <img src="https://picsum.photos/seed/cards/320/160" alt="thumb">
  <div class="card-body">
    <h3>Card title</h3>
    <p>Short description goes here. Supports actions below.</p>
    <div style="margin-top:10px;"><button class="btn primary">Action</button></div>
  </div>
</div>`}
                initialCss={`.card { width: 320px; border: 1px solid #ddd; padding: 0; border-radius: 8px; overflow: hidden; box-shadow: 0 2px 8px rgba(0,0,0,0.1); }
.card img { display: block; width: 100%; height: auto; }
.card-body { padding: 16px; }
.card-body h3 { margin: 0 0 8px 0; }
.card-body p { margin: 0 0 16px 0; color: #666; }`}
              />
            </details>
          </article>

          {/* Forms */}
          <article className="component">
            <h2>Forms</h2>
            <div className="example-row">
              <form
                className="simple-form"
                onSubmit={(e) => e.preventDefault()}
              >
                <label>
                  Full name <input type="text" placeholder="Your name" />
                </label>
                <label>
                  Email <input type="email" placeholder="you@example.com" />
                </label>
                <div
                  style={{ display: "flex", gap: "8px", alignItems: "center" }}
                >
                  <button className="btn primary">Submit</button>
                  <button className="btn outline" type="reset">
                    Reset
                  </button>
                </div>
              </form>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="forms">
                  Run
                </button>
                <button className="reset-live" data-key="forms">
                  Reset
                </button>
                <button className="format-code" data-key="forms">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input
                    type="checkbox"
                    className="auto-run"
                    data-key="forms"
                  />
                </label>
                <button className="copy-code" data-key="forms">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="forms"
                initialHtml={`<form class="simple-form" onsubmit="event.preventDefault()">
  <label>Full name <input type="text" placeholder="Your name"></label>
  <label>Email <input type="email" placeholder="you@example.com"></label>
  <div style="display:flex;gap:8px;align-items:center;">
    <button class="btn primary">Submit</button>
    <button class="btn outline" type="reset">Reset</button>
  </div>
</form>`}
                initialCss={`.simple-form { display: flex; flex-direction: column; gap: 8px; max-width: 320px; }
.simple-form label { display: flex; flex-direction: column; }
.simple-form input { padding: 8px; border: 1px solid #cbd5e1; border-radius: 6px; }`}
              />
            </details>
          </article>

          {/* Dropdown / Select */}
          <article className="component">
            <h2>Dropdown / Select</h2>
            <div className="example-row">
              <div className="select-wrap">
                <select>
                  <option>Choose an option</option>
                  <option>Option A</option>
                  <option>Option B</option>
                </select>
              </div>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="select">
                  Run
                </button>
                <button className="reset-live" data-key="select">
                  Reset
                </button>
                <button className="format-code" data-key="select">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input
                    type="checkbox"
                    className="auto-run"
                    data-key="select"
                  />
                </label>
                <button className="copy-code" data-key="select">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="select"
                initialHtml={`<div class="select-wrap">
  <select>
    <option>Choose an option</option>
    <option>Option A</option>
    <option>Option B</option>
  </select>
</div>`}
                initialCss={`.select-wrap select { padding: 8px 12px; border: 1px solid #cbd5e1; border-radius: 6px; background: #fff; font-size: 14px; }`}
              />
            </details>
          </article>

          {/* Tables */}
          <article className="component">
            <h2>Tables</h2>
            <div className="example-row">
              <div style={{ width: "100%", overflow: "auto" }}>
                <table className="demo-table">
                  <thead>
                    <tr>
                      <th>Item</th>
                      <th>Description</th>
                      <th>Price</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Alpha</td>
                      <td>Sample row description</td>
                      <td>$12</td>
                    </tr>
                    <tr>
                      <td>Beta</td>
                      <td>Another sample</td>
                      <td>$20</td>
                    </tr>
                    <tr>
                      <td>Gamma</td>
                      <td>Yet another row</td>
                      <td>$7</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="tables">
                  Run
                </button>
                <button className="reset-live" data-key="tables">
                  Reset
                </button>
                <button className="format-code" data-key="tables">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input
                    type="checkbox"
                    className="auto-run"
                    data-key="tables"
                  />
                </label>
                <button className="copy-code" data-key="tables">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="tables"
                initialHtml={`<div style="width:100%;overflow:auto">
  <table class="demo-table">
    <thead>
      <tr>
        <th>Item</th>
        <th>Description</th>
        <th>Price</th>
      </tr>
    </thead>
    <tbody>
      <tr>
        <td>Alpha</td>
        <td>Sample row description</td>
        <td>$12</td>
      </tr>
      <tr>
        <td>Beta</td>
        <td>Another sample</td>
        <td>$20</td>
      </tr>
      <tr>
        <td>Gamma</td>
        <td>Yet another row</td>
        <td>$7</td>
      </tr>
    </tbody>
  </table>
</div>`}
                initialCss={`.demo-table { border-collapse: collapse; width: 100%; }
.demo-table th, .demo-table td { border: 1px solid #e5e7eb; padding: 8px 12px; text-align: left; }
.demo-table th { background: #f9fafb; font-weight: 600; }`}
              />
            </details>
          </article>

          {/* Flexbox Layout */}
          <article className="component">
            <h2>Flexbox Layout</h2>
            <div className="example-row">
              <div className="demo-flex">
                <div className="flex-item">A</div>
                <div className="flex-item">B</div>
                <div className="flex-item">C</div>
              </div>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="flexbox">
                  Run
                </button>
                <button className="reset-live" data-key="flexbox">
                  Reset
                </button>
                <button className="format-code" data-key="flexbox">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input
                    type="checkbox"
                    className="auto-run"
                    data-key="flexbox"
                  />
                </label>
                <button className="copy-code" data-key="flexbox">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="flexbox"
                initialHtml={`<div class="demo-flex">
  <div class="flex-item">A</div>
  <div class="flex-item">B</div>
  <div class="flex-item">C</div>
</div>`}
                initialCss={`.demo-flex { display: flex; gap: 12px; }
.flex-item { flex: 1; padding: 12px; border: 1px solid #e2e8f0; border-radius: 6px; background: #fff; text-align: center; }`}
              />
            </details>
          </article>

          {/* Grid Layout */}
          <article className="component">
            <h2>Grid Layout</h2>
            <div className="example-row">
              <div className="demo-grid">
                <div className="grid-item">1</div>
                <div className="grid-item">2</div>
                <div className="grid-item">3</div>
                <div className="grid-item">4</div>
              </div>
            </div>

            <details className="editor-details">
              <summary>Open editor &amp; preview</summary>
              <div className="editor-controls">
                <button className="run-live" data-key="grid">
                  Run
                </button>
                <button className="reset-live" data-key="grid">
                  Reset
                </button>
                <button className="format-code" data-key="grid">
                  Format
                </button>
                <label className="auto-run-label">
                  Auto-run{" "}
                  <input type="checkbox" className="auto-run" data-key="grid" />
                </label>
                <button className="copy-code" data-key="grid">
                  Copy both
                </button>
              </div>
              <ComponentEditor
                componentKey="grid"
                initialHtml={`<div class="demo-grid">
  <div class="grid-item">1</div>
  <div class="grid-item">2</div>
  <div class="grid-item">3</div>
  <div class="grid-item">4</div>
  <div class="grid-item">5</div>
  <div class="grid-item">6</div>
</div>`}
                initialCss={`.demo-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; }
.grid-item { background: #fff; padding: 16px; border: 1px solid #e6eef8; border-radius: 6px; text-align: center; }`}
              />
            </details>
          </article>
        </section>
      </main>
    </div>
  );
};

export default ComponentsPage;
