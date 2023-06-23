function WaitingForPlayerText(){
  return(
    <>
      <h3 className="waiting-message">Waiting for other player</h3>
      <br></br>
      <div class = "container">
      <div class="lds-ring"><div></div><div></div><div></div><div></div></div>
      </div>
    </>
  )
}

export default WaitingForPlayerText;