import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HighScoresPage.css';
import { Table } from "react-bootstrap";


function HighScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getHighScores = async () => {
      const response = await axios.get('http://localhost:3001/api/highscores');
      setScores(response.data);
    };

    getHighScores();
  }, []);

  return (
    <div className='highscore-container'>
      <h1>High Scores</h1>
      <div className='table-wrapper'>
        <Table striped bordered hover>
          <thead className="heading">
            <tr>
              <th>Player</th>
              <th>Rank</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>{
            scores.map((score, index) => (
              <tr className='score-box' key={index}>
                <td>{score.username}</td>
                <td>{score.rank}</td>
                <td>{score.score}</td>
              </tr>
            ))
          }</tbody>
        </Table>
      </div>
    </div>
  );
}

export default HighScores;