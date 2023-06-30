import React, { useState, useEffect } from 'react';
import { Button, Table } from "react-bootstrap";
import './HighScoreTable.css';
import { StyledButton } from "./muiStyled";

function HighScoreTable({ scores }) {
    const [user, setUser] = useState([]);
    const [rank, setRank] = useState("Bronze");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    useEffect(() => {
        fetchScores(rank);
    }, [rank]);

    const fetchScores = async (rank) => {
        setRank(rank);
        const response = await fetch(`http://localhost:8080/api/users?rank=${rank}`);
        const data = await response.json();
        setUser(data["data"]);
    };

    // calculate the total number of pages
    const totalPages = Math.ceil(user.length / itemsPerPage);

    // get the current page's items
    const currentPageItems = user.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

    return (
        <div className='highscore-table'>
            <h1>High Scores</h1>
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "80px" }}>
                <StyledButton className={`_button ${rank === 'Bronze' ? 'active' : ''}`} onClick={() => { setCurrentPage(1); fetchScores('Bronze'); }}>Bronze</StyledButton>
                <StyledButton className={`_button ${rank === 'Silver' ? 'active' : ''}`} onClick={() => { setCurrentPage(1); fetchScores('Silver'); }}>Silver</StyledButton>
                <StyledButton className={`_button ${rank === 'Gold' ? 'active' : ''}`} onClick={() => { setCurrentPage(1); fetchScores('Gold'); }}>Gold</StyledButton>
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
                        currentPageItems.map((user) => (
                            <tr className='score-box' key={user.username}>
                                <td>{user.username}</td>
                                <td>{user.rank}</td>
                                <td>{user.points}</td>
                            </tr>
                        ))
                    }</tbody>
                </Table>
            </div>
            <div className="pagination">
                <Button className="pagination-button" onClick={() => setCurrentPage(page => Math.max(page - 1, 1))}>&lt;</Button>
                <span className="pagination-text">Page {currentPage} of {totalPages}</span>
                <Button className="pagination-button" onClick={() => setCurrentPage(page => Math.min(page + 1, totalPages))}>&gt;</Button>
            </div>
        </div>
    );
}

export default HighScoreTable;
