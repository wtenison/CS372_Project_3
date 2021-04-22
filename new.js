class Card{
    constructor(number, suit){
        this.number = number;
        this.suit = suit;

        var cardnum = number;
        if(number < 10){
            cardnum = "0" + number;
        }

        this.picture = this.suit + cardnum + ".jpg";
    }

    getValue(){
        if(this.number >9){
            return 10;
        }
        return this.number;
    }

    compare(card){
        return this.number == card.number && this.suit == card.suit;
    }

    printCard(){
        return this.number + " " + this.suit;
    }

    getCardImage(){
        return "resource\\"+this.picture;
    }

}

class Deck{
    constructor(empty){
        if(empty==undefined){
            this.cards = [];
            var i;
            for(i = 1; i <=13;i++){
                let heart = new Card(i, "heart");
                let spade = new Card(i, "spade");
                let club = new Card(i, "club");
                let diamond = new Card(i, "diamond");
                this.cards.push(heart, spade, club, diamond);
            }
        }
        else{
            this.cards = [];
        }
    }

    getCard(index){
        return this.cards[index]
    }

    getSize(){
        return this.cards.length;
    }

    add(card){
        this.cards[this.getSize()] = card;
        return this.cards[this.getSize()];
    }

    remove(op){
        if(typeof(op) == "number"){
            this.cards.splice(op,1);
        }
        else{
            var i;
            for(i = 0; i < this.getSize(); i++){
                if(this.cards[i].compare(op)){
                    this.cards.splice(i, 1);
                    break;
                }
            }
        }

    }

    printDeck(){
        var i;
        var text = "";
        for(i = 0; i < this.getSize();i++){
           text += this.getCard(i).printCard() + "  ";
        }
        return text;
    }

    shuffle(){
        var i;
        for(i = 0; i < this.getSize(); i++){
            var randCardNum = Math.floor(Math.random() * this.getSize());
            let tempCard = this.cards[i];
            this.cards[i] = this.cards[randCardNum];
            this.cards[randCardNum] = tempCard;
        }
        return this.cards[0].printCard();
    }
}







function dealCard(num){
    var img = new Image();
    var randCardNum = Math.floor(Math.random() * deck.getSize());
    var player = document.getElementById("player");
    var handTotal = document.getElementById("total"+num);
    var total = Number(handTotal.innerHTML);

    img.src = deck.getCard(randCardNum).getCardImage();
    player.rows[num].cells[cardStartPos+hands[num].getSize()].innerHTML = "<img src=" + img.src + " />";
    total+= deck.getCard(randCardNum).getValue();
    handTotal.innerHTML=total;
    hands[num].add(deck.getCard(randCardNum));

    var i;
    var temptot = 0;
    var numAces = 0;
    for(i=0;i<hands[num].getSize();i++){
        let c = hands[num].getCard(i).getValue();
        temptot += c;
        if(c == 1){
           temptot+=10;
           numAces++;
        }
    }
    while(numAces!= 0 && temptot > 21){
        temptot-=10;
        numAces--;
    }
    handTotal.innerHTML = temptot;

    deck.remove(randCardNum);

}

function dealDealer(){
    var img = new Image();
    var randCardNum = Math.floor(Math.random() * deck.getSize());
    var player = document.getElementById("dealer");
    var handTotal = document.getElementById("dealertotal");
    var total = Number(handTotal.innerHTML);

    img.src = deck.getCard(randCardNum).getCardImage();
    player.rows[0].cells[cardStartPosDealer+dealerDeck.getSize()].innerHTML = "<img src=" + img.src + " />";
    total+= deck.getCard(randCardNum).getValue();
    handTotal.innerHTML=total;

    dealerDeck.add(deck.getCard(randCardNum));
    deck.remove(randCardNum);
}







function dealerStart(){
    //document.getElementById("dealdealer").disabled = !document.getElementById("dealdealer").disabled;
    var img = new Image();
    img.src= dealerDeck.getCard(0).getCardImage();
    var player = document.getElementById("dealer");
    var total = dealerDeck.getCard(0).getValue()+dealerDeck.getCard(1).getValue();
    player.rows[0].cells[cardStartPosDealer].innerHTML = "<img src=" + img.src + " />";
    document.getElementById("dealertotal").innerHTML = total;
    dealerTurn();
}

