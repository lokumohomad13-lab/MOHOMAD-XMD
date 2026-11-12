const form = document.getElementById("chatForm");
const input = document.getElementById("userInput");
const messages = document.getElementById("messages");

document.getElementById("year").textContent = new Date().getFullYear();

document.getElementById("menuToggle").addEventListener("click", () => {
  document.getElementById("nav").classList.toggle("open");
});
document.querySelectorAll("#nav a").forEach(link => link.addEventListener("click", () => {
  document.getElementById("nav").classList.remove("open");
}));

function addMessage(text, who) {
  const row = document.createElement("div");
  row.className = `message ${who}`;
  const icon = document.createElement("span");
  icon.className = "msg-icon";
  icon.textContent = who === "bot" ? "X" : "YOU";
  const content = document.createElement("div");
  const label = document.createElement("small");
  label.textContent = who === "bot" ? "XMD AI" : "YOU";
  const p = document.createElement("p");
  p.textContent = text;
  content.append(label, p);
  row.append(icon, content);
  messages.appendChild(row);
  messages.scrollTop = messages.scrollHeight;
}

async function sendMessage(message) {
  const clean = message.trim();
  if (!clean) return;
  addMessage(clean, "user");
  input.value = "";
  try {
    const response = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: clean })
    });
    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Request failed");
    addMessage(data.reply, "bot");
  } catch (_error) {
    addMessage("සම්බන්ධතාවයේ ගැටලුවක් ඇති වුණා. නැවත උත්සාහ කරන්න.", "bot");
  }
}

form.addEventListener("submit", event => {
  event.preventDefault();
  sendMessage(input.value);
});
document.querySelectorAll(".suggestions button").forEach(button => {
  button.addEventListener("click", () => sendMessage(button.dataset.prompt));
});