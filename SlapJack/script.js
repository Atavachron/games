let opponentCards = [];
let playerCards = [];
let discardCards = [];

const discardPile = document.getElementById('discard-pile');
const opponentDeck = document.getElementById('opponent-deck');
const playerDeck = document.getElementById('player-deck');
const opponentFace = document.getElementById('opponent-face');
const playAgainBtn = document.querySelector('#play-again-control button');

//Create the deck of cards, nested loop, creating four suits and 13 cards in each suit
for (let i = 0; i < 4; i++) {
  let suit;
  switch (i) {
    case 0:
      suit = 'H';
      break;
    case 1:
      suit = 'D';
      break;
    case 2:
      suit = 'S';
      break;
    default:
      suit = 'C';
  }

  for (let j = 0; j < 13; j++) {
    switch (j) {
      case 0:
        discardCards.push(`A${suit}`);
        break;
      case 10:
        discardCards.push(`J${suit}`);
        break;
      case 11:
        discardCards.push(`Q${suit}`);
        break;
      case 12:
        discardCards.push(`K${suit}`);
        break;
      default:
        discardCards.push(`${j}${suit}`);
    }
  }
}

//Function that will start shuffling cards from the last card of the deck, replacing it with a random card from the deck.
//This will be a loop that will go through all the indeces of the deck (from end to start) replacing the card at that index with a
//card from a random index from the deck

function shuffle(deck) {
  //We want to shuffle all cards, which is equal to 52 shuffles, which is the length of the deck
  let numOfCardsToShuffle = deck.length;

  //While loop, to be executed until there are no more cards left to shuffle
  while (numOfCardsToShuffle !== 0) {
    //Get a random number from 0 to 51 which will be used to access a random card from the deck
    let randomCardIndex = Math.floor(Math.random() * numOfCardsToShuffle);

    //A statement which when executed will help reach the condition. Reduces the number of cards to be shuffled by one
    numOfCardsToShuffle -= 1;

    //In the first loop, this will be 51 (it can be used to access the last card among the cards left to shuffle)
    let lastCardIndex = numOfCardsToShuffle;

    //Create a temporary placeholder for the value of the last card in the group of cards left to be shuffled.
    //This card will be replaced by a random card, so we need to keep its value somehere.
    let temporaryCard = deck[lastCardIndex];

    //Replace the last card in the group of cards left to be shuffed with a card from a random index. We have kept its original
    //value in the temporary card variable, so it is safe to replace it, as the original value will not be lost.
    deck[lastCardIndex] = deck[randomCardIndex];

    //Replace the original card at the random index with the card in the temporary placeholder. The two cards have now 'changed places'
    deck[randomCardIndex] = temporaryCard;
  }
  return deck;
}

//Same function, but using a for loop

// function shuffle(deck) {
//   let numOfCards = deck.length;

//   for (let i = 0; i < deck.length; i++) {
//     let randomNum = Math.floor(Math.random() * numOfCards);
//     let randomCard = deck[randomNum];
//     let temp = deck[i];
//     deck[i] = randomCard;
//     deck[randomNum] = temp;
//   }
//   return deck;
// }

//Shuffle the array of cards
discardCards = shuffle(discardCards);

//Divide the cards evenly between the player and the opponent and empty the discardCards array
for (let i = discardCards.length - 1; i >= 0; i--) {
  if (i % 2 === 0) {
    playerCards.push(discardCards.pop());
  } else {
    opponentCards.push(discardCards.pop());
  }
}

function playCard(event) {
  //Create a variable holding the id of the deck clicked
  const target = event.target.id;
  discardPile.style.visibility = 'visible';
  //Check which deck was clicked
  if (target === 'player-deck') {
    //Remove the first card from the playerCards array and push it to the discardCards
    discardCards.push(playerCards.shift());
  } else if (target === 'opponent-deck') {
    discardCards.push(opponentCards.shift());
  }

  //Create a variable holding the last card of the discard pile (current card)
  const currentCard = discardCards[discardCards.length - 1];

  //Create variables for the current value and the current suit (of the current card)
  //These variables will be used to display styles in the UI
  let currentValue = currentCard.substring(0, 1);

  if (Number(currentValue)) {
    currentValue = Number(currentValue) + 1;
  }

  let currentSuit = currentCard.substring(1, 2);

  //Get the two DOM elements containing the card number
  const cardNumbers = document.querySelectorAll('.card-number');

  //Get the element containing the card art
  const cardArt = document.querySelector('.card-art');

  //Create a variable to hold the suit symbol
  let suitSymbol;

  //Remove the red color from the discardPile
  discardPile.classList.remove('red');

  //Change the inner text of the elements holding the card values
  cardNumbers.forEach(number => {
    switch (currentSuit) {
      case 'H':
        number.innerText = currentValue + '\n♥';
        suitSymbol = '♥';
        discardPile.classList.add('red');
        break;
      case 'D':
        number.innerText = currentValue + '\n♦';
        suitSymbol = '♦';
        discardPile.classList.add('red');
        break;
      case 'S':
        number.innerText = currentValue + '\n♠';
        suitSymbol = '♠';
        break;
      case 'C':
        number.innerText = currentValue + '\n♣';
        suitSymbol = '♣';
        break;
    }
  });

  //If the displayed card div has any children (from the previous card) remove them
  while (cardArt.children[0]) {
    cardArt.children[0].remove();
  }
  //Remove the flex-flow property
  cardArt.style.flexFlow = null;

  if (Number(currentValue)) {
    //Add the suit symbols to the card, based on how many they are
    for (let i = 0; i < currentValue; i++) {
      //Create a div to hold each symbol
      let suitSymbolContainer = document.createElement('div');
      //Set the text content of the div to the suit symbol
      suitSymbolContainer.textContent = suitSymbol;
      //Append the new div to the card art container
      cardArt.append(suitSymbolContainer);
    }

    //Change the flex-flow property for cards with a value less than 4
    if (currentValue < 4) {
      cardArt.style.flexFlow = 'column wrap';
    }
    //Check if the currentValue is not a number
  } else if (!Number(currentValue)) {
    switch (currentValue) {
      case 'J':
        suitSymbol = '🤵';
        break;

      case 'Q':
        suitSymbol = '👸';
        break;
      case 'K':
        suitSymbol = '🤴';
        break;
    }

    //create a new div that will hold the symbol
    let suitSymbolContainer = document.createElement('div');
    //Add the symbol to the div
    suitSymbolContainer.textContent = suitSymbol;
    //Increase the font-size of the symbol
    suitSymbolContainer.style.fontSize = '6vh';
    //Append the new div to the card art div
    cardArt.append(suitSymbolContainer);

    //Check if the card is not an ace as it does not have an image
    if (currentValue !== 'A') {
      cardArt.style.flexFlow = 'column wrap';
      let flippedSuitSymbolContainer = document.createElement('div');
      flippedSuitSymbolContainer.textContent = suitSymbol;
      flippedSuitSymbolContainer.style.fontSize = '6vh';
      //Rotate the image
      flippedSuitSymbolContainer.style.transform = 'rotate(180deg)';
      cardArt.append(flippedSuitSymbolContainer);
    }
  }
  //Check if game is won or lost
  getCurrentCards();
  //Call the opponent AI function that will analyze the card that has been played
  opponentAI(target);
}

