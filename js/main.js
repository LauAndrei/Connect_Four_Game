//MODEL
const grid = document.querySelector(".grid");
createBoard();
const squares = document.querySelectorAll(".grid div");
const currentPlayerDisplay = document.querySelector("#current-player");
const result = document.querySelector("#result");
let currentPlayer = 1;

function checkForWin(index) {
  let consecutive = 0;
  let limitLeft = index - index % 7;
  let limitRight
  let offsetRight = 6 - index % 7;
  if (offsetRight > 3) {
    limitRight = index + 3;
  } else {
    limitRight = index + offsetRight;
  }
  let limitUp = index - 21;
  let limitDown = index + 21;
  let winClass;
  if (currentPlayer === 1) {
    winClass = "player-one"
  } else {
    winClass = "player-two"
  }
  for (let i = limitLeft; i <= limitRight; i++) {
    //check horizontal
    if (!squares[i].classList.contains(winClass)) {
      consecutive = 0;
    } else {
      consecutive++;
    }
    if (consecutive === 4) {
      return true;
    }
  }
  for (let i = limitUp; i <= limitDown; i += 7) {
    //check vertical; used try catch because i was too lazy to compute offsetUp and down
    try {
      if (!squares[i].classList.contains(winClass)) {
        consecutive = 0;
      } else {
        consecutive++;
      }
      if (consecutive === 4) {
        return true;
      }
    } catch (e) {

    }
  }
  return false;
}

//VIEW
function createBoard() {
  for (let i = 0; i < 42; i++) {
    const emptySpace = document.createElement("div");
    emptySpace.classList.add("empty");
    grid.appendChild(emptySpace);
  }
  for (let i = 0; i < 7; i++) {
    const takenSpace = document.createElement("div");
    takenSpace.classList.add("taken");
    grid.appendChild(takenSpace);
  }
}

//CONTROLLER
for (let i = 0; i < squares.length - 7; i++) {
  squares[i].onclick = () => {
    let j = i;
    if ((!squares[i].classList.contains("player-one")) && (!squares[i].classList.contains("player-two"))) {
      while ((!squares[j + 7].classList.contains("taken")) && (!squares[j + 7].classList.contains("player-one")) && (!squares[j + 7].classList.contains("player-two"))) {
        j += 7;
      }
      if (currentPlayer === 1) {
        squares[j].classList.add("player-one");
        currentPlayerDisplay.textContent = "2";
      } else {
        squares[j].classList.add("player-two");
        currentPlayerDisplay.textContent = "1"
      }
      if (checkForWin(j)) {
        if (currentPlayer === 1) {
          result.textContent = "PLAYER 1 WON!";
        } else {
          result.textContent = "PLAYER 2 WON!";
        }
        for (let i = 0; i < squares.length - 7; i++) squares[i].onclick = null;
      } else {
        currentPlayer = -currentPlayer;
      }
    }
  }
}

