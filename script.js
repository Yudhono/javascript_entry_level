const defaultCode = `// Try editing this code!\nconsole.log('Hello, world!');\n\n// You can do math:\nconsole.log(2 + 3 * 4);\n\n// Try making a variable:\nlet name = 'Student';\nconsole.log('Welcome, ' + name + '!');\n`;

function runCode() {
  const code = document.getElementById("code").value;
  const outputDiv = document.getElementById("output");
  outputDiv.textContent = "";
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
  outputDiv.textContent = output;
  console.log = originalLog;
  console.error = originalError;
}

function resetCode() {
  document.getElementById("code").value = defaultCode;
}
