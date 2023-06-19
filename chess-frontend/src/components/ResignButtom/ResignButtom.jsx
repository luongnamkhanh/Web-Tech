import { useContext } from "react";
import { GameContext } from "../../context/GameContext";

function ResignButtom(){
  const { resign } = useContext(GameContext);
  return(
    <button className="button"
      onClick={() => {
        resign();
      }}
    > 
      Resign 
    </button>
  )
}

export default ResignButtom;