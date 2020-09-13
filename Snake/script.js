const grid = document.querySelector('.grid');
const start = document.querySelector('#start');
const score = document.querySelector('#score');
const squares = [];
const currentSnake = [2, 1, 0];
let direction = 1;
const width = 10;

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
  //Add the styling to the corresponding square in the squares array 
  squares[currentSnake[0]].classList.add('snake');

}

const timerId = setInterval(move, 500);

function control(e) {
  switch (e.keyCode) {
    case 37:
      direction = -1;
      break;
    case 38:
      direction = -width;
      break;
    case 39:
      direction = 1;
      break;
    case 40:
      direction = width;
      break;
  }
}

document.addEventListener('keyup', control)