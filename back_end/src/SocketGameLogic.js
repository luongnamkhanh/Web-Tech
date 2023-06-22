let listOfPlayer = [];
let roomManager = [];

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
  console.log(listOfPlayer);

}

function playerJoinRoom(roomID, socket, io){
  const room = io.sockets.adapter.rooms.get(roomID);
  const numberOfPlayer = room ? room.size : 0;
  if (numberOfPlayer < 2){
    socket.join(roomID);
    roomManager[socket.id] = roomID;
    console.log(`Joined room ${roomID} with ${numberOfPlayer} player`);
    socket.emit('join', numberOfPlayer);
    if (numberOfPlayer == 1){
      socket.to(roomID).emit('join', numberOfPlayer);
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

function getRandomSide() {
  if (Math.floor(Math.random() * 2) == 0) {
      return ['black', 'white'];
  } else {
      return ['white', 'black'];
  }
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


exports.initializeGame = initializeGame