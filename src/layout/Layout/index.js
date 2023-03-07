import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer' 
import Sidebar from '../Sidebar' 

export default function Layout() {
  return (
    <div><Header/>
    <Sidebar/> <Outlet />
    <Footer/></div>
  )
}
