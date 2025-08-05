// chat-frontend/src/components/Chat.js
import React, { useEffect, useState } from "react";
import io from "socket.io-client";
import axios from "axios";

const socket = io("http://localhost:5000");

export default function Chat({ username }) {
  const [messages, setMessages] = useState([]);
  const [text, setText] = useState("");

  useEffect(() => {
    socket.on("loadMessages", (msgs) => setMessages(msgs));
    socket.on("newMessage", (msg) => setMessages((prev) => [...prev, msg]));
    socket.on("sentimentUpdate", (updated) => {
      setMessages((prev) =>
        prev.map((m) => (m.id === updated.id ? updated : m))
      );
    });

    return () => {
      socket.off("loadMessages");
      socket.off("newMessage");
      socket.off("sentimentUpdate");
    };
  }, []);

  const sendMessage = async () => {
    if (text.trim()) {
      await axios.post("http://localhost:5000/message", {
        userId: username,
        text
      });
      setText("");
    }
  };

  return (
    <div style={{ marginTop: 20 }}>
      <div
        style={{
          border: "1px solid gray",
          padding: 10,
          height: 300,
          overflowY: "scroll",
          marginBottom: 10
        }}
      >
        {messages.map((msg) => (
          <div key={msg.id} style={{ margin: "5px 0" }}>
            <b>{msg.userId}:</b> {msg.text} — <i>{msg.sentiment}</i>
          </div>
        ))}
      </div>
      <input
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Type message..."
      />
      <button onClick={sendMessage}>Send</button>
    </div>
  );
}
