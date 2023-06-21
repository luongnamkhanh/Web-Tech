import { useContext, useState } from "react"
import { TextField, Button } from '@mui/material';
import './RoomCodeField.css'
import { StyledButton, StyledTextField } from "./muiStyled";
import { GameContext, socket } from "../../context/GameContext";

function RoomCodeField(){
  const {roomID, setRoomID} = useContext(GameContext);

  const handleSubmit = e =>{
    e.preventDefault();
    socket.emit('join', roomID);
  }

  return(
    <>
      <form className="roomInput" onSubmit={handleSubmit}>
        <StyledTextField 
          value={roomID} 
          onChange={e => setRoomID(e.target.value)} 
          label="Room code"
        />
        <StyledButton type="submit">Join</StyledButton>
      </form>
    </>
  )
}

export default RoomCodeField