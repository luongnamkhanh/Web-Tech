import React from 'react';
import './HomePage.css';
import GameImage from './GameImage/GameImage';
import GameMenu from './GameMenu/GameMenu';

function HomePage() {
  return (
    <div className="container">
      <GameImage />
      <GameMenu  />
    </div>
  );
}

export default HomePage;
