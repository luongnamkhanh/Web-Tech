import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './GameMenu.css';
import { enterPromotion, getUsernameSync } from "../../helper/helper"
import { GameContext } from '../../context/GameContext';

function GameMenu() {
  const navigate = useNavigate();
  const { changeMenu } = React.useContext(GameContext);
  async function handleEnterPromotion(e) {
    const username = getUsernameSync()?.username
    e.preventDefault();
    const error = await enterPromotion(username);
    if (!error) {
      navigate("/game");
      changeMenu(2);
    } else {
      alert(error)
    }
  }
  return (
    <div className="menu-game">
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
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
      <Link className="promotionSeries button animate__animated animate__fadeIn animate__delay-1s element-title" onClick={(e) => handleEnterPromotion(e)}>
        Enter Promotion Series
      </Link>
    </div>
  );
}

export default GameMenu;
