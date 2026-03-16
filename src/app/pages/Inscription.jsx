import React, { useState } from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink, useNavigate } from 'react-router'


const Inscription = () => {

    const [email , setEmail] = useState()
    const [password , setPaswword] = useState()
    const [error , setError] = useState()
    const [loading , setLoading] = useState()
    const navigate = useNavigate()

    const handleRegister = async (e) => {
        e.preventDefault()

        navigate("/accueil");




    }
     



  return (
    <div  className="  bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen" 
      style={{ backgroundImage :`url(${image_bg})`}}
    >
    
     <div className="w-xl">
          <div className="flex gap-3 justify-center items-center pb-5">
              <img src={logo} alt="Logo" />
              <h1 className="text-white text-md font-bold">RED PRODUCT</h1> 
          </div>
  
          <div className="w-full bg-white px-7 py-10 rounded-sm">
              <p className="text-xs text-neutral-700 font-semibold">Inscrivez-vous en tant que Admin</p>
  
          
  
              <form onSubmit={handleRegister} className="flex flex-col gap-2 py-2">
                  <input className="w-full text-xs outline-none py-2 placeholder:text-[10px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="text" name="password" placeholder="Nom" required />
                  <input className="w-full outline-none text-xs py-2 placeholder:text-[10px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="email" name="email" placeholder="E-mail" required />
                  
                  <input className="w-full text-xs outline-none py-2 placeholder:text-[10px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="password" name="password" placeholder="Mot de passe" required />
                  
                  <div className="flex gap-2 mt-5">
                      <input type="checkbox"/>
                      <p className="text-xs text-neutral-700">Gardez-moi connecté</p>
                  </div>
  
                  <button type="submit"  className="bg-neutral-800 py-2 rounded-lg mt-5 text-white cursor-pointer text-xs hover:bg-neutral-900">Se connecter</button>
              </form>
          </div>
  
          <div className="w-full text-white text-center py-2">
              
              <p className="text-[10px] mt-3">Vous avez un compte ? <NavLink to="/connexion"  className="text-yellow-300">Se connecter</NavLink></p>
          </div>
      
      </div>
    </div>
  )
}

export default Inscription
