import React from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import HomePage from './components/HomePage/HomePage';
import HighScoresPage from './components/HighScoresPage/HighScoresPage';


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
            <HighScoresPage />
          </Route>

          <Route path="/">
            <HomePage />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
