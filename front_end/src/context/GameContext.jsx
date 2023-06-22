import { useState, createContext, useEffect } from 'react';
import { Game, move, status, moves, aiMove, getFen } from 'js-chess-engine'
import { io } from 'socket.io-client'
import { updatePlayerRank, getUsernameSync } from '../helper/helper.jsx';

const GameContext = createContext();
const ENDPOINT = 'http://localhost:8080'
let socket;

function GameProvider({ children }) {
  const [gameState, setGameState] = useState(() => { return new Game() });
  const [availableMoves, setAvailableMoves] = useState([]);
  const [selected, setSelected] = useState('');
  const [moveList, setMoveList] = useState(null);
  const [isOver, setIsOver] = useState(false);
  const [isStarted, setIsStarted] = useState(false);
  const [menu, setMenu] = useState(0);
  const [difficulty, setDifficulty] = useState(0);
  const [isBotGame, setIsBotGame] = useState(false);
  const [playerSide, setPlayerSide] = useState('white');
  const [roomID, setRoomID] = useState('');
  const [isInRoom, setIsInRoom] = useState(false);
  const [isRoomFull, setIsRoomFull] = useState(false);
  const [isWinner, setIsWinner] = useState(null);
  const username = getUsernameSync().username

  useEffect(() => {
    updateMoveList();
  }, [gameState]);

  useEffect(() => {
    socket = io(ENDPOINT);

    console.log('assigned to socket');

    socket.on('startGame', (side) => {
      console.log('startGame signal received, starting game');
      startGame(true, side);
    });

    socket.on('opponentMove', (to, from, oppoID) => {
      console.log(`opo moves ${to} ${from}`)
      console.log(`received move from ${oppoID}`);
      gameState.move(to, from);
      updateMoveList();
    });

    socket.on('join', handleJoinRoom);

    socket.on('resign', opponentResign);
  }, []);

  function handleJoinRoom(reply) {
    if (reply < 2) {
      setIsInRoom(true);
      if (reply == 1) {
        setIsRoomFull(true);
      }
    } else
      setIsRoomFull(true);
  }

  function selectTile(coordinate) {
    if (isStarted) {
      if (gameState.exportJson().turn === playerSide) {
        if (selected != '') //A tile is being selected, proceed to move piece or select an other tile
          movePiece(coordinate)
        else {               // No tile is beling selected, proceed to select a tile
          setAvailableMoves(gameState.moves(coordinate));
          setSelected(coordinate);
        }
      }
    }
  }

  function movePiece(coordinate) {
    try {
      gameState.move(selected, coordinate);
      socket.emit('move', roomID, selected, coordinate);
      setSelected('');
      setAvailableMoves([]);
      updateMoveList();
      if (!isGameOver()) {
        if (isBotGame) {
          AIMove();
        }
      };
    }
    catch (err) {
      setAvailableMoves(gameState.moves(coordinate));
      setSelected(coordinate);
    }
  }

  function AIMove() {
    setTimeout(() => {
      console.log('AI turn');
      gameState.aiMove(difficulty);
      updateMoveList();
    }, 0);
  }

  function isGameOver() {
    if (gameState.exportJson().isFinished) {
      console.log('Game over');
      setIsOver(true);
      if (gameState.exportJson().turn === playerSide) {
        setIsWinner(true);
        updatePlayerRank(username, true);
      }
      else {
        setIsWinner(false);
        updatePlayerRank(username, false);
      }
      return true;
    }
    return false;
  }

  function updateMoveList() {
    setMoveList(gameState.getHistory().map(a => { return { from: a.from, to: a.to } }));
  }

  function startGame(isSignal = false, side = 'white') {
    if (isBotGame) {
      setPlayerSide(side);
      setIsStarted(true);
    }
    if (!isBotGame) {
      if (!isSignal) {
        socket.emit('startGame', roomID);
        console.log(`${socket.id} send start signal`);
      }
      else {
        setPlayerSide(side);
        setIsStarted(true);
      }
    }
  }

  function resign() {
    setIsOver(true);
    setIsWinner(false);
    socket.emit('resign', roomID);
    updatePlayerRank(username, false);
  }

  function opponentResign() {
    setIsOver(true);
    setIsWinner(true);
    updatePlayerRank(username, true);
  }

  function setGameDifficulty(newDifficulty) {
    setDifficulty(newDifficulty);
    console.log(`Change difficulty to ${newDifficulty}`)
  }

  function changeMenu(newMenu) {
    setMenu(newMenu);
    console.log(`Menu changed to: ${newMenu}`)
  }

  function setBotGame() {
    setIsBotGame(true);
    console.log('This is a bot game');
  }

  function newGame() {
    setGameState(() => { return new Game() });
    setIsOver(false);
    setIsStarted(false);
    setIsWinner(null);

    console.log(isBotGame);
    if (!isBotGame) {
      socket.emit('leaveRoom', roomID);
      setIsInRoom(false);
      setRoomID('');
      setIsRoomFull(false);
      setMenu(0);
    }
  }
  return (
    <GameContext.Provider value={{ gameState, availableMoves, selected, selectTile, moveList, isOver, startGame, isStarted, resign, changeMenu, menu, difficulty, setGameDifficulty, setBotGame, newGame, setPlayerSide, roomID, setRoomID, isInRoom, isRoomFull, isWinner, playerSide, username }}>
      {children}
    </GameContext.Provider>
  )
}

export { GameContext, GameProvider, socket }