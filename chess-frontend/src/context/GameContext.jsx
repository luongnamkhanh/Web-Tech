import { useState, createContext } from "react";
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'

const GameContext = createContext();

function GameProvider( {children} ){
  const [gameState, setGameState] = useState(() => {return new Game()});
  const [availableMoves, setAvailableMoves] = useState([]);
  const [selected, setSelected] = useState("");
  const [moveList, setMoveList] = useState(null);

  function selectTile(coordinate){
    console.log(selected);
    if (selected != "") //A tile is being selected, proceed to move piece or select an other tile
      try{
        gameState.move(selected, coordinate)
        setGameState(gameState);
        setSelected("");
        setAvailableMoves([]);
        setMoveList(gameState.getHistory().map(a => {return {from: a.from, to: a.to}}));
      }
      catch(err){
        setAvailableMoves(gameState.moves(coordinate));
        setSelected(coordinate);
      }
    else{ // No tile is beling selected, proceed to select a tile
      setAvailableMoves(gameState.moves(coordinate));
      setSelected(coordinate);
    }
   
  }

  return(
    <GameContext.Provider value={{gameState, availableMoves, selected, selectTile, moveList}}>
      {children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProvider}