import { createBrowserRouter } from "react-router-dom";
import Connexion from "../app/pages/Connexion";
import Inscription from "../app/pages/Inscription";
import Accueil from "../app/pages/Accueil";
import MainLayout from "../app/layout/MainLayout";
import Hotels from './../app/pages/Hotels';
import Profil from "../app/pages/Profil";
import DetailHotel from "../app/pages/DetailHotel";




export const router = createBrowserRouter([


  { path: "/", element: <Connexion /> },
  { path: "/connexion", element: <Connexion /> },
  { path: "/inscription", element: <Inscription /> },
   {
     element: <MainLayout/> , 
     children : [
        { path: "/dashboard", element: <Accueil /> },
        { path: "/hotels", element: <Hotels /> },
        { path: "/profil", element: <Profil/> },
        { path: "/hotel/:id", element: <DetailHotel/> }
     ]
   }
]);