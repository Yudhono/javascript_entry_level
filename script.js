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

function loadExercise(topic, level) {
  if (EXERCISES[topic] && EXERCISES[topic][level]) {
    // If Ace editor is initialized, use it, otherwise fallback to textarea
    if (window.editor && typeof window.editor.setValue === "function") {
      window.editor.setValue(EXERCISES[topic][level], -1);
      window.editor.focus();
    } else {
      const ta = document.getElementById("code");
      if (ta) ta.value = EXERCISES[topic][level];
    }
    // clear output when loading
    const out = document.getElementById("output");
    if (out) out.textContent = "";
  } else {
    console.warn("Exercise not found:", topic, level);
  }
}

function runCode() {
  let code = "";
  if (window.editor && typeof window.editor.getValue === "function") {
    code = window.editor.getValue();
  } else {
    const ta = document.getElementById("code");
    code = ta ? ta.value : "";
  }
  const outputDiv = document.getElementById("output");
  if (outputDiv) outputDiv.textContent = "";
  const originalLog = console.log;
  const originalError = console.error;
  let output = "";
  console.log = function (...args) {
    output += args.join(" ") + "\n";
  };
  console.error = function (...args) {
    output += "Error: " + args.join(" ") + "\n";
  };
  try {
    new Function(code)();
  } catch (e) {
    output += "Error: " + e.message + "\n";
  }
  if (outputDiv) outputDiv.textContent = output;
  console.log = originalLog;
  console.error = originalError;
}

function resetCode() {
  if (window.editor && typeof window.editor.setValue === "function") {
    window.editor.setValue(defaultCode, -1);
    window.editor.focus();
  } else {
    const ta = document.getElementById("code");
    if (ta) ta.value = defaultCode;
  }
}

// Initialize Monaco Editor via AMD loader. Falls back to textarea if Monaco not available.
function initMonaco() {
  if (!window.require) {
    console.warn("Monaco AMD loader not available");
    return;
  }
  // Configure base path for Monaco
  window.require.config({
    paths: { vs: "https://cdn.jsdelivr.net/npm/monaco-editor@0.39.0/min/vs" },
  });
  window.require(["vs/editor/editor.main"], function () {
    try {
      window.monacoEditor = monaco.editor.create(
        document.getElementById("editor"),
        {
          value: defaultCode,
          language: "javascript",
          theme: "vs-dark",
          automaticLayout: true,
          minimap: { enabled: false },
        }
      );

      // Map editor get/set functions used by other functions
      window.editor = {
        getValue: () => window.monacoEditor.getValue(),
        setValue: (v) => window.monacoEditor.setValue(v),
        focus: () => window.monacoEditor.focus(),
      };

      // Add run shortcut (Ctrl/Cmd + Enter)
      window.monacoEditor.addCommand(
        monaco.KeyMod.CtrlCmd | monaco.KeyCode.Enter,
        function () {
          runCode();
        }
      );

      const themeSelect = document.getElementById("themeSelect");
      if (themeSelect) {
        themeSelect.addEventListener("change", (e) => {
          try {
            monaco.editor.setTheme(e.target.value);
          } catch (err) {
            console.warn(err);
          }
        });
      }
    } catch (err) {
      console.error("Monaco init failed", err);
    }
  });
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initMonaco);
} else {
  initMonaco();
}
