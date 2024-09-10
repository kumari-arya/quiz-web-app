import React, { useState } from 'react';
import './App.css';
import StartScreen from './Components/StartScreen';
import QuestionScreen from './Components/QuestionScreen';
import EndScreen from './Components/EndScreen';
import questions from './questions.json';

function App() {
  const [gameState, setGameState] = useState('start'); // 'start', 'quiz', 'end'
  const [level, setLevel] = useState('easy'); // 'easy', 'medium', 'hard'
  const [score, setScore] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [correctAnswers, setCorrectAnswers] = useState(0);

  const points = {
    easy: 10,
    medium: 20,
    hard: 30,
  };

  const startQuiz = () => {
    setGameState('quiz');
    setLevel('easy');
    setScore(0);
    setCurrentQuestionIndex(0);
    setCorrectAnswers(0);
  };

  const nextQuestion = (correct) => {
    if (correct) {
      setScore(score + points[level]);
      setCorrectAnswers(correctAnswers + 1);
    }

    const nextIndex = currentQuestionIndex + 1;
    if (nextIndex >= questions[level].length) {
      // Check if user can progress to next level
      if (correctAnswers >= 2) {
        // Level up
        if (level === 'easy') setLevel('medium');
        else if (level === 'medium') setLevel('hard');
        else setGameState('end'); // Completed all levels
      } else {
        setGameState('fail');
      }
      setCurrentQuestionIndex(0);
      setCorrectAnswers(0);
    } else {
      setCurrentQuestionIndex(nextIndex);
    }
  };

  const retryLevel = () => {
    setCorrectAnswers(0);
    setCurrentQuestionIndex(0);
    setGameState('quiz');
  };

  return (
    <div className="App">
      {gameState === 'start' && <StartScreen onStart={startQuiz} />}
      {gameState === 'quiz' && (
        <QuestionScreen
          question={questions[level][currentQuestionIndex]}
          onSubmit={nextQuestion}
        />
      )}
      {gameState === 'fail' && (
        <div>
          <h2>You didn't pass the level!</h2>
          <button onClick={retryLevel}>Retry Level</button>
          <button onClick={startQuiz}>Restart Quiz</button>
        </div>
      )}
      {gameState === 'end' && <EndScreen score={score} onRestart={startQuiz} />}
    </div>
  );
}

export default App;
