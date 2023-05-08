import React, { useState, useEffect, useRef } from "react"
import "../src/style.css"


const App = () => {
  const [quotes, setQuotes] = useState("");
  const textRef = useRef();
  let colors = ["#ffff00", "#90ee90", "ffa500", "#ff68ff", "#a9a9e7"]

  const getQuote = () => {
    fetch("https://type.fit/api/quotes")
      .then((response) => response.json())
      .then((data) => {
        let randomNumber = Math.floor(Math.random() * data.length);
        setQuotes(data[randomNumber]);
      });
  };

  useEffect(() => {
    getQuote();
  }, []);

  useEffect(() => {
    textRef.current.style.color = colors[Math.floor(Math.random() * colors.length)];
  }, { quotes })

  return (
    <div className="App">
      <div className="quote">
        <p ref={textRef}> {quotes.text}</p>
        <p>Author: {quotes.author}</p>
        <div className="buttonContainer">
          <button onClick={getQuote} className="button">Get quote</button>
          <a
            href={`https://twitter.com/intent/tweet?text=${quotes.text}:`}
            target="_blank"
            rel="noopener noreferrer"
            className="button"
          >
            Tweet
          </a>
        </div>
      </div>
    </div>
  )
}

export default App;
