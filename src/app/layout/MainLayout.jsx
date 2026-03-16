import React from 'react'
import Navbar from '../../components/commun/Navbar'
import { Outlet } from 'react-router'
import Footer from './../../components/commun/Footer';
import SideBar from '../../components/commun/SideBar';
import TopBar from './../../components/commun/TopBar';

const MainLayout = () => {
  return (
    <div className="flex h-screen w-screen bg-white">
        <SideBar  />
        <main className='w-5/6 bg-neutral-100' >
          <TopBar/>
          <Outlet></Outlet>
        </main>
      
    </div>

  )
}

export default MainLayout
