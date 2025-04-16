
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.11.0/firebase-app.js";
import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  query,
  where,
  getDocs
} from "https://www.gstatic.com/firebasejs/10.11.0/firebase-firestore.js";

// TODO: Replace with your actual Firebase config
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_PROJECT.appspot.com",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

const usernameEl = document.getElementById("username");
const avatarEl = document.getElementById("avatar");
const bioEl = document.getElementById("bio");
const saveBtn = document.getElementById("save-bio");
const scoreListEl = document.getElementById("score-list");

onAuthStateChanged(auth, async (user) => {
  if (user) {
    usernameEl.textContent = user.displayName || user.email;
    avatarEl.src = user.photoURL || "https://via.placeholder.com/100";

    const bioRef = doc(db, "profiles", user.uid);
    const bioSnap = await getDoc(bioRef);
    if (bioSnap.exists()) {
      bioEl.value = bioSnap.data().bio || "";
    }

    saveBtn.addEventListener("click", async () => {
      await setDoc(bioRef, { bio: bioEl.value }, { merge: true });
      alert("Bio saved!");
    });

    const q = query(collection(db, "scores"), where("uid", "==", user.uid));
    const scoreSnap = await getDocs(q);
    scoreSnap.forEach(doc => {
      const data = doc.data();
      const li = document.createElement("li");
      li.textContent = `${data.game || "Unknown"}: ${data.score} pts (${new Date(data.timestamp?.toDate?.() || Date.now()).toLocaleString()})`;
      scoreListEl.appendChild(li);
    });
  } else {
    usernameEl.textContent = "Not signed in";
    avatarEl.src = "https://via.placeholder.com/100";
    bioEl.disabled = true;
    saveBtn.disabled = true;
  }
});
