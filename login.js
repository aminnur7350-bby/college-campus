```javascript
import { auth } from "./firebase-config.js";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

const loginForm = document.getElementById("loginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const togglePassword = document.getElementById("togglePassword");
const loginButton = document.getElementById("loginButton");
const message = document.getElementById("message");
const forgotLink = document.getElementById("forgotLink");

function showMessage(text, success = false) {
  message.textContent = text;
  message.style.color = success ? "#16834a" : "#d93025";
}

togglePassword.addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  togglePassword.textContent = hidden ? "Hide" : "Show";
});

loginForm.addEventListener("submit", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();
  const password = passwordInput.value;

  loginButton.disabled = true;
  loginButton.textContent = "Signing in...";
  showMessage("");

  try {
    await signInWithEmailAndPassword(auth, email, password);

    showMessage("Login successful! Opening dashboard...", true);
    window.location.href = "index.html";
  } catch (error) {
    const messages = {
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/user-not-found": "No account found. Please sign up first.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-email": "Please enter a valid email address.",
      "auth/too-many-requests": "Too many attempts. Please try again later."
    };

    showMessage(messages[error.code] || "Login failed. Please try again.");
  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Sign In →";
  }
});

forgotLink.addEventListener("click", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    showMessage("Enter your email address first.");
    emailInput.focus();
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage("If the account is eligible, a password reset email will be sent.", true);
  } catch (error) {
    if (error.code === "auth/invalid-email") {
      showMessage("Please enter a valid email address.");
    } else {
      showMessage("Could not send reset email. Check your Firebase setup and try again.");
    }
  }
});
```