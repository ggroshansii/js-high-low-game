const drawBtn = document.querySelector(".btn");
const playerCardText = document.querySelector(".player-card-text");
const computerCardText = document.querySelector(".computer-card-text");
const playerCardCount = document.querySelector(".player-card-count");
const computerCardCount = document.querySelector(".computer-card-count");
const wholeDocument = document.querySelector("body");
const images = document.querySelectorAll('img');
const title = document.querySelector('.title');
const tiePot = document.querySelector('.tie-pot');
const roundStatus = document.querySelector('.round-status');

let tieRoundPotOfCards = [];
let gameOn = true;

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
}

    Player.prototype.playCard = function () {
        let card;
        if (this.cardCount > 0) {
            card = this.deck.shift();
            return card;
        }
    };

    Player.prototype.tieRoundAnte = function () {
        if (this.cardCount > 3) {
            for (let i = 0; i < 3; i++) {
                let currentAnteCard = this.deck.shift();
                tieRoundPotOfCards.push(currentAnteCard);
            }
        } else {
            roundStatus.textContent = "Ran out of cards!!"
        }
    };


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
        new Player({ name: "player1" }),
        new Player({ name: "player2" }),
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
    console.log("fired")
    tiePot.textContent = tieRoundPotOfCards.length;

    if (!this.players[0].cardCount && !this.players[1].cardCount) {
        this.mainDeck.buildDeck();
        this.shuffleAndDeal(this.players[0], this.players[1]);
    }

    const player1 = this.players[0];
    const player2 = this.players[1];
    let player1Card = this.players[0].playCard();
    let player2Card = this.players[1].playCard();

    if (player1Card.value > player2Card.value) {

        toggleColor(player1Card, player2Card);

        if (tieRoundPotOfCards.length > 0) {
            console.log('p1 wins tiebreaker');
            roundStatus.textContent = `You won the tiebreaker! You have collected ${tieRoundPotOfCards.length} cards from the pot!`;
            tieRoundPotOfCards.forEach((element) => {
                this.players[0].deck.push(element);
            });
            this.players[0].deck.push(player1Card, player2Card);
            tieRoundPotOfCards = [];
            updateCardCount(player1, player2);
            tiePot.textContent = tieRoundPotOfCards.length;
        } else {
            console.log("p1 wins this round");
            roundStatus.textContent = "You won this round!";
            this.players[0].deck.push(player1Card);
            this.players[0].deck.push(player2Card);
        }
        updateCardCount(player1, player2);

    } else if (player2Card.value > player1Card.value) {

        toggleColor(player1Card, player2Card);

        if (tieRoundPotOfCards.length > 0) {
            console.log("p2 wins tiebreaker")
            roundStatus.textContent = `The computer won the tiebreaker and the ${tieRoundPotOfCards.length} cards from the pot.`;
            tieRoundPotOfCards.forEach((element) => {
                this.players[1].deck.push(element);
            });
            this.players[1].deck.push(player1Card, player2Card);
            tieRoundPotOfCards = [];
            updateCardCount(player1, player2);
            tiePot.textContent = tieRoundPotOfCards.length;
        } else {
            console.log("p2 wins this round")
            roundStatus.textContent = "The computer won this round";
            this.players[1].deck.push(player2Card);
            this.players[1].deck.push(player1Card);
        }
        updateCardCount(player1, player2);

    } else {

        toggleColor(player1Card, player2Card);

        if (!this.players[0].cardCount || !this.players[1].cardCount) {
            if (this.players[0].cardCount) {
                roundStatus.textContent = "The computer ran out of cards";
            } else {
                roundStatus.textContent = "You ran out of cards";
            }
            return gameOver(player1);
        }

        if (tieRoundPotOfCards.length > 0) {
            console.log('another tie')
            roundStatus.innerHTML= "ITS ANOTHER <u>TIE!</u> <br> <small>Put another three cards + your current card into the pot</small>";
            this.players[0].tieRoundAnte();
            this.players[1].tieRoundAnte();
            
            tieRoundPotOfCards.push(player1Card);
            tieRoundPotOfCards.push(player2Card);
        } else {
            console.log('tie')
            roundStatus.innerHTML = "<u>TIE!</u> <br> <small>Put three cards + your current card into the pot</small>";
            tieRoundPotOfCards.push(player1Card);
            tieRoundPotOfCards.push(player2Card);
            this.players[0].tieRoundAnte();
            this.players[1].tieRoundAnte();
        }
        updateCardCount(player1, player2);
        tiePot.textContent = tieRoundPotOfCards.length;
    }

    console.log('p1', player1.cardCount, 'p2', player2.cardCount)


    if (!player1.cardCount || !player2.cardCount) {
        if (this.players[0].cardCount) {
            roundStatus.textContent = "The computer ran out of cards";
        } else {
            roundStatus.textContent = "You ran out of cards";
        }
        updateCardCount(player1, player2);
        return gameOver(player1);
    }

    
};

