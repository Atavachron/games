const opponentCards = [];
const playerCards = [];
const discardCards = [];

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
discardCards = suffle(discardCards);

//Divide the cards evenly between the player and the opponent and empty the discardCards array
for (let i = discardCards.length - 1; i >= 0; i--) {
  if (i % 2 === 0) {
    playerCards.push(discardCards.pop());
  } else {
    opponentCards.push(discardCards.pop());
  }
}
