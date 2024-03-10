import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import axios from "axios";
function FavoritePage() {
  const { user, setUser } = useContext(UserContext);

  const deleteHandler = async (movieId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-movie/${movieId}/${user._id}`
      );

      if (user?.movies.length !== 0) {
        console.log("user.movies", user.movies);
        const remainigMovies = user.movies.filter(
          (movie) => movie?.movieId !== movieId
        );
        console.log("remainigMovies", remainigMovies);
        setUser({ ...user, movies: remainigMovies });
      } else {
        console.error("error with deleted movie");
      }
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    const getAllmovies = async () => {
      if (user?.movies.length) {
        try {
          const moviesRes = await axios.get(
            `http://localhost:3000/get-movies/${user?._id}`
          );
          console.log(moviesRes.data);
          setUser({ ...user, movies: moviesRes.data });
        } catch (error) {
          console.error(error);
        }
      }
    };
    getAllmovies();
  }, []);

  return (
    <div className="flex flex-col  w-full mt-6">
      {user?.movies
        .filter((movie) => movie.isWatchlist === true)
        .map((movie, index) => (
          <Card
            key={index}
            className="min-w-80 h-48 sm:h-60 md:w-full flex-row mb-2 md:mb-4 max-w-4xl place-self-center"
          >
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 shrink-0 rounded-r-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${movie?.imageUrl}`}
                alt="card-image"
                className="h-1/2 sm:h-full object-fill"
              />
            </CardHeader>
            <CardBody>
              <Typography
                variant="h4"
                color="blue-gray"
                className="mb-0 sm:mb-2 sm:text-xl text-lg resize-x"
              >
                {movie.title} movie.title || movie.name
              </Typography>
              <Typography className=" h-14 sm:h-16 mb-0 sm:mb-8 sm:text-md text-sm overflow-auto">
                movie.review || movie.overview
              </Typography>
              <Button
                onClick={() => deleteHandler(movie.movieId)}
                color="red"
                // variant="text"
                className="m-1 p-3 w-auto text-xs sm:text-sm"
              >
                remove from watch list
              </Button>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}

export default FavoritePage;
