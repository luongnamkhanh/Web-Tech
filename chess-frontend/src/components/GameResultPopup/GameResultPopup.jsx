import "./GameResultPopup.css"
import Popup from "reactjs-popup"

function GameResultPopup(){
  return(
    <Popup trigger={<button> Trigger</button>} position="right center">
      <div>Popup content here !!</div>
    </Popup>
  )
}

export default GameResultPopup;