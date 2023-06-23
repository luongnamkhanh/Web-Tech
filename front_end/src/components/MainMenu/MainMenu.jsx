import './MainMenu.css'
import { PlayOnlineButton, PlayWithBotButton, PlayWithFreindButton } from "../GameMenuButton/GameMenuButton";

function MainMenu(){
  return(
    <div className='mainMenu'>
      <img className="chess-image" src='Images/MainMenu/chess_icon.png'/>

      <div className='buttonMenu'>
        <PlayOnlineButton></PlayOnlineButton>
        <PlayWithBotButton></PlayWithBotButton>
        <PlayWithFreindButton></PlayWithFreindButton>
        </div>
    </div>
  )
}

export default MainMenu