document.getElementById("equationDegree").addEventListener("change", function() {
    document.getElementById("linearSection").style.display = "none";
    document.getElementById("quadraticSection").style.display = "none";
    document.getElementById("cubicSection").style.display = "none";
    const degree = this.value;
    if (degree === "linear") {
        document.getElementById("linearSection").style.display = "block";
    } else if (degree === "quadratic") {
        document.getElementById("quadraticSection").style.display = "block";
    } else if (degree === "cubic") {
        document.getElementById("cubicSection").style.display = "block";
    }
});

document.getElementById("numVariables").addEventListener("change", function() {
    const numVars = this.value;
    let inputsHtml = "";
    for (let i = 1; i <= numVars; i++) {
        if (numVars == 1) {
            inputsHtml += `
                <h3>Equation ${i}</h3>
                <input type="number" id="a${i}" class="input" placeholder="Enter value for a${i}">
                <input type="number" id="b${i}" class="input" placeholder="Enter value for b${i}">
            `;
        } else if (numVars == 2) {
            inputsHtml += `
                <h3>Equation ${i}</h3>
                <input type="number" id="a${i}" class="input" placeholder="Enter value for a${i}">
                <input type="number" id="b${i}" class="input" placeholder="Enter value for b${i}">
                <input type="number" id="c${i}" class="input" placeholder="Enter value for c${i}">
            `;
        } else if (numVars == 3) {
            inputsHtml += `
                <h3>Equation ${i}</h3>
                <input type="number" id="a${i}" class="input" placeholder="Enter value for a${i}">
                <input type="number" id="b${i}" class="input" placeholder="Enter value for b${i}">
                <input type="number" id="c${i}" class="input" placeholder="Enter value for c${i}">
                <input type="number" id="d${i}" class="input" placeholder="Enter value for d${i}">
            `;
        }
    }
    document.getElementById("linearInputs").innerHTML = inputsHtml;
});

function solveLinear() {
    const numVars = document.getElementById("numVariables").value;
    let result = "";

    if (numVars == 1) {
        const a1 = parseFloat(document.getElementById('a1').value);
        const b1 = parseFloat(document.getElementById('b1').value);
        if (a1 === 0) {
            result = (b1 === 0) ? "Infinite solutions" : "No solutions";
        } else {
            result = `Root is: ${-b1 / a1}`;
        }
    } else if (numVars == 2) {
        const a1 = parseFloat(document.getElementById('a1').value);
        const b1 = parseFloat(document.getElementById('b1').value);
        const c1 = parseFloat(document.getElementById('c1').value);
        const a2 = parseFloat(document.getElementById('a2').value);
        const b2 = parseFloat(document.getElementById('b2').value);
        const c2 = parseFloat(document.getElementById('c2').value);
        const determinant = a1 * b2 - a2 * b1;
        if (determinant === 0) {
            result = "No unique solution";
        } else {
            const x = (c1 * b2 - c2 * b1) / determinant;
            const y = (a1 * c2 - a2 * c1) / determinant;
            result = `Roots are: x = ${x}, y = ${y}`;
        }
    } else if (numVars == 3) {
        const a1 = parseFloat(document.getElementById('a1').value);
        const b1 = parseFloat(document.getElementById('b1').value);
        const c1 = parseFloat(document.getElementById('c1').value);
        const d1 = parseFloat(document.getElementById('d1').value);
        const a2 = parseFloat(document.getElementById('a2').value);
        const b2 = parseFloat(document.getElementById('b2').value);
        const c2 = parseFloat(document.getElementById('c2').value);
        const d2 = parseFloat(document.getElementById('d2').value);
        const a3 = parseFloat(document.getElementById('a3').value);
        const b3 = parseFloat(document.getElementById('b3').value);
        const c3 = parseFloat(document.getElementById('c3').value);
        const d3 = parseFloat(document.getElementById('d3').value);
        const determinant = a1 * (b2 * c3 - b3 * c2) - b1 * (a2 * c3 - a3 * c2) + c1 * (a2 * b3 - a3 * b2);
        if (determinant === 0) {
            result = "No unique solution";
        } else {
            const x = (d1 * (b2 * c3 - b3 * c2) - b1 * (d2 * c3 - d3 * c2) + c1 * (d2 * b3 - d3 * b2)) / determinant;
            const y = (a1 * (d2 * c3 - d3 * c2) - d1 * (a2 * c3 - a3 * c2) + c1 * (a2 * d3 - a3 * d2)) / determinant;
            const z = (a1 * (b2 * d3 - b3 * d2) - b1 * (a2 * d3 - a3 * d2) + d1 * (a2 * b3 - a3 * b2)) / determinant;
            result = `Roots are: x = ${x}, y = ${y}, z = ${z}`;
        }
    }

    document.getElementById("linearResult").innerText = `Result: ${result}`;
}

