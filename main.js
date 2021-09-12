const drawBtn = document.querySelector(".btn");
const playerCardText = document.querySelector(".player-card-text");
const computerCardText = document.querySelector(".computer-card-text");
const playerCardCount = document.querySelector(".player-card-count");
const computerCardCount = document.querySelector(".computer-card-count");

let gameOn = true;
let tieRound = false;
let tieRoundPotOfCards = [];

function Card(value, suite) {
    (this.value = value), (this.suite = suite);
}

function Player({ name, deck = [] } = {}) {
    this.name = name;
    this.deck = deck;

    Object.defineProperty(this, "cardCount", {
        get() {
            return this.deck.length;
        },
    });

    Player.prototype.playCard = function () {
        let card;
        if (this.cardCount > 0) {
            card = this.deck.shift();
            return card;
        }
    };

    Player.prototype.tieRoundAnte = function () {
        for (let i = 0; i < 3; i++) {
            let currentAnteCard = this.deck.shift();
            tieRoundPotOfCards.push(currentAnteCard);
        }
    };
}

function Deck() {
    (this.deck = []),
        (this.suites = [
            "clubs &clubs;",
            "diamonds &diams;",
            "hearts &hearts;",
            "spades &spades;",
        ]);
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
};

function Game({ players, mainDeck } = {}) {
    this.players = [
        new Player({ name: "Garth" }),
        new Player({ name: "Carlsen" }),
    ];
    this.mainDeck = new Deck();
}

Game.prototype.shuffleAndDeal = function () {
    let mainDeckCount = 52;
    while (mainDeckCount > 0) {
        let index = Math.floor(Math.random() * mainDeckCount);
        if (this.players[0].cardCount > this.players[1].cardCount) {
            this.players[1].deck.push(this.mainDeck.deck[index]);
            this.mainDeck.deck.splice(index, 1);
        } else {
            this.players[0].deck.push(this.mainDeck.deck[index]);
            this.mainDeck.deck.splice(index, 1);
        }
        mainDeckCount--;
    }
};

Game.prototype.playWar = function () {
    if (!this.players[0].cardCount && !this.players[1].cardCount) {
        this.mainDeck.buildDeck();
        this.shuffleAndDeal(this.players[0], this.players[1]);
    }

    const player1 = this.players[0];
    const player2 = this.players[1];
    let player1Card = this.players[0].playCard();
    let player2Card = this.players[1].playCard();
    console.log(player1Card);
    console.log(player2Card);

    if (!this.players[0].cardCount || !this.players[1].cardCount) {
        return this.gameOver();
    }

    if (player1Card.value > player2Card.value) {
        console.log("Player 1 wins");
        this.players[0].deck.push(player1Card);
        this.players[0].deck.push(player2Card);

        toggleColor(player1Card, player2Card);
        updateCardCount(player1, player2);

    } else if (player2Card.value > player1Card.value) {
        console.log("Player 2 wins");
        this.players[1].deck.push(player2Card);
        this.players[1].deck.push(player1Card);

        toggleColor(player1Card, player2Card);
        updateCardCount(player1, player2);

    } else {
        tieRound = true;
        console.log("tie");
        tieRoundPotOfCards.push(player1Card);
        tieRoundPotOfCards.push(player2Card);

        toggleColor(player1Card, player2Card);
        updateCardCount(player1, player2);
        console.log(player1Card);
        console.log(player2Card);
        this.tie();
    }
};

//while loop with playWar() inside until gameOver = false = true;

Game.prototype.tie = function () {
    while (tieRound) {

        const player1 = this.players[0];
        const player2 = this.players[1];
        this.players[0].tieRoundAnte();
        this.players[1].tieRoundAnte();

        if (!this.players[0].cardCount || !this.players[1].cardCount) {
            return this.gameOver();
        }

        let tieBreakerP1 = this.players[0].playCard();
        let tieBreakerP2 = this.players[1].playCard();

        console.log(tieRoundPotOfCards);

        if (tieBreakerP1.value > tieBreakerP2.value) {
            tieRoundPotOfCards.forEach((element) => {
                this.players[0].deck.push(element);
            });

            console.log("Player one wins tiebreaker")
            this.players[0].deck.push(tieBreakerP1, tieBreakerP2); // adding the tieBreaker card too
            tieRound = false;
            tieRoundPotOfCards = [];

            //toggleColor(tieBreakerP1, tieBreakerP2);
            updateCardCount(player1, player2);

        } else if (tieBreakerP1.value < tieBreakerP2.value) {
            tieRoundPotOfCards.forEach((element) => {
                this.players[1].deck.push(element);
            });

            console.log("Player two wins tiebreaker")
            this.players[1].deck.push(tieBreakerP1, tieBreakerP2);
            tieRound = false;
            tieRoundPotOfCards = [];
            //toggleColor(tieBreakerP1, tieBreakerP2);
            updateCardCount(player1, player2);

        } else {

            console.log("Another tie!!")

            tieRoundPotOfCards.push(tieBreakerP1);
            tieRoundPotOfCards.push(tieBreakerP2);

            toggleColor(tieBreakerP1, tieBreakerP2);
            updateCardCount(player1, player2);
        }
    }
};

Game.prototype.gameOver = function () {
    console.log("Game Over");
    gameOn = false;
};

drawBtn.addEventListener("click", (event) => {
    game.playWar();
});



function toggleColor(player1, player2) {
    console.log("fired");
    if (
        player1.suite.includes("hearts") ||
        player1.suite.includes("diamonds")
    ) {
        playerCardText.classList.add("red");
    } else {
        playerCardText.classList.remove("red");
    }
    if (
        player2.suite.includes("hearts") ||
        player2.suite.includes("diamonds")
    ) {
        computerCardText.classList.add("red");
    } else {
        computerCardText.classList.remove("red");
    }
    playerCardText.innerHTML = `${player1.value} of ${player1.suite}`;
    computerCardText.innerHTML = `${player2.value} of ${player2.suite}`;
}



function updateCardCount(player1, player2) {
    playerCardCount.textContent = `Card Count: ${player1.cardCount}`;
    computerCardCount.textContent = `Card Count: ${player2.cardCount}`;
}



const game = new Game();
