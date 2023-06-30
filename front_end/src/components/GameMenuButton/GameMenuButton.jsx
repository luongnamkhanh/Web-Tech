import { StyledButton } from './muiStyled'
import { GameContext } from "../../context/GameContext";
import { useContext } from 'react';

function StartButton(){
  const {isStarted, startGame} = useContext(GameContext);

  if (!isStarted)
    return <StyledButton onClick={() => {startGame(); console.log(isStarted)}}>
      Start Game
    </StyledButton>
}

function PlayWithBotButton(){
  const { changeMenu, setBotGame } = useContext(GameContext);

  return <StyledButton onClick={ () => { 
    changeMenu(1);
    setBotGame(); 
  }}>
    Play With Bot
  </StyledButton>
}

function PlayOnlineButton(){
  const { changeMenu } = useContext(GameContext);

  return <StyledButton onClick={ () => { 
    changeMenu(2);
  }}>
    Play Online
  </StyledButton>
}

function PlayWithFreindButton(){
  const { changeMenu } = useContext(GameContext);

  return <StyledButton onClick={ () => { 
    changeMenu(3) 
  }}>
    Play With Friend
  </StyledButton>
}

export {StartButton, PlayWithBotButton, PlayOnlineButton, PlayWithFreindButton};