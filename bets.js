document.getElementById("bank-amnt").innerHTML = 1000; // Total money in bank
document.getElementById("total-bet-amnt").innerHTML = "$" + 0; // Total amount being bet
document.getElementById("betting-amnt").innerHTML = 0; // Bet amount that's added to total
var amount = 0;
var bet = 0;
var currentBet = 0; // For win/lose multiplier

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
    document.getElementById("total-bet-amnt").innerHTML = "$" + bet;
    document.getElementById("betting-amnt").innerHTML = 0;
    amount = 0;

}

function wonBet() {
    currentBet *= 1.5;
}

function lostBet() {
    document.getElementById("bank-amnt").innerHTML = 0;

}