

import React, { useState } from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext';
import { FaCheck } from "react-icons/fa";




const  Compte_creer = () => {
    const { register, loading } = useAuth()
  
    const [error , setError] = useState()
    const navigate = useNavigate()


      


  return (
    <div  className="  bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen" 
      style={{ backgroundImage :`url(${image_bg})`}}
    >
    
     <div className=" max-sm:w-full max-sm:mx-4 sm:w-80">
          <div className="flex gap-3 justify-center items-center pb-5">
              <img src={logo} alt="Logo" />
              <h1 className="text-white text-md font-bold">RED PRODUCT</h1> 
          </div>
  
          <div className="w-full bg-white px-7 py-10 rounded-sm">
              <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center">
                  <FaCheck size={20} className='text-white animate-pulse'  />
              </div>
              <p className="text-lg sm:text-xs text-neutral-700 font-semibold text-center mt-5">Compte créé avec succès. Veuillez vérifier votre e-mail afin d’activer votre compte.</p>
              <p className=" text-red-600 text-[10px] mt-3 text-center animate-pulse">NB : Le compte sera supprimé s’il n’est pas activé au bout de 15 minutes.</p>
  
          
  
            
          </div>
  
       
      
      </div>
    </div>
  )
}

export default Compte_creer







