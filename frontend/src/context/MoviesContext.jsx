import { createContext, useState } from "react";

export const MoviesContext = createContext();

export const MoviesProvider = ({ children }) => {
  const [movieId, setMovieId] = useState();
  console.log("movieId in context: ", movieId);
  return (
    <MoviesContext.Provider value={{ movieId, setMovieId }}>
      {children}
    </MoviesContext.Provider>
  );
};
