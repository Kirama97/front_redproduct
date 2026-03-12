import { createContext } from "react";

export const HotelContext = createContext();

const HotelProvider = ({ children }) => {

  const hotels = [];

  return (
    <HotelContext.Provider value={{ hotels }}>
      {children}
    </HotelContext.Provider>
  );
};

export default HotelProvider;