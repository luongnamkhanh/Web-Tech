import React from 'react';
import './HomePage.css';
import GameImage from '../../components/GameImage/GameImage';
import GameMenu from '../../components/GameMenu/GameMenu';

function HomePage() {
  return (
    <div className="container">
      <GameImage />
      <GameMenu  />
    </div>
  );
}

export default HomePage;
