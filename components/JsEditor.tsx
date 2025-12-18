"use client";

import React, { useEffect, useRef } from "react";

declare global {
  interface Window {
    monaco: any;
    require: any;
    editor: any;
    monacoEditor: any;
  }
}

const defaultCode = `// Try editing this code!\nconsole.log('Hello, world!');\n\n// You can do math:\nconsole.log(2 + 3 * 4);\n\n// Try making a variable:\nlet name = 'Student';\nconsole.log('Welcome, ' + name + '!');\n`;

// Exercises starters mapped by topic and difficulty
const EXERCISES = {
  intro: {
    easy: `// Easy: change greeting and run\nconsole.log('Hello from you!');`,
    medium: `// Medium: print current date/time\nconsole.log('Now:', new Date().toString());`,
    hard: `// Hard: prompt for name and greet (will work in browser console)\nconst name = prompt('What is your name?');\nconsole.log('Hello, ' + (name || 'friend') + '!');`,
  },
  variables: {
    easy: `// Easy: favorite color\nlet color = 'blue';\nconsole.log('My favorite color is', color);`,
    medium: `// Medium: swap two variables without temp\nlet a = 1, b = 2;\n[a, b] = [b, a];\nconsole.log('a =', a, 'b =', b);`,
    hard: `// Hard: parse number from string and add 10\nconst s = '42px';\nconst n = parseInt(s, 10);\nconsole.log(n + 10);`,
  },
  operators: {
    easy: `// Easy: operators demo\nconsole.log(10 - 3, 4 * 5, 20 / 4, 10 % 3);`,
    medium: `// Medium: even or odd\nfunction isEven(n) { return n % 2 === 0; }\nconsole.log('4 is even?', isEven(4));\nconsole.log('7 is even?', isEven(7));`,
    hard: `// Hard: FizzBuzz up to 15\nfor (let i = 1; i <= 15; i++) {\n  let out = '';\n  if (i % 3 === 0) out += 'Fizz';\n  if (i % 5 === 0) out += 'Buzz';\n  console.log(i + ':', out || i);\n}`,
  },
  control: {
    easy: `// Easy: score check\nlet score = 65;\nif (score >= 80) { console.log('Great job!'); } else { console.log('Keep practicing!'); }`,
    medium: `// Medium: number to weekday (1-7)\nfunction dayName(n) {\n  switch(n) {\n    case 1: return 'Monday';\n    case 2: return 'Tuesday';\n    case 3: return 'Wednesday';\n    case 4: return 'Thursday';\n    case 5: return 'Friday';\n    case 6: return 'Saturday';\n    case 7: return 'Sunday';\n    default: return 'Invalid';\n  }\n}\nconsole.log(dayName(3));`,
    hard: `// Hard: leap year check\nfunction isLeapYear(y) {\n  return (y % 4 === 0 && y % 100 !== 0) || (y % 400 === 0);\n}\nconsole.log('2000', isLeapYear(2000));\nconsole.log('1900', isLeapYear(1900));\nconsole.log('2024', isLeapYear(2024));`,
  },
  loops: {
    easy: `// Easy: even numbers 2..10\nfor (let i = 2; i <= 10; i += 2) console.log(i);`,
    medium: `// Medium: sum 1..20\nlet sum = 0;\nfor (let i = 1; i <= 20; i++) sum += i;\nconsole.log('Sum:', sum);`,
    hard: `// Hard: multiplication table for 7\nconst n = 7;\nfor (let i = 1; i <= 10; i++) console.log(n + ' x ' + i + ' = ' + (n * i));`,
  },
  functions: {
    easy: `// Easy: multiply two numbers and log\nfunction mul(a, b) { console.log(a * b); }\nmul(3, 4);`,
    medium: `// Medium: nth Fibonacci (iterative)\nfunction fib(n) { if (n <= 1) return n; let a = 0, b = 1; for (let i = 2; i <= n; i++) { [a, b] = [b, a + b]; } return b; }\nconsole.log(fib(8));`,
    hard: `// Hard: custom filter with callback\nfunction myFilter(arr, cb) { const out = []; for (let i = 0; i < arr.length; i++) if (cb(arr[i], i)) out.push(arr[i]); return out; }\nconsole.log(myFilter([1,2,3,4,5], x => x > 2));`,
  },
  arrays: {
    easy: `// Easy: three animals\nlet animals = ['cat','dog','rabbit'];\nconsole.log(animals[1]);`,
    medium: `// Medium: count occurrences\nfunction count(arr, val) { return arr.filter(x => x === val).length; }\nconsole.log(count([1,2,2,3,2], 2));`,
    hard: `// Hard: sort objects by age\nlet people = [{name:'A',age:30},{name:'B',age:22},{name:'C',age:25}];\npeople.sort((a,b) => a.age - b.age);\nconsole.log(people);`,
  },
  dom: {
    easy: `// Easy: change background (open in real page)\ndocument.body.style.background = '#fffbcc';\nconsole.log('Background changed');`,
    medium: `// Medium: create and append paragraph\nconst p = document.createElement('p');\np.textContent = 'Hello from JS!';\ndocument.body.appendChild(p);`,
    hard: `// Hard: toggle class every second\nconst el = document.body;\nsetInterval(() => { el.classList.toggle('highlight'); }, 1000);\nconsole.log('Toggling class on body every second');`,
  },
  projects: {
    easy: `// Projects Easy: prompt greeting\nconst name = prompt('Your name?');\nconsole.log('Hello, ' + (name || 'friend') + '!');`,
    medium: `// Projects Medium: simple calculator functions\nfunction add(a,b){return a+b;}\nfunction sub(a,b){return a-b;}\nfunction mul(a,b){return a*b;}\nfunction div(a,b){return a/b;}\nconsole.log('2+3=',add(2,3));`,
    hard: `// Projects Hard: todo list starter\nlet todos = [];\nfunction addTask(t){ todos.push(t); console.log('Added:', t); }\nfunction removeTask(i){ todos.splice(i,1); console.log('Removed index', i); }\naddTask('Buy milk');\naddTask('Walk dog');\nconsole.log(todos);`,
  },
};

