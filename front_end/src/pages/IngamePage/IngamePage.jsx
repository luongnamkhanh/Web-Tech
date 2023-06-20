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
import PlayWithFriendMenu from "../../components/PlayWithFriendMenu/PlayWithFriendMenu";
import StartGameButton from "../../components/StartGameButton/StartGameButton";

function IngamePage() {
  const { isStarted, isOver, menu } = useContext(GameContext)
  return (
    <div id="in-game">
      <div id="board">
        <PlayerInfoBar isOpponent={true} /> {/* Player 1 (opponent) */}
        <ChessBoard />
        <PlayerInfoBar isOpponent={false} /> {/* Player 2 (yourself) */}
      </div>

      <div id="info-tab">
        {isStarted && <InGameMenu />}
        {!isStarted && menu === 0 && <MainMenu />}
        {!isStarted && menu === 1 && <PlayWithBotMenu />}
        {!isStarted && menu === 3 && <PlayWithFriendMenu />}
        {
          !isStarted && menu === 2 &&
          <>
            <StartGameButton/>
          </>
        }

      </div>

    </div>
  )
}

export default IngamePage;