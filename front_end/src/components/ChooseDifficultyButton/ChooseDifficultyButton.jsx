import { useContext } from "react";
import { StyledButton } from "./muiStyled";
import { GameContext } from "../../context/GameContext";
import './ChooseDifficultyButton.css'

function ChooseDifficultyButton({props}){
  const { difficulty, setGameDifficulty } = useContext(GameContext);
  let text = "";
  const selected = (difficulty == props)

  switch(props){
    case 0:
      text = "Well-trained monkey";
      break;
    case 1:
      text = "Beginner";
      break;
    case 2:
      text = "Intermediate";
      break;
    case 3:
      text = "Advanced";
      break;
    case 4:
      text = "Experienced";
      break;
  }

  return(
    <StyledButton className={`${selected ? "difficulty-selected" : ""}`} onClick={() => {
      setGameDifficulty(props)
    }}>
      {text}
    </StyledButton>
  )
}

export default ChooseDifficultyButton