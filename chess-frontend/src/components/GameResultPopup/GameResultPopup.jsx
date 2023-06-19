import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import './GameResultPopup.css'
import { GameContext } from "../../context/GameContext";
import ResignButtom from '../ResignButtom/ResignButtom';

function GameResultPopup (){
  const {isOver} = useContext(GameContext);
  console.log(`game is over:${isOver}`);

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
          </div>
          
        </div>
      )}
    </Popup>
  )
}

export default GameResultPopup;