import { useContext, useState } from "react";
import { UserContext } from "../context/UserContext";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
  Rating,
} from "@material-tailwind/react";
import axios from "axios";
function FavoritePage() {
  const { user, setUser } = useContext(UserContext);
  const [comments, setComments] = useState({});
  const [klicked, setcklicked] = useState(false); // soll zukunft in context sein damit verwinden wir all comments and zeigen
  const [clickedComments, setClickedComments] = useState({});

  // console.log(comments[693134]);
  console.log("comments", comments);
  const commentHandler = async (movieId) => {
    try {
      const movieRes = await axios.post(
        `http://localhost:3000/update-movie/${user._id}/${movieId}`,
        {
          comment: comments[movieId],
        },
        { withCredentials: true }
      );
      if (movieRes.status === 201) {
        // Check if the movie is already in the user's list
        if (user.movies.find((movie) => movie?.movieId === movieId)) {
          // Add the movie to the user's list
          //prevComments={}={movieid:string},prevComments={movieid:string}
          setComments((prevComments) => ({
            ...prevComments,
            [movieId]: comments[movieId],
          }));
          setClickedComments((prevClickedComments) => ({
            ...prevClickedComments,
            [movieId]: false,
          }));
        }
      } else {
        // Movie already exists in user's list
        console.log("Movie already exists in user's list");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const deleteHandler = async (movieId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-movie/${movieId}/${user._id}`
      );
      if (response) {
        console.log("movie deleted successfully");
      }
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

  return (
    <div className="content-center w-full mt-6">
      {user?.movies
        .filter((movie) => movie.isFavorite === true)
        .map((movie, index) => (
          <Card key={index} className="h-60 w-full flex-row mb-4">
            <CardHeader
              shadow={false}
              floated={false}
              className="m-0 shrink-0 rounded-r-none"
            >
              <img
                src={`https://image.tmdb.org/t/p/w400${movie?.imageUrl}`}
                alt="movie-image"
                className="h-full w-full object-cover"
              />
            </CardHeader>
            <CardBody>
              <Typography variant="h4" color="blue-gray" className="mb-2">
                {movie.title}
              </Typography>
              <Typography variant="h6" color="gray" className="mb-2 uppercase">
                {movie.release_date}
              </Typography>
              <Rating
                className="mb-2"
                // value={()=>{}}
              />
              {!clickedComments[movie.movieId] ? (
                <>
                  <Typography className=" h-12 mb-8 font-normal">
                    {comments[movie.id]}No Comment...
                  </Typography>
                  <Button
                    className="m-1 w-36"
                    onClick={() =>
                      setClickedComments({
                        ...clickedComments,
                        [movie.movieId]: true,
                      })
                    }
                  >
                    comment
                  </Button>
                </>
              ) : (
                <>
                  <Typography className="h-12 mb-8 font-normal">
                    <textarea
                      className="w-full border border-gray-400"
                      value={comments[movie.movieId] || ""} //comments[693134]
                      onChange={(e) =>
                        setComments({
                          ...comments,
                          [movie.movieId]: e.target.value,
                        })
                      }
                    />
                  </Typography>
                  <Button
                    className="m-1 w-36"
                    onClick={
                      (() => commentHandler(movie.movieId),
                      () =>
                        setClickedComments({
                          ...clickedComments,
                          [movie.movieId]: false,
                        }))
                    }
                  >
                    save
                  </Button>
                </>
              )}
              <Button
                onClick={() => deleteHandler(movie.movieId)}
                color="red"
                // variant="text"
                className="m-1 w-36"
              >
                delete
              </Button>
            </CardBody>
          </Card>
        ))}
    </div>
  );
}

export default FavoritePage;
