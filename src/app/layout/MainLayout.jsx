import React, { useState } from 'react'
import Navbar from '../../components/commun/Navbar'
import { Outlet } from 'react-router'
import Footer from './../../components/commun/Footer';
import SideBar from '../../components/commun/SideBar';
import TopBar from './../../components/commun/TopBar';

const MainLayout = () => {
   const [showSideBar , setShowSideBar] = useState(false)
  return (
    <div className="flex h-screen w-screen bg-white">
        <SideBar   showSideBar={showSideBar} setShowSideBar={setShowSideBar}  />
        <main className='w-full sm:w-5/6 bg-neutral-100' >
          <TopBar   showSideBar={showSideBar} setShowSideBar={ setShowSideBar} />
          <Outlet></Outlet>
        </main>
         
    </div>

  )
}

export default MainLayout
