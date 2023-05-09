document.getElementById("startGame").addEventListener("click", function () {
    // for start new game
});

document.getElementById("highScore").addEventListener("click", function () {
    window.location.href = 'high_scores.html';
});

function getHighScores() {
    fetch('/api/highscores')
    .then(response => response.json())
    .then(data => {
        const scoreList = document.getElementById("scoreList");
        scoreList.innerHTML = "";

        data.forEach((scoreItem) => {
            const listItem = document.createElement("li");
            listItem.innerText = `${scoreItem.username}: ${scoreItem.score}`;
            scoreList.appendChild(listItem);
        });
    })
    .catch((error) => {
        console.error('Error:', error);
    });
}
