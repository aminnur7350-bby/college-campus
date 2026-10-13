import { initializeApp } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-app.js";

import { getAuth } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-auth.js";

import { getFirestore } from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "YOUR_ACTUAL_API_KEY",
  authDomain: "smartcollegecompanion.firebaseapp.com",
  projectId: "smartcollegecompanion",
  storageBucket: "smartcollegecompanion.firebasestorage.app",
  messagingSenderId: "310486197493",
  appId: "1:310486197493:web:915ea2bb49b09d1fded1bc",
  measurementId: "G-49E8R47P8Z"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const db = getFirestore(app);

