// Real-time clock
function startTime() {
    const now = new Date();
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    document.getElementById('time').textContent = `${hours}:${minutes}:${seconds}`;
    setTimeout(startTime, 1000);
}

// Global expression variable
let expression = "";

// Append input to the expression and update the screen
function press(value) {
    expression += value;
    document.getElementById('screen').value = expression;
}

// Clear the calculator screen
function clearScreen() {
    expression = "";
    document.getElementById('screen').value = "";
}

// Remove the last character from the expression
function backspace() {
    expression = expression.slice(0, -1);
    document.getElementById('screen').value = expression;
}

// Convert degrees to radians
function toRadians(degrees) {
    return degrees * (Math.PI / 180);
}

// Convert radians to degrees
function toDegrees(radians) {
    return radians * (180 / Math.PI);
}

// Evaluate trigonometric functions in degrees
function evaluateTrig(func, value) {
    const radianValue = toRadians(value);
    switch (func) {
        case 'sin': return Math.sin(radianValue);
        case 'cos': return Math.cos(radianValue);
        case 'tan': return Math.tan(radianValue);
        case 'sec': return 1 / Math.cos(radianValue);  // sec = 1/cos
        case 'cosec': return 1 / Math.sin(radianValue);  // cosec = 1/sin
        case 'cot': return 1 / Math.tan(radianValue);  // cot = 1/tan
        default: throw new Error(`Unknown trigonometric function: ${func}`);
    }
}

// Factorial calculation
function factorial(n) {
    if (n < 0) throw new Error("Factorial is undefined for negative numbers");
    if (n === 0 || n === 1) return 1;
    let fact = 1;
    for (let i = 2; i <= n; i++) {
        fact *= i;
    }
    return fact;
}

// Evaluate mathematical functions
function evaluateMathFunction(func, value) {
    switch (func) {
        case 'sqrt': return Math.sqrt(value);
        case 'cbrt': return Math.cbrt(value);
        case 'log': return Math.log(value); // Natural logarithm
        case 'log10': return Math.log10(value);
        case 'abs': return Math.abs(value);
        case 'exp': return Math.exp(value);
        case 'fact': return factorial(value);
        default: throw new Error(`Unknown mathematical function: ${func}`);
    }
}

// Replace functions and calculate the result
function calculate() {
    try {
        let sanitizedExpression = expression
            .replace(/sin\((.*?)\)/g, (_, x) => evaluateTrig('sin', x))
            .replace(/cos\((.*?)\)/g, (_, x) => evaluateTrig('cos', x))
            .replace(/tan\((.*?)\)/g, (_, x) => evaluateTrig('tan', x))
            .replace(/sec\((.*?)\)/g, (_, x) => evaluateTrig('sec', x))
            .replace(/cosec\((.*?)\)/g, (_, x) => evaluateTrig('cosec', x))
            .replace(/cot\((.*?)\)/g, (_, x) => evaluateTrig('cot', x))
            .replace(/sqrt\((.*?)\)/g, (_, x) => evaluateMathFunction('sqrt', parseFloat(x)))
            .replace(/cbrt\((.*?)\)/g, (_, x) => evaluateMathFunction('cbrt', parseFloat(x)))
            .replace(/log10\((.*?)\)/g, (_, x) => evaluateMathFunction('log10', parseFloat(x)))
            .replace(/log\((.*?)\)/g, (_, x) => evaluateMathFunction('log', parseFloat(x)))
            .replace(/abs\((.*?)\)/g, (_, x) => evaluateMathFunction('abs', parseFloat(x)))
            .replace(/exp\((.*?)\)/g, (_, x) => evaluateMathFunction('exp', parseFloat(x)))
            .replace(/fact\((.*?)\)/g, (_, x) => evaluateMathFunction('fact', parseInt(x)))
            .replace(/\^/g, '**'); // Replace ^ with ** for exponentiation

        const result = eval(sanitizedExpression); // Final evaluation of sanitized expression
        if (isNaN(result) || result === Infinity || result === -Infinity) {
            throw new Error("Math Error");
        }

        // Update the display with the result
        expression = result.toString();
        document.getElementById('screen').value = result;
    } catch (error) {
        document.getElementById('screen').value = "Error";
        expression = "";
    }
}

// Add keyboard support for input
document.addEventListener('keydown', function (event) {
    const key = event.key;
    if (!isNaN(key) || "+-*/().".includes(key)) {
        press(key);
    } else if (key === "Enter") {
        calculate();
    } else if (key === "Backspace") {
        backspace();
    }
});
