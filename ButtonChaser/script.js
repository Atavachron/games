const get = (element) => document.querySelector(element);

const gameArea = get("#gameArea");
const dot = get("#dot");
const scoreLabel = get("#scoreLabel");

let score = 0,
  iterations = 0;
let aWidth, aHeight, timer;

window.addEventListener("load", setArea);

function setArea() {
  aWidth = innerWidth - 22; //Two by 10px (for each side) and two by 1px border
  aHeight = innerHeight - 97; // The area is positioned75px  from the top + 22px from above (to make space equal at the top and the sides)

  gameArea.style.width = `${aWidth}px`;
  gameArea.style.height = `${aHeight}px`;
  dot.addEventListener("click", detectHit);

  aWidth -= 64; //To make sure that the button stays within the area, its width and height are subtracted from the available width and height
  aHeight -= 64; //This will not affect the gameArea width and height but will matter in the moveDot function that follows.

  moveDot();
}

function detectHit() {
  score++;
  scoreLabel.innerHTML = `Score: ${score}`;
}

function moveDot() {
  let x = Math.floor(Math.random() * aWidth); //The aWidth/aHeight here are the adjusted ones, with the button dimensions subtracted
  let y = Math.floor(Math.random() * aHeight);

  if (x < 10) x = 10; //This is to prevent the top left corner of the button be over the top/left line
  if (y < 10) y = 10;

  dot.style.left = `${x}px`;
  dot.style.top = `${y}px`;

  if (iterations < 10) {
    timer = setTimeout(moveDot, 1000);
  } else {
    scoreLabel.innerHTML += `  Game Over!`;
    dot.removeEventListener("click", detectHit);
    clearTimeout(timer);
  }

  iterations++;
}
