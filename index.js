    javascript 
const greeting = document.getElementById("greeting");
const today = document.getElementById("today");

function updateDashboard() {
  const now = new Date();
  const hour = now.getHours();

  if (hour < 12) {
    greeting.textContent = "Good Morning! 👋";
  } else if (hour < 17) {
    greeting.textContent = "Good Afternoon! 👋";
  } else {
    greeting.textContent = "Good Evening! 👋";
  }

  today.textContent = now.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric"
  });
}

updateDashboard();
