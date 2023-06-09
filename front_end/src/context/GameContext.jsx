import { useState, createContext, useEffect } from "react";
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import { socket } from "../components/socket";

const GameContext = createContext();

function GameProvider( {children} ){
  const [gameState, setGameState] = useState(() => {return new Game()});
  const [availableMoves, setAvailableMoves] = useState([]);
  const [selected, setSelected] = useState("");
  const [moveList, setMoveList] = useState(null);
  const [isOver, setIsOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [menu, setMenu] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [isBotGame, setIsBotGame] = useState(false);
  const [playerSide, setPlayerSide] = useState('white');

  useEffect(() => {
    updateMoveList();
  }, [gameState]);

  useEffect(() => {
    console.log('assigned to socket');

    socket.on("startGame", (side) =>{ 
      console.log('startGame signal received, starting game'); 
      startGame(true, side); 
    });

    socket.on("opponentMove", (to, from) => { 
      console.log('received opponent\'s move'); 
      gameState.move(to, from); 
      updateMoveList();
    });
  }, []);

  function selectTile(coordinate){
    if (isStarted){
      if (gameState.exportJson().turn === playerSide){
        if (selected != "") //A tile is being selected, proceed to move piece or select an other tile
          movePiece(coordinate)
        else{               // No tile is beling selected, proceed to select a tile
          setAvailableMoves(gameState.moves(coordinate));
          setSelected(coordinate);
        }
      }
    }
  }

  function movePiece(coordinate){
    try{
      gameState.move(selected, coordinate);
      socket.emit('move', 'testRoom', selected, coordinate);
      setSelected("");
      setAvailableMoves([]);
      updateMoveList();
      if (!isGameOver()){
        if (isBotGame){
          AIMove();
        }
      };
    }
    catch(err){
      setAvailableMoves(gameState.moves(coordinate));
      setSelected(coordinate);
    }
  }

  function AIMove(){
    setTimeout(() => {
      console.log("AI turn");
      gameState.aiMove(difficulty);
      updateMoveList();
  }, 0);
  }

  function isGameOver(){
    if (gameState.exportJson().isFinished){
      console.log("Game over");
      setIsOver(true);
      return true;
    }
    return false;
  }

  function updateMoveList(){
    setMoveList(gameState.getHistory().map(a => {return {from: a.from, to: a.to}}));
  }

  function startGame(isSignal = false, side = "white"){
    if (isBotGame){
      setPlayerSide(side);
      setIsStarted(true);
    }
    if (!isBotGame){
      if (!isSignal)
        socket.emit("startGame", "testRoom");
      else{
        setPlayerSide(side);
        setIsStarted(true);
      }
    }
  }

  function resign(){
    setIsOver(true);
  }

  function setGameDifficulty(newDifficulty){
    setDifficulty(newDifficulty);
    console.log(`Change difficulty to ${newDifficulty}`)
  }

  function changeMenu(newMenu){
    setMenu(newMenu);
    console.log(`Menu changed to: ${newMenu}`)
  }

  function setBotGame(){
    setIsBotGame(true);
    console.log("This is a bot game");
  }

  function newGame(){
    setGameState(() => {return new Game()});
    setIsOver(false);
    setIsStarted(true);
  }
  return(
    <GameContext.Provider value={{gameState, availableMoves, selected, selectTile, moveList, isOver, startGame, isStarted, resign, changeMenu, menu, difficulty, setGameDifficulty, setBotGame, newGame, setPlayerSide}}>
      {children}
    </GameContext.Provider>
  )
}

export {GameContext, GameProvider}