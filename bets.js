document.getElementById("bank-amnt").innerHTML = 1000; // Total money in bank
document.getElementById("bet-amnt").innerHTML = "$" + 0; // Current money being bet
var amount = 0; // Initialize to integer

function addOne() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x - 1 >= 0) {
        document.getElementById("bank-amnt").innerHTML -= 1;
        setBetAmnt(1);

    }
}

function addFive() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x - 5 >= 0) {
        document.getElementById("bank-amnt").innerHTML -= 5;
        setBetAmnt(5);
    }
}

function addTwentyfive() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x - 25 >= 0) {
        document.getElementById("bank-amnt").innerHTML -= 25;
        setBetAmnt(25);
    }
}

function addFifty() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x - 50 >= 0) {
        document.getElementById("bank-amnt").innerHTML -= 50;
        setBetAmnt(50);
    }
}

function addHundred() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x - 100 >= 0) {
        document.getElementById("bank-amnt").innerHTML -= 100;
        setBetAmnt(100);
    }
}

function addFivehundred() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x - 500 >= 0) {
        document.getElementById("bank-amnt").innerHTML -= 500;
        setBetAmnt(500);
    }
}

function addThousand() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x - 1000 >= 0) {
        document.getElementById("bank-amnt").innerHTML -= 1000;
        setBetAmnt(1000);
    }
}

function allIn() {
    var x = document.getElementById("bank-amnt").innerHTML;
    if (x > 0) {
        document.getElementById("bank-amnt").innerHTML -= x;
        setBetAmnt(+x);
    }
}

function setBetAmnt(x) {
    amount += x;
    document.getElementById("bet-amnt").innerHTML = "$" + amount;
}