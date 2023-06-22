import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './HighScoresPage.css';
import { Table } from "react-bootstrap";
import HighScoreTable from './HighScoreTable/HighScoreTable';


function HighScores() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const getHighScores = async () => {
      const response = await axios.get('http://localhost:8080/api/highscores');
      setScores(response.data);
    };

    getHighScores();
  }, []);

  return (
    <div className='highscore-container'>
      <HighScoreTable scores={scores} />
    </div>
  );
}

export default HighScores;