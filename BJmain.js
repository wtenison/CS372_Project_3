// Card Class: 
// - For creation and manipulation of cards

// Functions:
// getValue() Returns the value of the card.
// compare() Used for comparing alike cards.
// getCardInfo() returns card value and suit
// getCardImage() returns the card image from resource file
class Card
{
    constructor(number, suit)
    {
        this.number = number;
        this.suit = suit;

        var cardnum = number;
        if(number < 10)
        {
            cardnum = "0" + number;
        }

        this.picture = this.suit + cardnum + ".jpg";
    }

    getValue()
    {
        if(this.number > 9)
        {
            return 10;
        }
        return this.number;
    }

    compare(card)
    {
        return this.number == card.number && this.suit == card.suit;
    }

    getCardInfo()
    {
        return this.number + " " + this.suit;
    }

    getCardImage()
    {
        return "resource\\"+this.picture;
    }

}

// Deck Class: 
// - Used to store and manipulate cards

// Functions:
// getCard(index) - returns the card from this index
// getSize() - returns the size of the deck
// add(card) - adds a given card object to the deck
// remove(op) - input a card object or a number and removes the card from the deck
// printDeck() - loops through the deck and prints out card info
// shuffle() - loops through deck moving random cards around.
class Deck
{
    constructor(empty)
    {
        if(empty==undefined)
        {
            this.cards = [];
            var i;
            for(i = 1; i <= 13;i++)
            {
                let heart = new Card(i, "heart");
                let spade = new Card(i, "spade");
                let club = new Card(i, "club");
                let diamond = new Card(i, "diamond");
                this.cards.push(heart, spade, club, diamond);
            }
        }
        else
        {
            this.cards = [];
        }
    }

    getCard(index)
    {
        return this.cards[index]
    }

    getSize()
    {
        return this.cards.length;
    }

    add(card)
    {
        this.cards[this.getSize()] = card;
        return this.cards[this.getSize()];
    }

    remove(card)
    {
        if(typeof(card) == "number")
        {
            this.cards.splice(card,1);
        }
        else
        {
            var i;
            for(i = 0; i < this.getSize(); i++)
            {
                if(this.cards[i].compare(card))
                {
                    this.cards.splice(i, 1);
                    break;
                }
            }
        }

    }

    printDeck()
    {
        var i;
        var text = "";
        for(i = 0; i < this.getSize();i++){
           text += this.getCard(i).getCardInfo() + "  ";
        }
        return text;
    }

    shuffle()
    {
        var i;
        for(i = 0; i < this.getSize(); i++)
        {
            var randCardNum = Math.floor(Math.random() * this.getSize());
            let tempCard = this.cards[i];
            this.cards[i] = this.cards[randCardNum];
            this.cards[randCardNum] = tempCard;
        }
        return this.cards[0].getCardInfo();
    }
}

// Deal Card:
// Deals card to player that is selected (based on num, each index corresponds to a player [0 = player 0])
function dealCard(num)
{
    //Initialize used variables
    var img = new Image();
    var randCardNum = Math.floor(Math.random() * deck.getSize());
    var player = document.getElementById("player");
    var handTotal = document.getElementById("total"+num);
    var total = Number(handTotal.innerHTML);

    // Gets random card, places image on board, adds to the total, and adds card to players hand
    img.src = deck.getCard(randCardNum).getCardImage();
    player.rows[num].cells[cardStartPos+hands[num].getSize()].innerHTML = "<img src=" + img.src + " />";
    total+= deck.getCard(randCardNum).getValue();
    handTotal.innerHTML=total;
    hands[num].add(deck.getCard(randCardNum));


    // Calculates the total value for the players cards
    var i;
    var temptot = 0;
    var numAces = 0;
    for(i = 0; i < hands[num].getSize(); i++)
    {
        let c = hands[num].getCard(i).getValue();
        temptot += c;
        if(c == 1)
        {
           temptot+=10;
           numAces++;
        }
    }

    // Makes the 
    while(numAces != 0 && temptot > 21)
    {
        temptot-=10;
        numAces--;
    }

    // 
    if(total == 21 && hands[num].getSize() == 2)
    {
            playerVictory[num] = 2;
            document.getElementById("hit" + num).style.display = "none";
            document.getElementById("stand" + num).style.display = "none";
            var messege = document.getElementById("messege" + num);
            messege.innerHTML += "<br>BLACKJACK!";
            document.getElementById("misc" + num).appendChild(messege);
            donePlayers++;

    }

    handTotal.innerHTML = temptot;

    deck.remove(randCardNum);

}

