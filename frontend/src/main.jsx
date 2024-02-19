import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MoviesProvider } from "./context/MoviesContext.jsx";
// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <MoviesProvider>
      {/* <ThemeProvider></ThemeProvider> */}
      <App />
    </MoviesProvider>
  </React.StrictMode>
);
