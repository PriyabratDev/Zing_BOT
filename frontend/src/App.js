import React, { useState,useEffect } from "react";
import axios from "axios";
import './App.css';
function App() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [hasTyped, setHasTyped] = useState(false);
  const [hasSubmitted, setHasSubmitted] = useState(false);


// for styling change before start and after
  const handleChange = (e) => {
    setQuestion(e.target.value);
    if (!hasTyped && e.target.value.trim() !== "") setHasTyped(true);
  };

  //Sugestion part 
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (question.trim() === "") {
        setSuggestions([]);
        return;
      }

      setAnswer("");
      setHasSubmitted(false);
      try {
        const res = await axios.get(`http://localhost:5000/suggest?q=${question}`);
        setSuggestions(res.data);
      } catch (err) {
        console.error("Error fetching suggestions", err);
      }
    };

    fetchSuggestions();
  }, [question]);

  const handleAsk = async () => {
    if (!question.trim()) {
      setAnswer("Please enter a question before clicking send.");
      setHasSubmitted(true);
      return;      
    }
    try {
      const res = await axios.post("http://localhost:5000/ask", { question });
      setAnswer(res.data.answer);
      setHasSubmitted(true);
      setSuggestions([]);
    } catch (error) {
      console.error("Error getting answer:", error);
      setAnswer("An error occurred while fetching the answer.");
      setHasSubmitted(true);
      setSuggestions([]);
    }
  };

  
  // Click suggestion
  const handleSuggestionClick = (suggestion) => {
    setQuestion(suggestion);
    setSuggestions([]); // hide suggestions
  };

  return (
    <div className={`chat-container ${hasTyped ? "fixed-layout" : "centered-layout"}
    ${hasSubmitted ?"chat-container-submitted":""}`}>
      <h1 className={`chat-heading
        ${hasSubmitted ? "submitted-heading":""}`}>Zing HR Chatbot</h1>
      <div className="input-row">
          <div className="input-wrapper">
            <div className="textarea-container">
              <textarea
              placeholder="Ask your question"
              value={question}
              onChange={handleChange}
              className="question-input"
              rows={3}
            />
            <button onClick={handleAsk} className="ask-button" disabled={question.trim().length<5}>Send</button>
            </div>
            
            <div className="select-info">Select the question you want</div>
            {suggestions.length > 0 && (
            <ul className="suggestions"
            >
              {suggestions.map((s, idx) => (
                <li
                  key={idx}
                  onClick={() => handleSuggestionClick(s)}
                  className="suggestion-item"
                >
                  {s}
                </li>
              ))}
            </ul>
        )}
          </div>
      
          </div>
      {hasSubmitted && (
        <div className="answer">
        {answer !== "Please enter a question before clicking send." && answer !== "An error occurred while fetching the answer." && 
     answer !== "Please enter a more specific question." && (
          <strong>Answer:</strong>
        )}
        <div>
          {answer.split("\n").map((line, index) => (
            <span key={index}>
              {line}
              <br />
            </span>
          ))}
        </div>
      </div>
      )}
    </div>
  );
}

export default App;
