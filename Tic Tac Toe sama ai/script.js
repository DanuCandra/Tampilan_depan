let btnRef = document.querySelectorAll(".button-option");
let popupRef = document.querySelector(".popup");
let newgameBtn = document.getElementById("new-game");
let restartBtn = document.getElementById("restart");
let msgRef = document.getElementById("message");

// Winning Pattern Array
let winningPattern = [
  [0, 1, 2],
  [0, 3, 6],
  [2, 5, 8],
  [6, 7, 8],
  [3, 4, 5],
  [1, 4, 7],
  [0, 4, 8],
  [2, 4, 6],
];

// Player 'X' plays first
let player = "X";
let ai = "O";
let xTurn = true;
let count = 0;

// Disable All Buttons
const disableButtons = () => {
  btnRef.forEach((element) => (element.disabled = true));
  // enable popup
  popupRef.classList.remove("hide");
};

// Enable all buttons (For New Game and Restart)
const enableButtons = () => {
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  // disable popup
  popupRef.classList.add("hide");
};

// This function is executed when a player wins
const winFunction = (letter) => {
  disableButtons();
  if (letter === player) {
    msgRef.innerHTML = "&#x1F389; <br> 'X' Wins";
  } else {
    msgRef.innerHTML = "&#x1F389; <br> 'O' Wins";
  }
};

// Function for draw
const drawFunction = () => {
  disableButtons();
  msgRef.innerHTML = "&#x1F60E; <br> It's a Draw";
};

// New Game
newgameBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  playGame();
});

restartBtn.addEventListener("click", () => {
  count = 0;
  enableButtons();
  playGame();
});

// Win Logic
const winChecker = () => {
  // Loop through all win patterns
  for (let i of winningPattern) {
    let [element1, element2, element3] = [
      btnRef[i[0]].innerText,
      btnRef[i[1]].innerText,
      btnRef[i[2]].innerText,
    ];
    // Check if elements are filled
    // If 3 empty elements are same and would give win as would
    if (element1 !== "" && element2 !== "" && element3 !== "") {
      if (element1 === element2 && element2 === element3) {
        // If all 3 buttons have the same values then pass the value to winFunction
        winFunction(element1);
      }
    }
  }
};

// Display X/O on click
btnRef.forEach((element) => {
  element.addEventListener("click", () => {
    if (xTurn && element.innerText === "") {
      xTurn = false;
      // Display X
      element.innerText = player;
      element.disabled = true;
      count += 1;
      if (count === 9) {
        drawFunction();
      }
      winChecker();
      if (!xTurn) {
        // AI's turn
        setTimeout(() => {
          aiMove();
          count += 1;
          if (count === 9) {
            drawFunction();
          }
          winChecker();
        }, 500); // Delay for a better user experience
      }
    }
  });
});

// Enable Buttons and disable popup on page load
window.onload = enableButtons;

// AI Logic
function aiMove() {
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (btnRef[i].innerText === "") {
      btnRef[i].innerText = ai;
      let score = minimax(btnRef, 0, false);
      btnRef[i].innerText = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  btnRef[move].innerText = ai;
  btnRef[move].disabled = true;
  xTurn = true; // Switch back to player's turn
  count += 1;
  if (count === 9) {
    drawFunction();
  }
  winChecker();
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return result === "O" ? 10 - depth : depth - 10;
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i].innerText === "") {
        board[i].innerText = ai;
        let score = minimax(board, depth + 1, false);
        board[i].innerText = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i].innerText === "") {
        board[i].innerText = player;
        let score = minimax(board, depth + 1, true);
        board[i].innerText = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// Check the winner
function checkWinner() {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (
      btnRef[a].innerText &&
      btnRef[a].innerText === btnRef[b].innerText &&
      btnRef[a].innerText === btnRef[c].innerText
    ) {
      return btnRef[a].innerText;
    }
  }
  return null;
}

// Play the game (reset everything)
function playGame() {
  xTurn = true;
  count = 0;
  btnRef.forEach((element) => {
    element.innerText = "";
    element.disabled = false;
  });
  popupRef.classList.add("hide");
}

// ... (rest of the original code)

// AI Logic
function aiMove() {
  // Minimax algorithm implementation
  let bestScore = -Infinity;
  let move;
  for (let i = 0; i < 9; i++) {
    if (btnRef[i].innerText === "") {
      btnRef[i].innerText = ai;
      let score = minimax(btnRef, 0, false);
      btnRef[i].innerText = "";
      if (score > bestScore) {
        bestScore = score;
        move = i;
      }
    }
  }
  btnRef[move].innerText = ai;
  btnRef[move].disabled = true;
  xTurn = true; // Switch back to player's turn
  count += 1;
  if (count === 9) {
    drawFunction();
  }
  winChecker();
}

// Minimax algorithm
function minimax(board, depth, isMaximizing) {
  let result = checkWinner();
  if (result !== null) {
    return result === ai ? 10 - depth : depth - 10;
  }
  if (isMaximizing) {
    let bestScore = -Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i].innerText === "") {
        board[i].innerText = ai;
        let score = minimax(board, depth + 1, false);
        board[i].innerText = "";
        bestScore = Math.max(score, bestScore);
      }
    }
    return bestScore;
  } else {
    let bestScore = Infinity;
    for (let i = 0; i < 9; i++) {
      if (board[i].innerText === "") {
        board[i].innerText = player;
        let score = minimax(board, depth + 1, true);
        board[i].innerText = "";
        bestScore = Math.min(score, bestScore);
      }
    }
    return bestScore;
  }
}

// ... (rest of the original code)