// Deal Dealer:
// Deals card to dealer
function dealDealer()
{
    var img = new Image();
    var randCardNum = Math.floor(Math.random() * deck.getSize());
    var player = document.getElementById("dealer");
    var handTotal = document.getElementById("dealertotal");
    var total = Number(handTotal.innerHTML);

    // Gets random card, places image on board, adds to the total, and adds card to players hand
    img.src = deck.getCard(randCardNum).getCardImage();
    player.rows[0].cells[cardStartPosDealer+dealerDeck.getSize()].innerHTML = "<img src=" + img.src + " />";
    total+= deck.getCard(randCardNum).getValue();
    handTotal.innerHTML=total;

    dealerDeck.add(deck.getCard(randCardNum));
    deck.remove(randCardNum);
}

// Dealer Start:
// Initialization function for Dealer
function dealerStart()
{
    //document.getElementById("dealdealer").disabled = !document.getElementById("dealdealer").disabled;
    var img = new Image();
    img.src= dealerDeck.getCard(0).getCardImage();
    var player = document.getElementById("dealer");
    var total = dealerDeck.getCard(0).getValue()+dealerDeck.getCard(1).getValue();
    player.rows[0].cells[cardStartPosDealer].innerHTML = "<img src=" + img.src + " />";
    document.getElementById("dealertotal").innerHTML = total;
    dealerTurn();
}

// Dealer Turn:
// Simulates a simple dealer bot that will only hit if his total is less than 17
function dealerTurn()
{
    var total = document.getElementById("dealertotal").innerHTML;
    var i = 2;
    while(total < 17 && i < 5)
    {
        dealDealer();
        total = document.getElementById("dealertotal").innerHTML;
        i++;
    }
    if(i == 5)
    {
        dealerVictoryConditions = 1;
    }
    checkWin();
}

// Turn On Bets:
// Function that turns on the bet buttons and functions 
function turnOnBets()
{
    var i;
    for(i = 0; i < numPlayers;i++)
    {
        var bet = document.getElementById("betamount" + i);
        var button = document.getElementById("setbet" + i);
        var lockedbet = document.getElementById("lockedbetamount" + i);
        var format = document.getElementById("lockbetamountformat" + i);
        button.style.display = "block";
        bet.style.display = "block";
        lockedbet.innerHTML = "";
        format.innerHTML = "";
    }
    betsLocked = 0;
}

// Player Loses
// Function that prints message for the losers
function playerLoses(num)
{
    var messege = document.getElementById("messege" + num);
    messege.innerHTML = "YOU LOSE!";
    document.getElementById("lockedbetamount" + num).innerHTML = 0;
}

// Player Wins
// Function that prints message for the winner
function playerWins(num, multiplier)
{
    var messege = document.getElementById("messege" + num);
    messege.innerHTML = "YOU WIN!";
    var bet = document.getElementById("lockedbetamount" + num);
    var bank = document.getElementById("money" + num);
    bank.innerHTML = parseInt(bank.innerHTML) + bet.innerHTML * multiplier;
    bet.innerHTML = 0;
}

// Game Variables:
var playerString;
var playerStringFlag = false;
var cardStartPos = 3;
var cardStartPosDealer = 2;

