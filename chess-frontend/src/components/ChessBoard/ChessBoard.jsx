import { useState, React } from "react";
import "./ChessBoard.css"
import Tile from "../Tile/Tile";
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'

const horizontalAxis = ["A", "B", "C", "D", "E", "F", "G", "H"];
const verticalAxis = ["1", "2", "3", "4", "5", "6", "7", "8"];

function ChessBoard() {
  const [gameState, setGameState] = useState(() => {return new Game()});
  const [availableMoves, setAvailableMoves] = useState([]);
  const [selected, setSelected] = useState("");
  
  const pieces = gameState.exportJson().pieces
  const board = [];

  function selectTile(coordinate){
    console.log(selected);
    if (selected != "")
      try{
        gameState.move(selected, coordinate)
        setGameState(gameState);
        setSelected("");
        setAvailableMoves([]);
      }
      catch(err){
        setAvailableMoves(gameState.moves(coordinate));
        setSelected(coordinate);
      }
    else{
      setAvailableMoves(gameState.moves(coordinate));
      setSelected(coordinate);
    }
   
  }

  for (let j = verticalAxis.length - 1; j >= 0; j--)
    for (let i = 0; i < horizontalAxis.length; i++)
    {
      const coordinate = horizontalAxis[i] + verticalAxis[j];
      board.push(<Tile coordinate={coordinate} 
        piece={pieces[`${coordinate}`] ? pieces[`${coordinate}`] : "none"} 
        key={coordinate}
        selectTile={selectTile}
        availableMove={availableMoves.includes(coordinate)}
        selected={selected}
      />);
    }
      
          
  return (
    <>
      <div id="chessboard">{board}</div>
    </>
  )
}

export default ChessBoard;

