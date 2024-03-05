import React, { useState, useEffect, useContext } from "react";

import Cardcomponent from "../../components/Cardcomponent";
import { SeriesContext } from "../../context/SeriesContext";
import BannerHome from "../../components/bannerHome/BannerHome";
import ElaCard from "../../components/ElaCard/ElaCard";
import Pagination from "../../components/Pagination";

function OnTvSeries() {
  // const [onTv, setOnTv] = useState([]);
  const { onTv, setOnTv } = useContext(SeriesContext);
  const [currentPage, setCurrentPage] = useState(1);

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
          `https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=${currentPage}`,
          options
        );
        const data = await response.json();
        setOnTv(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  return (
    <div style={{ textAlign: "center" }}>
      <BannerHome />
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: "20px",
          justifyContent: "center",
          width: "80%",
          margin: "0 auto",
        }}
      >
        {/* {onTv.map((movie) => (
          <Cardcomponent
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            title={movie.name}
            date={movie.first_air_date}
            link={`/series-info/${movie.id}`}
          />
        ))} */}
        <ElaCard data={onTv} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default OnTvSeries;
