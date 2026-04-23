import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState('');

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [ utilisateurs , setUtilisateurs] = useState([])
  const [ nombre_utilisateur , setNombre_utilisateur] = useState('')

  const [loading, setLoading] = useState(false);

  // l'inscription
  const register = async (data) => {
    setLoading(true);
    try {
      const reponse = await api.post("/auth/register/", data);
      return {
        success: true,
        message: reponse.data?.message || "Inscription réussie",
      };
    } catch (error) {
     throw error; 
    } finally {
      setLoading(false);
    }
  };


  // connexion
  const login = async (data) => {
  setLoading(true);
  try {
    const reponse = await api.post("/auth/login/", data);

    setToken(reponse.data.access);
    localStorage.setItem("token", reponse.data.access);
    localStorage.setItem("refresh", reponse.data.refresh);

    return { success: true, data: reponse.data };
  } catch (error) {
    throw error; 
  } finally {
    setLoading(false);
  }
};

// Deconnexion
  const logout = async () => {
    const refresh = localStorage.getItem('refresh')
    try {
      await api.post("/auth/logout/" , {refresh});
    } finally {
    
      setToken(null);
      localStorage.removeItem("refresh");
      localStorage.removeItem("token");
     
    }
  };

  // tous les user

  const fetchutilisateurs = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const reponse = await api.get("/auth/users/");
      setUtilisateurs(reponse.data.results);
      setNombre_utilisateur(reponse.data.count );
      
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };


  console.log('utilisateurs : ' , utilisateurs)

//  user
  const fetchProfil = async () => {
    if (!token) return;

    setLoading(true);
    try {
      const reponse = await api.get("/auth/me/");
      setAdmin(reponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // mettre a jour  profil  

  const updateUser = async (data) => {
    if (!token) return;

    try {
     
      const baseUrl = api.defaults.baseURL ;

      const response = await fetch(`${baseUrl}/auth/me/`, {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`
       
        },
        body: data
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw { response: { data: errorData } }; 
      }

      return await response.json();
    } catch (err) {
      console.error("Erreur mise à jour :", err);
      throw err;
    }
  };


// 1. Activation de compte 
const activationCompte = async (active_token) => {
  setLoading(true);
  try {

    const reponse = await api.post("/auth/activate/", { 
      token: active_token 
    });
 
    console.log("Compte activé:", reponse.data);
    return reponse.data;
  } catch (error) {
    console.error("Erreur d'activation:", error.response?.data || error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};


const demande_reset_password = async (emailFourni) => {
  
  try {
   
    const reponse = await api.post("/auth/password/reset/", { 
      email: emailFourni 
    });
    console.log("Email envoyé:", reponse.data);
    return reponse.data;
  } catch (error) {
    console.error("Erreur demande reset:", error.response?.data || error.message);
    throw error;
  } 
};

const reset_password = async (reset_token, nouveau_password) => {
  setLoading(true);
  try {
    const reponse = await api.post("/auth/password/confirm/", {
      token: reset_token,
      new_password: nouveau_password
    });
    console.log("Mot de passe réinitialisé:", reponse.data);
    return reponse.data;
  } catch (error) {
    console.error("Erreur reset password:", error.response?.data || error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};

const change_password = async (old_password, new_password) => {
  if (!token) return;
  setLoading(true);
  try {
    const reponse = await api.put("/auth/password/change/", {
      old_password: old_password,
      new_password: new_password
    });
    console.log("Mot de passe modifié:", reponse.data);
    
    // Update tokens if they are returned by the backend
    if (reponse.data.tokens) {
      setToken(reponse.data.tokens.access);
      localStorage.setItem("token", reponse.data.tokens.access);
      localStorage.setItem("refresh", reponse.data.tokens.refresh);
    }
    
    return reponse.data;
  } catch (error) {
    console.error("Erreur change password:", error.response?.data || error.message);
    throw error;
  } finally {
    setLoading(false);
  }
};


  

useEffect(() => {
  fetchutilisateurs();
  fetchProfil();
}, [token]);

  const contextValue = {
    
    token,
    login,
    register,
    utilisateurs,
    loading,
    fetchProfil,
    reset_password,
    logout,
    activationCompte,
    nombre_utilisateur,
    demande_reset_password,
    admin,
    updateUser,
    change_password
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;