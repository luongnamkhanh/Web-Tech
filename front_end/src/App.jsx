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
import { logout } from './helper/helper';
import axios from 'axios';

function App() {
  useEffect(() => {
    const handleTabClose = async event => {
      event.preventDefault();

      try {
        const token = localStorage.getItem('token');
        await axios.post('/api/logout', null, {
          headers: { 'Authorization': `Bearer ${token}` },
        });
      } catch (error) {
        console.log('Logout request failed:', error);
      }
      console.log('beforeunload event triggered');
    };

    window.addEventListener('beforeunload', handleTabClose);

    return () => {
      window.removeEventListener('beforeunload', handleTabClose);
    };
  }, []);
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
              <Route path="highscores" element={<HighScoresPage />} />
            </Route>
          </Routes>
        </Router>
      </GameProvider>
    </>
  );
}

export default App;
