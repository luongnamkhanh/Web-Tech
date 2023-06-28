import React, { useContext, useEffect } from 'react';
import Profile from '../components/Profile'
import { UserContext } from '../context/UserContext';
import useFetch from '../hooks/fetch.hook';

const ProfilePage = () => {
  const [{ apiData }] = useFetch();
  const { setUserApiData } = useContext(UserContext);

  useEffect(() =>{
    console.log(apiData);
    setUserApiData(apiData);
  }, [apiData])
  return (
    <Profile />
  )
}

export default ProfilePage