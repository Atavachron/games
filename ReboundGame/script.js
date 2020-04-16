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
  ballTop = 8,
  drag = false;

window.addEventListener("load", init);
window.addEventListener("resize", init);

function init() {
  const playingArea = get("#playingArea");
  const ball = get("#ball");
  const paddle = get("#paddle");
  const score = get("#score");
  layoutPage();

  document.addEventListener("keydown", keyListener);
  playingArea.addEventListener("mousedown", mouseDown);
  playingArea.addEventListener("mousemove", mouseMove);
  playingArea.addEventListener("mouseup", mouseUp);
  playingArea.addEventListener("touchstart", mouseDown);
  playingArea.addEventListener("touchmove", mouseMove);
  playingArea.addEventListener("touchend", mouseUp);

  timer = requestAnimationFrame(start);
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

function start() {
  render();
  detectCollisions();
  difficulty();
  if (ballTop < pHeight - 36) {
    timer = requestAnimationFrame(start);
  } else {
    gameOver();
  }
}

function render() {
  moveBall();
  updateScore();
}

function moveBall() {
  ballTop += dy;
  ballLeft += dx;
  ball.style.top = `${ballTop}px`;
  ball.style.left = `${ballLeft}px`;
}

function updateScore() {
  currentScore += 5;
  score.innerHTML = `Score: ${currentScore}`;
}

function detectCollisions() {
  if (collisionX()) {
    dx *= -1;
  }

  if (collisionY()) {
    dy *= -1;
  }
}

function collisionX() {
  if (ballLeft < 4 || ballLeft > pWidth - 20) {
    return true;
  }
  return false;
}

function collisionY() {
  if (ballTop < 4) {
    return true;
  }
  if (ballTop > pHeight - 64) {
    if (ballLeft >= paddleLeft && ballLeft <= paddleLeft + 64) {
      return true;
    }
  }
  return false;
}

//If we want an increase in speed and change direction

function difficulty() {
  if (currentScore % 1000 === 0) {
    if (dy > 0) {
      dy += 2;
    } else {
      dy -= 2;
    }
  }
}

/*
//If we want the ball not to change direction with the speed increase

function difficulty() {
  if (currentScore % 1000 === 0) {
    if (dy > 0) {
      dy += 2;
      if (dx > 0) {
        dx += 2;
      } else {
        dx -= 2;
      }
    } else {
      dy -= 2;
      if (dx > 0) {
        dx += 2;
      } else {
        dx -= 2;
      }
    }
  }
}
*/

function gameOver() {
  cancelAnimationFrame(timer);
  score.innerHTML += "   Game Over";
  score.style.backgroundColor = "rgb(128,0,0)";
}

function mouseDown(e) {
  drag = true;
}

function mouseUp(e) {
  drag = false;
}

function mouseMove(e) {
  if (drag) {
    e.preventDefault();
    paddleLeft = e.clientX - 32 || e.targetTouches[0].pageX - 32;
    if (paddleLeft < 0) paddleLeft = 0;
    if (paddleLeft > pWidth - 64) paddleLeft = pWidth - 64;
    paddle.style.left = `${paddleLeft}px`;
  }
}