// Each index corresponds to a player (0 = player 0)
// 0 = undetermined (player is still playing or is standing)
// 1 = bust
// 2 = blackjack
// 3 = 5 card victory
var playerVictory = [];
var dealerVictoryConditions = 0;
var numPlayers = 1;
var donePlayers = 0;
var betsLocked = 0;

let dealerDeck = new Deck(0);
let deck = new Deck();
var hand = new Deck(0);
var hands = [hand];
//var total = 0;

// Restart: 
// Function that restarts the gams 
function restart(){
    //reset game logic
    var i;
    donePlayers = 0;
    deck = new Deck();
    dealerDeck = new Deck(0);
    turnOnBets();

    //reset html
    var player = document.getElementById("player");
    document.getElementById("restart").style.display= "none";
    document.getElementById("dealertotal").innerHTML = "";
    for(i = 0; i < numPlayers; i++){
        document.getElementById("total" + i).innerHTML = "";
        document.getElementById("messege" + i).innerHTML = "";
        document.getElementById("betamount" + i).value = "";
    }

    //clear board for the players
    for(i = 0; i < numPlayers; i++){
        playerVictory[i] = 0;
        let newHand = new Deck(0);
        hands[i] = newHand;
        //clear cards for a player
        var j;
        for(j = 0; j < 5; j++){
            player.rows[i].cells[cardStartPos+j].innerHTML = "";
        }
    }

    //clear board for the dealer
    player = document.getElementById("dealer");
    for(i = 0; i < 5; i++){
        player.rows[0].cells[cardStartPosDealer+i].innerHTML = "";
    }


}

// Function that initializes the game
function start(){
    
    var img = new Image();
    img.src="resource\\cardback.png";

    document.getElementById("addnewplayer").style.display= "none";
    document.getElementById("start").style.display= "none";
    document.getElementById("restart").style.display= "none";
    document.getElementById("dealertotal").innerHTML = 0;

    var i;
    for(i = 0; i < numPlayers; i++){
        document.getElementById("hit" + i).style.display = "block";
        document.getElementById("stand" + i).style.display = "block";
        document.getElementById("total" + i).style.display = "block";
        dealCard(i);
        dealCard(i);
    }

    dealDealer();
    dealDealer();
    document.getElementById("dealer").rows[0].cells[cardStartPosDealer].innerHTML = "<img src=" + img.src + " />";
    document.getElementById("dealertotal").innerHTML = "?";
    document.getElementById("dealertotal").disable
    if(donePlayers==numPlayers){
        dealerStart();
    }
}

// Function to add players into the game
function addPlayer(){
    if(!playerStringFlag){
        playerString = document.getElementById("player").innerHTML;
        playerStringFlag = true;
    }
    let newHand = new Deck(0);
    hands[hands.length] = newHand;
    var head = document.getElementById("head");
    var node = document.getElementById("player");
    var currentText = node.innerHTML;
    var newText = playerString;
    var replacement = "misc" + numPlayers
    newText = newText.replace('misc0', replacement);
    newText = newText.replace("hit0", "hit" + numPlayers);
    newText = newText.replace("stand0", "stand" + numPlayers);
    newText = newText.replace("total0", "total" + numPlayers);
    newText = newText.replace("hit(0)", "hit(" + numPlayers + ")");
    newText = newText.replace("stand(0)", "stand(" + numPlayers + ")");

    newText = newText.replace("bet0", "bet" + numPlayers);
    newText = newText.replace("money0", "money" + numPlayers);
    newText = newText.replace("betamount0", "betamount" + numPlayers);
    newText = newText.replace("setbet0", "setbet" + numPlayers);
    newText = newText.replace("lockBet(0)", "lockBet(" + numPlayers + ")");
    newText = newText.replace("beterror0", "beterror" + numPlayers);
    newText = newText.replace("lockbetamountformat0", "lockbetamountformat" + numPlayers);
    newText = newText.replace("lockedbetamount0", "lockedbetamount" + numPlayers);
    newText = newText.replace("messege0", "messege" + numPlayers);

    node.innerHTML = currentText+newText;
    playerVictory[numPlayers] = 0;
    numPlayers++;
    document.getElementById("start").style.display="none";
}

