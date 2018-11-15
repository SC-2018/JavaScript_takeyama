var calcNumber = "";
var calcType = "";
var previousOpeIsCalc = false;

this.addEventListener("load", init, false);

function init() {
    var numberButtons = document.getElementsByClassName("num");
    for (let i = 0; i < numberButtons.length; i++) {
        numberButtons[i].addEventListener("click", dispNumber, false);
    }

    var calcButtons = document.getElementsByClassName("calc");
    for (let i = 0; i < calcButtons.length; i++) {
        calcButtons[i].addEventListener("click", calculate, false);
    }
    document.getElementById("sign").addEventListener("click", dispSign, false);
    document.getElementById("deleteOneNum").addEventListener("click", deleteOneNumber, false);
    document.getElementById("clear").addEventListener("click", clearNumberDisp, false);
}

function dispNumber(ev) {
    let numberDispArea = document.getElementById("numberDispArea");
    if (previousOpeIsCalc) {
        previousOpeIsCalc = false;
        numberDispArea.value = "";
    }
    if (numberDispArea.value == "0" && ev.target.value != ".") {
        numberDispArea.value = ev.target.value;
    } else {
        numberDispArea.value = numberDispArea.value + ev.target.value;
    }
}

function calculate(ev) {
    let numberDispArea = document.getElementById("numberDispArea");
    switch (calcType) {
        case "-":
            calcNumber = Number(calcNumber) - Number(numberDispArea.value);
            numberDispArea.value = calcNumber;
            break;
        case "+":
            calcNumber = Number(calcNumber) + Number(numberDispArea.value);
            numberDispArea.value = calcNumber;
            break;
        case "÷":
            calcNumber = Number(calcNumber) / Number(numberDispArea.value);
            numberDispArea.value = calcNumber;
            break;
        case "×":
            calcNumber = Number(calcNumber) * Number(numberDispArea.value);
            numberDispArea.value = calcNumber;
            break;
        case "=":
        case "":
            calcNumber = numberDispArea.value;
            break;
    }
    previousOpeIsCalc = true;
    calcType = ev.target.value;
}

function clearNumberDisp() {
    document.getElementById("numberDispArea").value = "";
    calcNumber = "";
}

function deleteOneNumber() {
    let numberDispArea = document.getElementById("numberDispArea");
    let arrayDispNumber = numberDispArea.value.split("");
    if (arrayDispNumber.length > 1) {
        arrayDispNumber.pop();
        if (arrayDispNumber.join("") == "-" || arrayDispNumber.join("") == "+") {
            numberDispArea.value = ""
        } else {
            numberDispArea.value = arrayDispNumber.join("");
        }
    } else {
        numberDispArea.value = ""
    }
}

function dispSign() {
    let numberDispArea = document.getElementById("numberDispArea");
    if (numberDispArea.value != "") {
        let arrayDispNumber = numberDispArea.value.split("");
        if (arrayDispNumber[0] == "-") {
            arrayDispNumber[0] = "+";
        } else if (arrayDispNumber[0] == "+") {
            arrayDispNumber[0] = "-";
        } else {
            arrayDispNumber.unshift("-")
        }
        numberDispArea.value = arrayDispNumber.join("");
    }
}
