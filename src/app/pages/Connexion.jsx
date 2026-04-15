import React, { useState } from 'react';
import image_bg from '../../assets/images/red-bg.png';
import logo from '../../assets/icone/logo.png';
import { Link, NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';

const Connexion = () => {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [showPassword , setShowPassword] = useState(false)

  const navigate = useNavigate();
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!email || !password) {
      toast.error('Veuillez remplir tous les champs');
      return;
    }

    if (!emailRegex.test(email)) {
      toast.error("Adresse email invalide");
      setError("Adresse email invalide");
      return;
    }

    try {
      const connexion = await login({ email, password });

      if (connexion.success) {
        navigate("/dashboard");
        toast.success("Connexion réussie");
      }
    } catch (error) {
      
      const errorMsg = error.response?.data?.detail || 
                       "Email ou mot de passe incorrect";
      
      toast.error(errorMsg);
    
      setError(errorMsg); 
    }
  };

  return (
    <div
      className="bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen"
      style={{ backgroundImage: `url(${image_bg})` }}
    >
      <div className="max-sm:w-full max-sm:mx-4 sm:w-80">
        <div className="flex gap-3 justify-center items-center pb-5">
          <img src={logo} alt="Logo" />
          <h1 className="text-white text-md font-bold">RED PRODUCT</h1>
        </div>

        <div className="w-full bg-white px-7 py-10 rounded-sm">
          <p className="text-lg sm:text-xs text-neutral-700 font-semibold mb-4">
            Connectez-vous en tant qu'Admin
          </p>

          <form onSubmit={handleLogin} className="flex flex-col gap-2 py-2">
            <input
              className={`w-full outline-none text-md sm:text-xs py-3 sm:py-2 border-b ${
                error ? "border-red-500" : "border-neutral-300"
              }`}
              type="email"
              placeholder="E-mail"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className={`w-full outline-none text-md sm:text-xs py-2 border-b ${
                error ? "border-red-500" : "border-neutral-300"
              }`}
              type={showPassword ? "text" : "password"}
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div onClick={() => setShowPassword(!showPassword)} className="flex items-center cursor-pointer gap-2 mt-3 mb-2">
                 <input type="checkbox" checked={showPassword} readOnly />
                 <p className="text-xs text-neutral-700 hover:text-yellow-400">Afficher le mot de passe</p>
            </div>

          
            {error && <p className="text-xs text-red-500 bg-red-50 p-2 rounded text-center">{error}</p>}

            {loading ? (
              <button
                disabled
                className="bg-neutral-500 py-3 sm:py-2 rounded-lg mt-3 flex items-center justify-center gap-2 text-white text-xs cursor-not-allowed"
              >
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                Connexion...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-neutral-800 py-3 rounded-lg mt-3 text-white text-md sm:text-xs hover:bg-neutral-900 transition-colors"
              >
                Se connecter
              </button>
            )}
          </form>
        </div>

        <div className="w-full text-white text-center py-2">
          <Link to="/demande_de_reset" 
           className="text-md sm:text-[10px] text-yellow-300 cursor-pointer hover:underline">
            Mot de passe oublié ?
          </Link>
          <p className="text-md sm:text-[10px] mt-3">
            Vous n'avez pas de compte ?{" "}
            <NavLink to="/inscription" className="text-yellow-300 hover:underline">
              S'inscrire
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;
