import React from 'react';
import { Link } from 'react-router-dom';
import './GameMenu.css';

function GameMenu({handleStartGame}) {
  return (
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
  );
}

export default GameMenu;
