
// function StartGame () {
// }

// function Player({name, deck, isTurn, cardCount} = {}) {
//     this.name = name,
//     this.deck = deck,
//     this.isTurn = isTurn,
//     this.cardCount = cardCount
// }

// function Deck({deck = []} = {}) {
//     this.deck = deck,
//     this.suites = ['clubs', 'diamonds', 'hearts', 'spades'];
//     this.buildDeck = function() {
//         if (this.deck.length === 0) {
//         for (let suite of this.suites) {
//             for (let i = 2; i <= 14; i++) {
//                 if (i === 11) {
//                     this.deck.push(`Jack of ${suite}`);
//                 } else if (i === 12) {
//                     this.deck.push(`Queen of ${suite}`);
//                 } else if (i === 13) {
//                     this.deck.push(`King of ${suite}`);
//                 } else if (i === 14) {
//                     this.deck.push(`Ace of ${suite}`);
//                 } else {
//                     this.deck.push(`${i} of ${suite}`);
//                 }
//             }
//         }
//     }
//     return this.deck;
// }

// }


// function Card({deck}) {
//     let deckSize = 52;
//     //this.deck 
//     //random function on that particular deck
//     //pulls out random card
// }


// const player1 = new Player({name: "Garth"});
// const player2 = new Player({name: "Carlsen"});

// let mainDeck = new Deck();
// console.log(mainDeck.buildDeck());

// function shuffleAndDeal() {

// }

// // player1.deck = 

// // const Player2Deck = new Deck()


// console.log(Math.floor(Math.random() * 52));

function Card(value, suite) {
    this.value = value,
        this.suite = suite
}

function Player({ name, deck = [], isTurn = false, cardCount = null } = {}) {
        this.name = name,
        this.deck = deck,
        this.isTurn = isTurn,
        this.cardCount = cardCount
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
        while (this.deck.length > 0) {
            let index = Math.floor(Math.random() * 52)
            console.log(player1.deck)
            if (player1.Deck.length > player2.Deck.length) {
                player2.Deck.push(this.deck[index])
                this.deck.splice(index, 1);
            } else if (player1.Deck.length < player2.Deck.length) {
                player1.Deck.push(this.deck[index])
                this.deck.splice(index, 1);
            } else {
                player1.Deck.push(this.deck[index])
                this.deck.splice(index, 1);
            }
        }
    }
}


const player1 = new Player({name: "Garth"});
const player2 = new Player({name: "Carlsen"});
let mainDeck = new Deck();
console.log(mainDeck.buildDeck());
console.log(mainDeck.shuffleAndDeal(player1, player2));


