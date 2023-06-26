let listOfPlayer = {};
let roomManager = {};
let playerQueue = [];


const initializeGame = (io, socket) =>{
  //Add player to list
  socket.on('init', (newPlayer) => playerInit(newPlayer, socket));

  //Remove player from list
  socket.on('disconnect', () => playerDisconnect(socket));

  //Invite
  socket.on('invite', (playerUsername, friendUsername) => playerInvite(playerUsername, friendUsername, socket));

  //Join room
  socket.on('join', (roomID) => playerJoinRoom(roomID, socket, io));

  //Start game
  socket.on('startGame', (roomID) => masterStartGame(roomID, socket));

  //Send opponent move
  socket.on('move', (roomID, from, to) => opponentMove(roomID, from, to, socket));

  //Opponent resign
  socket.on('resign', (roomID) => opponentResign(roomID, socket));

  //Player leave room
  socket.on('leaveRoom', (roomID) => playerLeaveRoom(roomID, socket));

  socket.on('matchMaking', () => addMatchMakingRequest(socket));
}

function addMatchMakingRequest(socket) {
  playerQueue.push(socket);
  console.log(`Matchmaking request added for socket ${socket.id}`);
  if (playerQueue.length >= 2) {
    const player1 = playerQueue.shift();
    const player2 = playerQueue.shift();
    createRoom(player1, player2);
  }
}

function createRoom(player1, player2) {
  const roomID = generateRoomID(); // Generate a unique room ID
  player1.join(roomID);
  player2.join(roomID);
  roomManager[player1.id] = roomID;
  roomManager[player2.id] = roomID;
  console.log(`Room ${roomID} created with players ${player1.id} and ${player2.id}`);

  // Notify players about joining the room
  player1.emit('joinMatchmaking', (roomID));
  player2.emit('joinMatchmaking', (roomID));
  player1.emit('join', 2, findPropertyByValue(listOfPlayer, player2.id));
  player2.emit('join', 2, findPropertyByValue(listOfPlayer, player1.id));

  // Start the game
  const randomSides = getRandomSide();
  player1.emit('startGame', randomSides[0]);
  player2.emit('startGame', randomSides[1]);
 
}

function generateRoomID() {
  // Generate a random alphanumeric room ID
  const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let roomID = '';
  for (let i = 0; i < 6; i++) {
    roomID += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return roomID;
}

function playerInit(newPlayer, socket){
  console.log(listOfPlayer);
  listOfPlayer[newPlayer] = socket.id;
  roomManager[socket.id] = '';
  console.log(listOfPlayer);
  console.log(`New player ${newPlayer} join with socket id ${socket.id}`);
}

function playerDisconnect(socket){
  console.log(`Player Disconnect`);
  playerLeaveRoom(roomManager[socket.id], socket);
  delete roomManager[socket.id];

  for (var name in listOfPlayer)
    if (listOfPlayer[name] == socket.id){
      console.log(`Player ${name} leaved`);
      delete listOfPlayer[name];
      break;
    }
    playerQueue = playerQueue.filter((player) => player != socket.id);
  console.log(listOfPlayer);

}

function playerJoinRoom(roomID, socket, io){
  const room = io.sockets.adapter.rooms.get(roomID);
  const numberOfPlayer = room ? room.size : 0;
  if (numberOfPlayer < 2){
    socket.join(roomID);
    socket.emit('join', numberOfPlayer, findPropertyByValue(listOfPlayer, findPropertyByValue(roomManager, roomID)));
    roomManager[socket.id] = roomID;
    console.log(`Joined room ${roomID} with ${numberOfPlayer} player`);
    if (numberOfPlayer == 1){
      socket.to(roomID).emit('join', numberOfPlayer, findPropertyByValue(listOfPlayer, socket.id));
      console.log(findPropertyByValue(listOfPlayer, socket.id));
    }
  }
  else{
    console.log('roomFull', numberOfPlayer);
    socket.emit('join', numberOfPlayer);
  }
}

function masterStartGame(roomID, socket){
  console.log(`${socket.id} send start game signal to room: ${roomID}`);
  const randomSides = getRandomSide();
  socket.emit('startGame', randomSides[0]);
  socket.to(roomID).emit('startGame', randomSides[1]);
}

function opponentMove(roomID, from, to, socket){
  console.log(`Sending moves from ${socket.id} to room: ${roomID}`);
  socket.to(roomID).emit('opponentMove', from, to, socket.id);
}

function playerInvite(playerUsername, friendUsername, socket){
  console.log(`Recived invite to ${friendUsername} from ${playerUsername} `);
  socket.to(listOfPlayer[friendUsername]).emit('invite', playerUsername);
}

function opponentResign(roomID, socket){
  socket.to(roomID).emit('resign');
}

function playerLeaveRoom(roomID, socket){
  console.log(`${socket.id} leaves room ${roomID}`);
  socket.to(roomID).emit('leaveRoom');
  socket.leave(roomID);
  roomManager[socket.id] = '';
}

function findPropertyByValue(obj, value) {
  for (let key in obj) {
    if (obj.hasOwnProperty(key) && obj[key] === value) {
      return key;
    }
  }
  
  return null; // Return null if the value is not found
}

function getRandomSide() {
  if (Math.floor(Math.random() * 2) == 0) {
      return ['black', 'white'];
  } else {
      return ['white', 'black'];
  }
}
exports.initializeGame = initializeGame