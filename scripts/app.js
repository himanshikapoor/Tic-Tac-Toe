// Showing and hiding the modal
const editPlayer1BtnElement = document.getElementById("editPlayer1Btn");
const editPlayer2BtnElement = document.getElementById("editPlayer2Btn");

editPlayer1BtnElement.addEventListener("click", openPlayerNameConfig);
editPlayer2BtnElement.addEventListener("click", openPlayerNameConfig);

const cancelBtnElement = document.querySelector("#config-modal button");
cancelBtnElement.addEventListener("click", hidePlayerNameConfig);

const overlayElement = document.querySelector(".modal");
const backdropElement = document.getElementById("backdrop");
backdropElement.addEventListener("click", hidePlayerNameConfig);

// Storing and managing the submitted player names
const formElement = document.querySelector("form");
formElement.addEventListener("submit", playerNameConfig);
const errorMessageElement = document.getElementById("errorMessage");
let editedPlayerId;
let player = [
    {
        name: "",
        symbol: "X",
    },
    {
        name: "",
        symbol: "O",
    },
];

// GAME LOGIC

// Displaying the game Board
const startGameButtonElement = document.getElementById("start-game-btn");
startGameButtonElement.addEventListener("click", startNewGame);
const gameBoardElement = document.getElementById("active-game");

// Displaying the error message if player names are not edited
const notificationOverlayElement = document.getElementById(
    "enter-name-notification"
);
const closeBtnElement = document.getElementById("close-btn");
closeBtnElement.addEventListener("click", closeNotification);

// Activating the game board
const gameBoardElements = document.querySelectorAll("#game-board li");
for (const gameBoardElement of gameBoardElements)
    gameBoardElement.addEventListener("click", selectGameCell);
let activePlayerIndex = 0;
const activePlayerName = document.getElementById("active-player-name");
let gameBoard = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
];
const gameOverElement = document.getElementById("game-over");
const winnerNameElement = document.getElementById("winner-name");
let rounds = 1;
let gameIsOver = false;
