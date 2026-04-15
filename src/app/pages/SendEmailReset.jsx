
import React, { useState } from 'react'
import image_bg from '../../assets/images/red-bg.png'
import logo from '../../assets/icone/logo.png'
import { NavLink, useNavigate } from 'react-router'
import toast from 'react-hot-toast'
import { useAuth } from '../../context/AuthContext';




const SendEmailReset = () => {
    const {  demande_reset_password} = useAuth()
    const [email , setEmail] = useState("")
    const [loading , setLoading] = useState(false)
    const [error , setError] = useState()
    const navigate = useNavigate()
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
    
const handleDemande = async (e) => {
    e.preventDefault();

    setError("");
    setLoading(true);

    if (!email) {
        toast.error("Veuillez mettre un email");
        setError("Adresse email invalide");
        return; 
    }


    if (!emailRegex.test(email)) {
        toast.error("Adresse email invalide");
        setError("Adresse email invalide");
        return;
    }

    try {
       
        const demande = await demande_reset_password(email);
        navigate("/demande_envoyée");
        toast.success("Demande envoyée");

    } catch (error) {
        toast.error(error.response?.data?.message || "Echec de la Demande");
        console.log('Status:', error.response?.status);
        console.log('Erreur complète:', JSON.stringify(error.response?.data, null, 2));
    } finally {
        
        setLoading(false);
    }
};



  return (
    <div  className="  bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen" 
      style={{ backgroundImage :`url(${image_bg})`}}
    >
    
     <div className=" max-sm:w-full max-sm:mx-4  sm:w-80">
          <div className="flex gap-3 justify-center items-center pb-5">
              <img src={logo} alt="Logo" />
              <h1 className="text-white text-md font-bold">RED PRODUCT</h1> 
          </div>
  
          <div className="w-full bg-white px-7 py-10 rounded-sm">
              <p className="text-lg sm:text-xs text-neutral-700 font-semibold mb-5">Mots de passe oublié?</p>
               <p className='text-xs'>Entrez  votre adresse e-mail ci-dessous et nous vous envoyons des instructions sur la facons de modifier votre mot de passe</p>
  
          
  
              <form onSubmit={handleDemande} className="flex flex-col gap-2 py-2">
               
                  
                  <input
                    className={`w-full outline-none text-md sm:text-xs py-3 sm:py-2 border-b ${
                        error ? "border-red-500" : "border-neutral-300"
                    }`}
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    />

                    {error && <p className="text-xs text-red-500">{error}</p>}

                
  
                   {
                    loading ? 
                    (
                        <button dis  className="bg-neutral-500 py-2 rounded-lg mt-5 flex items-center justify-center gap-2 text-white cursor-pointer text-xs ">
                            <div className=" w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                             Envoie...
                            </button>
                    )
                     :(
                        <button type="submit"  className="bg-neutral-800 py-2 rounded-lg mt-5 text-white cursor-pointer text-xs hover:bg-neutral-900">Envoyer</button>
                    ) 
                    
                }
              </form>
          </div>
  
          <div className="w-full text-white text-center py-2">
              
              <p className="text-md sm:text-[10px] mt-3">Revenir à la <NavLink to="/connexion"  className="text-yellow-300">Connexion</NavLink></p>
          </div>
      
      </div>
    </div>
  )
}

export default SendEmailReset


















