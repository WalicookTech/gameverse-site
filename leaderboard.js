// leaderboard.js with real-time updates

const db = firebase.firestore();
const leaderboardContainer = document.getElementById("leaderboard");

function renderLeaderboard(scores) {
  leaderboardContainer.innerHTML = "";
  scores.forEach(doc => {
    const data = doc.data();
    const div = document.createElement("div");
    div.textContent = `${data.username} - ${data.game} - ${data.score}`;
    leaderboardContainer.appendChild(div);
  });
}

db.collection("scores")
  .orderBy("score", "desc")
  .onSnapshot((snapshot) => {
    renderLeaderboard(snapshot.docs);
  });
