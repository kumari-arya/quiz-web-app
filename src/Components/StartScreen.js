import React from 'react';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Welcome to the Quiz</h1>
      <button onClick={onStart}>Start Quiz</button>
    </div>
  );
};

export default StartScreen;
