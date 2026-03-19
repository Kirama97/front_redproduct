import React, { useState } from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink, useNavigate } from 'react-router'
import toast from 'react-hot-toast'

const Connexion = () => {

    const [email , setEmail] = useState('test@gmail.com')
    const [password , setPassword] = useState('12345')
    const [error , setError] = useState()
    const [loading , setLoading] = useState(false)
    const navigate = useNavigate()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const handleLogin = async (e) => {
        e.preventDefault()
       

         setError("")

        
        if(!email || !password ){
            toast.error('Veuillez remplir tout les champs')
                return ; 
        }
        if(!emailRegex.test(email)){
            toast.error("Adresse email invalide");
            setError("Adresse email invalide");
            return;
        }
         setLoading(true)

        setTimeout(() => {
              navigate("/dashboard");
        } , 1000)
       



    }
     

     
  return (
    <div className=' bg-no-repeat  bg-center flex items-center justify-center bg-cover w-full h-screen'
        style={{ backgroundImage :`url(${image_bg})`}}
    >
        <div className="w-xl">
         <div className="flex gap-3 justify-center items-center pb-5">
             <img src={logo} alt="Logo" />
            <h1 className="text-white text-md font-bold">RED PRODUCT</h1> 
        </div>

        <div className="w-full bg-white px-7 py-10 rounded-sm">
            <p className="text-xs text-neutral-700 font-semibold">Connectez-vous en tant qu'Admin</p>

        

            <form onSubmit={handleLogin} className="flex flex-col gap-2 py-2">
                 {/* email */}
                  <input 
                    className={`w-full outline-none text-xs py-2 placeholder:text-[10px] placeholder:text-neutral-400 border-b-1  ${
                        error ? "border-red-500 focus:ring-red-500" : "border-neutral-300"
                    }`} 
                    type="email" 
                    name="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                     />
                     {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

                  {/* password */}
                  <input
                     className={`w-full outline-none text-xs py-2 placeholder:text-[10px] placeholder:text-neutral-400 border-b-1  ${
                        error ? "border-red-500 focus:ring-red-500" : "border-neutral-300"
                    }`} 
                     type="password" 
                     name="password" 
                     placeholder="Mot de passe" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                      />
                       {/* {error && <p className="text-xs text-red-500 mt-1">{error}</p>} */}
                
                    <div className="flex gap-2 mt-5">
                        <input type="checkbox"/>
                        <p className="text-xs text-neutral-700">Gardez-moi connecté</p>
                    </div>

                {
                    loading ? 
                    (
                        <button dis  className="bg-neutral-500 py-2 rounded-lg mt-5 flex items-center justify-center gap-2 text-white cursor-pointer text-xs ">
                            <div className=" w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             connexion...
                            </button>
                    )
                     :(
                        <button type="submit"  className="bg-neutral-800 py-2 rounded-lg mt-5 text-white cursor-pointer text-xs hover:bg-neutral-900">Se connecter</button>
                    ) 
                    
                }
            </form>
        </div>

        <div className="w-full text-white text-center py-2">
            <a  className="text-[10px] text-yellow-300">Mot de passe oublié ?</a>
            <p className="text-[10px] mt-3">Vous n'avez pas de compte ? <NavLink to="/inscription"  className="text-yellow-300">S'inscrire</NavLink></p>
        </div>
        
    </div>
    </div>
  )
}

export default Connexion
