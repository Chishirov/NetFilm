import { createBrowserRouter } from "react-router-dom";
import { SidebarWithBurgerMenu } from "../components/SidebarWithBurgerMenu";
import NowPlayingMovies from "../pages/movies/NowPlayingMovies.jsx";
import PopularMovies from "../pages/movies/PopularMovies.jsx";
import TopRatedMovies from "../pages/movies/TopRatedMovies.jsx";
import UpcomingMovies from "../pages/movies/UpcomingMovies.jsx";
import AiringTodaySeries from "../pages/series/AiringTodaySeries.jsx";
import OnTvSeries from "../pages/series/OnTvSeries.jsx";
import PopularSeries from "../pages/series/PopularSeries.jsx";
import TopRatedSeries from "../pages/series/TopRatedSeries.jsx";
import MovieInfo from "../pages/movies/MovieInfo";
const router = createBrowserRouter([
  {
    path: "/",
    element: <SidebarWithBurgerMenu />,
    children: [
      {
        path: "/Popular-movies",
        element: <PopularMovies />,
      },
      {
        path: "/now-playing-movies",
        element: <NowPlayingMovies />,
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
        path: "/movies-info/:id",
        element: <MovieInfo />,
      },
    ],
  },
]);

export default router;
