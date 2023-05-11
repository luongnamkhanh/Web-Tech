import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch, Link } from 'react-router-dom';
import HighScores from './HighScores';

function App() {

  const handleStartGame = () => {
  }
  const handleHighScore = () => {

  }

  return (
    <div className="app">
      <Router>
        <Switch>
          <Route path="/highscores">
            <HighScores />
          </Route>

          <Route path="/">
            <div className="container">

              <div className="image-container">
                <img className="chess-image" src="img/chess2.png" alt="chess" />
              </div>
              <div className="menu-game">
                <h1 className="animate__animated animate__fadeIn chess-title">Chess</h1>
                {/* <div className="elements"> */}
                <Link className="startGame button animate__animated animate__fadeIn animate__delay-1s element-title" onClick={handleStartGame}>
                  Start A New Game
                </Link>
                <br />
                <Link className="highScore button animate__animated animate__fadeIn animate__delay-1s element-title" to="/highScores">
                  High Scores
                </Link>
                {/* </div > */}
              </div>
            </div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
