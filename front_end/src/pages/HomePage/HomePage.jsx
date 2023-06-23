import React, { useContext, useEffect } from 'react';
import './HomePage.css';
import GameImage from '../../components/GameImage/GameImage';
import GameMenu from '../../components/GameMenu/GameMenu';
import { UserContext } from '../../context/UserContext';
import useFetch from '../../hooks/fetch.hook';

function HomePage() {
  const [{ apiData }] = useFetch();
  const { setUserApiData } = useContext(UserContext);

  useEffect(() =>{
    console.log(apiData);
    setUserApiData(apiData);
  }, [apiData])

  return (
    <div className="container">
      <GameImage />
      <GameMenu  />
    </div>
  );
}

export default HomePage;
