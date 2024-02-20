import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import { MoviesProvider } from "./context/MoviesContext.jsx";
import { SeriesProvider } from "./context/SeriesContext.jsx";
// import { ThemeProvider } from "@material-tailwind/react";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <SeriesProvider>
    <MoviesProvider>
      {/* <ThemeProvider></ThemeProvider> */}
      <App />
    </MoviesProvider>
    </SeriesProvider>
  </React.StrictMode>
);
