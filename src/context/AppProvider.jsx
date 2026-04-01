import React from "react";
import AuthProvider from "./AuthContext";
import HotelProvider from "./HotelContext";


const AppProvider = ({ children }) => {
  return (
    <AuthProvider>
      <HotelProvider>
        {children}
      </HotelProvider>
    </AuthProvider>
  );
};

export default AppProvider;