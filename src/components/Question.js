import React, { useEffect, useState } from "react";

function Question({ question, onAnswered }) {
  const [timeRemaining, setTimeRemaining] = useState(10);

  // add useEffect code
 useEffect(() => {
    // Set a timeout that triggers every second
    const timer = setTimeout(() => {
      setTimeRemaining((prev) => {
        if (prev === 1) {
          // Reset timer and call onAnswered when the timer hits 0
          onAnswered(false);
          return 10;
        } else {
          // Decrement the timer each second
          return prev - 1;
        }
      });
    }, 1000);

    // Cleanup the timeout when the component unmounts
    return () => clearTimeout(timer);
  },[timeRemaining,onAnswered]);
   
  

  function handleAnswer(isCorrect) {
    setTimeRemaining(10);
    onAnswered(isCorrect);
  }

  const { id, prompt, answers, correctIndex } = question;

  return (
    <>
      <h1>Question {id}</h1>
      <h3>{prompt}</h3>
      {answers.map((answer, index) => {
        const isCorrect = index === correctIndex;
        return (
          <button key={answer} onClick={() => handleAnswer(isCorrect)}>
            {answer}
          </button>
        );
      })}
      <h5>{timeRemaining} seconds remaining</h5>
    </>
  );
}

export default Question;
