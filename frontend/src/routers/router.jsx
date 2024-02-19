import { createBrowserRouter } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../components/SidebarWithBurgerMenu.jsx";
import NowPlayingMovies from "../pages/movies/NowPlayingMovies.jsx";
import PopularMovies from "../pages/movies/PopularMovies.jsx";
import TopRatedMovies from "../pages/movies/TopRatedMovies.jsx";
import UpcomingMovies from "../pages/movies/UpcomingMovies.jsx";
import AiringTodaySeries from "../pages/series/AiringTodaySeries.jsx";
import OnTvSeries from "../pages/series/OnTvSeries.jsx";
import PopularSeries from "../pages/series/PopularSeries.jsx";
import TopRatedSeries from "../pages/series/TopRatedSeries.jsx";
import LoginPage from "../pages/LoginPage.jsx";
import MovieInfo from "../pages/movies/MovieInfo.jsx";
import HomePage from "../pages/HomePage.jsx";
import MoviesPage from "../pages/MoviesPage.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarWithBurgerMenu />,
    children: [
      {
        path: "/home",
        element: <HomePage />,
      },
      {
        path: "/movies",
        element: <MoviesPage />,
      },
      {
        path: "/now-playing-movies",
        element: <NowPlayingMovies />,
      },
      {
        path: "/Popular-movies",
        element: <PopularMovies />,
      },

      {
        path: "/top-rated-movies",
        element: <TopRatedMovies />,
      },
      {
        path: "/upcoming-movies",
        element: <UpcomingMovies />,
      },
      {
        path: "/Airing-today",
        element: <AiringTodaySeries />,
      },
      {
        path: "/on-tv-series",
        element: <OnTvSeries />,
      },
      {
        path: "/Popular-series",
        element: <PopularSeries />,
      },
      {
        path: "/top-rated-series",
        element: <TopRatedSeries />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/movies-info/:id",
        element: <MovieInfo />,
      },
    ],
  },
]);

export default router;