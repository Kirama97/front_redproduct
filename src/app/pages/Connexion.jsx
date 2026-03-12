import React from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink } from 'react-router'

const Connexion = () => {
  return (
    <div className=' bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen'
        style={{ backgroundImage :`url(${image_bg})`}}
    >
        <div className="w-80">
        <div className="flex gap-3 justify-center items-center pb-10">
            <img src={logo} alt="Logo" />
            <h1 className="text-white text-2xl font-bold">RED PRODUCT</h1> 
        </div>

        <div className="w-full bg-white px-7 py-10 rounded-sm">
            <p className="text-sm text-neutral-700 font-semibold">Connectez-vous en tant qu'Admin</p>

        

            <form method="post" className="flex flex-col gap-3 py-5">
                <input className="w-full outline-none text-sm py-2 placeholder:text-[12px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="email" name="email" placeholder="E-mail" required />
                <input className="w-full outline-none py-2 placeholder:text-[12px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="password" name="password" placeholder="Mot de passe" required />
                
                <div className="flex gap-3 mt-5">
                    <input type="checkbox"/>
                    <p className="text-sm text-neutral-700">Gardez-moi connecté</p>
                </div>

                <button type="submit" name="bt_valider" className="bg-neutral-800 py-3 rounded-lg mt-5 text-white cursor-pointer text-sm hover:bg-neutral-900">Se connecter</button>
            </form>
        </div>

        <div className="w-full text-white text-center py-3">
            <a  className="text-[14px] text-yellow-300">Mot de passe oublié ?</a>
            <p className="text-[14px] mt-3">Vous n'avez pas de compte ? <NavLink to="/inscription"  className="text-yellow-300">S'inscrire</NavLink></p>
        </div>
    </div>
    </div>
  )
}

export default Connexion
