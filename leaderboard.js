// leaderboard.js

// TODO: Replace with your Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const leaderboardBody = document.getElementById("leaderboard-body");
const filterGameInput = document.getElementById("filterGame");

function renderScores(filterGame = "") {
  leaderboardBody.innerHTML = "";
  let query = db.collection("scores").orderBy("score", "desc").limit(100);

  query.get().then(snapshot => {
    snapshot.forEach(doc => {
      const { username, game, score, timestamp } = doc.data();
      if (!filterGame || game.toLowerCase().includes(filterGame.toLowerCase())) {
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${username || "Anonymous"}</td>
          <td>${game}</td>
          <td>${score}</td>
          <td>${timestamp?.toDate().toLocaleString() || ""}</td>
        `;
        leaderboardBody.appendChild(row);
      }
    });
  });
}

filterGameInput?.addEventListener("input", () => {
  renderScores(filterGameInput.value);
});

window.onload = () => renderScores();
