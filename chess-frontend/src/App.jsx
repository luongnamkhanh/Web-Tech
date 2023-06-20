import './App.css'
import { useContext, useState } from 'react'
import { Route, BrowserRouter, Routes } from 'react-router-dom'
import HomePage from './pages/HomePage/HomePage'
import IngamePage from './pages/IngamePage/IngamePage'
import HighScoresPage from './pages/HighScoresPage/HighScoresPage'
import { GameContext, GameProvider } from './context/GameContext'
import { useEffect } from "react";
import { socket } from './components/socket'


function App() {

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
