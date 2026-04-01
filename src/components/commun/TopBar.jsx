import React, { useState } from 'react'
import { CiSearch } from "react-icons/ci";
import profil_img from '../../assets/image_profil/profil_img.jpg'
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineLogout } from "react-icons/md";
import { useNavigate } from 'react-router';
import Notification from './../Notification';
import { RiMenu2Fill } from "react-icons/ri";
import { useAuth } from '../../context/AuthContext';
import toast from 'react-hot-toast';




const TopBar = ({showSideBar ,setShowSideBar}) => {
     const {logout } = useAuth()
     const navigate = useNavigate();
     const [showNotification , setShowNotification] = useState(false)


      const handleLogout = async () => {
      await logout();
      navigate("/connexion" ,{ replace : true});
      toast.success('A Bientot')
      };
  return (
    <div className="w-full h-[8vh] bg-white flex items-center justify-between px-5 shadow-sm">
        <div className="flex items-center gap-5">
          <RiMenu2Fill size={20}
           onClick={() => setShowSideBar(!showSideBar)}
           className='sm:hidden'
           />
          <h1 onClick={() => navigate("/dashboard")} className='text-lg sm:text-sm font-semibold '>Dashbord</h1>  
        </div>
        <div className="flex items-center gap-2">
            {/* rechercher */}
           <div className=" hidden sm:flex items-center gap-2 border px-2 rounded-md focus-within:ring-1 focus-within:ring-yellow-400">
                <CiSearch size={12} />
                <input 
                type="text"
                 placeholder='recherche'
                 className='placeholder:text-xs outline-none text-xs px-2 py-1 '
                  />
            </div>
            {/* notification */}
            <div
              onClick={() => setShowNotification(!showNotification)}
               className="relative cursor-pointer"
              >
                <IoMdNotificationsOutline className='text-xl sm:text-lg' />
                <span className='absolute top-[-8px] right-[-8px] text-[8px] bg-yellow-400 text-white px-1 rounded-md'>2</span>
              
            </div>
            {/* profil */}
            <div onClick={() => navigate('/profil')} className="relative  w-7 h-7 sm:w-5 sm:h-5 rounded-full mx-2 cursor-pointer">
                 <img src={profil_img} className='w-full h-full rounded-full' alt="profil"  />
                 <span className='absolute bottom-[-1px] right-[-1px] rounded-full z-50 w-[5px] h-[5px]  bg-green-600'></span>
            </div>
            {/* logout */}
              <MdOutlineLogout
               onClick={() => handleLogout()}
               title='Deconnexion'
               className='text-xl sm:text-lg hover:text-yellow-500 cursor-pointer' />

            {/* notification */}
             {
                showNotification ? (<Notification/>) : '' 
              }
             
        </div>
     </div>
  )
}

export default TopBar
