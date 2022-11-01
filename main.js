let firstNumber = '';
let secondNumber = '';
let sign = '';
let result = false;

let output = document.querySelector("th");

let allDiv = document.querySelectorAll("div");

let resetBtn = document.querySelector("#reset");
let reverseBtn = document.querySelector("#reverse");
let percentBtn = document.querySelector("#percent");
let equalBtn = document.querySelector("#equal");

// -- Add events for buttons -- //
resetBtn.onclick = clearAll;                                // Reset values
equalBtn.onclick = calculate;                               // Calculate all values 
reverseBtn.onclick = function () {                          // Change number on "-num" or "+num"
    if (firstNumber || secondNumber) {
        let number = output.innerText;
        number > 0 ? number *= -1 : number = Math.abs(number);
        !sign ? firstNumber *= -1 : secondNumber = Math.abs(secondNumber);
        console.log(firstNumber + " " + secondNumber);
        output.innerText = number;
    } else {
        error();
    }
};
percentBtn.onclick = function () {                          // Percent %
    if (firstNumber && secondNumber) {
        firstNumber = Number(firstNumber);
        secondNumber = Number(secondNumber);

        secondNumber = firstNumber / 100 * secondNumber;
        calculate();
    } else {
        error();
    }
};
window.addEventListener("load", function () {
    for (const div of allDiv) {
        let innerSign = div.innerText;
        if ((/[\d.]/.test(innerSign))) {                    // Numbers: "0-9", "."
            div.onclick = function () {
                if (result) clearAll();

                if (!sign) {
                    firstNumber += this.innerText;
                    output.innerText += this.innerText;

                    console.log("firstNumber: " + firstNumber);
                } else if (sign) {
                    if (sign == output.innerText) output.innerText = "";
                    secondNumber += this.innerText;
                    output.innerText += this.innerText;

                    console.log("secondNumber: " + secondNumber);
                } else {
                    console.log("Other firstNumber: " + firstNumber);
                    console.log("Other secondNumber: " + secondNumber);
                }
            }
        } else if ((/^[/\+\-X]$/.test(innerSign))) {        // Signs: "/", "X", "-", "+". 
            div.onclick = function () {
                if (firstNumber) {
                    sign = this.innerText;
                    output.innerText = sign;

                    console.log("sign: " + sign);
                } else {
                    error();
                }
            }
        } else {
            console.log("Other innerSign: " + innerSign);
        }
    }
});                                                         
// -- End Add events -- //

function clearAll() {                                       // Clear all values
    firstNumber = '';
    secondNumber = '';
    sign = '';
    output.innerText = '';
    result = false;

    console.log("Clear All");
};

function calculate() {                                      // Calculate values of two numbers
    firstNumber = Number(firstNumber);
    secondNumber = Number(secondNumber);
    switch (sign) {
        case "/":
            output.innerText = firstNumber / secondNumber;
            break;
        case "X":
            output.innerText = firstNumber * secondNumber;
            break;
        case "-":
            output.innerText = firstNumber - secondNumber;
            break;
        case "+":
            output.innerText = firstNumber + secondNumber;
            break;

        default:
            error();
            console.log(sign);
            break;
    }
    console.log(firstNumber);
    console.log(sign);
    console.log(secondNumber);

    firstNumber = output.innerText;
    console.log(firstNumber);

    sign = "";
    secondNumber = "";

    result = true;
};

function error() {                                          // Message Error :)
    output.innerText = "Error";
    setTimeout(function () { clearAll() }, 2000);
}