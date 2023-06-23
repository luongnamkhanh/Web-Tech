import { useContext } from "react"
import RoomCodeField from "../RoomCodeField/RoomCodeField"
import { GameContext } from "../../context/GameContext"
import RoomCodeText from "../RoomCodeText/RoomCodeText"
import StartGameButton from "../StartGameButton/StartGameButton";

function PlayWithFriendMenu(){
  const { isInRoom, isRoomFull } = useContext(GameContext);
  return(
    <>
      { !isInRoom && <RoomCodeField/>}
      { isInRoom && <RoomCodeText/>}
    </>
  )
}

export default PlayWithFriendMenu