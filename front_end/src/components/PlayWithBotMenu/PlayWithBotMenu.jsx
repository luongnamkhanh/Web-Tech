import ChooseDifficultyButton from "../ChooseDifficultyButton/ChooseDifficultyButton";
import StartGameButton from "../StartGameButton/StartGameButton";

function PlayWithBotMenu(){

  return (
    <div>
      <div className="difficultyButtons">
        <ChooseDifficultyButton props={0}/>
        <ChooseDifficultyButton props={1}/>
        <ChooseDifficultyButton props={2}/>
        <ChooseDifficultyButton props={3}/>
        <ChooseDifficultyButton props={4}/>
      </div>
      <StartGameButton/>
    </div>
  )
}

export default PlayWithBotMenu