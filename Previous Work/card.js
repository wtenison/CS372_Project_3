

//Card and deck classes
//Actual code to be implemented into Blackjack and other games
//seperate into seperate files when done

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
    constructor(){
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


//helper functions
//these are used to have javascript write to html
function changeInnerHTML(element, changeValue){
    document.getElementById(element).innerHTML=changeValue;
}

function changeImage(element, image){
    document.getElementById(element).src=image;
}














//test functions
//to be used in conjunction with testing.html as "unit tests"

function test(){
    return 27;
}

function testCardCreation(){
    let c1 = new Card(3,"heart");
    document.getElementById("cardTest").innerHTML=c1.number + " " + c1.suit + " " + c1.picture;
}

function testCardComparison(){
    let c1 = new Card(1, "heart");
    let c2 = new Card(1, "heart");
    let c3 = new Card(2, "spade");

    document.getElementById("cardComparisonTest1").innerHTML=c1.compare(c2);
    document.getElementById("cardComparisonTest2").innerHTML=c2.compare(c3);
    document.getElementById("cardComparisonTest3").innerHTML=c3.compare(c1);
}

function testDeckCreation(){
    let d1 = new Deck();
    //document.getElementById("deckTest").innerHTML=d1.getCard(13);
    //var i;
    //text ="";
    //document.getElementById("deckTest").innerHTML= d1.getSize();
    //for(i = 0; i < d1.getSize(); i++){
    //    text += d1.getCard(i).printCard() + "  ";
    //}
    document.getElementById("deckTest").innerHTML=d1.printDeck();
    //document.getElementById("deckTest").innerHTML="it doooo";
}

function testDeckShuffle(){
    let d1 = new Deck();
    d1.shuffle();
    document.getElementById("deckShuffleTest1").innerHTML=d1.printDeck();
    d1.shuffle();
    document.getElementById("deckShuffleTest2").innerHTML=d1.printDeck();
}

function testDeckAdd(){
    let d1 = new Deck();
    let c1 = new Card(87, "WWWWWWWWWWWWWWWWWWWW");
    d1.add(c1);
    document.getElementById("deckAddTest").innerHTML=d1.printDeck() + " NUMBER OF CARDS: " + d1.getSize();
}

function testDeckRemove(){
    let d1 = new Deck();
    let c1 = new Card(1,"spade");
    d1.remove(0);
    document.getElementById("deckRemoveTest1").innerHTML=d1.printDeck() + " NUMBER OF CARDS: " + d1.getSize();
    d1.remove(c1);
    document.getElementById("deckRemoveTest2").innerHTML=d1.printDeck() + " NUMBER OF CARDS: " + d1.getSize();
}

function testCardImage(){
   let c1 = new Card(1, "spade");
   document.getElementById("imageTest").src=c1.getCardImage();
   document.getElementById("imageTest2").innerHTML=c1.getCardImage();
}

function testChangeElement(){
    var source = "changeElementTest";
    var s = "yummy";
    changeInnerHTML(source, s);
}


function testChangeImage(){
    let c1 = new Card(3,"heart");
    var source = "changeImageTest";
    changeImage(source, c1.getCardImage());
}