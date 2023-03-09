import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from '../Header'
import Footer from '../Footer'
import SidebarMenu from '../SidebarMenu'
import { ProSidebarProvider } from 'react-pro-sidebar';

export default function Layout() {
  return <ProSidebarProvider>
    <Header />
    <SidebarMenu /> <Outlet />
    <Footer />
  </ProSidebarProvider>;
  // return (
  //   <div><Header/>
  //   <Sidebar/> <Outlet />
  //   <Footer/></div>
  // )
}
