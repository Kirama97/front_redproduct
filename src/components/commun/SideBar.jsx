import React from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { CiUser } from "react-icons/ci";

import { NavLink } from 'react-router';
import { MdDashboard } from "react-icons/md";
import { FaHotel } from "react-icons/fa";


const SideBar = () => {

  const linkClass = ({ isActive }) =>
    `flex items-center gap-2 px-2 py-2 text-xs
     ${
       isActive
         ? "bg-white text-neutral-500"
         : "text-white hover:text-yellow-500"
     }`;

  return (
   
<div
 style={{ backgroundImage :`url(${image_bg})`}} 
 className="slide_barre z-40 bg-white w-1/6 md:flex  md:h-screen  flex-col justify-between bg-center ">
      
    <div className="slide_top ">
        <div className="flex gap-3 items-center mb-5 px-2 py-5 ">
            <img src={logo} className='w-5 h-5' alt="logo" />
            <h1 className="text-white text-xs sm:text-md font-bold">RED PRODUCT</h1> 
        </div>
         {/* menu */}
        <div>
            <p className=" text-neutral-400 text-[12px] md:text-xs mb-3 px-2 ">Principal</p>

            <nav className='flex flex-col items-justify-center text-md '>
                <NavLink to="/dashboard" className={linkClass}>
                    <MdDashboard size={15} />
                   <p> Dashboard</p>
                 </NavLink>
                <NavLink to="/hotels" className={linkClass}>
                   <FaHotel size={15}  />
                   <p>Liste des hotels </p>
                    </NavLink>
            </nav>
        </div> 
     </div>
        {/* footer */}
       <div className="slide_bottom px-3 pb-10 pt-4 border-t border-neutral-500">

        <div className="flex items-center gap-3">

          <NavLink to="/profil" className="flex items-center group hover:bg-yellow-400 justify-center bg-white p-2 rounded-full duration-150 ease-linear cursor-pointer">
              <CiUser size={15} className='group-hover:text-white'  />
          </NavLink >
          <div>
            <p className="text-[12px] text-neutral-200">
              Admin
            </p>
            
            <p className="flex gap-2 items-center text-[10px] text-neutral-400">
              <span className="rounded-full block w-2 h-2 bg-green-600"></span>
              En ligne
            </p>

          </div>

        </div>

      </div>



</div>
 
  

  )
}

export default SideBar
