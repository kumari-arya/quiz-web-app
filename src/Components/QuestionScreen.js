import React, { useState, useEffect } from 'react';

const QuestionScreen = ({ question, onSubmit }) => {
  const [answer, setAnswer] = useState('');
  const [feedback, setFeedback] = useState(null);
  const [timeLeft, setTimeLeft] = useState(10); // Set timer to 10 seconds (adjust as needed)

  // Timer logic
  useEffect(() => {
    setTimeLeft(10); // Reset the timer to 10 seconds every time a new question is loaded

    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime === 1) {
          clearInterval(timer);
          handleSubmit(false); // Automatically submit with incorrect answer if time runs out
        }
        return prevTime - 1;
      });
    }, 1000);

    // Cleanup the timer when the component unmounts or when a new question is loaded
    return () => clearInterval(timer);
  }, [question]);

  const handleSubmit = (manualSubmit = true) => {
    let correct = false;
    if (question.type === 'multiple-choice') {
      correct = answer === question.correctAnswer;
    } else if (question.type === 'true-false') {
      correct = answer === question.correctAnswer;
    } else if (question.type === 'text-input') {
      correct = answer.toLowerCase() === question.correctAnswer.toLowerCase();
    }

    setFeedback(correct ? 'Correct!' : 'Incorrect!');
    setTimeout(() => {
      setFeedback(null);
      onSubmit(correct);
    }, 1000); // Show feedback for 1 second before moving to the next question
  };

  return (
    <div className="question-screen">
      <h2>{question.question}</h2>
      <div className="timer">
        <p>Time left: {timeLeft} seconds</p>
      </div>

      {question.type === 'multiple-choice' && (
        <div>
          {question.options.map((option, index) => (
            <label key={index}>
              <input
                type="radio"
                name="answer"
                value={option}
                onChange={(e) => setAnswer(e.target.value)}
              />
              {option}
            </label>
          ))}
        </div>
      )}

      {question.type === 'true-false' && (
        <div>
          <label>
            <input
              type="radio"
              name="answer"
              value="true"
              onChange={(e) => setAnswer('true')}
            />
            True
          </label>
          <label>
            <input
              type="radio"
              name="answer"
              value="false"
              onChange={(e) => setAnswer('false')}
            />
            False
          </label>
        </div>
      )}

      {question.type === 'text-input' && (
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
        />
      )}

      <button onClick={() => handleSubmit()}>Submit</button>
      {feedback && <p className={feedback === 'Correct!' ? 'correct' : 'incorrect'}>{feedback}</p>}
    </div>
  );
};

export default QuestionScreen;
