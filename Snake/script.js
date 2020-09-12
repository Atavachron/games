const grid = document.querySelector('.grid');
const start = document.querySelector('#start');
const score = document.querySelector('#score');
const squares = [];

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