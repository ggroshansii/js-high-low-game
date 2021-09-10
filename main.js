
// function StartGame () {
// }

// let playerOneCardsInPlay = [];
// let playerTwoCardsInPlay = [];
let gameOn = true;

function Card(value, suite) {
    this.value = value,
        this.suite = suite
}

function Player({ name, deck = [] } = {}) {
    this.name = name;
    this.deck = deck;

    Object.defineProperty(this, 'cardCount', {
        get() {
            return this.deck.length;
        }
    })

    Player.prototype.playCard = function () {
        let card;
        let currentCardIndex;
        if (this.deck.length > 0 && gameOn) {
            card = this.deck.shift();
        } else {
            gameOver();
        }
        return card;
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
        let mainDeckCount = 52;
        while (mainDeckCount > 0) {
            let index = Math.floor(Math.random() * mainDeckCount)
            if (player1.cardCount > player2.cardCount) {
                player2.deck.push(this.deck[index])
                this.deck.splice(index, 1);
            } else {
                player1.deck.push(this.deck[index])
                this.deck.splice(index, 1);
            }
            mainDeckCount--;
        }
    }
}

function playWar() {
    player1Card = player1.playCard();
    player2Card = player2.playCard();

    console.log("player1" , player1Card, player1.cardCount);
    console.log("player2", player2Card, player2.cardCount);
    if (player1Card.value > player2Card.value) {
        console.log("Player 1 wins");
        player1.deck.push(player1Card);
        player1.deck.push(player2Card);


    } else if (player2Card.value > player1Card.value) {
        console.log("Player 2 wins");
        player2.deck.push(player2Card);
        player2.deck.push(player1Card);

    } else {
        console.log('tie');
        player1.deck.push(player1Card);
        player2.deck.push(player2Card);
    }
}





function gameOver() {
    console.log("Game Over");
    gameOn = false;
}
//while loop with playWar() inside until gameOver = false = true;



const player1 = new Player({ name: "Garth", isTurn: true });
const player2 = new Player({ name: "Carlsen", isTurn: false });
let mainDeck = new Deck();
mainDeck.buildDeck();
mainDeck.shuffleAndDeal(player1, player2);

while (gameOn) {
    playWar();
}



// Instead of random function in playCard(), it needs to be just push, shift, etc; simulates real life more