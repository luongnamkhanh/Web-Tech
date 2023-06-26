import { useContext } from "react";
import { StyledButton } from "./muiStyled";
import { GameContext } from "../../context/GameContext";

function StartGameButton(){
  const { startMatchmaking } = useContext(GameContext);
  
  return(
    <StyledButton onClick={() => {
      startMatchmaking();
    }}>
      Find game
    </StyledButton>
  )
}

export default StartGameButton