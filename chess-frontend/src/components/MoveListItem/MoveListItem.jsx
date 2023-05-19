import "./MoveListItem.css"

function MoveListItem({props}){
  const {from, to, index:turn} = props;
  console.log(turn);
  return(
    <div className={`move-item ${turn % 2 == 0 ? "white-turn" : "black-turn"}`}>
      <div className="move-info move-index">{`${turn + 1}.`}</div>
      <div className="move-info move-node">{from}</div>
      <div className="move-info move-node">{to}</div>
    </div>
  )
}

export default MoveListItem;