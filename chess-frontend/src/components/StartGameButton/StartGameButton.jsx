import { useContext } from "react";
import { StyledButton } from "./muiStyled";
import { GameContext } from "../../context/GameContext";

function StartGameButton(){
  const { startGame } = useContext(GameContext);
  
  return(
    <StyledButton onClick={() => {
      startGame();
    }}>
      Start Game
    </StyledButton>
  )
}

export default StartGameButton