// Function to check for winner
function checkWin()
{
    var dealerScore = Number(document.getElementById("dealertotal").innerHTML);
    var dealerHasBlackjack = false;
    if (dealerScore == 21 && dealerDeck.getSize() == 2)
    {
        dealerHasBlackjack = true;
    }


    var i;
    for(i = 0; i < hands.length; i++)
    {
        var player = document.getElementById("total" + i);
        var playerScore = Number(player.innerHTML);
        //Dealer has Blackjack
        if(dealerHasBlackjack){
            playerloses(i);
        }
        //Dealer drew 5
        else if(dealerVictoryConditions == 1)
        {
            playerloses(i);
        }
        //Player has Blackjack
        else if(playerVictory[i] == 2)
        {
            playerWins(i, 2.5);
        }
        //Player drew 5
        else if(playerVictory[i] == 3)
        {
            playerWins(i, 2);
        }
        //Player busted
        else if(playerScore > 21)
        {
            playerLoses(i);
        }
        //Dealer busted
        else if(dealerScore > 21)
        {
            playerWins(i, 2);

        }
        //Dealer has a higher score
        else if(dealerScore >= playerScore)
        {
            playerLoses(i);

        }
        //Player has a higher score
        else
        {
            playerWins(i, 2);

        }
    }
    document.getElementById("restart").style.display = "block";
}

// Lock Bets:
// Function to lock bets
function lockBet(num)
{
    if(!playerStringFlag)
    {
        playerString = document.getElementById("player").innerHTML;
        playerStringFlag = true;
    }

    var bet = document.getElementById("betamount" + num);
    var amount = parseInt(bet.value);

    var lockedbet = document.getElementById("lockedbetamount" + num);
    var error = document.getElementById("beterror" + num);
    var money = document.getElementById("money" + num);
    var button = document.getElementById("setbet" + num);
    var format = document.getElementById("lockbetamountformat" + num);
    if(bet.value == "" || isNaN(amount) || amount < 1 || amount > money.innerHTML)
    {
        error.innerHTML = "enter a VALID bet";
    }
    else
    {
        money.innerHTML -= amount;
        error.innerHTML = "";
        format.innerHTML = "bet: $";
        lockedbet.innerHTML = amount;
        button.style.display = "none";
        bet.style.display = "none";
        betsLocked++;
        if(betsLocked == numPlayers)
        {
            document.getElementById("start").style.display="block";
        }
    }
}

// Hit:
// Function that deals the card and also calculates whether its the end of the game
function hit(num)
{
    dealCard(num);
    var total = Number(document.getElementById("total"+num).innerHTML);

    if(total > 21)
    {
        playerVictory[num] = 1;
        var messege = document.getElementById("messege" + num);
        messege.innerHTML = "BUST!";
        document.getElementById("hit" + num).style.display = "none";
        document.getElementById("stand" + num).style.display = "none";
        donePlayers++;
    }
    
    if(hands[num].getSize() == 5 && !(total > 21))
    {
        playerVictory[num] = 3;
        document.getElementById("hit" + num).style.display = "none";
        document.getElementById("stand" + num).style.display = "none";
        var messege = document.getElementById("messege" + num);
        messege.innerHTML = "DREW 5!";
        donePlayers++
    }

    if(donePlayers==numPlayers)
    {
        dealerStart();
    }
}

// Stand:
// Function that ends the player's turn
function stand(num)
{
    document.getElementById("hit" + num).style.display = "none";
    document.getElementById("stand" + num).style.display = "none";
    donePlayers++;
    if(donePlayers==numPlayers)
    {
        dealerStart();
    }
}