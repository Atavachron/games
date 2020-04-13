const get = (element) => document.querySelector(element);

const gameArea = get("#gameArea");
const dot = get("#dot");
const scoreLabel = get("#scoreLabel");

let score = 0,
  iterations = 0;
let aWidth, aHeight, timer;

window.addEventListener("load", setArea);

function setArea() {
  aWidth = innerWidth - 22;
  aHeight = innerHeight - 97;

  gameArea.style.width = `${aWidth}px`;
  gameArea.style.height = `${aHeight}px`;
  dot.addEventListener("click", detectHit);

  aWidth -= 74;
  aHeight -= 74;

  moveDot();
}

function detectHit() {
  score++;
  scoreLabel.innerHTML = `Score: ${score}`;
}

function moveDot() {
  let x = Math.floor(Math.random() * aWidth);
  let y = Math.floor(Math.random() * aHeight);

  if (x < 10) x = 10;
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
