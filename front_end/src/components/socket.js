import { useContext } from "react";
import { io } from "socket.io-client"
import { GameContext } from "../context/GameContext";

const ENDPOINT = 'http://localhost:8080'

const socket = io(ENDPOINT);
socket.emit("join", "testRoom");

export { socket }