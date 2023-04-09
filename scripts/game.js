function resetGame() {
    gameOverElement.style.display = "none";
    activePlayerIndex = 0;
    rounds = 1;
    gameOverElement.firstElementChild.innerHTML =
        'You won <span id="winner-name"></span> !';

    let index = 0;
    for (let i = 0; i < 3; i++) {
        for (let j = 0; j < 3; j++) {
            gameBoard[i][j] = 0;
            let gameBoardCell = gameBoardElements[index];
            gameBoardCell.classList.remove("disabled");
            gameBoardCell.textContent = "";
            index++;
        }
    }
    gameIsOver = false;
}

function startNewGame() {
    if (player[0].name === "" || player[1].name === "") {
        backdropElement.style.display = "block";
        notificationOverlayElement.style.display = "block";
        return;
    }
    resetGame();
    gameBoardElement.style.display = "block";
    activePlayerName.textContent = player[activePlayerIndex].name;
}

function closeNotification() {
    backdropElement.style.display = "none";
    notificationOverlayElement.style.display = "none";
}

function switchPlayer(selectedField) {
    selectedField.textContent = player[activePlayerIndex].symbol;
    activePlayerIndex = (activePlayerIndex + 1) % 2;
    activePlayerName.textContent = player[activePlayerIndex].name;
}

function selectGameCell(event) {
    const selectedField = event.target;

    if (
        gameBoard[+selectedField.dataset.row][+selectedField.dataset.col] > 0 ||
        gameIsOver
    )
        return;

    gameBoard[+selectedField.dataset.row][+selectedField.dataset.col] =
        activePlayerIndex + 1;

    selectedField.classList.add("disabled");
    switchPlayer(selectedField);

    let winnerId = checkGameOver();
    if (winnerId === -1) {
        gameOverElement.firstElementChild.innerHTML = "It's a draw!";
        gameOverElement.style.display = "block";
        gameIsOver = true;
    } else if (winnerId !== 0) {
        gameOverElement.firstElementChild.firstElementChild.textContent =
            player[winnerId - 1].name;
        gameOverElement.style.display = "block";
        gameIsOver = true;
    }
    rounds++;
}

function checkGameOver() {
    for (let i = 0; i < 3; i++) {
        // Checking rows for equality
        if (
            gameBoard[i][0] !== 0 &&
            gameBoard[i][0] === gameBoard[i][1] &&
            gameBoard[i][1] === gameBoard[i][2]
        )
            return gameBoard[i][0];

        // Checking columns for equality
        if (
            gameBoard[0][i] !== 0 &&
            gameBoard[0][i] === gameBoard[1][i] &&
            gameBoard[1][i] === gameBoard[2][i]
        )
            return gameBoard[0][i];
    }

    // Checking primary diagonal
    if (
        gameBoard[0][0] !== 0 &&
        gameBoard[0][0] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][2]
    )
        return gameBoard[0][0];

    // Checking the secondary diagonal
    if (
        gameBoard[0][2] !== 0 &&
        gameBoard[0][2] === gameBoard[1][1] &&
        gameBoard[1][1] === gameBoard[2][0]
    )
        return gameBoard[0][2];

    // Checking for a draw
    if (rounds === 9) return -1;

    return 0;
}
