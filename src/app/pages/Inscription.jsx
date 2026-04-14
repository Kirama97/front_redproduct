import React, { useState } from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext';

const Inscription = () => {
    const { register, loading } = useAuth()
    const [email , setEmail] = useState("")
    const [password , setPassword] = useState("")
    const [nom , setNom] = useState("")
    const [error , setError] = useState("")
    const [showPassword , setShowPassword] = useState(false)
    const navigate = useNavigate()
    
   
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

    const handleRegister = async (e) => {
        e.preventDefault()
        setError("")

       
        if(!nom || !email || !password){
            toast.error('Veuillez remplir tous les champs');
            setError("Tous les champs sont requis");
            return ; 
        }

      
        if(!emailRegex.test(email)){
            toast.error("Adresse email invalide");
            setError("Adresse email invalide");
            return;
        }

        try {
          
            const inscription = await register({
                username: nom,
                email: email,
                password: password
            });

           
            navigate("/compte_creer");
            
            toast.success(inscription?.message || "Inscription réussie, vérifiez vos emails !");
        
       } catch (error) {
    
            const errMsg = error.response?.data?.email?.[0] || 
                   error.response?.data?.username?.[0] || 
                   "Échec de l'inscription";

           toast.error("Ce nom d'utilisateur est déjà pris."); 
}
}


  return (
    <div className="bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen" 
      style={{ backgroundImage :`url(${image_bg})`}}>
    
     <div className="max-sm:w-full max-sm:mx-4 sm:w-80">
          <div className="flex gap-3 justify-center items-center pb-5">
              <img src={logo} alt="Logo" />
              <h1 className="text-white text-md font-bold">RED PRODUCT</h1> 
          </div>
  
          <div className="w-full bg-white px-7 py-10 rounded-sm">
              <p className="text-lg sm:text-xs text-neutral-700 font-semibold">Inscrivez-vous en tant que Admin</p>
  
              <form onSubmit={handleRegister} className="flex flex-col gap-2 py-2">
                {/* nom */}
                  <input 
                    className={`w-full outline-none text-md sm:text-xs py-3 sm:py-2 placeholder:text-md sm:placeholder:text-[10px] placeholder:text-neutral-400 border-b-1  ${
                        error ? "border-red-500 focus:ring-red-500" : "border-neutral-300"
                    }`} 
                    type="text" 
                    name="nom" 
                    placeholder="Nom" 
                    value={nom}
                    onChange={(e) => setNom(e.target.value)}
                    required />

                   {/* email */}
                  <input 
                    className={`w-full outline-none text-md sm:text-xs py-3 sm:py-2 placeholder:text-md sm:placeholder:text-[10px] placeholder:text-neutral-400 border-b-1  ${
                        error ? "border-red-500 focus:ring-red-500" : "border-neutral-300"
                    }`} 
                    type="email" 
                    name="email" 
                    placeholder="E-mail" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required />

                  {/* password */}
                  <input
                     className={`w-full outline-none text-md sm:text-xs py-3 sm:py-2 placeholder:text-md sm:placeholder:text-[10px] placeholder:text-neutral-400 border-b-1  ${
                        error ? "border-red-500 focus:ring-red-500" : "border-neutral-300"
                    }`} 
                     type={showPassword ? "text" : "password"} // texte corrigé en text
                     name="password" 
                     placeholder="Mot de passe" 
                     value={password}
                     onChange={(e) => setPassword(e.target.value)}
                     required />
                  
                   <div onClick={() => setShowPassword(!showPassword)} className="flex cursor-pointer gap-2 mt-5">
                     <input type="checkbox" checked={showPassword} readOnly />
                     <p className="text-xs text-neutral-700 hover:text-yellow-400">Afficher le mot de passe</p>
                   </div>
  
                   {/* Affichage d'erreur globale */}
                   {error && <p className="text-xs text-red-500 mt-2">{error}</p>}
  
                   {
                    loading ? 
                    (
                        <button disabled className="bg-neutral-500 py-2 rounded-lg mt-5 flex items-center justify-center gap-2 text-white cursor-not-allowed text-xs ">
                            <div className=" w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             inscription...
                        </button>
                    )
                     :(
                        <button type="submit" className="bg-neutral-800 py-2 rounded-lg mt-5 text-white cursor-pointer text-xs hover:bg-neutral-900">
                          S'inscrire
                        </button>
                    ) 
                }
              </form>
          </div>
  
          <div className="w-full text-white text-center py-2">
              <p className="text-md sm:text-[10px] mt-3">Vous avez un compte ? <NavLink to="/connexion" className="text-yellow-300">Se connecter</NavLink></p>
          </div>
      
      </div>
    </div>
  )
}

export default Inscription
