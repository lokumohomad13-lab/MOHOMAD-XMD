const express = require("express");
const path = require("path");

const app = express();
const PORT = process.env.PORT || 3000;

app.disable("x-powered-by");
app.use(express.json({ limit: "20kb" }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", app: "MOHOMAD XMD AI HACKER" });
});

// Demo endpoint only. Connect a real AI provider securely on the server later.
app.post("/api/chat", (req, res) => {
  const message = String(req.body?.message || "").trim().slice(0, 1000);
  if (!message) return res.status(400).json({ error: "Message is required." });

  const replies = [
    "මම MOHOMAD XMD Demo AI. සැබෑ AI API එකක් තවම සම්බන්ධ කරලා නැහැ.",
    "ඔයාගේ අදහස තේරුණා. මේක Demo Mode එකක්. සැබෑ AI පිළිතුරු සඳහා server-side API integration එකක් අවශ්‍යයි.",
    "හොඳ ප්‍රශ්නයක්! දැනට මම Demo AI ලෙස ක්‍රියා කරනවා. පසුව ආරක්ෂිතව AI API එකක් සම්බන්ධ කළ හැකියි."
  ];
  const reply = replies[Math.floor(Math.random() * replies.length)];
  res.json({ reply, mode: "demo" });
});

app.get("*", (_req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

app.listen(PORT, "0.0.0.0", () => {
  console.log(`MOHOMAD XMD running on port ${PORT}`);
});