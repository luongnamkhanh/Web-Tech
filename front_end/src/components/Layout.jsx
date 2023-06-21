import React from 'react'
import { Outlet } from 'react-router-dom'
// import Header from './Header'
// import Footer from './Footer'
import ResponsiveAppBar from './NavBar/NavBar'
const Layout = () => {
  return (
    <>
        {/* <Header /> */}
        <ResponsiveAppBar />
        <Outlet />
        {/* <Footer /> */}
    </>
  )
}

export default Layout