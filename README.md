# 🤖 ZING_HR_BOT

ZING_HR_BOT is a full-stack HR assistant chatbot built with Node.js, MongoDB, and a modern frontend. It provides instant responses to common HR-related queries like leave policy, work hours, IT support, and more.

---

## 🚀 Features

- Quick answers to HR FAQs  
- Modular JSON-based Q&A  
- Simple backend (Node + MongoDB)  
- Responsive frontend (React)

---

## 🏗 Folder Structure

```
ZING_HR_BOT/
├── backend/
│   ├── importData.js      # Inserts questions into MongoDB
│   ├── questions.json     # Q&A entries in JSON format
│   ├── server.js          # Express.js server
│
├── frontend/
│   ├── public/            # Static files
│   ├── src/               # App code (React, etc.)
│   └── package.json       # Frontend dependencies
│
├── Guide.txt              # Full step-by-step guide
└── README.md              # You're here!
```

---

## 📦 Prerequisites

- Node.js
- MongoDB
- MongoDB Compass (for UI)
- VS Code (recommended)

---

## ⚙️ Getting Started

1. Set up MongoDB and add your Q&A to `questions.json`.
2. In terminal:

```bash
cd backend
npm install
node importData.js
node server.js
```

3. Open another terminal:

```bash
cd frontend
npm install
npm start
```

Visit `http://localhost:3000` to use the bot!

---

## ✍️ Editing Questions

Update `backend/questions.json` with your new Q&A and run:

```bash
cd backend
node importData.js
```

Data will be updated in MongoDB automatically.

---

## 📄 License

MIT License

---

## 👤 Author

**Priyabrat Omm Kumar**  
🔗 [GitHub @PriyabratDev](https://github.com/PriyabratDev)

---

⭐ Give this repo a star if it helped you!
