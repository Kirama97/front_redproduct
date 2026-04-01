import { createContext, useContext, useEffect, useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const [token, setToken] = useState(
    localStorage.getItem("token") || null
  );
  const [ utilisateurs , setUtilisateurs] = useState([])

  const [loading, setLoading] = useState(false);


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

useEffect(() => {
  fetchutilisateurs();
}, [token]);

  const contextValue = {
    user,
    token,
    login,
    register,
    utilisateurs,
    loading,
    logout,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export default AuthProvider;