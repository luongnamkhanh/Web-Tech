import React, { useEffect, useState } from 'react';
import './App.css';

function HighScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    fetch('/api/highscores')
      .then(response => response.json())
      .then(data => {
        setScores(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, []);

  return (
    <div className="container">
        <h1>High Scores</h1>
        <ul id="scoreList">
          {scores.map((scoreItem) => (
            <li key={scoreItem.username}>
              {scoreItem.username}: {scoreItem.score}
            </li>
          ))}
        </ul>
    </div>
  );
}

export default HighScores;

