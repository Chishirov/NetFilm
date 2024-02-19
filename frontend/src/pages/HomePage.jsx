import React, { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import axios from "axios";
import { SidebarWithBurgerMenu } from "../components/SidebarWithBurgerMenu.jsx";
import { Outlet } from "react-router-dom";
import CaruselComponent from "../components/CaruselComponent.jsx";
import { MoviesContext } from "../context/MoviesContext.jsx";
import "../styles/homePage.css";
function HomePage() {
  const { movieId, setMovieId } = useContext(MoviesContext);
  console.log("movieId in home: ", movieId);
  const [nowPlayingMovies, setNowPlayingMovies] = useState([]);
  const [popularMovies, setPopulatMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [upComingMovies, setUpCompingMovies] = useState([]);
  const [movieVideo, setMovieVideo] = useState();
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
  return (
    <>
      {movieId && (
        <div onScroll={() => setMovieId(undefined)} className="movie-box">
          <ReactPlayer
            url={`<https://www.youtube.com/watch?v=${movieVideo}>`}
            autoplay
            controls
          />
        </div>
      )}
      <div
        className="carusels-container"
        style={{
          marginTop: movieId && "600px",
        }}
      >
        <h2>Movies playing now </h2>
        <CaruselComponent items={nowPlayingMovies} />
        <h2>Popular Movies in our page </h2>
        <CaruselComponent items={popularMovies} />
        <h2>Top rated Movies </h2>
        <CaruselComponent items={topRatedMovies} />
        <h2>Movies comming soon </h2>
        <CaruselComponent items={upComingMovies} />
        <Outlet />
      </div>
    </>
  );
}

export default HomePage;
