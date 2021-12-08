"use strict";

// Modal, display victory or game over
let modal = document.querySelector('.modal');
let modalText = document.querySelector('.modal-message');
modal.addEventListener('click', () =>{
 modal.style.display = 'none'; 
 drawStart();
})

// canvas
const canvas = document.getElementById("game");
/** @type {CanvasRenderingContext2D} */
const ctx = canvas.getContext("2d");



// Lives
let lives = 3;
function drawLives() {
  ctx.beginPath();
  ctx.font = "16px Arial";
  ctx.fillText(`Lives: ${lives}`, canvas.width - 70, 20);
  ctx.closePath();
}
// PADDLE
// Controllable paddle variables
let paddleHeight = 10;
let paddleWidth = 100;
let paddleX = (canvas.width - paddleWidth) / 2;
let paddleY = canvas.height - paddleHeight;

// Function to handle the Paddle
function drawPaddle() {
  ctx.beginPath();
  ctx.rect(paddleX, paddleY, paddleWidth, paddleHeight);
  ctx.fillStyle = "#AA11AA";
  ctx.fill();
  ctx.closePath();
}

//  KEYBOARD CONTROL
let moveLeft = false;
let moveRight = false;

// Functions handler when keys are pressed and released
function keyDownHandler(e) {
  if (e.key === "ArrowLeft") {
    moveLeft = true;
  }
  if (e.key === "ArrowRight") {
    moveRight = true;
  }
}
function keyUpHandler(e) {
  if (e.key === "ArrowLeft") {
    moveLeft = false;
  }
  if (e.key === "ArrowRight") {
    moveRight = false;
  }
}
document.addEventListener("keydown", keyDownHandler, false);
document.addEventListener("keyup", keyUpHandler, false);

//  MOUSE CONTROL. The mouse will only be controlling when the user is pressing the left mouse button.
// This will change the paddle movement the the user move the mouse, this event will only be added when the user is pressing the mouse button.
function mouseMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > paddleX + paddleWidth / 2) {
    moveLeft = false;
    moveRight = true;
  } else if (relativeX < paddleX + paddleWidth / 2) {
    moveRight = false;
    moveLeft = true;
  } else {
    moveRight = false;
    moveLeft = false;
  }
}
// When the user press the button, an event will be added to check the movement of the mouse, and change the paddle movement.
function mouseDownHandler(e) {
  document
    .querySelector("#game")
    .addEventListener("mousemove", mouseMoveHandler, true);
}
// When the user release the button, paddle movements will stop and the position of the mouse will no longer indicate the paddle movement.
function mouseUpHandler() {
  moveRight = false;
  moveLeft = false;
  document
    .querySelector("#game")
    .removeEventListener("mousemove", mouseMoveHandler, true);
}

// Add events for when the user press and release the mouse buttons
document
  .querySelector("#game")
  .addEventListener("mousedown", mouseDownHandler, false);
document
  .querySelector("#game")
  .addEventListener("mouseup", mouseUpHandler, false);



// TOUCHPAD CONTROL
// This will change the paddle movement the the user move the finger of the screen, this event will only be added when the user is pressing the screen button.
function touchMoveHandler(e) {
  let relativeX = e.clientX - canvas.offsetLeft;
  if (relativeX > paddleX + paddleWidth / 2) {
    moveLeft = false;
    moveRight = true;
  } else if (relativeX < paddleX + paddleWidth / 2) {
    moveRight = false;
    moveLeft = true;
  } else {
    moveRight = false;
    moveLeft = false;
  }
}
// When the user press the screent, an event will be added to check the movement of the touchscreen, and change the paddle movement.
function mouseDownHandler(e) {
  document
    .querySelector("#game")
    .addEventListener("touchmove", touchMoveHandler, true);
}

// When the user release the screen, paddle movements will stop and the position of the touch will no longer indicate the paddle movement.
function touchEndHandler() {
  moveRight = false;
  moveLeft = false;
  document
    .querySelector("#game")
    .removeEventListener("touchmove", touchMoveHandler, true);
}

// Add events for when the user touch and released.
document
  .querySelector("#game")
  .addEventListener("touchstart", mouseDownHandler, false);
document
  .querySelector("#game")
  .addEventListener("touchend", touchEndHandler, false);


// BALL
// Ball Starting position variables
let ballX = canvas.width / 2;
let ballY = canvas.height - 30;

// Ball movement variables
let ballDX = 8 * (Math.random() - Math.random());
let ballDY = -(2 + 4 * Math.random());

// Ball radius
let ballRadius = 10;

// Function to handle the ball
function drawBall() {
  ctx.beginPath();
  ctx.arc(ballX, ballY, ballRadius, 0, Math.PI * 2);
  ctx.fillStyle = "#0095DD";
  ctx.fill();
  ctx.closePath();
}
// BRICKS
const bricksProtototype = {
  Width: 75,
  kHeight: 20,
  kPadding: 10,
  kOffsetTop: 30,
  kOffsetLeft: 30,
};

