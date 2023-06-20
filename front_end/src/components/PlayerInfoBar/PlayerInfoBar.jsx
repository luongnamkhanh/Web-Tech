import "./PlayerInfoBar.css"

function PlayerInfoBar(){
  const avatar_path = './Images/Avatar/default.jpg'; // Add logic later
  const playerName = "name here"; //Add logic later

  return(
    <>
      <div className="player-info-bar">
        <img className="avatar" src={avatar_path}/>
        <p className="player-name">{playerName}</p>
      </div>
    </>
  )
}

export default PlayerInfoBar