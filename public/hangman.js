// Array of words for the game
const words = ["hangman", "javascript", "developer", "programming", "web"];
let guesses = [];

// Randomly select a word from the array
let selectedWord = words[Math.floor(Math.random() * words.length)];

// Array to store the correctly guessed letters
let correctGuesses = Array(selectedWord.length).fill("_");

// Variable to store the number of incorrect guesses allowed
let incorrectGuesses = 6;

// Function to update the displayed word
function updateWordDisplay() {
  document.getElementById("word-container").innerText =
    correctGuesses.join(" ");
}

// Function to handle the user's guess
function guess() {
  const guessInput = document.getElementById("guess-input");
  const guess = guessInput.value.toLowerCase();

  if (guess.length !== 1 || !/[a-z]/.test(guess)) {
    document.getElementById("message").innerText =
      "Please enter a valid single letter.";
    return;
  }

  if (selectedWord.includes(guess)) {
    // Update correct guesses
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guess) {
        correctGuesses[i] = guess;
      }
    }
  } else {
    // Decrement incorrect guesses
    incorrectGuesses--;
    drawStickman(incorrectGuesses);
    guesses.push(guess);

    // Display message about incorrect guess
    document.getElementById(
      "message"
    ).innerText = `Incorrect guess! ${incorrectGuesses} attempts remaining.`;
    document.getElementById(
      "guesses"
    ).innerText = `Guessed Letters: ${guesses}`;

    // Check if the player has run out of attempts
    if (incorrectGuesses === 0) {
      endGame(false);
      return;
    }
  }

  // Check if the word is fully guessed
  if (!correctGuesses.includes("_")) {
    updateWordDisplay();
    endGame(true);
    return;
  }

  // Update the displayed word and clear the input field
  updateWordDisplay();
  guessInput.value = "";
}

// Function to end the game and display the result
function endGame(isWinner) {
  const messageElement = document.getElementById("message");
  if (isWinner) {
    messageElement.innerText = "Congratulations! You guessed the word!";
  } else {
    messageElement.innerText = `Game over! The word was "${selectedWord}". Better luck next time!`;
  }

  // Disable the guess input and button
  document.getElementById("guess-input").disabled = true;
  document.querySelector("button").disabled = true;
}

//drawing the hangman

const canvas = document.getElementById("stickmanCanvas");
const ctx = canvas.getContext("2d");
drawPulpit();
function drawStickman(count) {
  if (count === 5) {
    drawHead();
  } else if (count === 4) {
    drawBody();
  } else if (count === 3) {
    drawLeftArm();
  } else if (count === 2) {
    drawRightArm();
  } else if (count === 1) {
    drawLeftLeg();
  } else if (count === 0) {
    drawRightLeg();
  }
}

function drawPulpit() {
  ctx.beginPath();
  ctx.lineWidth = 5;
  ctx.moveTo(60, 280);
  ctx.lineTo(140, 280);
  ctx.stroke();

  // Vertical Support
  ctx.beginPath();
  ctx.moveTo(100, 280);
  ctx.lineTo(100, 50);
  ctx.stroke();

  // Horizontal Support
  ctx.beginPath();
  ctx.moveTo(100, 50);
  ctx.lineTo(160, 50);
  ctx.stroke();

  // Noose
  ctx.beginPath();
  ctx.moveTo(160, 50);
  ctx.lineTo(160, 90);
  ctx.stroke();
}

function drawHead() {
  ctx.beginPath();
  ctx.arc(160, 110, 20, 0, 2 * Math.PI);
  ctx.stroke();
}

function drawBody() {
  ctx.moveTo(160, 130);
  ctx.lineTo(160, 210);
  ctx.stroke();
}

function drawLeftArm() {
  ctx.moveTo(160, 140);
  ctx.lineTo(120, 170);
  ctx.stroke();
}

function drawRightArm() {
  ctx.moveTo(160, 140);
  ctx.lineTo(200, 170);
  ctx.stroke();
}

function drawLeftLeg() {
  ctx.moveTo(160, 210);
  ctx.lineTo(130, 260);
  ctx.stroke();
}

function drawRightLeg() {
  ctx.moveTo(160, 210);
  ctx.lineTo(190, 260);
  ctx.stroke();
}

// Initialize the game
updateWordDisplay();