let brickRowCount = 5;
let brickColumnCount = 6;
let brickWidth = 50;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 30;

let bricks = [];
for (let c = 0; c < brickColumnCount; c++) {
  bricks[c] = [];
  for (let r = 0; r < brickRowCount; r++) {
    bricks[c][r] = { y: 0, x: 0, status: 1 };
  }
}
function drawBricks() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      if (bricks[c][r].status == 1) {
        let brickX = c * (brickWidth + brickPadding) + brickOffsetLeft + 10;
        let brickY = r * (brickHeight + brickPadding) + brickOffsetTop;
        bricks[c][r].x = brickX;
        bricks[c][r].y = brickY;
        ctx.beginPath();
        ctx.rect(brickX, brickY, brickWidth, brickHeight);
        ctx.fillStyle = "#a82424";
        ctx.fill();
        ctx.closePath();
      }
    }
  }
}
// COLLISION OF BRICKS
function collisionDetection() {
  for (let c = 0; c < brickColumnCount; c++) {
    for (let r = 0; r < brickRowCount; r++) {
      let b = bricks[c][r];
      if (b.status == 1) {
        if (
          ballX > b.x &&
          ballX < b.x + brickWidth &&
          ballY > b.y &&
          ballY < b.y + brickHeight
        ) {
          ballDY = -ballDY * 0.9;
          ballDX = ballDX * 0.9;
          b.status = 0;
          score += 1;
        }
      }
    }
  }
}
// SCORE COUNT
let score = 0;
// Score function
function drawScore() {
  ctx.beginPath();
  ctx.fillStyle = "#000000";
  ctx.fillText(`Score: ${score}`, 5, 20);
  ctx.closePath();
}

// Main function, it will call other functions.
function drawGame() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  drawBricks();
  drawBall();
  drawPaddle();
  drawScore();
  drawLives();
  collisionDetection();
  // Ball collision with right and left wall
  if (
    ballX + ballDX > canvas.width - ballRadius ||
    ballX + ballDX < ballRadius
  ) {
    ballDX = -(ballDX * 0.9);
    ballDY = ballDY * 0.9;
  }
  // Ball collision upper wall
  if (ballY + ballDY < ballRadius) {
    ballDY = -(ballDY * 0.9);
    ballDX = ballDX * 0.9;
  }
  // Ball collision with paddle
  if (
    ballY + ballDY > paddleY - ballRadius &&
    ballX > paddleX &&
    ballX < paddleX + paddleWidth
  ) {
    // The ball will gain velocity when colling with the paddle
    // The ball gain up velocity
    ballDY = -(ballDY + 2);
    // The ball will gain horizantal velocity in the same direction the paddle is moving.
    if (moveRight) {
      ballDX = ballDX + 3;
    } else if (moveLeft) {
      ballDX = ballDX - 3;
    } else {
      ballDX = ballDX + 1 * Math.sign(ballDX);
    }
  }

  // Lose lives, the ball reach the bottom wall.
  if (ballY + ballDY > canvas.height) {
    lives -= 1;
    ballX = paddleX + paddleWidth / 2;
    ballY = canvas.height - 30;
    ballDX = 8 * (Math.random() - Math.random());
    ballDY = -(2 + 4 * Math.random());
  }

  // Gravity
  ballDY = ballDY + 0.02;
  // Ball movement, changes the current position of the ball
  ballX += ballDX;
  ballY += ballDY;

  // Paddle movement + stops when collision with the side walls
  // Left movement
  if (moveLeft) {
    paddleX -= 8;
    if (paddleX < 0) {
      paddleX = 0;
    }
  }
  // Right movement
  if (moveRight) {
    paddleX += 8;
    if (paddleX + paddleWidth > canvas.width) {
      paddleX = canvas.width - paddleWidth;
    }
  }
  // Check if the player won the game
  if (score === 35) {
    modalText.innerHTML = 'You Won!!'
    modal.style.display = 'flex'
    return;
  }
  // Check if the user lost the game
  if (lives === 0) {
    modalText.innerHTML = 'Game Over. You Lost!!'
    modal.style.display = 'flex'
    return;
  }
  requestAnimationFrame(drawGame);
}


function startGame() {
  // Resert the variables
  score = 0;
  lives = 3;
  ballX = canvas.width / 2;
  ballY = canvas.height - 30;
  ballDX = 8 * (Math.random() - Math.random());
  ballDY = -(2 + 4 * Math.random());
  paddleX = (canvas.width - paddleWidth) / 2;
  paddleY = canvas.height - paddleHeight;


  bricks.forEach((row) => row.forEach((element) => (element.status = 1)));
  
  document.querySelector("#game").removeEventListener("click", startGame);
  drawGame();
}

function drawStart() {
  
  // Clean the game drawing from the canvas
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Start Menu
  ctx.beginPath();
  ctx.font = "28px Arial";
  ctx.fillText("Click with mouse to start game", 20, canvas.height / 2);
  ctx.closePath();

  document.querySelector("#game").addEventListener("click", startGame);
}

drawStart();
