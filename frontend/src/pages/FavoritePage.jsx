import React, { useContext, useEffect, useState } from "react";
import FavoriteCardComponent from "../components/FavoriteCardComponent";
import { UserContext } from "../context/UserContext";
import { MoviesContext } from "../context/MoviesContext";

function FavoritePage() {
  const { user } = useContext(UserContext);
  const { movieInfo, setMovieInfo } = useContext(MoviesContext);
  const [loadedMovies, setLoadedMovies] = useState([]);

  useEffect(() => {
    const fetchMovieData = async () => {
      try {
        const movieDataPromises = user?.movies.map(async (movie) => {
          const options = {
            method: "GET",
            headers: {
              accept: "application/json",
              Authorization:
                "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
            },
          };

          const response = await fetch(
            `https://api.themoviedb.org/3/movie/${movie.movieId}?language=en-US`,
            options
          );
          const data = await response.json();
          return data;
          //   return data;
          //loadedMovies.push(data)
        });

        const movieData = await Promise.all(movieDataPromises);
        setLoadedMovies(movieData);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMovieData();
  }, [user]);

  return (
    <div
      style={{
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        gap: "20px",
      }}
    >
      {loadedMovies.map((movieData, index) => (
        <FavoriteCardComponent
          key={user.movies[index]._id}
          id={user.movies[index].movieId}
          src={`https://image.tmdb.org/t/p/w400${movieData?.poster_path}`}
          title={movieData?.title}
          overview={movieData?.overview}
        />
      ))}
    </div>
  );
}

export default FavoritePage;