let reaction;

//Create an opponentAI function that will accept lastPlayer as parameter
function opponentAI(lastPlayer) {
  //Get a random number for the AI reaction time
  const reactionTime = Math.floor(Math.random() * (1400 - 900) + 900);
  //Clear a previous timeout
  clearTimeout(reaction);
  //Set a timeout for the AI reaction
  reaction = setTimeout(function () {
    //Check if the discardCards deck has any cards and if the top card is a Jack
    if (
      discardCards.length > 0 &&
      discardCards[discardCards.length - 1].includes('J')
    ) {
      slap();
      console.log('Slap');
      //Check if the last player was the player-deck
    } else if (lastPlayer === 'player-deck') {
      //create an event object
      let event = new Object();
      //create a target object
      event.target = new Object();
      //add the opponent-deck as an id to the new event.target object
      event.target.id = 'opponent-deck';
      //Pass the new event object to the playCard function
      playCard(event);
    }
  }, reactionTime);
}

function slap(event) {
  //Create a variable that will represent the current player who has slapped
  let currentPlayer;
  //Determine if the player or the AI has slapped
  //If there is an event at all, then the player has slapped
  if (event !== undefined) {
    currentPlayer = 'player';
    //If there is no event element then the opponent has slapped
  } else {
    currentPlayer = 'opponent';

    //If the discard cards array is empty the game is over, so make the opponent sad and end
    if (discardCards.length === 0) {
      changeOpponentFace('sad');
      return;
    }
  }
  if (
    discardCards.length > 0 &&
    discardCards[discardCards.length - 1].includes('J')
  ) {
    discardPile.style.visibility = 'hidden';
    if (currentPlayer === 'player') {
      //Add the shuffled discardCards to the playerCards
      playerCards = playerCards.concat(shuffle(discardCards));
      changeOpponentFace('sad');
      //Clear the timeout if the player has slapped, otherwise the opponent will still slap
      clearTimeout(reaction);
    } else if (currentPlayer === 'opponent') {
      //Add the shuffled discardCards to the opponentCards
      opponentCards = opponentCards.concat(shuffle(discardCards));
      changeOpponentFace('happy');
      opponentAI('player-deck');
    }

    //Empty the discard cards array after the slap
    discardsCards = [];

    getCurrentCards();
  }
}

let expression;
function changeOpponentFace(mood) {
  if (mood === 'sad') {
    opponentFace.textContent = '😣';
  } else if (mood === 'happy') {
    opponentFace.textContent = '😁';
  }

  const expressionTime = Math.floor(Math.random() * (1000 - 500) + 500);
  clearTimeout(expression);
  expression = setTimeout(function () {
    opponentFace.textContent = '🙂';
  }, expressionTime);
}

function getCurrentCards() {
  if (playerCards.length === 0) {
    playerDeck.style.visibility = 'hidden';
    playerDeck.removeEventListener(`click`, playCard);
    clearTimeout(reaction);
    document.getElementById('win-status').textContent = 'You lose';
    document.getElementById('play-again-wrapper').style.display = 'flex';
  } else if (opponentCards.length === 0) {
    opponentDeck.style.visibility = 'hidden';
    clearTimeout(reaction);
    opponentFace.textContent = `😣`;
    document.getElementById('win-status').textContent = 'You win';
    document.getElementById('play-again-wrapper').style.display = 'flex';
  }
}

playerDeck.addEventListener('click', playCard);
discardPile.addEventListener('click', slap);
playAgainBtn.addEventListener('click', function () {
  location.reload();
});
