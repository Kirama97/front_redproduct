import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { Router } from "./routes/Router";

function App() {

  return (
    <AppProvider>
      <RouterProvider router={Router} />
    </AppProvider>
  );
}

export default App;