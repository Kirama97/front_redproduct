import React from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink } from 'react-router'


const Inscription = () => {
  return (
    <div  className="  bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen" 
      style={{ backgroundImage :`url(${image_bg})`}}
    >
        <div className="w-80">
        <div className="flex gap-3 justify-center items-center pb-10">
            <img src={logo} alt="Logo" />
            <h1 className="text-white text-2xl font-bold">RED PRODUCT</h1> 
        </div>

        <div className="w-full bg-white px-7 py-10 rounded-sm">
            <p className="text-sm text-neutral-700 font-semibold">Inscrivez-vous en tant qu'Admin</p>

    

            <form method="post" className="flex flex-col gap-3 py-5">
                <input className="w-full outline-none text-sm py-2 placeholder:text-[12px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="text" name="nom" placeholder="Nom" required />
                <input className="w-full outline-none py-2 placeholder:text-[12px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="email" name="email" placeholder="E-mail" required />
                <input className="w-full outline-none py-2 placeholder:text-[12px] placeholder:text-neutral-400 border-b-1 border-neutral-300" type="password" name="password" placeholder="Mot de passe" required />
                
                <div className="flex gap-3 mt-5">
                    <input type="checkbox" required />
                    <p className="text-sm text-neutral-700">Accepter les termes et la politique</p>
                </div>

                <button type="submit" name="bt_inscription" className="bg-neutral-800 py-3 rounded-lg mt-5 text-white cursor-pointer text-sm hover:bg-neutral-900">S'inscrire</button>
            </form>
        </div>

        <div className="w-full text-white text-center py-3">
            <p className="text-[14px] mt-3">Vous avez déjà un compte ? <NavLink to="/connexion" className="text-yellow-300">Se connecter</NavLink></p>
        </div>
</div>

    </div>
  )
}

export default Inscription
