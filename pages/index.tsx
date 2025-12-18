import React from "react";
import Header from "../components/Header";

const HomePage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="page-content">
        <main className="hero-section">
          <div className="main-container hero-grid">
            <div className="hero-content">
              <h1>Learn Web Development — Hands-on, beginner friendly</h1>
              <p className="lead">
                Interactive lessons, a built-in code editor, and step-by-step
                exercises to help you build real skills fast.
              </p>
              <p className="cta-row">
                <a className="primary-cta" href="/html-css">
                  Start HTML &amp; CSS
                </a>
                <a className="secondary-cta" href="/js">
                  Start JavaScript
                </a>
              </p>
            </div>
            <div className="hero-card">
              <div className="editor-sample">
                <div className="line">&lt;h1&gt;Hello&lt;/h1&gt;</div>
                <div className="line">&lt;p&gt;Try editing this.&lt;/p&gt;</div>
              </div>
            </div>
          </div>
        </main>

        <section id="courses" className="features main-container">
          <h2>What you'll learn</h2>
          <div className="feature-grid">
            <div className="feature">
              <h3>HTML &amp; CSS</h3>
              <p>
                Structure pages, style layouts, and build responsive interfaces
                using modern CSS techniques.
              </p>
              <a className="link-btn" href="/html-css">
                Open Playground
              </a>
            </div>
            <div className="feature">
              <h3>JavaScript</h3>
              <p>
                Learn the language fundamentals and practice with the integrated
                editor and exercises.
              </p>
              <a className="link-btn" href="/js">
                Open JS Playground
              </a>
            </div>
            <div className="feature">
              <h3>Projects</h3>
              <p>
                Small hands-on projects to apply what you learn — landing pages,
                galleries, and interactive widgets.
              </p>
              <a className="link-btn" href="/html-css">
                Try Examples
              </a>
            </div>
          </div>
        </section>
      </div>

      <footer className="site-footer">
        <div className="main-container">
          <div className="footer-row">
            Made with ♥ for learners • <a href="/">Yudhono</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
