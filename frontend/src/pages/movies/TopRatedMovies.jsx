
import React, { useState, useEffect, useContext } from "react";
import ElaCard from "../../components/ElaCard/ElaCard";
import Banner from "../../components/banner/Banner";
import { UserContext } from "../../context/UserContext";
import Pagination from "../../components/Pagination";

function TopRatedMovies() {
  const [top, setTop] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const { user } = useContext(UserContext);
  const [searchQuery, setSearchQuery] = useState("");
  
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
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=${currentPage}`,
          options
        );
        const data = await response.json();
        
        // Setze das mediaType-Feld für jeden Film
        const topWithMediaType = data.results.map((movie) => ({
          ...movie,
          mediaType: "movie",
        }));
        setTop(topWithMediaType);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [currentPage]);

  const filteredMovies = top.filter((item) => {
    const title = item.title || item.name;
    return title.toLowerCase().includes(searchQuery.toLowerCase());
  });

  return (
    <div style={{ textAlign: "center" }}>
      <Banner
        data={top}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
      />
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
        <ElaCard data={filteredMovies} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
}

export default TopRatedMovies;