function dealerTurn(){
    var total = document.getElementById("dealertotal").innerHTML;
    var i;
    while(total < 17){
        dealDealer();
        total = document.getElementById("dealertotal").innerHTML;
    }

}




var playerString;
var playerStringFlag = false;
var cardStartPos = 3;
var cardStartPosDealer = 2;

//each index corresponds to a player (0 = player 0)
//0 = undetermined (player is still playing or is standing)
//1 = bust
//2 = blackjack
//3 = 5 card victory
var playerVictory = [];

var numPlayers = 1;
var donePlayers = 0;
var betsLocked = 0;

let dealerDeck = new Deck(0);
let deck = new Deck();
let hand = new Deck(0);
var hands = [hand];
//var total = 0;

// Function that initializes the game
function start(){
    
    var img = new Image();
    img.src="resource\\cardback.png";

    document.getElementById("addnewplayer").style.display= "none";
    document.getElementById("start").style.display= "none";
    document.getElementById("dealertotal").innerHTML = 0;

    var i;
    for(i = 0; i < numPlayers; i++){
        document.getElementById("hit" + i).style.display = "block";
        document.getElementById("stand" + i).style.display = "block";
        document.getElementById("total" + i).style.display = "block";
        dealCard(i);
        dealCard(i);
    }

    var db = document.getElementById("dealdealer");
    if (db.style.display === "none") {
      db.style.display = "block";
    }

    dealDealer();
    dealDealer();
    document.getElementById("dealer").rows[0].cells[cardStartPosDealer].innerHTML = "<img src=" + img.src + " />";
    document.getElementById("dealertotal").innerHTML = "?";
    document.getElementById("dealertotal").disable
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
    //alert(replacement);
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

    node.innerHTML = currentText+newText;
    //var node = document.getElementById("test");
    //var newNode = document.createElement('td');
    //var newText = document.createTextNode("YES");
    //newNode.appendChile(newText);
    //document.getElementById("makeMore").appendChild(newNode);
    //newNode.id = newNode.id + numPlayers;
    playerVictory[numPlayers] = 0;
    numPlayers++;
    document.getElementById("start").style.display="none";

    //document.head.appendChild(newNode);
    //alert(hands.length);
    //alert(newText);

}

function checkWin(){

}

function lockBet(num){
    if(!playerStringFlag){
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

    if(bet.value == "" || amount < 1 || amount > money.innerHTML){
        error.innerHTML = "enter a VALID bet";
    }
    else{
        money.innerHTML -= amount;
        error.innerHTML = "";
        format.innerHTML = "bet: $";
        lockedbet.innerHTML = amount;
        button.style.display = "none";
        bet.style.display = "none";
        betsLocked++;
        if(betsLocked == numPlayers){
            document.getElementById("start").style.display="block";
        }
    }
}

function hit(num){

    dealCard(num);
    var total = Number(document.getElementById("total"+num).innerHTML);

    if(total > 21){
        playerVictory[num] = 1;
        var messege = document.createElement("P");
        messege.innerHTML = "BUST!";
        document.getElementById("misc" + num).appendChild(messege);
        document.getElementById("hit" + num).style.display = "none";
        document.getElementById("stand" + num).style.display = "none";
        donePlayers++;
    }

    if(total == 21 && hands[num].getSize() == 2){
        playerVictory[num] = 2;
        document.getElementById("hit" + num).style.display = "none";
        document.getElementById("stand" + num).style.display = "none";
        var messege = document.createElement("P");
        messege.innerHTML = "BLACKJACK!";
        document.getElementById("misc" + num).appendChild(messege);
        donePlayers++;
    }

    if(hands[num].getSize() == 5 && !(total > 21)){
        playerVictory[num] = 3;
        document.getElementById("hit" + num).style.display = "none";
        document.getElementById("stand" + num).style.display = "none";
        var messege = document.createElement("P");
        messege.innerHTML = "DREW 5!";
        document.getElementById("misc" + num).appendChild(messege);
        donePlayers++
    }

    if(donePlayers==numPlayers){
        dealerStart();
    }

}

function stand(num){
    document.getElementById("hit" + num).style.display = "none";
    document.getElementById("stand" + num).style.display = "none";
    donePlayers++;
    if(donePlayers==numPlayers){
        dealerStart();
    }
}