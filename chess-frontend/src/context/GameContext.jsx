import { useState, createContext } from "react";
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'

const GameContext = createContext();

function GameProvider( {children} ){
  const [gameState, setGameState] = useState(() => {return new Game()});
  const [availableMoves, setAvailableMoves] = useState([]);
  const [selected, setSelected] = useState("");
  const [moveList, setMoveList] = useState(null);
  const [isOver, setIsOver] = useState(false);

  function selectTile(coordinate){
    if (selected != "") //A tile is being selected, proceed to move piece or select an other tile
      movePiece(coordinate)
    else{               // No tile is beling selected, proceed to select a tile
      setAvailableMoves(gameState.moves(coordinate));
      setSelected(coordinate);
    }
  }

  function movePiece(coordinate){
    try{
      gameState.move(selected, coordinate)
      setGameState(gameState);
      setSelected("");
      setAvailableMoves([]);
      setMoveList(gameState.getHistory().map(a => {return {from: a.from, to: a.to}}));
      isGameOver();
    }
    catch(err){
      setAvailableMoves(gameState.moves(coordinate));
      setSelected(coordinate);
    }
  }

  function isGameOver(){
    if (gameState.exportJson().isFinished){
      console.log("Game over");
      setIsOver(true);
    }
  }
  return(
    <GameContext.Provider value={{gameState, availableMoves, selected, selectTile, moveList, isOver}}>
      {children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProvider}