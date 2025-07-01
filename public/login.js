// login.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

// Your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyBqXvABRvWRe319EFHLoHEaFlT21GqOHGQ",
  authDomain: "lyricsplus-3aa04.firebaseapp.com",
  projectId: "lyricsplus-3aa04",
  storageBucket: "lyricsplus-3aa04.firebasestorage.app",
  messagingSenderId: "89387035564",
  appId: "1:89387035564:web:a225e0335d83bb70846809",
  measurementId: "G-NLRB538QZ7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const signupBtn = document.getElementById("signupBtn");
const loginBtn = document.getElementById("loginBtn");
const messageEl = document.getElementById("message");

// Display message helper
function showMessage(msg) {
  messageEl.textContent = msg;
  setTimeout(() => { messageEl.textContent = ""; }, 4000);
}

// Signup handler
signupBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) return showMessage("Please fill out all fields");

  createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      showMessage("Signup successful! Redirecting...");
      setTimeout(() => { window.location.href = "app.html"; }, 1500);
    })
    .catch(error => {
      showMessage(error.message);
    });
});

// Login handler
loginBtn.addEventListener("click", () => {
  const email = emailInput.value.trim();
  const password = passwordInput.value.trim();
  if (!email || !password) return showMessage("Please fill out all fields");

  signInWithEmailAndPassword(auth, email, password)
    .then(() => {
      showMessage("Login successful! Redirecting...");
      setTimeout(() => { window.location.href = "app.html"; }, 1500);
    })
    .catch(error => {
      showMessage(error.message);
    });
});

// If already logged in, redirect to app immediately
onAuthStateChanged(auth, user => {
  if (user) {
    window.location.href = "app.html";
  }
});
