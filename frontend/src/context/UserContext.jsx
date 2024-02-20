import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios.get("/validate").then(({ data }) => {
        setUser(data);
        if (!user) {
          return <Navigate to={"/home"} />;
        }
        console.log("userContext:", user);
        <Navigate to={"/login"} />;
      });
    }
  }, []);
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
