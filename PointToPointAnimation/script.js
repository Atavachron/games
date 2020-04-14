const get = (elem) => document.querySelector(elem);

const ball = get("#ball");

let currentX = 100,
  currentY = 100,
  dx = 5,
  dy = 5;

function animate() {
  ball.style.left = `${currentX}px`;
  ball.style.top = `${currentY}px`;

  currentX += dx;
  currentY += dy;

  if (currentX > 800 || currentX < 100) dx *= -1;
  if (currentY > 600 || currentY < 100) dy *= -1;

  setTimeout(animate, 10);
}

window.addEventListener("load", animate);
