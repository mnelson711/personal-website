const canvas = document.getElementById("snakeCanvas");
const ctx = canvas.getContext("2d");

// Snake properties
const snakeSize = 20;
let snake = [{ x: 100, y: 100 }];
let direction = "right";

// Food properties
let food = { x: 200, y: 200 };

// Score
let score = 0;
const scoreDisplay = document.getElementById("score");
let highscore = 0;
const highscoreDisplay = document.getElementById("highscore");

// Game loop
let gameInterval;

function startGame() {
  // Reset variables
  snake = [{ x: 100, y: 100 }];
  direction = "right";
  score = 0;
  generateFood();

  // Start the game loop
  gameInterval = setInterval(() => {
    clearCanvas();
    moveSnake();
    checkCollision();
    checkFoodCollision();
    drawSnake();
    drawFood();
    scoreDisplay.innerText = "Score: " + score;
    highscoreDisplay.innerText = "High Score: " + highscore;
  }, 75); // Adjust the speed by changing the delay (higher value = slower)

  // Disable the start button after starting the game
  document.getElementById("startButton").disabled = true;

  // Add keyboard event listener after starting the game
  window.addEventListener("keydown", handleKeyPress);
}

function stopGame() {
  clearInterval(gameInterval);

  // Enable the start button after stopping the game
  document.getElementById("startButton").disabled = false;

  // Remove keyboard event listener after stopping the game
  window.removeEventListener("keydown", handleKeyPress);

  if (highscore < score) {
    highscore = score;
  }
}

// Clear the canvas
function clearCanvas() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
}

// Move the snake
function moveSnake() {
  const head = { ...snake[0] };

  // Update the head based on the direction
  switch (direction) {
    case "up":
      head.y -= snakeSize;
      break;
    case "down":
      head.y += snakeSize;
      break;
    case "left":
      head.x -= snakeSize;
      break;
    case "right":
      head.x += snakeSize;
      break;
  }

  // Add the new head to the front of the snake
  snake.unshift(head);

  // Remove the last segment if the snake did not eat food
  if (!ateFood) {
    snake.pop();
  }
}

// Draw the snake on the canvas
function drawSnake() {
  snake.forEach((segment) => {
    ctx.fillStyle = "#00f";
    ctx.fillRect(segment.x, segment.y, snakeSize, snakeSize);
    ctx.strokeStyle = "#00f";
    ctx.strokeRect(segment.x, segment.y, snakeSize, snakeSize);
  });
}

// Check for collision with the walls or itself
function checkCollision() {
  const head = snake[0];

  // Check for collision with walls
  if (
    head.x < 0 ||
    head.x >= canvas.width ||
    head.y < 0 ||
    head.y >= canvas.height
  ) {
    stopGame();
    alert("Game Over! Your score was: " + score);
  }

  // Check for collision with itself
  for (let i = 1; i < snake.length; i++) {
    if (head.x === snake[i].x && head.y === snake[i].y) {
      stopGame();
      alert("Game Over! Your score was: " + score);
    }
  }
}

let ateFood = false;

// Check for collision with food
function checkFoodCollision() {
  const head = snake[0];

  if (head.x === food.x && head.y === food.y) {
    // Increase the snake length
    ateFood = true;
    score++; // Increment the score
    generateFood();
  } else {
    ateFood = false;
  }
}

// Generate random food coordinates
function generateFood() {
  const maxX = canvas.width / snakeSize - 1;
  const maxY = canvas.height / snakeSize - 1;

  food = {
    x: Math.floor(Math.random() * maxX) * snakeSize,
    y: Math.floor(Math.random() * maxY) * snakeSize,
  };
}

// Draw the food on the canvas
function drawFood() {
  ctx.fillStyle = "#f00";
  ctx.fillRect(food.x, food.y, snakeSize, snakeSize);
  ctx.strokeStyle = "#f00";
  ctx.strokeRect(food.x, food.y, snakeSize, snakeSize);
}

// Handle keyboard input to change the direction
function handleKeyPress(event) {
  switch (event.key) {
    case "ArrowUp":
      if (direction != "down") {
        direction = "up";
      }
      break;
    case "ArrowDown":
      if (direction != "up") {
        direction = "down";
      }
      break;
    case "ArrowLeft":
      if (direction != "right") {
        direction = "left";
      }
      break;
    case "ArrowRight":
      if (direction != "left") {
        direction = "right";
      }
      break;
  }
}
