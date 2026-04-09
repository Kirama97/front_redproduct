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
    setError(null);
    try {
      const reponse = await api.get("/hotels/");

      const data = reponse.data;
      setHotels(data.results ?? data);

    } catch (err) {
      console.error("Erreur fetchHotels :", err);
      setError(err);
    } finally {
      setLoading(false);
    }
  }, [token]);

  //  mettre a jour un hotel 

   const updateHotel = async (id , data) => {
       if(!token) return

       setLoading(true);
       setError(null);

        try {         
            await  api.put(`/hotels/${id}/`, data)
            await fetchHotels();
        } catch (err) {
            console.error("Erreur mise a jour :", err);
             setError(err); 
        } finally {
            setLoading(false)
        }
   }

  // un hotel 

const unHotel = useCallback(async (id) => {
  if (!token) return;
  setLoading(true);
  setError(null);
  try {
    const reponse = await api.get(`/hotels/${id}/`);
    return reponse.data;
  } catch (error) {
    console.error("Erreur récupération hôtel :", error);
    setError(error);
    throw error;
  } finally {
    setLoading(false);
  }
}, [token]);

  

  useEffect(() => {
    fetchHotels();
  
  }, [fetchHotels]);

  const value = {
    hotels,
    loading,
    unHotel,
    updateHotel,
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