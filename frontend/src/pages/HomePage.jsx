import { useContext, useEffect, useState } from "react";
import ReactPlayer from "react-player";
import { useNavigate } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { MoviesContext } from "../context/MoviesContext.jsx";
import { SeriesContext } from "../context/SeriesContext.jsx";
import "../styles/homePage.css";
import MoviesCaruselComponent from "../components/MoviesCaruselComponent.jsx";
import SeriesCaruselComponent from "../components/SeriesCaruselComponent.jsx";
import { UserContext } from "../context/UserContext.jsx";
import { UploadContext } from "../context/UploadContext.jsx";
import dayjs from "dayjs";
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
  } = useContext(SeriesContext);
  const { seriesId, seriesInfo, fetchSeriesInfo } = useContext(SeriesContext);
  const [seriesVideo, setSeriesVideo] = useState();
  const {
    movieId,
    movieInfo,
    nowPlayingMovies,
    popularMovies,
    topRatedMovies,
    upComingMovies,
    movieVideo,
    setMovieVideo,
    fetchPlayingMovies,
    fetchUpComingMovies,
    fetchTopRatedMovies,
    fetchPopularMovies,
    fetchMovieInfo,
  } = useContext(MoviesContext);
  const [trail, setTrail] = useState(false);
  const { user, setUser } = useContext(UserContext);
  const { setImages } = useContext(UploadContext);
  const navigate = useNavigate();
  const movieUrl = "https://api.themoviedb.org/3";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
    },
  };

  const redirect = async () => {
    try {
      const response = await axios.get("/validate");
      const loggedUser = await response.data;
      setUser(loggedUser);
    } catch (error) {
      navigate("/");
    }
  };

  const getImageById = async () => {
    if (user) {
      try {
        const response = await axios.get(`/get-image/${user?._id}`);
        setImages(response.data.data);
      } catch (error) {
        console.error("Error fetching images:", error);
      }
    }
  };

  useEffect(() => {
    if (user?._id) {
      getImageById();
    }
  }, [user]);

  useEffect(() => {
    if (!user?.username) {
      redirect();
    }
    fetchDataAring();
  }, []);

  const fetchDataOnTv = async () => {
    try {
      const response = await fetch(
        `${movieUrl}/tv/on_the_air?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setOnTv(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchDataPopular = async () => {
    try {
      const response = await fetch(
        `${movieUrl}/tv/popular?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setPopular(data.results);
    } catch (error) {
      console.error(error);
    }
  };
  const fetchDataRated = async () => {
    try {
      const response = await fetch(
        `${movieUrl}/tv/top_rated?language=en-US&page=1`,
        options
      );
      const data = await response.json();
      setRated(data.results);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSeriesByID = async () => {
    try {
      if (seriesId) {
        const response = await fetch(
          `${movieUrl}/tv/${seriesId}/videos?language=en-US`,
          options
        );
        const data = await response.json();
        if (data.results && data.results.length === 0) {
          setTrail(true);
        }
        if (data.results && data.results.length > 0) {
          for (const video of data.results) {
            setSeriesVideo(video.key);
          }
        }
      }
    } catch (error) {
      console.error("Error fetching series by ID:", error);
    }
  };

  const fetchMovieById = async () => {
    try {
      if (movieId) {
        const response = await fetch(
          `${movieUrl}/movie/${movieId}/videos?language=en-US`,
          options
        );
        const data = await response.json();
        if (data.results && data.results.length > 0) {
          for (const video of data.results) {
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

  const handleScroll = () => {
    // Your scroll event logic here
    // setMovieId("");
    // setSeriesId("");
    setTrail(false);
    setMovieVideo(undefined);
    setSeriesVideo(undefined);
  };

  useEffect(() => {
    fetchDataRated();
    fetchDataPopular();
    fetchDataOnTv();
    fetchPlayingMovies();
    fetchPopularMovies();
    fetchTopRatedMovies();
    fetchUpComingMovies();
  }, []);
  //
  useEffect(() => {
    handleScroll();

    // Attach the scroll event listener when the component mounts
    window.addEventListener("scroll", handleScroll);

    // Detach the scroll event listener when the component unmounts
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    fetchSeriesInfo();
    fetchSeriesByID();
  }, [seriesId]);
  useEffect(() => {
    fetchMovieInfo();
    fetchMovieById();
  }, [movieId]);

  return (
    <>
      {movieVideo && (
        <div className="movie-box">
          {movieInfo && (
            <div className="right">
              {/* <h1 className="headline-home">{movieInfo.title}</h1>
              <p className="home-paragraph">{movieInfo.overview}</p> */}
              {/* <p>{movieInfo.production_companies[0].name}</p> */}
              {/* <p>{movieInfo.budget} $</p> */}
              <div className="title">{movieInfo.name || movieInfo.title}</div>
              <div className="subtitle">{movieInfo.tagline}</div>
              <div>{} </div>
              <div className="overview">
                <div className="heading">Overview</div>
                <div className="description">{movieInfo.overview}</div>
              </div>
              <div className="genres">
                {movieInfo?.genres?.map((g) => g.id).length > 0 ? (
                  <div className="genre">
                    {movieInfo?.genres?.map((g) => g.name).join(", ")}
                  </div>
                ) : null}
              </div>
            </div>
          )}
          <div className="home-video">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${movieVideo}`}
              playing={true}
              controls
              muted={true}
              width={"600px"}
              height={"100%"}
            />
          </div>
        </div>
      )}
      {seriesVideo ? (
        <div className="movie-box">
          {seriesInfo && (
            <div>
              <h1 className="headline-home">{seriesInfo.name}</h1>
              <p className="home-paragraph">{seriesInfo.overview}</p>
              {/* <p>{movieInfo.production_companies[0].name}</p> */}
              {/* <p>{seriesInfo.budget} $</p> */}
            </div>
          )}
          <div className="home-video">
            <ReactPlayer
              url={`https://www.youtube.com/watch?v=${seriesVideo}`}
              playing={true}
              controls
              muted={true}
              width={"800px"}
              height={"100%"}
            />
          </div>
        </div>
      ) : (
        trail &&
        seriesInfo && (
          <div className="movie-box">
            {" "}
            <div>
              <h1 className="headline-home">{seriesInfo.name}</h1>
              <p className="home-paragraph">{seriesInfo.overview}</p>
            </div>
            <div>
              <img
                src={`https://image.tmdb.org/t/p/w300${seriesInfo.poster_path}`}
                alt={seriesInfo.title}
              />
            </div>
          </div>
        )
      )}
      <div
        className="carusels-container"
        style={{
          marginTop: (movieVideo || seriesVideo || trail) && "520px",
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
        <SeriesCaruselComponent items={aring} />
        <h2>On TV</h2>
        <SeriesCaruselComponent items={onTv} />
        <h2>Popular Series</h2>
        <SeriesCaruselComponent items={popular} />
        <h2>Top Rated</h2>
        <SeriesCaruselComponent items={rated} />
        {/* <Images/> */}
      </div>
    </>
  );
}

export default HomePage;
