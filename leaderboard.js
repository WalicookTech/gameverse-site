// leaderboard.js with real-time updates

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

const leaderboardBody = document.getElementById("leaderboardBody");

function listenForScores() {
  db.collection("scores")
    .orderBy("score", "desc")
    .onSnapshot((snapshot) => {
      leaderboardBody.innerHTML = "";
      snapshot.forEach((doc) => {
        const { username, game, score, timestamp } = doc.data();
        const row = document.createElement("tr");
        row.innerHTML = `
          <td>${username}</td>
          <td>${game}</td>
          <td>${score}</td>
          <td>${timestamp?.toDate().toLocaleString() || ""}</td>
        `;
        leaderboardBody.appendChild(row);
      });
    });
}

listenForScores();
