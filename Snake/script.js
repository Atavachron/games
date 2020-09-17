const grid = document.querySelector('.grid');
const start = document.querySelector('#start');
const scoreDisplay = document.querySelector('#score');
const squares = [];
const currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;
let appleIndex = 0;
let score = 0;

function createGrid() {
  //create 100 divs 
  for (let i = 0; i < 100; i++) {
    const square = document.createElement('div');
    //Add a class of square to each div
    square.classList.add('square');
    //Append each square to the grid
    grid.appendChild(square);
    //Push each div to the squares array
    squares.push(square);
  }
}

createGrid();

//Add the class of snake to each square in the squares array that has the same index as the square in the current snake array
currentSnake.forEach(index => squares[index].classList.add('snake'));

function move() {
  if (
    //If snake hits the bottom
    (currentSnake[0] + width >= width * width && direction === width) ||
    //If snake hits the right side 
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    //If snake hits left side 
    (currentSnake[0] % width === 0 && direction === -1) ||
    //If snake hits the top
    (currentSnake[0] - width < 0 && direction === -width) ||
    //If snake hits itself
    squares[currentSnake[0] + direction].classList.contains('snake')
  )

    //Stp running the setInterval
    return clearInterval(timerId);

  //To move the snake first remove the last element from the snake array 
  const tail = currentSnake.pop();
  //Remove the styling of the square in the squares array
  squares[tail].classList.remove('snake');
  //In the snake array add a new square in the direction chosen
  currentSnake.unshift(currentSnake[0] + direction);


  //When the snake eats an apple:
  if (squares[currentSnake[0]].classList.contains('apple')) {
    //Remove the class of apple from the square where the snake head is
    squares[currentSnake[0]].classList.remove('apple');
    //Grow the snake by adding class of snake to the tail
    squares[tail].classList.add('snake');
    //Increase the snake array
    currentSnake.push(tail);
    //Generate a new apple
    generateApple();
    //Increase the score
    score++;
    //Display the score
    scoreDisplay.textContent = score;
  }

  //Add the styling to the corresponding square in the squares array 
  squares[currentSnake[0]].classList.add('snake');


}

//Make the snake move every half a second
const timerId = setInterval(move, 500);


function generateApple() {
  do {
    appleIndex = Math.floor(Math.random() * squares.length);
  } while (squares[appleIndex].classList.contains('snake'));

  squares[appleIndex].classList.add('apple');
}

generateApple()

//Function controlling the snake moves using the arrow keys
function control(e) {
  switch (e.keyCode) {
    //Left
    case 37:
      direction = -1;
      break;
    //Up
    case 38:
      direction = -width;
      break;
    //Right
    case 39:
      direction = 1;
      break;
    //Down
    case 40:
      direction = width;
      break;
  }
}

//Add an event listener to the document that will run the control function when a keyup event is registered
document.addEventListener('keyup', control)