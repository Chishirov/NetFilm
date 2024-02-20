import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useParams } from "react-router-dom";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../components/SidebarWithBurgerMenu.jsx";
import { Outlet } from "react-router-dom";
import CaruselComponent from "../components/CaruselComponent.jsx";
import { MoviesContext } from "../context/MoviesContext.jsx";
import { useSeries } from "../context/SeriesContext.jsx";
import "../styles/homePage.css";
import MoviesCaruselComponent from "../components/MoviesCaruselComponent.jsx";
function HomePage() {
  const {
    rated,
    setRated,
    popular,
    setPopular,
    onTv,
    setOnTv,
    aring,
    fetchDataAring,
  } = useSeries();
  // const {id} = useParams()
  const { seriesId, setSeriesId } = useSeries();

  const [seriesVideo, setSeriesVideo] = useState();
  const { movieId, setMovieId } = useContext(MoviesContext);
  console.log("movieId in home: ", movieId);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopulatMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpCompingMovies] = useState([]);
  const [movieVideo, setMovieVideo] = useState();
  useEffect(() => {
    fetchDataAring();
  }, []);
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
          "https://api.themoviedb.org/3/tv/on_the_air?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setOnTv(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);
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
          "https://api.themoviedb.org/3/tv/top_rated?language=en-US&page=1",
          options
        );
        const data = await response.json();
        setRated(data.results);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  const fetchSeriesByID = async () => {
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
        `https://api.themoviedb.org/3/tv/${seriesId}/videos?language=en-US`,
        options
      );
      const data = await response.json();
      console.log("SERIES ID", seriesId);
      console.log("DATA", data);
      if (data.results && data.results.length === 0) {
        alert("No trailer found for the series.");
      }
      if (data.results && data.results.length > 0) {
        for (const video of data.results) {
          console.log("Video", video);
          setSeriesVideo(video.key);
        }
      }

      console.error("No trailer found for the series.");
    } catch (error) {
      console.error("Error fetching series by ID:", error);
    }
  };

  console.log("Seriesvideo", seriesVideo);

  //   useEffect(() => {
  //     fetchData();
  //   }, []);

  const fetchPlayingMovies = async () => {
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

      setNowPlayingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchPopularMovies = async () => {
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
        "https://api.themoviedb.org/3/movie/popular?language=en-US&page=1",
        options
      );
      const data = await response.json();

      setPopulatMovies(data.results.reverse());
    } catch (error) {
      console.error(error);
    }
  };
  const fetchTopRatedMovies = async () => {
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
        "https://api.themoviedb.org/3/movie/top_rated?language=en-US&page=1",
        options
      );
      const data = await response.json();

      setTopRatedMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchUpComingMovies = async () => {
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
        "https://api.themoviedb.org/3/movie/upcoming?language=en-US&page=1",
        options
      );
      const data = await response.json();
      // console.log(data);
      setUpCompingMovies(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  // const fetchMovieById = async () => {
  //   try {
  //     if (movieId) {
  //       const url = ` https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
  //       const headers = {
  //         accept: "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdlMDBkMTIyZDg0MmZlZTYwYzFlNWY1MzUwZWVkNCIsInN1YiI6IjY1MmE2Yjk5MWYzZTYwMDExYzRhMmNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27Of1P9G1YQOX5RsHqMkoga3b6WelSSkdIblIqP19YY",
  //       };

  //       const response = await axios.get(url, { headers });

  //       console.log(response.data.results[1].key);
  //       setMovieVideo(response.data.results[1].key);
  //       // Set the movie video state here if necessary
  //     }
  //   } catch (error) {
  //     console.error("Error fetching movie by ID:", error);
  //   }
  // };
  useEffect(() => {
    fetchPlayingMovies();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpComingMovies();

    // if (movieId) {
    //   fetchMovieById();
    // }
  }, []);
  //
  useEffect(() => {
    const handleScroll = () => {
      // Your scroll event logic here
      setMovieId("");
      setSeriesId("");
    };

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);
  const fetchMovieById = async () => {
    try {
      if (movieId) {
        const url = `https://api.themoviedb.org/3/movie/${movieId}/videos?language=en-US`;
        const headers = {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdlMDBkMTIyZDg0MmZlZTYwYzFlNWY1MzUwZWVkNCIsInN1YiI6IjY1MmE2Yjk5MWYzZTYwMDExYzRhMmNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27Of1P9G1YQOX5RsHqMkoga3b6WelSSkdIblIqP19YY",
        };

        const response = await axios.get(url, { headers });

        if (response.data.results && response.data.results.length > 0) {
          for (const video of response.data.results) {
            if (video.type === "Trailer") {
              setMovieVideo(video.key);
              console.log("movie Video", movieVideo);

              return;
            }
          }
        }

        console.error("No trailer found for the movie.");
      }
    } catch (error) {
      console.error("Error fetching movie by ID:", error);
    }
  };

  useEffect(() => {
    fetchMovieById();
  }, [movieId]);

  useEffect(() => {
    fetchSeriesByID();
  }, [seriesId]);

  return (
    <>
      {movieId && (
        <div onScroll={() => setMovieId(undefined)} className="movie-box">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${movieVideo}`}
            autoPlay
            controls
          />
        </div>
      )}
      {seriesVideo && (
        <div onScroll={() => setSeriesId(undefined)} className="movie-box">
          <ReactPlayer
            url={`https://www.youtube.com/watch?v=${seriesVideo}`}
            autoPlay
            controls
          />
        </div>
      )}

      <div
        className="carusels-container"
        style={{
          marginTop: seriesId && "600px",
        }}
      >
        <h2>Movies playing now </h2>
        <MoviesCaruselComponent items={nowPlayingMovies} />
        <h2>Popular Movies in our page </h2>
        <MoviesCaruselComponent items={popularMovies} />
        <h2>Top rated Movies </h2>
        <MoviesCaruselComponent items={topRatedMovies} />
        <h2>Movies comming soon </h2>
        <MoviesCaruselComponent items={upComingMovies} />
        <h2>Airing Today</h2>
        <CaruselComponent items={aring} />
        <h2>On TV</h2>
        <CaruselComponent items={onTv} />
        <h2>Popular Series</h2>
        <CaruselComponent items={popular} />
        <h2>Top Rated</h2>
        <CaruselComponent items={rated} />
        <Outlet />
      </div>
    </>
  );
}

export default HomePage;
