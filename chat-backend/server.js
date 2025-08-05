// chat-backend/server.js
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors");

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: { origin: "*" } });

app.use(cors());
app.use(express.json());

// In-memory storage
let messages = [];

// Socket connection
io.on("connection", (socket) => {
  console.log("User connected:", socket.id);
  
  // Send old messages to new user
  socket.emit("loadMessages", messages);
});

// POST endpoint for new messages
app.post("/message", (req, res) => {
  const { userId, text } = req.body;

  const message = {
    id: Date.now(),
    userId,
    text,
    sentiment: "Pending"
  };

  messages.push(message);

  // Broadcast immediately
  io.emit("newMessage", message);

  // Simulate async sentiment analysis
  setTimeout(() => {
    const sentiment = analyzeSentiment(text);
    message.sentiment = sentiment;

    // Broadcast updated sentiment
    io.emit("sentimentUpdate", message);
  }, 3000);

  res.json({ status: "Message received" });
});

// Simple sentiment analyzer
function analyzeSentiment(text) {
  const lower = text.toLowerCase();
  if (lower.includes("happy") || lower.includes("love") || lower.includes("great")) return "Positive";
  if (lower.includes("sad") || lower.includes("angry") || lower.includes("bad")) return "Negative";
  return "Neutral";
}

server.listen(5000, () => console.log("🚀 Backend running at http://localhost:5000"));
