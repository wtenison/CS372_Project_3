
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





var playerString;
var playerStringFlag = false;



var numPlayers = 1;
var donePlayers = 0;



let deck = new Deck();
let hand = new Deck(0);
var hands = [hand];
var numCards = 0;
//var total = 0;

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
    newText = newText.replace("please(0)", "please(" + numPlayers + ")");

    node.innerHTML = currentText+newText;
    //var node = document.getElementById("test");
    //var newNode = document.createElement('td');
    //var newText = document.createTextNode("YES");
    //newNode.appendChile(newText);
    //document.getElementById("makeMore").appendChild(newNode);
    //newNode.id = newNode.id + numPlayers;
    numPlayers++;
    //document.head.appendChild(newNode);
    //alert(hands.length);
    //alert(newText);

}


function please(num){
    document.getElementById("addnewplayer").style.display = "none";
    var img = new Image();
    var randCardNum = Math.floor(Math.random() * deck.getSize());
    var player = document.getElementById("player");
    var handTotal = document.getElementById("total"+num);
    var total = Number(handTotal.innerHTML);

    img.src = deck.getCard(randCardNum).getCardImage();
    player.rows[num].cells[2+hands[num].getSize()].innerHTML = "<img src=" + img.src + " />";
    total+= deck.getCard(randCardNum).getValue();
    handTotal.innerHTML=total;


    if(total > 21){
        var bust = document.createElement("P");
        bust.innerHTML = "BUST!";
        document.getElementById("misc" + num).appendChild(bust);
        document.getElementById("hit" + num).style.display = "none";
    }
    hands[num].add(deck.getCard(randCardNum));
    deck.remove(randCardNum);
    numCards++;
}

function tryEmpty(){
    alert(deck.getSize());
}