let overallWinner; 
function gameOver(player1) {
    overallWinner = setTimeout(() => { 
        if (player1.cardCount) {
            roundStatus.textContent = "YOU WON THE GAME";
        } else {
            roundStatus.textContent = "You lost the game";
        }
     }, 2000);


    gameOverDesign();

};


drawBtn.addEventListener("click", (event) => {
    if(event.target.classList.contains("btn-outline-primary")) {
        game.playWar();
    } else {
        resetGame();
    }

});


function toggleColor(player1, player2) {
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
    playerCardText.innerHTML = `${convertNumIntoSuite(player1.value)} of ${player1.suite}`;
    computerCardText.innerHTML = `${convertNumIntoSuite(player2.value)} of ${player2.suite}`;
}


function updateCardCount(player1, player2) {
    playerCardCount.textContent = `${player1.cardCount}`;
    computerCardCount.textContent = `${player2.cardCount}`;
}


function gameOverDesign() {
    drawBtn.classList.remove("btn-outline-primary");
    drawBtn.classList.add("btn-outline-danger");
    wholeDocument.classList.add("red");
    roundStatus.classList.add("red");
    images[0].setAttribute('src', 'https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1535755695');
    images[1].setAttribute('src', 'https://cdn.shopify.com/s/files/1/0200/7616/products/playing-cards-bicycle-rider-back-1_1024x1024.png?v=1535755695');
    title.textContent = "GAME OVER";
    title.style.fontFamily = 'Creepster';
    title.style.fontSize = "6rem";
    title.style.color = "#C60D23";
    drawBtn.textContent = "RESET";

}

function resetGame() {
    drawBtn.textContent = "Draw Cards";
    images[0].setAttribute('src', 'https://i.pinimg.com/originals/a4/77/8a/a4778a31909f959501cc180b8874d164.png');
    images[1].setAttribute('src', 'https://i.pinimg.com/originals/a4/77/8a/a4778a31909f959501cc180b8874d164.png');
    wholeDocument.classList.remove("red");
    drawBtn.classList.remove("btn-outline-danger");
    drawBtn.classList.add("btn-outline-primary");
    roundStatus.classList.remove("red");
    title.textContent = "WAR CARD GAME";
    title.style.fontFamily = '';
    title.style.fontFamily = 'Press Start 2P';
    title.style.fontSize = "3.5rem";
    title.style.color = "darkslateblue";
    clearTimeout(overallWinner);
    roundStatus.textContent = "";
    playerCardText.textContent = "";
    computerCardText.textContent = "";
    playerCardCount.textContent = "";
    computerCardCount.textContent = "";
    game = new Game();
}

function convertNumIntoSuite(value) {
    switch (value) {
        case 11: 
        return 'Jack';
        case 12: 
        return 'Queen';
        case 13: 
        return 'King';
        case 14: 
        return 'Ace';
        default: 
        return value;
    }
}

let game = new Game();


////////////////////////////////// TESTING PURPOSES ////////////////////////////////////


// let flag = true;
// while(flag) {
//     game.playWar()
//     if (game.players[0].cardCount === 0 || game.players[1].cardCount === 0) {
//         flag = false;
//         console.log('final count p1', game.players[0].cardCount);
//         console.log('final count p2', game.players[1].cardCount);
//     }
// }

