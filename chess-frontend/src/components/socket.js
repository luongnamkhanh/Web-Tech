import { useContext } from "react";
import { io } from "socket.io-client"
import { GameContext } from "../context/GameContext";

const ENDPOINT = 'http://localhost:3001'

const socket = io(ENDPOINT);

function initializeClientConnection(){
  socket.emit("init", "myId");
}

function joinRoom(){
  socket.emit("join", "testRoom");
}

function invite(playerId){
  socket.emit("invite", myId, playerId);
}

initializeClientConnection();
joinRoom();

export { socket }