document.getElementById("bank-amnt").innerHTML = 1000; // Total money in bank
document.getElementById("deal-amnt").innerHTML = "$" + 0; // Total amount being bet
document.getElementById("betting-amnt").innerHTML = 0; // Bet amount that's added to deal amount
var amount = 0; // For number value
var bet = 0; // For number value
var currentBet = 0; // For winning bet multiplier

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

// Pending bet
function setBetAmnt(x) {
    amount += x;
    document.getElementById("betting-amnt").innerHTML = amount;

}

// Bet for current game
function deal() {
    bet += amount;
    currentBet += amount;
    document.getElementById("deal-amnt").innerHTML = "$" + bet;
    document.getElementById("betting-amnt").innerHTML = 0;


    if (amount > 0) {
        document.getElementById("hit").disabled = false;
        document.getElementById("stand").disabled = false;
    }
    amount = 0;
    pauseBet(true);
}

function wonBet() {
    let bankTotal = document.getElementById("bank-amnt").innerHTML;
    currentBet *= 1.5;
    currentBet += +bankTotal;
    document.getElementById("bank-amnt").innerHTML = Math.round(currentBet);
    document.getElementById("betting-amnt").innerHTML = 0;
    document.getElementById("deal-amnt").innerHTML = "$" + 0;
    currentBet = 0;
    bet = 0;
}

function lostBet() {
    document.getElementById("betting-amnt").innerHTML = 0;
    document.getElementById("deal-amnt").innerHTML = "$" + 0;
    bet = 0;
    currentBet = 0;
}

var betboard = document.getElementsByClassName("betboard");

function pauseBet(x) {
    for (var i = 0; i < betboard.length; i++) {
        betboard[i].disabled = x;
    }
}