import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
import axios from "axios";
import url from "../config/config.js";
axios.defaults.baseURL = url;
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
