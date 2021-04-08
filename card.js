
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
        let card = this.cards[index];
        return card.number + " " + card.suit + " " + card.picture;
    }

    getSize(){
        return cards.length;
    }

}

function test(){
    return 27;
}

function testCardCreation(){
    let c1 = new Card(3,"heart");
    document.getElementById("cardTest").innerHTML=c1.number + " " + c1.suit + " " + c1.picture;
}
function testDeckCreation(){
    let d1 = new Deck();
    //document.getElementById("deckTest").innerHTML=d1.getCard(13);
    var i;
    text ="";
    for(i = 0; i < d1.getSize(); i++){
        text += d1.getCard(i) + "<br>";
    }
    document.getElementById("deckTest").innerHTML=text;
    //document.getElementById("deckTest").innerHTML="it doooo";
}