const JsEditor: React.FC = () => {
  const editorRef = useRef<HTMLDivElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const loadMonaco = () => {
      if (window.monaco) {
        initMonaco();
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
          initMonaco();
        });
      };
      document.head.appendChild(script);
    };

    const initMonaco = () => {
      if (!editorRef.current) return;

      try {
        window.monacoEditor = window.monaco.editor.create(editorRef.current, {
          value: defaultCode,
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true,
          minimap: { enabled: false },
        });

        window.editor = {
          getValue: () => window.monacoEditor.getValue(),
          setValue: (v: string) => window.monacoEditor.setValue(v),
          focus: () => window.monacoEditor.focus(),
        };

        window.monacoEditor.addCommand(
          window.monaco.KeyMod.CtrlCmd | window.monaco.KeyCode.Enter,
          () => runCode()
        );

        const themeSelect = document.getElementById("themeSelect");
        if (themeSelect) {
          themeSelect.addEventListener("change", (e: any) => {
            try {
              window.monaco.editor.setTheme(e.target.value);
            } catch (err) {
              console.warn(err);
            }
          });
        }
      } catch (err) {
        console.error("Monaco init failed", err);
      }
    };

    const runCode = () => {
      let code = "";
      if (window.editor && typeof window.editor.getValue === "function") {
        code = window.editor.getValue();
      }

      if (outputRef.current) outputRef.current.textContent = "";

      const originalLog = console.log;
      const originalError = console.error;
      let output = "";

      console.log = (...args: any[]) => {
        output += args.join(" ") + "\n";
      };

      console.error = (...args: any[]) => {
        output += "Error: " + args.join(" ") + "\n";
      };

      try {
        new Function(code)();
      } catch (e: any) {
        output += "Error: " + e.message + "\n";
      }

      if (outputRef.current) outputRef.current.textContent = output;

      console.log = originalLog;
      console.error = originalError;
    };

    const resetCode = () => {
      if (window.editor && typeof window.editor.setValue === "function") {
        window.editor.setValue(defaultCode);
        window.editor.focus();
      }
    };

    // Expose functions
    (window as any).runCode = runCode;
    (window as any).resetCode = resetCode;
    (window as any).loadExercise = (topic: string, level: string) => {
      const exercise =
        EXERCISES[topic as keyof typeof EXERCISES]?.[
          level as keyof (typeof EXERCISES)[keyof typeof EXERCISES]
        ];
      if (
        exercise &&
        window.editor &&
        typeof window.editor.setValue === "function"
      ) {
        window.editor.setValue(exercise);
        window.editor.focus();
        if (outputRef.current) outputRef.current.textContent = "";
      }
    };

    loadMonaco();

    return () => {
      if (window.monacoEditor) {
        window.monacoEditor.dispose();
      }
    };
  }, []);

  return (
    <div className="editor-section">
      <div className="instructions">
        <p>
          Welcome! Edit the JavaScript code below and click <b>Run Code</b> to
          see the result. Try changing the code and experiment to learn how
          JavaScript works!
        </p>
        <ul>
          <li>
            Use <code>console.log()</code> to print output.
          </li>
          <li>Try math, variables, functions, and more.</li>
          <li>Errors will also show in the output area.</li>
        </ul>
      </div>
      <div className="editor-label">
        JavaScript Editor{" "}
        <span className="kbd-hint">(Press Ctrl/Cmd + Enter to run)</span>
      </div>
      <div className="editor-toolbar">
        <div className="editor-theme">
          Theme:
          <select id="themeSelect">
            <option value="vs-dark">Dark (vs-dark)</option>
            <option value="vs">Light (vs)</option>
            <option value="hc-black">High Contrast</option>
          </select>
        </div>
      </div>
      <div
        ref={editorRef}
        style={{ height: "400px", border: "1px solid #ccc" }}
      ></div>
      <div className="editor-actions">
        <button className="run-btn" onClick={() => (window as any).runCode()}>
          Run Code ▶
        </button>
        <button
          className="reset-btn"
          onClick={() => (window as any).resetCode()}
        >
          Reset
        </button>
      </div>
      <div className="output-label">Output:</div>
      <div
        ref={outputRef}
        id="output"
        style={{
          background: "#f6f8fa",
          padding: "10px",
          border: "1px solid #e1e5e9",
          borderRadius: "4px",
          minHeight: "100px",
          whiteSpace: "pre-wrap",
          fontFamily: "monospace",
        }}
      ></div>
    </div>
  );
};

export default JsEditor;
