import { createContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import axios from "axios";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  useEffect(() => {
    if (!user) {
      axios
        .get("http://localhost:3000/validate", { withCredentials: true })
        .then(({ data }) => {
          setUser(data);
          console.log(user);
          if (!user) {
            return <Navigate to={"/login"} />;
          } else {
            console.log("userContext:", user);
            return <Navigate to={"/home"} />;
          }
        });
    }
  }, []);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
