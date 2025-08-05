// chat-frontend/src/App.js
import React, { useState } from "react";
import Chat from "./components/Chat";

export default function App() {
  const [username, setUsername] = useState("");
  const [joined, setJoined] = useState(false);

  return (
    <div style={{ padding: 20, fontFamily: "Arial" }}>
      {!joined ? (
        <>
          <h2>Enter your name</h2>
          <input
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Your name"
          />
          <button onClick={() => setJoined(true)}>Join Chat</button>
        </>
      ) : (
        <Chat username={username} />
      )}
    </div>
  );
}
