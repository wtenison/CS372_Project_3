//document.getElementById("hit").disabled = false;
//document.getElementById("stand").disabled = false;
//Above are for Firefox, if using location.reload() to implement "FIGHT AGAIN"

var counter = 0; // Dealing times
var winner = ""; // Winner: player1 - computer /player2 - player
var hasStood = false; // Mark if the player chose stand

// All cards
var cards = [
"club01", "club02", "club03", "club04", "club05", "club06", "club07", 
"club08", "club09", "club10", "club11", "club12", "club13", "diamond01", 
"diamond02", "diamond03", "diamond04", "diamond05", "diamond06", "diamond07",
"diamond08", "diamond09", "diamond10", "diamond11", "diamond12", "diamond13", 
"heart01", "heart02", "heart03", "heart04", "heart05", "heart06", "heart07", 
"heart08", "heart09", "heart10", "heart11", "heart12", "heart13", 
"spade01", "spade02", "spade03", "spade04", "spade05", "spade06", "spade07", 
"spade08", "spade09", "spade10", "spade11", "spade12", "spade13"];

// Get random number
var getRand = function (begin, end) {
    return Math.floor(Math.random() * (end - begin)) + begin;
}

// Shuffle the deck
var rand, tmp;
for (var i = 0; i < 1000; i++) {
    rand = getRand(1, 52);
    tmp = cards[0];
    cards[0] = cards[rand];
    cards[rand] = tmp;
}

// Player's cards
var cards1 = [getNewCard(), getNewCard()];
var cards2 = [getNewCard(), getNewCard()];

var table = document.getElementById("tableboard");
table.rows[1].cells[1].innerHTML = "<img src=\"resource\\cardback.png\" />";
table.rows[1].cells[2].innerHTML = "<img src=\"resource\\" + cards1[1] + ".jpg\" />";
table.rows[3].cells[1].innerHTML = "<img src=\"resource\\" + cards2[0] + ".jpg\" />";
table.rows[3].cells[2].innerHTML = "<img src=\"resource\\" + cards2[1] + ".jpg\" />";
showScore();

// Player chooses HIT (get one more card)
function hit() {
    getNewCard("player2");
	var uBust = "You BUST!";
	var setUBust = uBust.fontcolor("yellow");
    if(checkIfBust("player2")) {
        document.getElementById("bulletin").innerHTML = setUBust;
        document.getElementById("hit").disabled = true;
        document.getElementById("stand").disabled = true;
        winner = "player1";
    }
    showScore();
}

// Player chooses STAND (does not want more cards)
function stand() {
    hasStood = true;
    document.getElementById("hit").disabled = true;
    document.getElementById("stand").disabled = true;
    table.rows[1].cells[1].innerHTML = "<img src=\"resource\\" + cards1[0] + ".jpg\" />";
    // Computer has one more card
    while (calcResult("player1") < 17) {
        getNewCard("player1");
		var cBust = "Computer BUST!";
		var setCBust = cBust.fontcolor("yellow");
        if(checkIfBust("player1")) {
            document.getElementById("bulletin").innerHTML = setCBust;
            document.getElementById("hit").disabled = true;
            document.getElementById("stand").disabled = true;
            winner = "player2";
        }
    }
    // If both players don't have BUST, the higher score wins
    if (winner == "") {
        var result1 = calcResult("player1");
        var result2 = calcResult("player2");
		var push = "PUSH!";
		var setPush = push.fontcolor("yellow");
		var uLose = "You LOSE!";
		var setULose = uLose.fontcolor("yellow");
		var uWin = "You WIN!";
		var setUWin = uWin.fontcolor("yellow");
        if (result1 == result2) {
            document.getElementById("bulletin").innerHTML = setPush;
        } else if (result1 > result2) {
            document.getElementById("bulletin").innerHTML = setULose;
        } else if (result1 < result2) {
            document.getElementById("bulletin").innerHTML = setUWin;
        }
    }
    showScore();
}

// Get a new card
function getNewCard(player) {
    var card = cards[counter++];
    if (player == "player1") {
        var len = cards1.length;
        cards1[len] = card;
        table.rows[1].cells[len + 1].innerHTML = 
            "<img src=\"resource\\" + cards1[len] + ".jpg\" />";
    } else if (player == "player2") {
        var len = cards2.length;
        cards2[len] = card;
        table.rows[3].cells[len + 1].innerHTML = 
            "<img src=\"resource\\" + cards2[len] + ".jpg\" />";
    }
    return card;
}

