var calNum = 0;
var calType = "";

var init = function () {
    var buttons = document.getElementsByClassName("num");
    for (let i = 0; i < buttons.length; i++) {
        buttons[i].addEventListener("click", dispp, false);
    }

    var calcs = document.getElementsByClassName("calc");
    for (let i = 0; i < calcs.length; i++) {
        calcs[i].addEventListener("click", calc, false);
    }

    document.getElementById("clear").addEventListener("click", clear, false);

}

var dispp = function (ev) {
    let hyouji = document.getElementById("hyouji");
    if (calType) {
        hyouji.value = "";
    }
    if (hyouji.value == "0") {
        hyouji.value = ev.target.value;
    } else {
        hyouji.value = hyouji.value + ev.target.value;
    }
}

var calc = function (ev) {
    let dispNum = document.getElementById("hyouji");

    switch (calType) {
        case "-":
            calNum = Number(calNum) - Number(dispNum.value);
            dispNum.value = calNum;
            break;
        case "+":
            calNum = Number(calNum) + Number(dispNum.value);
            dispNum.value = calNum;
            break;
        case "=":
        case "":
            calNum = dispNum.value;
            break;
    }
    calType = ev.target.value;
}

var clear = function () {
    document.getElementById("hyouji").value = 0;
    calNum = 0;
}

this.addEventListener("load", init, false);
