import React, { useState } from 'react'
import Navbar from '../../components/commun/Navbar'
import { Outlet } from 'react-router'
import Footer from './../../components/commun/Footer';
import SideBar from '../../components/commun/SideBar';
import TopBar from './../../components/commun/TopBar';
import ChatBot from '../components/ChatBot/ChatBot';


const MainLayout = () => {
   const [showSideBar , setShowSideBar] = useState(false)
  return (
   
       <div className="flex h-screen w-screen overflow-hidden bg-white">
        <SideBar   showSideBar={showSideBar} setShowSideBar={setShowSideBar}  />
        <main className='w-full lg:w-5/6 bg-neutral-100 relative' >
          <TopBar   showSideBar={showSideBar} setShowSideBar={ setShowSideBar} />
          <Outlet></Outlet>
          <ChatBot />
        </main>
    </div>
    
    

  )
}

export default MainLayout
