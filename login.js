// login.js with user info display and logout

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

// Show user info and logout
auth.onAuthStateChanged((user) => {
  const userInfo = document.getElementById("user-info");

  if (user) {
    const displayName = user.displayName || user.email;
    const photoURL = user.photoURL;

    userInfo.innerHTML = `
      <img src="${photoURL}" alt="User Photo" style="width:32px;height:32px;border-radius:50%;margin-right:8px;">
      <span>${displayName}</span>
      <button onclick="logout()">Logout</button>
    `;
  } else {
    userInfo.innerHTML = `<a href="login.html">Login</a>`;
  }
});

function logout() {
  auth.signOut().then(() => {
    location.reload();
  });
}
