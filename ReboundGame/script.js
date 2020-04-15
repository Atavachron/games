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
window.addEventListener("resize", init);

function init() {
  const playingArea = get("#playingArea");
  const ball = get("#ball");
  const paddle = get("#paddle");
  const score = get("#score");
  document.addEventListener("keydown", keyListener);
  layoutPage();
}

function layoutPage() {
  pWidth = innerWidth - 20;
  pHeight = innerHeight - 20;
  playingArea.style.width = `${pWidth}px`;
  playingArea.style.height = `${pHeight}px`;
}

function keyListener(e) {
  let pressed = e.key;
  if ((pressed == "ArrowLeft" || pressed == "a") && paddleLeft > 0) {
    paddleLeft -= pdx;
    if (paddleLeft < 0) paddleLeft = 0;
    paddle.style.left = `${paddleLeft}px`;
  } else if (
    (pressed == "ArrowRight" || pressed == "d") &&
    paddleLeft < pWidth - 64
  ) {
    paddleLeft += pdx;
    if (paddleLeft > pWidth - 64) paddleLeft = pWidth - 64;
  }
  paddle.style.left = `${paddleLeft}px`;
}
