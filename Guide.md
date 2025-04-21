# 🛠️ ZING_HR_BOT – Setup & Usage Guide

This guide walks you through installing, running, and updating the ZING_HR_BOT system.

---

## 🔧 MongoDB Setup

1. Install MongoDB with default settings.
2. Open **MongoDB Compass**.
3. Click **"Add new connection"**.
   - **Connection String**: `mongodb://localhost:27017/chatbot`
   - **Name**: Any name (e.g. `ZingBotLocal`)
4. Click **"Save & Connect"**.
5. Create a new database:
   - **Database Name**: `chatbot` *(case-sensitive)*
   - **Collection Name**: `questions` *(case-sensitive)*

---

## 📥 Data Entry

1. Open the `ZING_HR_BOT` folder in **VS Code**.
2. Open `backend/questions.json` and enter your Q&A in this format:

```json
[
  {
    "question": "What is the leave policy?",
    "answer": "You can apply for leave via the HR portal.\nMax 30 days per year."
  },
  {
    "question": "What are the working hours?",
    "answer": "Regular hours are 9 AM to 6 PM.\nHalf-days on Saturdays."
  }
]
```

3. Open terminal in VS Code and run:

```bash
cd backend
npm install
node importData.js
```

4. In MongoDB Compass, open your connection → `chatbot > questions` → click **"Find"** to verify the entries.

---

## 🚀 First Run

### Backend (Terminal 1)

```bash
cd backend
node server.js
```

### Frontend (Terminal 2)

```bash
cd frontend
npm install
npm start
```

App will be available at:  
👉 `http://localhost:3000`

---

## 🔁 Running Again Later

After system restart or later use:

1. Open MongoDB Compass and click **"Connect"** on your saved connection.
2. In VS Code:

```bash
cd backend
node server.js
```

3. In a new terminal:

```bash
cd frontend
npm start
```

---

## ➕ Adding New Questions

To update your Q&A:

1. Edit `backend/questions.json` with new entries.
2. Run:

```bash
cd backend
node importData.js
```

3. Open MongoDB Compass → `chatbot > questions` → click **"Find"** to see the new data.

---

## ✅ You're all set!

If anything breaks, try restarting your terminals and MongoDB Compass. For help, feel free to open an issue on the [GitHub repo](https://github.com/PriyabratDev/Zing_BOT).