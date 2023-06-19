import "./IngamePage.css"
import ChessBoard from "../../components/ChessBoard/ChessBoard";
import PlayerInfoBar from "../../components/PlayerInfoBar/PlayerInfoBar";
import MoveList from "../../components/MoveList/MoveList";
import GameResultPopup from "../../components/GameResultPopup/GameResultPopup";
import { StartButton } from "../../components/GameMenuButton/GameMenuButton";
import ResignButtom from "../../components/ResignButtom/ResignButtom";
import { useContext } from "react";
import { GameContext } from "../../context/GameContext";
import MainMenu from "../../components/MainMenu/MainMenu";
import PlayWithBotMenu from "../../components/PlayWithBotMenu/PlayWithBotMenu";
import InGameMenu from "../../components/InGameMenu/InGameMenu";

function IngamePage(){
  const { isStarted, isOver, menu } = useContext(GameContext)
    return(
        <div id="in-game">
            <div id="board">
              <PlayerInfoBar />
              <ChessBoard />
              <PlayerInfoBar />
            </div>

            <div id="info-tab">
              { isStarted && <InGameMenu/> }
              { !isStarted && menu === 0 && <MainMenu/> }
              { !isStarted && menu === 1 && <PlayWithBotMenu/> }
              {
                !isStarted && menu === 2 &&
                  <>
                    <MoveList />
                    <GameResultPopup></GameResultPopup> 
                    <ResignButtom></ResignButtom> 
                    <StartButton></StartButton>
                  </>
              }
              
            </div>
            
        </div>
    )
}

export default IngamePage;