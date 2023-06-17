import "./IngamePage.css"
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import PlayerInfoBar from "../../components/PlayerInfoBar/PlayerInfoBar";
import MoveList from "../../components/MoveList/MoveList";
import { GameProvider } from "../../context/GameContext";
import GameResultPopup from "../../components/GameResultPopup/GameResultPopup";

function IngamePage(){
  let component = GameResultPopup;
    return(
      <GameProvider>
        <div id="in-game">
            <div id="board">
              <PlayerInfoBar />
              <ChessBoard />
              <PlayerInfoBar />
            </div>

            <div id="info-tab">
              <MoveList />
              <GameResultPopup></GameResultPopup>
              ${component}
            </div>
            
        </div>
      </GameProvider>
    )
}

export default IngamePage;