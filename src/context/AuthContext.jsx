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
      return {
        success: false,
        message:
          error.response?.data.message ||
          "Erreur lors de l'inscription",
      };
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
    return {
      success: false,
      message: error.response?.data?.message || "Erreur de connexion",
    };
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
      setUtilisateurs(reponse.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

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

  // mettre a jour profil  

// Dans AuthContext.js
const updateUser = async (data) => {
  if (!token) return;

  try {
    const response = await api.put('/auth/me/', data, {
      headers: {
        Authorization: `Bearer ${token}`,
      
        "Content-Type": "multipart/form-data",
      }
    });

    return response.data;
  } catch (err) {
    console.error("Erreur mise à jour :", err);
    throw err;
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
    logout,
    admin,
    updateUser
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;