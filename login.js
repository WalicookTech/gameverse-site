// login.js

// TODO: Replace this with your actual Firebase config!
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "your-project-id.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project-id.appspot.com",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Google login
const googleLoginBtn = document.getElementById("google-login");

googleLoginBtn?.addEventListener("click", () => {
  const provider = new firebase.auth.GoogleAuthProvider();
  firebase.auth().signInWithPopup(provider)
    .then(result => {
      console.log("User signed in:", result.user);
      alert(`Welcome, ${result.user.displayName || "Player"}!`);
    })
    .catch(error => {
      console.error("Google sign-in error:", error);
      alert("Google sign-in failed. Please try again.");
    });
});
