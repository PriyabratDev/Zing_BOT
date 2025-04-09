const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const Fuse = require("fuse.js");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB model
const Question = mongoose.model("Question", {
  question: String,
  answer: String,
});

// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/chatbot", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Search API
app.post("/ask", async (req, res) => {
  const userQuestion = req.body.question?.trim();

  if (!userQuestion || userQuestion.length < 5) {
    return res.json({ answer: "Please enter a more specific question." });
  }

  // Load all questions from DB
  const allQuestions = await Question.find({}, { question: 1, answer: 1 });

  // Fuzzy match using Fuse.js
  const fuse = new Fuse(allQuestions, {
    keys: ["question"],
    threshold: 0.3,
    includeScore: true,
    ignoreLocation: true,
    minMatchCharLength: 4,
  });

  // const result = await Question.findOne({
  //   question: { $regex: new RegExp(userQuestion, "i") },
  // });

  // if (result) {
  //   res.json({ answer: result.answer });
  // } else {
  //   res.json({ answer: "Sorry, I couldn't find the answer to that question." });
  // }
  const results = fuse.search(userQuestion);

  if (results.length > 0) {
    return res.json({ answer: results[0].item.answer });
  } else {
    return res.json({ answer: "Sorry, I couldn't find the answer to that question." });
  }
});

//Suggestion API
app.get("/suggest", async (req, res) => {
  const query = req.query.q?.trim() || "";

  if (query.length < 3) {
    return res.json([]); // too short to suggest
  }

  const allQuestions = await Question.find({}, { question: 1, _id: 0 });
  const questions = allQuestions.map(q => q.question);

  // Exact
  const exactMatches = questions.filter(q =>
    q.toLowerCase().includes(query.toLowerCase())
  );

  if (exactMatches.length > 0) {
    return res.json(exactMatches.slice(0, 5));
  }

  //Fuzzy
  const fuse = new Fuse(questions, {
    includeScore: true,
    threshold: 0.3,
    ignoreLocation: true,
    minMatchCharLength: 3,
  });
  const results = fuse.search(query).map(r => r.item).slice(0, 5);

  res.json(results);
});

app.listen(5000, () => console.log("Server running on port 5000"));