// Judge if the current scores have "BUST"
function checkIfBust(player) {
    var result = 0;
    if (player == "player1") {
        for (var i = 0; i < cards1.length; i++) {
            //parseInt must be decimal or it gets errors running in IE8
            var c = parseInt(cards1[i].substr(cards1[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            }
            result += c;
        }
        if (result > 21) {
            return true;
        } else {
            return false;
        }
    } else if (player == "player2") {
        for (var i = 0; i < cards2.length; i++) {
            var c = parseInt(cards2[i].substr(cards2[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            }
            result += c;
        }
        if (result > 21) {
            return true;
        } else {
            return false;
        }
    }
}

// Calculate players' scores
function calcResult(player) {
    var result = 0;
    var countOfA = 0;
    if (player == "player1") {
        for (var i = 0; i < cards1.length; i++) {
            var c = parseInt(cards1[i].substr(cards1[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            } else if (c == 1) {
                countOfA++;
            }
            result += c;
        }
        for (var i = 0; i < countOfA; i++) {
            if (result + 10 <= 21) {
                result += 10;
            } else {
                break;
            }
        }
    } else {
        for (var i = 0; i < cards2.length; i++) {
            var c = parseInt(cards2[i].substr(cards2[i].length - 2), "10");
            if (c > 10) {
                c = 10;
            } else if (c == 1) {
                countOfA++;
            }
            result += c;
        }
        for (var i = 0; i < countOfA; i++) {
            if (result + 10 <= 21) {
                result += 10;
            } else {
                break;
            }
        }
    }
    return result;
}

function showScore() {
    var result1 = calcResult("player1");
    var result2 = calcResult("player2");
	var str = "[Computer : You = " + (hasStood == true ? result1 : "?") + " : " + result2 + "]";
	var setStr = str.fontcolor("yellow");
    document.getElementById("score").innerHTML = setStr;
        
}

function restart() {
    document.getElementById("hit").disabled = false;
    document.getElementById("stand").disabled = false;
    counter = 0; // Dealing times
    winner = ""; // Winner: player1 - computer /player2 - player
    hasStood = false; // Mark if the player chose stand
    cards = [
    "club01", "club02", "club03", "club04", "club05", "club06", "club07", 
    "club08", "club09", "club10", "club11", "club12", "club13", "diamond01", 
    "diamond02", "diamond03", "diamond04", "diamond05", "diamond06", "diamond07",
    "diamond08", "diamond09", "diamond10", "diamond11", "diamond12", "diamond13", 
    "heart01", "heart02", "heart03", "heart04", "heart05", "heart06", "heart07", 
    "heart08", "heart09", "heart10", "heart11", "heart12", "heart13", 
    "spade01", "spade02", "spade03", "spade04", "spade05", "spade06", "spade07", 
    "spade08", "spade09", "spade10", "spade11", "spade12", "spade13"];
    // Shuffle the deck
    for (var i = 0; i < 1000; i++) {
        rand = getRand(1, 52);
        tmp = cards[0];
        cards[0] = cards[rand];
        cards[rand] = tmp;
    }
    // Players' cards
    cards1 = [getNewCard(), getNewCard()];
    cards2 = [getNewCard(), getNewCard()];
    table.rows[1].cells[1].innerHTML = "<img src=\"resource\\cardback.png\" />";
    table.rows[1].cells[2].innerHTML = "<img src=\"resource\\" + cards1[1] + ".jpg\" />";
    table.rows[3].cells[1].innerHTML = "<img src=\"resource\\" + cards2[0] + ".jpg\" />";
    table.rows[3].cells[2].innerHTML = "<img src=\"resource\\" + cards2[1] + ".jpg\" />";
    // Clear the desk
    for (var i = 3; i < table.rows[1].cells.length; i++) {
        table.rows[1].cells[i].innerHTML = "";
        table.rows[3].cells[i].innerHTML = "";
    }
    showScore();
	var str2 = "Please make a choice.";
	var setStr2 = str2.fontcolor("yellow");
    document.getElementById("bulletin").innerHTML = setStr2;
}
