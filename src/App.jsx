import { RouterProvider } from "react-router-dom";
import AppProvider from "./context/AppProvider";
import { router } from "./routes/router";

function App() {
  return (
    <AppProvider>
      <RouterProvider router={router} />
    </AppProvider>
  );
}

export default App;