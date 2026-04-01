import { createContext, useEffect, useState, useCallback, useContext } from "react";
import api from "../services/api";
import { useAuth } from "./AuthContext";

export const HotelContext = createContext();

const HotelProvider = ({ children }) => {
  const { token } = useAuth();
  const [hotels, setHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const fetchHotels = useCallback(async () => {
    if (!token) return;

    setLoading(true);
    try {
      const reponse = await api.get("/hotels/");
      setHotels(reponse.data);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, [token]);

  useEffect(() => {
    fetchHotels();
  }, [fetchHotels]);


  console.log('les hotels :' , hotels)


  const value = {
    hotels,
    loading,
    error,
    refreshHotels: fetchHotels, 
  };

  return (
    <HotelContext.Provider value={value}>
      {children}
    </HotelContext.Provider>
  );
};

export const useHotels = () => useContext(HotelContext);
export default HotelProvider;