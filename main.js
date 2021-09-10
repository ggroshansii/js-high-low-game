
// function StartGame () {
// }

function Card(value, suite) {
    this.value = value,
    this.suite = suite
}

function Player({ name, deck = [], isTurn = false, cardCount = null } = {}) {
    this.name = name;
    this.deck = deck;
    this.isTurn = isTurn;
    this.cardCount = this.deck.length;

    Player.prototype.playCard = function () {
        let card;
        console.log(deck.length)
        let index = Math.floor(Math.random() * cardCount)
        if (this.deck.length > 0 && isTurn === true) {
            console.log(this.deck.length)
            card = this.deck[index];
            this.deck.splice(index, 1); // Don't think it should get spliced here; probably get taken out of deck and added into other in playWar() function

        } else {

        }
        console.log(deck.length);
        return this.deck[index];
    }
}

function Deck() {
    this.deck = [],
    this.suites = ['clubs', 'diamonds', 'hearts', 'spades'];
    this.buildDeck = function () {
        if (this.deck.length === 0) {
            for (let suite of this.suites) {
                for (let i = 2; i <= 14; i++) {
                    if (i === 11) {
                        let card = new Card(i, suite);
                        this.deck.push(card);
                    } else if (i === 12) {
                        let card = new Card(i, suite);
                        this.deck.push(card);
                    } else if (i === 13) {
                        let card = new Card(i, suite);
                        this.deck.push(card);
                    } else if (i === 14) {
                        let card = new Card(i, suite);
                        this.deck.push(card);
                    } else {
                        let card = new Card(i, suite);
                        this.deck.push(card);
                    }
                }
            }
        }
        return this.deck;
    }
    Deck.prototype.shuffleAndDeal = function (player1, player2) {
        let cardCount = 52;
        while (this.deck.length > 0) {
            let index = Math.floor(Math.random() * cardCount)
            if (player1.deck.length > player2.deck.length) {
                player2.deck.push(this.deck[index])
                this.deck.splice(index, 1);
            } else if (player1.deck.length < player2.deck.length) {
                player1.deck.push(this.deck[index])
                this.deck.splice(index, 1);
            } else {
                player1.deck.push(this.deck[index])
                this.deck.splice(index, 1);
            }
            player1.cardCount = player1.deck.length;
            player2.cardCount = player2.deck.length;
            cardCount--;
        }
    }
}

const player1 = new Player({ name: "Garth", isTurn: true});
const player2 = new Player({ name: "Carlsen", isTurn: false });
let mainDeck = new Deck();
console.log(mainDeck.buildDeck());
console.log(mainDeck.shuffleAndDeal(player1, player2));


let count = 0;
for (let i = 0; i < player1.deck.length; i++) {

    if (player1.deck[i] === undefined) {
        continue;
    } else {
        count++;
    }
}

count = 0
for (let i = 0; i < player1.deck.length; i++) {

    if (player1.deck[i] === undefined) {
        continue;
    } else {
        count++;
    }
}


function playWar() {
    console.log(player1.deck.length);
    player1Card = player1.playCard();
    player2Card = player2.playCard();
    
    console.log(player1Card, player2Card);
    console.log("p1 cc", player1.cardCount);
    console.log("p2 cc", player2.cardCount);

    if (player1Card.value > player2Card.value) {
        player1.deck.push(player2Card);
        console.log("p1 cc", player1.cardCount);
        console.log("p2 cc", player2.cardCount);
        console.log(player1.deck.length)
        console.log(player2.deck)
    }
}

playWar()