//DOM variables

const message = document.querySelector('.message');
const player1score = document.querySelector('.player1score');
const player2score = document.querySelector('.player2score');
const player1dice = document.querySelector('#player1dice');
const player2dice = document.querySelector('#player2dice');
const rollButton = document.querySelector('#roll');
const resetButton = document.querySelector('#reset');

//Game State Variables
let score1 = 0;
let score2 = 0;
let player1Turn = true;

//Event Listeners
rollButton.addEventListener('click', throwDice);
resetButton.addEventListener('click', resetGame);

function throwDice() {
  //Get random number between 1 and 6
  const randomNumber = Math.floor(Math.random() * 6 + 1);

  if (player1Turn) {
    //Update the dice with the random number
    player1dice.textContent = randomNumber;

    //Add and remove the active class from the dice
    player1dice.classList.remove('active');
    player2dice.classList.add('active');

    //Update total score by adding the random number to it
    score1 += randomNumber;

    //Update the score display
    player1score.textContent = score1;
  } else {
    player2dice.textContent = randomNumber;

    player2dice.classList.remove('active');
    player1dice.classList.add('active');

    score2 += randomNumber;
    player2score.textContent = score2;
  }

  //Check if score 21 was reached
  if (score1 >= 21) {
    //Update the message with who won the game
    message.textContent = 'Player 1 has won!';
    //Hide the roll button and display the reset button
    displayResetButton();
  } else if (score2 >= 21) {
    message.textContent = 'Player 2 has won!';
    displayResetButton();
  }

  //Change the player's turn
  player1Turn = !player1Turn;
}

//Reset the variables to the initial state
function resetGame() {
  score1 = 0;
  score2 = 0;

  player1score.textContent = 0;
  player2score.textContent = 0;

  player1dice.textContent = '-';
  player2dice.textContent = '-';

  player1dice.classList.add('active');
  player2dice.classList.remove('active');

  player1Turn = true;

  message.textContent = 'Player 1 Turn';

  displayRollButton();
}

//Hide the roll button and display the reset button
function displayResetButton() {
  rollButton.style.display = 'none';
  resetButton.style.display = 'block';
}

//Hide the reset button and display the roll button
function displayRollButton() {
  resetButton.style.display = 'none';
  rollButton.style.display = 'block';
}
