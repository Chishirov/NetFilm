import React, { useState, useEffect } from "react";

import Cardcomponent from "../../components/Cardcomponent";

function OnTvSeries() {
  const [popular, setPopular] = useState([]);

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
          "https://api.themoviedb.org/3/tv/popular?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setPopular(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h1 style={{ marginBottom: "20px" }}>Popular Series</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          justifyContent: "center",
        }}
      >
        {popular.map((movie) => (
          <Cardcomponent
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            title={movie.name}
            date={movie.first_air_date}
            link={`/series-info/${movie.id}`}
          />
        ))}
      </div>
    </div>
  );
}

export default OnTvSeries;