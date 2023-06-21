import { useState, React, useContext } from "react";
import "./ChessBoard.css"
import Tile from "../Tile/Tile";
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import { GameContext } from "../../context/GameContext";

const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

function ChessBoard() {
  const gameContext = useContext(GameContext);
  
  const {gameState, availableMoves, selected, selectTile, playerSide} = gameContext;
  const gameJson = gameState.exportJson();
  const pieces = gameJson.pieces;
  const turn = gameJson.turn;
  const isChecked = gameJson.check;
  const board = [];

  if (playerSide == 'white')
    for (let j = verticalAxis.length - 1; j >= 0; j--)
      for (let i = 0; i < horizontalAxis.length; i++)
      {
        const coordinate = horizontalAxis[i] + verticalAxis[j];
        board.push(<Tile coordinate={coordinate} 
          piece={pieces[coordinate] ? pieces[coordinate] : "none"} 
          key={coordinate}
          selectTile={selectTile}
          availableMove={availableMoves.includes(coordinate)}
          isSelected={selected === coordinate}
          selectedPiece={pieces[selected]}
          isChecked = {isChecked}
          turn = {turn}
        />);
      }
  else
    for (let j = 0; j < verticalAxis.length; j++)
      for (let i = 0; i < horizontalAxis.length; i++)
      {
        const coordinate = horizontalAxis[i] + verticalAxis[j];
        board.push(<Tile coordinate={coordinate} 
          piece={pieces[coordinate] ? pieces[coordinate] : "none"} 
          key={coordinate}
          selectTile={selectTile}
          availableMove={availableMoves.includes(coordinate)}
          isSelected={selected === coordinate}
          selectedPiece={pieces[selected]}
          isChecked = {isChecked}
          turn = {turn}
        />);
      }
      
          
  return (
    <>
      <div id="chessboard">{board}</div>
    </>
  )
}

export default ChessBoard;

