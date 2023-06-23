import React, { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import './HighScoreTable.css';
import { StyledButton } from "./muiStyled";



function HighScoreTable({ scores }) {
    const [user, setUser] = useState([]);
    const [rank, setRank] = useState("Bronze");

    useEffect(() => {
        fetchScores(rank);

    }, [rank])

    const fetchScores = async (rank) => {
        setRank(rank);
        const response = await fetch(`http://localhost:8080/api/users?rank=${rank}`);
        const data = await response.json();
        setUser(data["data"]);
    }

    return (
        <div className='highscore-table'>
            <h1>High Scores</h1>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }}>
                <StyledButton className={`_button ${rank === 'Bronze' ? 'active' : ''}`} onClick={() => fetchScores('Bronze')}>Bronze</StyledButton>
                <StyledButton className={`_button ${rank === 'Silver' ? 'active' : ''}`} onClick={() => fetchScores('Silver')}>Silver</StyledButton>
                <StyledButton className={`_button ${rank === 'Gold' ? 'active' : ''}`} onClick={() => fetchScores('Gold')}>Gold</StyledButton>
            </div>
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
                        user.map((user) => (
                            <tr className='score-box' key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.rank}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))
                    }</tbody>
                </Table>
            </div>
        </div>
    );
}

export default HighScoreTable;
