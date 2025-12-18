import React from "react";
import Header from "../components/Header";
import dynamic from "next/dynamic";

// Dynamically import the editor component to avoid SSR issues
const JsEditor = dynamic(() => import("../components/JsEditor"), {
  ssr: false,
  loading: () => <div>Loading editor...</div>,
});

const JsPage: React.FC = () => {
  return (
    <div>
      <Header />
      <div className="main-container">
        <div className="content-wrapper">
          <div className="learning-section">
            <h1>Learn JavaScript</h1>
            <div className="subtitle">
              A beginner-friendly interactive playground to learn and practice
              JavaScript basics.
            </div>
            <div
              className="learning-path"
              style={{
                background: "#f4faff",
                borderLeft: "4px solid #4e9cff",
                padding: "18px 18px 8px 18px",
                marginBottom: "28px",
                borderRadius: "4px",
              }}
            >
              <h2 style={{ color: "#4e9cff", fontSize: "1.2em", marginTop: 0 }}>
                JavaScript Learning Path
              </h2>
              <ol style={{ marginLeft: "1em" }}>
                <li>
                  <b>Introduction & Setup</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    What is JavaScript? How to run JS in the browser.
                  </span>
                </li>
                <li>
                  <b>Variables & Data Types</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    let, const, var, strings, numbers, booleans.
                  </span>
                </li>
                <li>
                  <b>Operators & Expressions</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    +, -, *, /, %, =, ==, ===, and more.
                  </span>
                </li>
                <li>
                  <b>Control Flow</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    if, else, else if, switch.
                  </span>
                </li>
                <li>
                  <b>Loops</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    for, while, do...while.
                  </span>
                </li>
                <li>
                  <b>Functions</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    Declaring and calling functions, parameters, return values.
                  </span>
                </li>
                <li>
                  <b>Arrays & Objects</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    Basic array and object usage.
                  </span>
                </li>
                <li>
                  <b>
                    DOM Basics{" "}
                    <span style={{ fontSize: "0.9em", color: "#888" }}>
                      (optional)
                    </span>
                  </b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    How to change web pages with JavaScript.
                  </span>
                </li>
                <li>
                  <b>Practice Projects</b>
                  <br />
                  <span style={{ fontSize: "0.97em" }}>
                    Try making a calculator, to-do list, or your own ideas!
                  </span>
                </li>
              </ol>
              <div
                style={{ marginTop: "10px", fontSize: "0.97em", color: "#444" }}
              >
                Work through each step, try the examples, and experiment in the
                code editor below!
              </div>
              <div style={{ marginTop: "12px" }}>
                <a
                  href="/html-css"
                  style={{
                    display: "inline-block",
                    background: "#ff6b6b",
                    color: "#fff",
                    padding: "8px 12px",
                    borderRadius: "6px",
                    textDecoration: "none",
                    fontWeight: 600,
                  }}
                >
                  Learn HTML &amp; CSS
                </a>
                <span
                  style={{
                    marginLeft: "8px",
                    color: "#555",
                    fontSize: "0.95em",
                  }}
                >
                  New: interactive HTML &amp; CSS playground
                </span>
              </div>
            </div>
            <div
              className="examples-exercises"
              style={{ marginBottom: "28px" }}
            >
              <h2
                style={{
                  color: "#2d6cdf",
                  fontSize: "1.1em",
                  marginBottom: "10px",
                }}
              >
                Step-by-Step Examples & Exercises
              </h2>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>1. Introduction & Setup</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    // This is a comment\nconsole.log('JavaScript is running!');
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("intro", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Change the greeting message.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("intro", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Print current date/time.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("intro", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Prompt for name and greet.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>2. Variables & Data Types</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    let age = 15;\nconst name = "Alex";\nconsole.log(name + ' is
                    ' + age + ' years old.');
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("variables", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create a variable for your favorite color and print it.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("variables", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Swap two variables without a temporary variable.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("variables", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Parse a number from a string and add 10 to it.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>3. Operators & Expressions</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    let sum = 7 + 3;\nlet isEqual = (sum ===
                    10);\nconsole.log('Sum:', sum);\nconsole.log('Is sum 10?',
                    isEqual);
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("operators", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Use -, *, /, % and print results.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("operators", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Check if a number is even or odd and print result.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("operators", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Implement FizzBuzz up to 15 and log results.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>4. Control Flow</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    let score = 85;\nif (score &gt;= 80) {"{"}\n
                    console.log('Great job!');\n{"}"} else {"{"}\n
                    console.log('Keep practicing!');\n{"}"}
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("control", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Change the score and show messages.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("control", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Use switch to map a number (1-7) to a weekday name.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("control", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Determine whether a year is a leap year.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>5. Loops</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    for (let i = 1; i &lt;= 5; i++) &#123;\n
                    console.log('Number:', i);\n&#125;
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("loops", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Print even numbers from 2 to 10.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("loops", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Use while loop to count down from 10 to 1.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("loops", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Calculate factorial of 5 using a loop.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>6. Functions</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    function greet(name) {"{"}\n return 'Hello, ' + name +
                    '!';\n{"}"}\nconsole.log(greet('World'));
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("functions", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create a function that adds two numbers and returns the
                      result.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("functions", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Write a function that checks if a number is prime.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("functions", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Implement a recursive function to calculate Fibonacci
                      numbers.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>7. Arrays & Objects</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    let fruits = ['apple', 'banana',
                    'orange'];\nconsole.log('First fruit:', fruits[0]);\nlet
                    person = {"{"}name: 'Alex', age: 15{"}"}
                    ;\nconsole.log(person.name);
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("arrays", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create an array of numbers and print the sum.
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("arrays", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Use array methods (push, pop, shift, unshift) and log
                      results.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("arrays", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create an object with nested properties and access them.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>8. DOM Basics (optional)</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Example:</b>
                  <pre
                    style={{
                      background: "#f6f8fa",
                      padding: "10px",
                      borderRadius: "4px",
                    }}
                  >
                    // This only works in a real web page, not the code runner
                    above!\ndocument.body.style.background = '#ffe4e1';
                  </pre>
                  <b>Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("dom", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Change page background color (open console to test).
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("dom", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Create and append a new paragraph to the page.
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("dom", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — Toggle a CSS class on an element every second.
                    </div>
                  </div>
                </div>
              </details>
              <details style={{ marginBottom: "10px" }}>
                <summary>
                  <b>9. Practice Projects</b>
                </summary>
                <div style={{ margin: "10px 0 0 18px" }}>
                  <b>Ideas:</b>
                  <ul>
                    <li>
                      Make a simple calculator (add, subtract, multiply, divide
                      two numbers).
                    </li>
                    <li>
                      Build a to-do list (array of tasks, add/remove items).
                    </li>
                    <li>
                      Write a program that asks for a name and prints a
                      greeting.
                    </li>
                  </ul>
                  <b>Starter Exercises:</b>
                  <div className="exercise-controls">
                    <div className="exercise-level">
                      Easy:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("projects", "easy")
                        }
                      >
                        Load
                      </button>{" "}
                      — Small greeting app (prompt for name).
                    </div>
                    <div className="exercise-level">
                      Medium:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("projects", "medium")
                        }
                      >
                        Load
                      </button>{" "}
                      — Simple calculator function (two numbers, four
                      operations).
                    </div>
                    <div className="exercise-level">
                      Hard:{" "}
                      <button
                        className="exercise-btn"
                        onClick={() =>
                          (window as any).loadExercise("projects", "hard")
                        }
                      >
                        Load
                      </button>{" "}
                      — To-do list starter: add/remove items from an array and
                      log tasks.
                    </div>
                  </div>
                </div>
              </details>
            </div>
          </div>

          <JsEditor />
        </div>
      </div>
    </div>
  );
};

export default JsPage;
