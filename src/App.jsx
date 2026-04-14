import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Router } from "./routes/Router";
import AppProvider from "./context/AppProvider";
import Inscription from "./app/pages/Inscription";
import Accueil from "./app/pages/Accueil";
import MainLayout from "./app/layout/MainLayout";
import Hotels from './app/pages/Hotels';
import Profil from "./app/pages/Profil";
import DetailHotel from "./app/pages/DetailHotel";
import Connexion from "./app/pages/Connexion";
import ForgetPassword from "./app/pages/ForgetPassword";
import Demande_envoyer from "./app/pages/Demande_envoyer";
import Compte_creer from "./app/pages/Compte_creer";
import Compte_activer from "./app/pages/Compte_activer";
import SendEmailReset from "./app/pages/SendEmailReset";




function App() {

  
const Router = createBrowserRouter([

  { path: "/", element: <Connexion /> },
  { path: "/connexion", element: <Connexion /> },
  { path: "/inscription", element: <Inscription /> },
  { path: "/reset-password/:token", element: <ForgetPassword/> },
  { path: "/activate/:token", element: <Compte_activer/> },
  { path: "/demande_de_reset", element: <SendEmailReset/> },
  { path: "/demande_envoyée", element: <Demande_envoyer/> },
  { path: "/compte_creer", element: <Compte_creer/> },
   {
     element: 
    
        <MainLayout />
     
     , 
     children : [
        { path: "/dashboard", element: <Accueil /> },
        { path: "/hotels", element: <Hotels /> },
        { path: "/profil", element: <Profil/> },
        { path: "/hotel/:id", element: <DetailHotel/> }
     ]
   }
]);

  return (
        
   <AppProvider>
       <RouterProvider router={Router} />
   </AppProvider>
        
 
  );
}

export default App;