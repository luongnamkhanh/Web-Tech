import React from 'react';
import './App.css';

function App() {

  const handleStartGame = () => {
  }
  const handleHighScore = () => {

  }

  return (
    <div className="container">
        <div className="image-container">
            <img className="chess-image" src="img/chess1.png" alt="chess" />
        </div>
        <div className="menu-game">
            <h1 className="animate__animated animate__fadeIn chess-title">Chess</h1>
            <button className="startGame button animate__animated animate__fadeIn animate__delay-1s element-title" onClick={handleStartGame}>
              Start A New Game
            </button> 
            <br />
            <button className="highScore button animate__animated animate__fadeIn animate__delay-1s element-title" onClick={handleHighScore}>
              High Scores
            </button>
        </div>
    </div>
  );
}

export default App;
