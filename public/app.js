// app.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/11.10.0/firebase-auth.js";

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

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const chatBox = document.getElementById("chatBox");
const userInput = document.getElementById("userInput");
const toggleBtn = document.getElementById("togglePrompts");
const promptSuggestions = document.getElementById("promptSuggestions");
const hamburgerBtn = document.getElementById("hamburgerBtn");
const menu = document.getElementById("menu");
const logoutBtn = document.getElementById("logoutBtn");

// Check auth state, redirect if not logged in
onAuthStateChanged(auth, user => {
  if (!user) {
    window.location.href = "login.html";
  }
});

// Hamburger toggle
hamburgerBtn.addEventListener("click", () => {
  if (menu.classList.contains("open")) {
    menu.classList.remove("open");
    hamburgerBtn.setAttribute("aria-expanded", "false");
  } else {
    menu.classList.add("open");
    hamburgerBtn.setAttribute("aria-expanded", "true");
  }
});

// Logout function
logoutBtn.addEventListener("click", () => {
  signOut(auth).then(() => {
    window.location.href = "login.html";
  });
});

// Toggle prompts
toggleBtn.addEventListener("click", () => {
  const isVisible = promptSuggestions.style.display === "flex";
  promptSuggestions.style.display = isVisible ? "none" : "flex";
  toggleBtn.setAttribute("aria-pressed", !isVisible);
});

// Set prompt from suggestions
function setPrompt(text) {
  userInput.value = text;
  userInput.focus();
  promptSuggestions.style.display = "none";
  toggleBtn.setAttribute("aria-pressed", false);
}

// Hide prompts on typing
userInput.addEventListener("input", () => {
  if (userInput.value.trim().length > 0) {
    promptSuggestions.style.display = "none";
    toggleBtn.setAttribute("aria-pressed", false);
  }
});

// Add chat message function
function addMessage(text, sender, animated = false) {
  const msg = document.createElement("div");
  msg.className = `chat-message ${sender}`;
  if (animated) {
    typeWriterEffect(msg, text);
  } else {
    msg.textContent = text;
  }
  chatBox.appendChild(msg);
  chatBox.scrollTop = chatBox.scrollHeight;
}

// Typewriter effect for AI messages
function typeWriterEffect(element, text) {
  let index = 0;
  element.textContent = "";
  function type() {
    if (index < text.length) {
      element.textContent += text.charAt(index);
      index++;
      setTimeout(type, 20);
    }
  }
  type();
}

// Handle send button click
window.handleSend = async function () {
  const userText = userInput.value.trim();
  if (!userText) return;
  
  addMessage(userText, "user");
  userInput.value = "";

  const thinking = document.createElement("div");
  thinking.className = "chat-message ai";
  thinking.innerHTML = 'Thinking<span class="typing">.</span>';
  chatBox.appendChild(thinking);
  chatBox.scrollTop = chatBox.scrollHeight;

  // Simulate AI response (replace with your actual API call)
  setTimeout(() => {
    chatBox.removeChild(thinking);
    addMessage("Here's your AI-generated lyrics for: " + userText, "ai", true);
  }, 1500);
};

// Expose setPrompt globally so buttons can call it inline
window.setPrompt = setPrompt;
