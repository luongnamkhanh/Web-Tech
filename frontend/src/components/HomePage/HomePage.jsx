import React from 'react';
import './HomePage.css';
import GameImage from './GameImage/GameImage';
import GameMenu from './GameMenu/GameMenu';

function HomePage({handleStartGame}) {
  return (
    <div className="container">
      <GameImage />
      <GameMenu handleStartGame={handleStartGame} />
    </div>
  );
}

export default HomePage;
