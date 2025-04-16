// submitScore.js

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
const auth = firebase.auth();
const db = firebase.firestore();

const scoreForm = document.getElementById("scoreForm");
const statusDiv = document.getElementById("status");

scoreForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const user = auth.currentUser;
  if (!user) {
    statusDiv.textContent = "❌ You must be logged in to submit a score.";
    return;
  }

  const game = document.getElementById("game").value;
  const score = parseInt(document.getElementById("score").value);

  db.collection("scores").add({
    username: user.displayName || user.email || "Anonymous",
    game: game,
    score: score,
    timestamp: firebase.firestore.FieldValue.serverTimestamp()
  })
  .then(() => {
    statusDiv.textContent = "✅ Score submitted!";
    scoreForm.reset();
  })
  .catch((error) => {
    statusDiv.textContent = "Error: " + error.message;
  });
});
