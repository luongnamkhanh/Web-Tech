import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import Layout from './components/Layout';
import RecoverPasswordPage from './pages/RecoverPasswordPage';
import Resister from './pages/Resister';
import ProfilePage from './pages/ProfilePage';
import UsernamePage from './pages/UsernamePage';
import HomePage from './pages/HomePage/HomePage'
import IngamePage from './pages/IngamePage/IngamePage'
import HighScoresPage from './pages/HighScoresPage/HighScoresPage'
import { GameProvider } from './context/GameContext'
import { useEffect } from "react";
import { io } from "socket.io-client"

function App() {
  const ENDPOINT = 'http://localhost:3001'
  let socket;

  useEffect(() => {
    socket = io(ENDPOINT);
    console.log("Hey");
  })
  return (
    <>
      <GameProvider>
        <Router>
          <Routes>
            <Route path="/" element={<Layout />}>
              <Route index element={<LoginPage />} />
              <Route path="homepage" element={<HomePage />} />
              <Route path="recovery" element={<RecoverPasswordPage />} />
              <Route path="register" element={<Resister />} />
              <Route path="profile" element={<ProfilePage />} />
              <Route path="username" element={<UsernamePage />} />
              <Route path="game" element={<IngamePage />} />
              <Route path="highscore" element={<HighScoresPage />} />
            </Route>
          </Routes>
        </Router>
      </GameProvider>
    </>
  );
}

export default App;
