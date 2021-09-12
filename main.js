
const drawBtn = document.querySelector(".btn");
const playerCardText = document.querySelector(".player-card-text");
const computerCardText = document.querySelector(".computer-card-text")

let gameOn = true;
let tieRound = false;
let tieRoundPotOfCards = [];

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
        if (this.cardCount > 0) {
            card = this.deck.shift();
            return card;
        } 
    }

    Player.prototype.tieRoundAnte = function () {
        for (let i = 0; i < 3; i++) {
            let currentAnteCard = this.deck.shift();
            tieRoundPotOfCards.push(currentAnteCard);
        }
    }
}

function Deck() {
    this.deck = [],
    this.suites = ['clubs &clubs;', 'diamonds &diams;', 'hearts &hearts;', 'spades &spades;'];
}

    Deck.prototype.buildDeck = function () {
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
    


function Game({ players, mainDeck } = {}) {
    this.players = [new Player({ name: "Garth"}), new Player({ name: "Carlsen"})];
    this.mainDeck = new Deck();
}

Game.prototype.shuffleAndDeal = function () {
    let mainDeckCount = 52;
    while (mainDeckCount > 0) {
        let index = Math.floor(Math.random() * mainDeckCount)
        if (this.players[0].cardCount > this.players[1].cardCount) {
            this.players[1].deck.push(this.mainDeck.deck[index])
            this.mainDeck.deck.splice(index, 1);
        } else {
            this.players[0].deck.push(this.mainDeck.deck[index])
            this.mainDeck.deck.splice(index, 1);
        }
        mainDeckCount--;
    }
}

Game.prototype.playWar = function() {
    if (!this.players[0].cardCount && !this.players[1].cardCount) {
        this.mainDeck.buildDeck();
        this.shuffleAndDeal(this.players[0], this.players[1]);
    }
    player1Card = this.players[0].playCard();
    player2Card = this.players[1].playCard();
    console.log(player1Card);
    console.log(player2Card);
    console.log("player1", player1Card, this.players[0].cardCount);
    console.log("player2", player2Card, this.players[1].cardCount);
    if (!this.players[0].cardCount || !this.players[1].cardCount) {
        return this.gameOver();
    }

    if (player1Card.value > player2Card.value) {
        console.log("Player 1 wins");
        this.players[0].deck.push(player1Card);
        this.players[0].deck.push(player2Card);
        playerCardText.innerHTML = `${player1Card.value} of ${player1Card.suite}`;
        computerCardText.innerHTML = `${player2Card.value} of ${player2Card.suite}`;


    } else if (player2Card.value > player1Card.value) {
        console.log("Player 2 wins");
        this.players[1].deck.push(player2Card);
        this.players[1].deck.push(player1Card);
        playerCardText.innerHTML= `${player1Card.value} of ${player1Card.suite}`;
        computerCardText.innerHTML = `${player2Card.value} of ${player2Card.suite}`;

    } else {
        tieRound = true;
        console.log('tie');
        tieRoundPotOfCards.push(player1Card);
        tieRoundPotOfCards.push(player2Card);
        this.tie();

    }
}

//while loop with playWar() inside until gameOver = false = true;

Game.prototype.tie = function() {
    while (tieRound) {
        this.players[0].tieRoundAnte();
        this.players[1].tieRoundAnte();

        if (!this.players[0].cardCount || !this.players[1].cardCount) {
            return this.gameOver();
        }

        let tieBreakerP1 = this.players[0].playCard();
        let tieBreakerP2 = this.players[1].playCard();

        console.log(tieRoundPotOfCards);
        if (tieBreakerP1.value > tieBreakerP2.value) {
            console.log("p1-tie-card", tieBreakerP1, "p2-tie-card", tieBreakerP2);
            console.log('player 1 has won the tiebreaker')
            tieRoundPotOfCards.forEach(element => {
                this.players[0].deck.push(element);
            })
            this.players[0].deck.push(tieBreakerP1, tieBreakerP2); // adding the tieBreaker card too 
            tieRound = false;
            tieRoundPotOfCards = [];
        }
        else if (tieBreakerP1.value < tieBreakerP2.value) {
            console.log("p1-tie-card", tieBreakerP1, "p2-tie-card", tieBreakerP2);
            console.log('player 2 has won the tiebreaker')
            tieRoundPotOfCards.forEach(element => {
                this.players[1].deck.push(element);
            })
            this.players[1].deck.push(tieBreakerP1, tieBreakerP2);
            tieRound = false;
            tieRoundPotOfCards = [];
        }
        else {
            console.log("p1-tie-card", tieBreakerP1, "p2-tie-card", tieBreakerP2);
            console.log('ANOTHER TIE')
            tieRoundPotOfCards.push(tieBreakerP1);
            tieRoundPotOfCards.push(tieBreakerP2);
        }
    }
}

Game.prototype.gameOver = function() {
    console.log("Game Over");
    gameOn = false;

}


// const player1 = new Player({ name: "Garth"});
// const player2 = new Player({ name: "Carlsen"});
// let mainDeck = new Deck();
// mainDeck.buildDeck();
// mainDeck.shuffleAndDeal(player1, player2);

    

const game = new Game()



// while (gameOn) {
//     console.log("while Loop", gameOn)
//     game.playWar();
// }


drawBtn.addEventListener('click', event => {
    game.playWar();
})