import "./PlayerInfoBar.css"
import React, { useState } from 'react'
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';


import styles from '../../styles/Username.module.css';
import extend from '../../styles/Profile.module.css'

function PlayerInfoBar({ isOpponent }){
  const [{ isLoading, apiData, serverError }] = useFetch();
  console.log(apiData);
  const avatar_path = isOpponent ? './Images/Avatar/default.jpg' : apiData?.profile; // Change the avatar path logic
  const playerName = isOpponent ? 'Opponent' : apiData?.username; // Change the player name logic

  return(
    <>
      <div className="player-info-bar">
      <label htmlFor="profile">
                    <img src={avatar_path} className= "avatar" alt="avatar" />
                  </label>
      {/* <img className="avatar" src={avatar_path} alt="Player Avatar" /> */}
      <p className="player-name">{playerName}</p>
    </div>
    </>
  )
}

export default PlayerInfoBar