import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

function NowPlayingMovies() {
  const [play, setPlay] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const options = {
          method: "GET",
          headers: {
            accept: "application/json",
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
          },
        };

        const response = await fetch(
          "https://api.themoviedb.org/3/movie/now_playing?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setPlay(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchMovieInfo = async (id) => {
    try {
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
        },
      };

      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
        options
      );
      const data = await response.json();
    } catch (error) {
      console.error(error);
    }
  };

  const handleMovieClick = (id) => {
    fetchMovieInfo(id);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Now Playing</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {play.map((movie) => (
          <div
            key={movie.id}
            style={{ marginBottom: "20px", cursor: "pointer" }}
            onClick={() => handleMovieClick(play.id)}
          >
            <Link to={`/movies-info/${movie.id}`}>
              <img
                src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
                alt={movie.title}
                style={{ width: "100%", height: "auto", borderRadius: "8px" }}
              />
              <h3
                style={{ marginTop: "10px", fontSize: "18px", color: "#333" }}
              >
                {movie.title}
              </h3>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NowPlayingMovies;
