import React, { useState, useEffect } from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink, useParams } from 'react-router' 
import { FaCheck, FaTimes } from "react-icons/fa";
import api from '../../services/api';


const Compte_activer = () => {
   
    const { token } = useParams() 
    
 
    const [loading, setLoading] = useState(true)
    const [success, setSuccess] = useState(false)
    const [message, setMessage] = useState("Vérification en cours...")

    
    useEffect(() => {
        const activerLeCompte = async () => {
            try {
                const reponse = await api.post("/auth/activate/", { token: token });
                setSuccess(true);
                setMessage(reponse.data.message || "Compte activé. Vous pouvez maintenant vous connecter.");
            } catch (error) {
                setSuccess(false);
                setMessage(error.response?.data?.non_field_errors?.[0] || error.response?.data?.token?.[0] || "Lien d'activation invalide ou déjà utilisé.");
            } finally {
                setLoading(false);
            }
        };

        if (token) {
            activerLeCompte();
        }
    }, [token]);


  return (
    <div className="bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen" 
      style={{ backgroundImage :`url(${image_bg})`}}
    >
     <div className="max-sm:w-full max-sm:mx-4 sm:w-80">
          <div className="flex gap-3 justify-center items-center pb-5">
              <img src={logo} alt="Logo" />
              <h1 className="text-white text-md font-bold">RED PRODUCT</h1> 
          </div>
  
          <div className="w-full bg-white px-7 py-10 rounded-sm flex flex-col items-center">
              
              {loading ? (
                  
                  <>
                      <div className="w-20 h-20 mx-auto rounded-full border-4 border-yellow-400 border-t-transparent animate-spin flex items-center justify-center mb-5"></div>
                      <p className="text-lg sm:text-sm text-neutral-700 font-semibold text-center">{message}</p>
                  </>
              ) : success ? (
                 
                  <>
                      <div className="w-20 h-20 mx-auto rounded-full bg-green-500 flex items-center justify-center mb-5">
                          <FaCheck size={30} className='text-white animate-pulse' />
                      </div>
                      <p className="text-lg sm:text-sm text-neutral-700 font-semibold text-center mb-5">{message}</p>
                      <NavLink to="/connexion" className="bg-neutral-800 px-6 py-2 rounded-lg text-white text-xs hover:bg-neutral-900 w-full text-center">
                          Aller à la connexion
                      </NavLink>
                  </>
              ) : (
                
                  <>
                      <div className="w-20 h-20 mx-auto rounded-full bg-red-500 flex items-center justify-center mb-5">
                          <FaTimes size={30} className='text-white' />
                      </div>
                      <p className="text-sm text-neutral-700 font-semibold text-center mb-5 hover:text-red-500">{message}</p>
                      <NavLink to="/connexion" className="border border-neutral-800 px-6 py-2 rounded-lg text-neutral-800 text-xs hover:bg-neutral-100 w-full text-center">
                          Retourner à l'accueil
                      </NavLink>
                  </>
              )}
            
          </div>
      </div>
    </div>
  )
}

export default Compte_activer
