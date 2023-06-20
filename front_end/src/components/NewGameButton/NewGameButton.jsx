import { useContext } from "react"
import { StyledButton } from "./muiStyled"
import { GameContext } from "../../context/GameContext"

function NewGameButton(){
  const { newGame } = useContext(GameContext);
  
  return(
    <StyledButton onClick={() => {newGame()}}>
      New Game
    </StyledButton>
  )
}

export default NewGameButton