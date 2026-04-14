import React, { useState } from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink, useNavigate, useParams } from 'react-router'
import toast from 'react-hot-toast'
import api from '../../services/api'



const ForgetPassword = () => {
  
    const { token } = useParams() 
    
    const [password1 , setPassword1] = useState("") 
    const [password2 , setPassword2] = useState("")
    const [showPassword , setShowPassword] = useState(false)
    const [error , setError] = useState("")
    const [loading, setLoading] = useState(false) 
    const navigate = useNavigate()

    const handleModif = async (e) => {
        e.preventDefault()
        setError("")

       
        if (password1 !== password2) {
            toast.error("Les mots de passe ne correspondent pas");
            setError("Les mots de passe ne correspondent pas");
            return;
        }

        
        if (password1.length < 8) {
            toast.error("Le mot de passe doit faire au moins 8 caractères");
            setError("Le mot de passe doit faire au moins 8 caractères");
            return;
        }

        try {
            setLoading(true)
            
        
            const reponse = await api.post("/auth/password/confirm/", {
                token: token,
                new_password: password1
            });

            toast.success("Mot de passe réinitialisé avec succès !");
            navigate("/connexion");

        } catch (err) {
        
            const errorMsg = err.response?.data?.message || 
                             err.response?.data?.non_field_errors?.[0] || 
                             err.response?.data?.new_password?.[0] || 
                             "Erreur lors de la réinitialisation";
                             
            toast.error(errorMsg);
            setError(errorMsg);
            console.log('Erreur complète:', err.response?.data);
        } finally {
            setLoading(false)
        }
    }

  return (
    <div className="bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen" 
      style={{ backgroundImage :`url(${image_bg})`}}
    >
     <div className="max-sm:w-full max-sm:mx-4 sm:w-80">
          <div className="flex gap-3 justify-center items-center pb-5">
              <img src={logo} alt="Logo" />
              <h1 className="text-white text-md font-bold">RED PRODUCT</h1> 
          </div>
  
          <div className="w-full bg-white px-7 py-10 rounded-sm">
              <p className="text-lg sm:text-xs text-neutral-700 font-semibold">Réinitialisation du mot de passe</p>
  
              <form onSubmit={handleModif} className="flex flex-col gap-2 py-2">
                 {/* password 1 */}
                  <input 
                    className={`w-full outline-none text-md sm:text-xs py-3 sm:py-2 placeholder:text-md sm:placeholder:text-[10px] placeholder:text-neutral-400 border-b-1 ${
                        error ? "border-red-500 focus:ring-red-500" : "border-neutral-300"
                    }`} 
                    type={showPassword ? "text" : "password"} // <--- corrigé: "text" (et non "texte")
                    name="password" 
                    placeholder="Nouveau mot de passe" 
                    value={password1}
                    onChange={(e) => setPassword1(e.target.value)}
                    required />

                  {/* password 2 */}
                  <input
                     className={`w-full outline-none text-md sm:text-xs py-3 sm:py-2 placeholder:text-md sm:placeholder:text-[10px] placeholder:text-neutral-400 border-b-1 ${
                        error ? "border-red-500 focus:ring-red-500" : "border-neutral-300"
                    }`} 
                     type={showPassword ? "text" : "password"} // <--- corrigé: "text"
                     name="password2" 
                     placeholder="Confirmer le mot de passe" 
                     value={password2}
                     onChange={(e) => setPassword2(e.target.value)}
                     required />
                  
                    {/* Affichage des erreurs au même endroit pour plus de clarté */}
                    {error && <p className="text-xs text-red-500 mt-1">{error}</p>}

                    <div onClick={() => setShowPassword(!showPassword)} className="flex cursor-pointer gap-2 mt-5 items-center">
                        <input type="checkbox" checked={showPassword} readOnly />
                        <p className="text-xs text-neutral-700 hover:text-yellow-400">Afficher les mots de passe</p>
                    </div>
  
                   {
                    loading ? 
                    (
                        <button disabled className="bg-neutral-500 py-2 rounded-lg mt-5 flex items-center justify-center gap-2 text-white cursor-not-allowed text-xs">
                            <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             Modification...
                        </button>
                    )
                     :(
                        <button type="submit" className="bg-neutral-800 py-2 rounded-lg mt-5 text-white cursor-pointer text-xs hover:bg-neutral-900">
                            Modifier
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

export default ForgetPassword
