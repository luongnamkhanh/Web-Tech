import { useState, React } from "react";
import "./ChessBoard.css"
import Tile from "../Tile/Tile";
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'

function ChessBoard() {
  const [gameState, setGameState] = useState(new Game());
  const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
  const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];
  const pieces = gameState.exportJson().pieces
  console.log(pieces);
  const board = [];

  for (let j = verticalAxis.length - 1; j >= 0; j--)
    for (let i = 0; i < horizontalAxis.length; i++)
      board.push(<Tile coordinate={[horizontalAxis[i], verticalAxis[j]]} piece={pieces[`${horizontalAxis[i] + verticalAxis[j]}`] ? pieces[`${horizontalAxis[i] + verticalAxis[j]}`] : "none"} key={horizontalAxis[i] + verticalAxis[j]}/>);
          
  return (
    <>
      <div id="chessboard">{board}</div>
    </>
  )
}

export default ChessBoard;

