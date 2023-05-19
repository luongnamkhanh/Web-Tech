import { useContext, useState } from "react";
import "./MoveList.css"
import { GameContext } from "../../context/GameContext";
import MoveListItem from "../MoveListItem/MoveListItem";

function MoveList(){
  const {moveList} = useContext(GameContext);
  let moveListItems = [];
  if (moveList)
    moveListItems = moveList.map((move, index) => {return <MoveListItem props={{...move, index}} key={index}/>});
  
  return(
    <>
      <h2 className="title">Move list</h2>
      <div className="move-list">
        {moveListItems}
      </div>
    </>
  )
}

export default MoveList;