import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { UserContextProvider } from "./context/UserContext.jsx";
// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <UserContextProvider>
      <MoviesProvider>
        {/* <ThemeProvider></ThemeProvider> */}
        <App />
      </MoviesProvider>
    </UserContextProvider>
  </React.StrictMode>
);
