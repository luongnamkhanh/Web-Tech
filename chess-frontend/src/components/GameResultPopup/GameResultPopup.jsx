import React, { useContext } from 'react';
import Popup from 'reactjs-popup';
import { GameContext } from "../../context/GameContext";
import ResignButtom from '../ResignButtom/ResignButtom';

function GameResultPopup (){
  const {isOver} = useContext(GameContext);
  console.log(`game is over:${isOver}`);

  return(
    <Popup
      trigger={ResignButtom}
      modal
      open={isOver}
    >
      {close => (
        <div className="modal">
          <button className="close" onClick={close}>
            &times;
          </button>
          <div className="header"> Modal Title </div>
          <div className="content">
            {' '}
            Hello
            
          </div>
          <div className="actions">
            <Popup
              trigger={<button className="button"> Trigger </button>}
              position="top center"
              nested
            >
              <span>
                Lorem 
              </span>
            </Popup>
            <button
              className="button"
              onClick={() => {
                console.log('modal closed ');
                close();
              }}
            >
              close modal
            </button>
          </div>
        </div>
      )}
    </Popup>
  )
}

export default GameResultPopup;