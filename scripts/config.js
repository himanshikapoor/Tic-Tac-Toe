function openPlayerNameConfig(event) {
    overlayElement.style.display = "block";
    backdropElement.style.display = "block";
    editedPlayerId = event.target.dataset.playerid; // string
}

function hidePlayerNameConfig() {
    overlayElement.style.display = "none";
    notificationOverlayElement.style.display = "none";
    backdropElement.style.display = "none";
    formElement.firstElementChild.classList.remove("error");
    errorMessageElement.textContent = "";
    formElement.reset();
}

function playerNameConfig(event) {
    event.preventDefault();
    // Extracting form data
    const formData = new FormData(event.target);
    const playerName = formData.get("user-name").trim();
    // Validating the form data
    if (!playerName) {
        event.target.firstElementChild.classList.add("error");
        errorMessageElement.textContent = "Please enter a valid player name";
        return;
    }

    // Modifying the player name in website
    const editedPlayer = document.getElementById(
        "player-" + editedPlayerId + "-details"
    );
    editedPlayer.children[1].textContent = playerName;
    // Storing the player name
    player[+editedPlayerId - 1].name = playerName;
    hidePlayerNameConfig();
}
