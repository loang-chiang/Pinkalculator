document.addEventListener('DOMContentLoaded', function() {

    // when the user clicks on a number
    document.querySelectorAll(".number").forEach(btn => {
        btn.onclick = function() {
            if (secondNum === false) {
                number(btn, 1);
            }
            else {
                number(btn, 2);
            }
        }
    })

    // when the user types using their keyboard 
    document.addEventListener('keydown', function(event) {
        let numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
        let symbols = ["%", "/", "*", "-", "+"];
        let key = event.key;

        if (numbers.includes(key)) {  // when the user is typing a number
            if (secondNum === false) {
                number(key, 1);
            }
            else {
                number(key, 2);
            }
        }
        else if (symbols.includes(key)) {  // same as clicking the symbol buttons
            operate(key);
        }
        else if (key === "Backspace") {  // does the same as AC
            clear();
        }
        else if (key === "Enter") {  // does the same as =
            if (num[1] !== "" && num[2] !== "") {  // checks that there are numbers to operate with
                equals("equals");
            }
        }
    });

    // when the user clicks on an operation button
    document.querySelectorAll(".symbol").forEach(btn => {
        btn.onclick = function() {
            operate(btn);
        }
    })

    // when the user clicks on equals button 
    document.querySelector("#bEquals").onclick = function() {
        if (num[1] !== "" && num[2] !== "") {  // checks that there are numbers to operate with
            equals("equals");
        }
    };

    // when the user clicks on AC, clears the screen
    document.querySelector("#bAC").onclick = clear;

    // when the user changes number sign from positive to negative and viceversa
    document.querySelector("#bSign").onclick = function() {
        if (!secondNum) {
            changeSigns(1);
        }
        else {
            changeSigns(2);
        }  
    }

})


// this is where my variables go
    // when we move on to the second number
    let secondNum = false;

    let digitCount = {1: 0, 2: 0};
    let periodCount = {1: 0, 2: 0};
    let num = {1: "", 2: ""};

    // current operation being performed
    let operation = "";

    let screen = document.querySelector("#screen");


function number(btnOrKey, number) {
    let value;
    try {
        value = btnOrKey.dataset.num;
        console.log(`Adding btn ${value} to number ${number}`);
    }
    catch(err) {
        value = btnOrKey;
        console.log(`Adding key ${value} to number ${number}`);
    }

    digitCount[number] += 1;
    // if there's room in the screen and this isn't a second period
    if (digitCount[number] < 14 && !(periodCount[number] !== 0 && value === ".")) {
        num[number] += value;
        screen.innerHTML = num[number];
        // if the user clicks on the period for the first time
        if (value === ".") {
            periodCount[number] += 1;
        }
    }
}


function operate(btnOrKey) {
    let value;
    try {
        value = btnOrKey.dataset.val;
    }
    catch(err) {
        value = btnOrKey;
    }
    console.log(`Calling operation with symbol ${value}`);

    if (num[1] !== "" && num[2] !== "") {  // checks that there are numbers to operate with
        if (operation !== "") {  // completes the operation if user wants to operate for a second time
            equals("operation");
            operation = value;
        }
    }
    else {
        operation = value;
        secondNum = true;
    }
}


function changeSigns(number) {
    console.log(`Changing signs for number ${number}`);

    if (num[number][0] === "-") {  // if the number is already negative
        num[number] = num[number].slice(1);  // deletes minus sign
    }
    else {
        num[number] = "-" + num[number];  // adds minus sign
    }
    screen.innerHTML = num[number];
}


function equals(type) {  // type can be 'equals' for the equal sign and 'operation' for other symbols
    console.log(`Running equals function! ${num[1]} ${operation} ${num[2]}`);

    // performs operations
    if (operation === "%") {
        num[1] = parseFloat(num[1]) % parseFloat(num[2]);
    }
    else if (operation === "/") {
        num[1] = parseFloat(num[1]) / parseFloat(num[2]);
    }
    else if (operation === "*") {
        num[1] = parseFloat(num[1]) * parseFloat(num[2]);
    }
    else if (operation === "-") {
        num[1] = parseFloat(num[1]) - parseFloat(num[2]);
    }
    else if (operation === "+") {
        num[1] = parseFloat(num[1]) + parseFloat(num[2]);
    }

    // resets data
    digitCount[2] = 0;
    periodCount[2] = 0;
    num[2] = "";
    operation = "";

    if (type === "equals") {  // if equals, we are on the first number again
        secondNum = false;
    }

    if (num[1] === Infinity) {  // if the user is trying to divide by 0
        screen.innerHTML = "silly";
    }
    else {
        if (num[1].toString().length > 14) {  // if the number is too big for the screen
            screen.innerHTML = num[1].toPrecision(9);
        }
        else {
            screen.innerHTML = num[1];
        }
    }
}


// clears the screen and all the variables
function clear() {
    digitCount[1] = 0;
    digitCount[2] = 0;
    periodCount[1] = 0;
    periodCount[2] = 0;
    num[1] = "";
    num[2] = "";
    secondNum = false;
    screen.innerHTML = num[1];
}