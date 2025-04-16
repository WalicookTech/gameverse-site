
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-auth.js";

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

onAuthStateChanged(auth, (user) => {
  const userInfo = document.getElementById('user-info');
  const userPic = document.getElementById('user-pic');
  const userName = document.getElementById('user-name');

  if (user) {
    userInfo.classList.remove('hidden');
    userPic.src = user.photoURL || 'default-avatar.png';
    userName.textContent = user.displayName || 'Player';
    document.getElementById('login-btn')?.classList.add('hidden');
  } else {
    userInfo.classList.add('hidden');
    document.getElementById('login-btn')?.classList.remove('hidden');
  }
});
