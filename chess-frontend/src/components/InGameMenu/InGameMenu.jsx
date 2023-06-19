import { useContext } from "react"
import GameResultPopup from "../GameResultPopup/GameResultPopup"
import MoveList from "../MoveList/MoveList"
import ResignButtom from "../ResignButtom/ResignButtom"
import { GameContext } from "../../context/GameContext"
import './InGameMenu.css'
import NewGameButton from "../NewGameButton/NewGameButton"

function InGameMenu(){
  const { isOver } = useContext(GameContext);

  return(
    <div className="inGameMenu">
      <MoveList />
      <GameResultPopup/>
      {
        !isOver ? <ResignButtom/> : <NewGameButton/>
      }
    </div>
  )
}

export default InGameMenu