import "./PlayerInfoBar.css"
import React, { useContext, useState } from 'react'
import avatar from '../../assets/profile.png';
import toast, { Toaster } from 'react-hot-toast';
import convertToBase64 from '../../helper/convert';
import useFetch from '../../hooks/fetch.hook';


import styles from '../../styles/Username.module.css';
import extend from '../../styles/Profile.module.css'
import { UserContext } from "../../context/UserContext";

function PlayerInfoBar({ isOpponent }){
  const { userAPIData } = useContext(UserContext);
  const avatar_path = isOpponent ? './Images/Avatar/default.jpg' : userAPIData?.profile; // Change the avatar path logic
  const playerName = isOpponent ? 'Opponent' : userAPIData?.username; // Change the player name logic

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