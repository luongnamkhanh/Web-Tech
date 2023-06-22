import { useState, createContext, useEffect } from 'react';
import { socket } from './GameContext';
const UserContext = createContext();

function UserProvider( {children} ){
  const [userAPIData, setUserApiData] = useState(null);

  useEffect(() => {
    userAPIData && socket.emit('init', userAPIData.username);
  }, [userAPIData]);

  return(
    <UserContext.Provider value={{userAPIData, setUserApiData}}>
      {children}
    </UserContext.Provider>
  )
}

export {UserContext, UserProvider}