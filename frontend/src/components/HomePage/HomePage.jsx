import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage = () => {
  const handleStartGame = () => {
    // Logic for starting game
  }

  return (
    <div className="container">
      <div className="image-container">
        <img className="chess-image" src="img/chess2.png" alt="chess" />
      </div>
      <div className="menu-game">
        <h1 className="animate__animated animate__fadeIn chess-title">Chess</h1>
        <Link className="startGame button animate__animated animate__fadeIn animate__delay-1s element-title" onClick={handleStartGame}>
          Start A New Game
        </Link>
        <br />
        <Link className="highScore button animate__animated animate__fadeIn animate__delay-1s element-title" to="/highScores">
          High Scores
        </Link>
      </div>
    </div>
  );
}

export default HomePage;
