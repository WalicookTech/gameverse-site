
// comments.js - Firebase Firestore Comments Handling

// Replace with your config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID",
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

const form = document.getElementById("comment-form");
const nameInput = document.getElementById("comment-name");
const textInput = document.getElementById("comment-text");
const commentsList = document.getElementById("comments-list");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const name = nameInput.value.trim();
  const text = textInput.value.trim();
  if (!name || !text) return;

  await db.collection("comments").add({
    name,
    text,
    timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    game: "Epic Adventure Game"
  });

  nameInput.value = "";
  textInput.value = "";
});

db.collection("comments")
  .orderBy("timestamp", "desc")
  .where("game", "==", "Epic Adventure Game")
  .onSnapshot(snapshot => {
    commentsList.innerHTML = "";
    snapshot.forEach(doc => {
      const c = doc.data();
      const div = document.createElement("div");
      div.className = "bg-gray-800 p-3 rounded shadow";
      div.innerHTML = \`<strong>\${c.name}</strong>: \${c.text}\`;
      commentsList.appendChild(div);
    });
  });
