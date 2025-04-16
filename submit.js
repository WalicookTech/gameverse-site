
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";
import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const form = document.getElementById('score-form');
const status = document.getElementById('status');

let currentUser = null;

onAuthStateChanged(auth, user => {
  if (user) {
    currentUser = user;
  } else {
    status.textContent = "You must be logged in to submit a score.";
    form.style.display = "none";
  }
});

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  if (!currentUser) return;

  const game = document.getElementById('game').value.trim();
  const score = parseInt(document.getElementById('score').value, 10);

  if (!game || isNaN(score)) {
    status.textContent = "Please fill out all fields correctly.";
    return;
  }

  if (score > 1000000) {
    status.textContent = "Nice try 😏 — score too high to be real.";
    return;
  }

  try {
    await addDoc(collection(db, "scores"), {
      game,
      score,
      uid: currentUser.uid,
      name: currentUser.displayName || "Anonymous",
      timestamp: serverTimestamp()
    });
    status.textContent = "Score submitted successfully!";
    form.reset();
    window.location.href = "leaderboard.html";
  } catch (err) {
    status.textContent = "Error submitting score: " + err.message;
  }
});
