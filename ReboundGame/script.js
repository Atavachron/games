const get = (elem) => document.querySelector(elem);

let pWidth,
  pHeight,
  dx = 2,
  dy = 2,
  pdx = 48,
  currentScore = 0,
  timer,
  paddleLeft = 228,
  ballLeft = 100,
  ballTop = 8;

window.addEventListener("load", init);

function init() {
  const playingArea = get("#playingArea");
  const ball = get("#ball");
  const paddle = get("#paddle");
  const score = get("#score");
  layoutPage();
}

function layoutPage() {
  pWidth = innerWidth - 22;
  pHeight = innerHeight - 22;
  playingArea.style.width = `${pWidth}px`;
  playingArea.style.height = `${pHeight}px`;
}
