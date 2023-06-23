import { useContext } from "react"
import "./RoomCodeText.css"
import { GameContext } from "../../context/GameContext"
import WaitingForPlayerText from "../WaitingForPlayerText/WaitingForPlayerText";
import StartGameButton from "../StartGameButton/StartGameButton";
function RoomCodeText() {
  const { roomID, isRoomFull } = useContext(GameContext);
  return (
    <div className="room-container">
      <br></br>
      <br></br>
      <br></br>
      <h2 className="room-heading">Room: {roomID}</h2>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      <br></br>
      {/* <h3 className="waiting-message">Waiting for other player</h3>
      <br></br>
      <div class = "container">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div> */}
      { isRoomFull ? <StartGameButton/> : <WaitingForPlayerText/>}
    </div>
  )
}

export default RoomCodeText