import "./App.css";
import { RouterProvider } from "react-router-dom";
import router from "./routers/router.jsx";
import axios from "axios";

axios.defaults.baseURL = "https://movie-website-backend-9uyz.onrender.com";
axios.defaults.withCredentials = true;

function App() {
  return (
    <div>
      <RouterProvider router={router}></RouterProvider>
    </div>
  );
}

export default App;
