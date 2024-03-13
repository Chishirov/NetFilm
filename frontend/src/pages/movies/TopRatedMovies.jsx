import { useState, useEffect } from "react";
import Pagination from "../../components/Pagination";
import ElaCard from "../../components/ElaCard/ElaCard";
import Banner from "../../components/banner/Banner";
import { options, movieUrl } from "../../components/fetchData/FetchData.jsx";

const TopRatedMovies = () => {
  const [top, setTop] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Track the current page
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          `${movieUrl}/movie/top-rated?language=en-US&page=${currentPage}`,
          options
        );
        const data = await response.json();
        setTop(data.results);
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
        {/* {top.map((movie) => (
          <Cardcomponent
            key={movie.id}
            src={`https://image.tmdb.org/t/p/w400${movie.poster_path}`}
            title={movie.title}
            date={movie.release_date}
            link={`/movies-info/${movie.id}`}
            cardId={movie.id}
            userId={user?._id}
            movieTitle={movie.title}
            imageUrl={movie.poster_path}
          />
        ))} */}
        <ElaCard data={filteredMovies} />
      </div>
      <Pagination currentPage={currentPage} setCurrentPage={setCurrentPage} />
    </div>
  );
};

export default TopRatedMovies;
