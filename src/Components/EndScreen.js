import React from 'react';

const EndScreen = ({ score, onRestart }) => {
  return (
    <div className="end-screen">
      <h1>Congratulations! Quiz Complete!</h1>
      <p>Your total score: {score}</p>
      <button onClick={onRestart}>Restart Quiz</button>
    </div>
  );
};

export default EndScreen;
