import { createBrowserRouter } from "react-router-dom";
import Connexion from "../app/pages/Connexion";
import Inscription from "../app/pages/Inscription";
import Accueil from "../app/pages/Accueil";

export const router = createBrowserRouter([
  { path: "/", element: <Connexion /> },
  { path: "/connexion", element: <Connexion /> },
  { path: "/inscription", element: <Inscription /> },
  { path: "/accueil", element: <Accueil /> }
]);