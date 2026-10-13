javascript
import { auth, db } from "./firebase-config.js";

import {
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const form = document.getElementById("studentLoginForm");
const emailInput = document.getElementById("email");
const passwordInput = document.getElementById("password");
const message = document.getElementById("message");
const loginButton = document.getElementById("loginButton");

function showMessage(text, success = false) {
  message.textContent = text;
  message.style.color = success ? "#16834a" : "#d93025";
}

document.getElementById("togglePassword").addEventListener("click", () => {
  const hidden = passwordInput.type === "password";
  passwordInput.type = hidden ? "text" : "password";
  document.getElementById("togglePassword").textContent =
    hidden ? "Hide" : "Show";
});

form.addEventListener("submit", async (event) => {
  event.preventDefault();

  loginButton.disabled = true;
  loginButton.textContent = "Checking account...";
  showMessage("");

  let signedInUser = null;

  try {
    const credential = await signInWithEmailAndPassword(
      auth,
      emailInput.value.trim(),
      passwordInput.value
    );

    signedInUser = credential.user;

    const userRef = doc(db, "users", signedInUser.uid);
    const userSnapshot = await getDoc(userRef);

    if (!userSnapshot.exists()) {
      await signOut(auth);
      showMessage("Student account record was not found. Contact your administrator.");
      return;
    }

    const userData = userSnapshot.data();

    if (userData.role !== "student") {
      await signOut(auth);
      showMessage("This account is not registered for student login.");
      return;
    }

    window.location.href = "student.html";

  } catch (error) {
    if (signedInUser && auth.currentUser) {
      try {
        await signOut(auth);
      } catch (_) {
        // Session cleanup could not be completed.
      }
    }

    const errors = {
      "auth/invalid-credential": "Email or password is incorrect.",
      "auth/user-not-found": "Account not found. Please contact your administrator.",
      "auth/wrong-password": "Incorrect password.",
      "auth/invalid-email": "Enter a valid email address.",
      "permission-denied": "Account verification is blocked by database permissions."
    };

    showMessage(errors[error.code] || "Login failed. Check Firebase setup and try again.");

  } finally {
    loginButton.disabled = false;
    loginButton.textContent = "Sign In →";
  }
});

document.getElementById("forgotPassword").addEventListener("click", async (event) => {
  event.preventDefault();

  const email = emailInput.value.trim();

  if (!email) {
    showMessage("Enter your registered email first.");
    emailInput.focus();
    return;
  }

  try {
    await sendPasswordResetEmail(auth, email);
    showMessage("If the account is eligible, a password reset email will be sent.", true);
  } catch (error) {
    showMessage(
      error.code === "auth/invalid-email"
        ? "Enter a valid email address."
        : "Could not send the reset email. Check Firebase settings and try again."
    );
  }
});
