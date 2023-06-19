import './App.css'
import { useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
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
        <div id="app">
        <BrowserRouter>
          <div style={{ flex: 1 }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/game" element={<IngamePage />} />
              <Route path="/highscore" element={<HighScoresPage />} />
            </Routes>
          </div>
        </BrowserRouter>
        </div>
      </GameProvider>
    </>
  )
}

export default App
