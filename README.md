# Real-Time Chat App with Asynchronous Sentiment Processing

This project is a real-time chat application built with:
- **Backend**: Node.js + Express + Socket.io  
- **Frontend**: React + Parcel  
- **Storage**: In-memory array (can be replaced with MongoDB/SQLite)

Messages are sent instantly to all connected users and sentiment is analyzed asynchronously (3-second delay).

---

## 🚀 Features
- Real-time global chat using Socket.io
- Asynchronous sentiment analysis (`Positive`, `Negative`, `Neutral`)
- Sentiment updates live for all users
- Simple keyword-based sentiment detection
- React frontend bundled with Parcel

---

## 🛠 Tech Stack
- **Backend**: Node.js, Express, Socket.io  
- **Frontend**: React, Parcel, Axios, Socket.io-client  

---

## ⚙️ Local Development Setup

### 1️⃣ Clone the Repository
```bash
git clone https://github.com/Harshil173/-Real-Time-Chat-with-Asynchronous-Sentiment-Processing.git

cd chat-backend(for Backend)
npm start

cd chat-frontend
npm start (for Frontend)

