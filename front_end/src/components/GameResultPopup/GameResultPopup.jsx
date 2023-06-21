import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import './GameResultPopup.css'
import { GameContext } from "../../context/GameContext";
import ResignButtom from '../ResignButtom/ResignButtom';

function GameResultPopup (){
  const {isOver, isWinner} = useContext(GameContext);

  return(
    <Popup
      //trigger={ResignButtom}
      modal
      open={isOver}
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> GameOver </div>
          <div className="content">
            {isWinner ? "You win" : "You lose"}
          </div>
          
        </div>
      )}
    </Popup>
  )
}

export default GameResultPopup;