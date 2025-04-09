// importData.js
const mongoose = require("mongoose");
const fs = require("fs");

const Question = mongoose.model("Question", {
  question: String,
  answer: String,
});

mongoose.connect("mongodb://localhost:27017/chatbot", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const data = JSON.parse(fs.readFileSync("questions.json", "utf-8"));

Question.insertMany(data).then(() => {
  console.log("Data imported");
  process.exit();
});
