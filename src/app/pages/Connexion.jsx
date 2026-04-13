import React, { useState } from 'react';
import image_bg from '../../assets/images/red-bg.png';
import logo from '../../assets/icone/logo.png';
import { NavLink, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { useAuth } from '../../context/AuthContext';



const Connexion = () => {
  const { login, loading } = useAuth()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
      } else {
        toast.error(connexion.message);
      }
    } catch (error) {
      toast.error("Email ou mot de passe incorrect");
    }
  };

  return (
    <div
      className="bg-no-repeat bg-center flex items-center justify-center bg-cover w-full h-screen"
      style={{ backgroundImage: `url(${image_bg})` }}
    >
      <div className=" max-sm:w-full max-sm:mx-4  sm:w-xl">
        <div className="flex gap-3 justify-center items-center pb-5">
          <img src={logo} alt="Logo" />
          <h1 className="text-white text-md font-bold">RED PRODUCT</h1>
        </div>

        <div className="w-full bg-white px-7 py-10 rounded-sm">
          <p className="text-lg sm:text-xs text-neutral-700 font-semibold">
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

            {error && <p className="text-xs text-red-500">{error}</p>}

            <input
              className="w-full outline-none text-md sm:text-xs py-2 border-b border-neutral-300"
              type="password"
              placeholder="Mot de passe"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="flex gap-2 mt-5">
              <input type="checkbox" />
              <p className="text-md sm:text-xs text-neutral-700">
                Gardez-moi connecté
              </p>
            </div>

            {loading ? (
              <button
                disabled
                className="bg-neutral-500 py-3 sm:py-2 rounded-lg mt-5 flex items-center justify-center gap-2 text-white text-xs"
              >
                <div className="w-3 h-3 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                connexion...
              </button>
            ) : (
              <button
                type="submit"
                className="bg-neutral-800 py-3 rounded-lg mt-5 text-white text-md sm:text-xs hover:bg-neutral-900"
              >
                Se connecter
              </button>
            )}
          </form>
        </div>

        <div className="w-full text-white text-center py-2">
          <a className="text-md sm:text-[10px] text-yellow-300">
            Mot de passe oublié ?
          </a>
          <p className="text-md sm:text-[10px] mt-3">
            Vous n'avez pas de compte ?{" "}
            <NavLink to="/inscription" className="text-yellow-300">
              S'inscrire
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Connexion;