function solveQuadratic() {
    const a = parseFloat(document.getElementById('qa').value);
    const b = parseFloat(document.getElementById('qb').value);
    const c = parseFloat(document.getElementById('qc').value);
    const discriminant = b * b - 4 * a * c;
    let result;
    if (discriminant > 0) {
        const root1 = (-b + Math.sqrt(discriminant)) / (2 * a);
        const root2 = (-b - Math.sqrt(discriminant)) / (2 * a);
        result = `Roots are: ${root1} and ${root2}`;
    } else if (discriminant === 0) {
        const root = -b / (2 * a);
        result = `Root is: ${root}`;
    } else {
        const realPart = -b / (2 * a);
        const imaginaryPart = Math.sqrt(-discriminant) / (2 * a);
        result = `Roots are: ${realPart} + ${imaginaryPart}i and ${realPart} - ${imaginaryPart}i`;
    }
    document.getElementById("quadraticResult").innerText = `Result: ${result}`;
}

function solveCubic() {
    const a = parseFloat(document.getElementById('ca').value);
    const b = parseFloat(document.getElementById('cb').value);
    const c = parseFloat(document.getElementById('cc').value);
    const d = parseFloat(document.getElementById('cd').value);

    if (isNaN(a) || isNaN(b) || isNaN(c) || isNaN(d)) {
        document.getElementById('cubicResult').innerText = 'Please enter valid coefficients.';
        return;
    }

    // Calculate discriminant and other necessary components for solving cubic equations
    const f = ((3 * c / a) - ((b * b) / (a * a))) / 3;
    const g = ((2 * (b * b * b) / (a * a * a)) - (9 * b * c / (a * a)) + (27 * d / a)) / 27;
    const h = ((g * g) / 4) + ((f * f * f) / 27);

    let result;
    if (h > 0) {
        const R = -(g / 2) + Math.sqrt(h);
        const S = Math.cbrt(R);
        const T = -(g / 2) - Math.sqrt(h);
        const U = Math.cbrt(T);

        const root1 = (S + U) - (b / (3 * a));
        result = `One real root: ${root1}`;
    } else if (f === 0 && g === 0 && h === 0) {
        const root = -Math.cbrt(d / a);
        result = `All roots are real and equal: ${root}`;
    } else if (h <= 0) {
        const i = Math.sqrt(((g * g) / 4) - h);
        const j = Math.cbrt(i);
        const k = Math.acos(-(g / (2 * i)));
        const L = -j;
        const M = Math.cos(k / 3);
        const N = Math.sqrt(3) * Math.sin(k / 3);
        const P = -(b / (3 * a));

        const root1 = 2 * j * Math.cos(k / 3) - (b / (3 * a));
        const root2Real = L * (M + N) + P;
        const root2Imaginary = L * (M - N) + P;

        if (h === 0) {
            result = `One real root: ${root1}, and two complex roots: ${root2Real} ± ${root2Imaginary}i`;
        } else {
            result = `Three real roots: ${root1}, ${root2Real}, ${root2Imaginary}`;
        }
    }

    document.getElementById('cubicResult').innerText = result;
}