import React from 'react';
import { Link } from 'react-router-dom';
import './GameMenu.css';

function GameMenu() {
  return (
    <div className="menu-game">
      <h1 className="animate__animated animate__fadeIn chess-title">Chess</h1>
      <br />
      <br />
      <br />
      <Link className="startGame button animate__animated animate__fadeIn animate__delay-1s element-title" to={`/game`}>
        Start A New Game
      </Link>
      <br />
      <Link className="highScore button animate__animated animate__fadeIn animate__delay-1s element-title" to="/highscores">
        High Scores
      </Link>
      <br />
      <Link className="promotionSeries button animate__animated animate__fadeIn animate__delay-1s element-title" to="/promotionseries">
        Enter Promotion Series
      </Link>
    </div>
  );
}

export default GameMenu;
