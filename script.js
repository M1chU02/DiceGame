function rollDice(player) {
  var dice = document.getElementById(player + "Dice");
  var resultDisplay = document.getElementById("result");

  // Generate a random number between 1 and 6
  var randomNumber = Math.floor(Math.random() * 6) + 1;

  // Update the dice display
  dice.innerHTML = randomNumber;

  // Compare rolls if both have rolled
  if (player === "player") {
    var computerDice = document.getElementById("computerDice");
    var computerRoll = Math.floor(Math.random() * 6) + 1;
    computerDice.innerHTML = computerRoll;

    // Determine the winner
    if (randomNumber > computerRoll) {
      resultDisplay.innerHTML = "You win!";
    } else if (randomNumber < computerRoll) {
      resultDisplay.innerHTML = "Computer wins!";
    } else {
      resultDisplay.innerHTML = "It's a tie!";
    }
  }
}
function toggleMode() {
  document.body.classList.toggle("dark-mode");
}

// Check for user's preference
if (localStorage.getItem("darkMode") === "true") {
  document.body.classList.add("dark-mode");
}
let isUserVsPC = true;

function toggleGameMode() {
  isUserVsPC = !isUserVsPC;
  updateGameMode();
}

function updateGameMode() {
  const currentModeElement = document.getElementById("currentMode");
  const player2RollButton = document.getElementById("player2RollButton");

  if (isUserVsPC) {
    currentModeElement.textContent = "Current Mode: User vs PC";
    player2RollButton.style.display = "none";
  } else {
    currentModeElement.textContent = "Current Mode: User vs User";
    player2RollButton.style.display = "inline-block";
  }

  // Reset the game state
  document.getElementById("player1Dice").textContent = "";
  document.getElementById("player2Dice").textContent = "";
  document.getElementById("result").textContent = "";
}

function rollDice(player) {
  const roll = Math.floor(Math.random() * 6) + 1;
  document.getElementById(`${player}Dice`).textContent = roll;

  if (isUserVsPC && player === "player1") {
    // Automatically roll for PC
    setTimeout(() => rollDice("player2"), 1000);
  }

  checkWinner();
}

function checkWinner() {
  const player1Roll = parseInt(
    document.getElementById("player1Dice").textContent
  );
  const player2Roll = parseInt(
    document.getElementById("player2Dice").textContent
  );

  if (player1Roll && player2Roll) {
    let result;
    if (player1Roll > player2Roll) {
      result = "Player 1 wins!";
    } else if (player2Roll > player1Roll) {
      result = isUserVsPC ? "Computer wins!" : "Player 2 wins!";
    } else {
      result = "It's a tie!";
    }
    document.getElementById("result").textContent = result;
  }
}

// Initialize the game mode
updateGameMode();

// Add event listener for the toggle button
document
  .getElementById("toggleGameMode")
  .addEventListener("click", toggleGameMode);
