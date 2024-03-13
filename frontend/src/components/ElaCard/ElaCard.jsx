import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
  Tooltip,
  IconButton,
  Menu,
  MenuHandler,
  MenuList,
  MenuItem,
} from "@material-tailwind/react";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";

import "./style.scss";
import axios from "axios";
import { UserContext } from "../../context/UserContext";

const ElaCard = ({ data, mediaType }) => {

    const [openMenu, setOpenMenu] = useState(false);
    const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    // console.log(data);

    const handleClick = () => {
        console.log("clicked");
        setOpenMenu(!openMenu);
    };
    const favoriteHanlder = async (movieTitle, cardId, userId, imageUrl) => {
        try {
            const movieRes = await axios.post(
                " http://localhost:3000/favorite-movie",
                {
                    title: movieTitle,
                    movieId: cardId.toString(),
                    userId: userId,
                    imageUrl: imageUrl,
                    isFavorite: true,
                    isWatchlist: false,
                },
                { withCredentials: true }
            );
            if (movieRes.status === 201) {
                // Check if the movie is already in the user's list
                if (!user.movies.some((movie) => movie?.movieId === cardId)) {
                    // Add the movie to the user's list
                    setUser((prevUser) => ({
                        ...prevUser,
                        movies: [
                            ...prevUser.movies,
                            {
                                title: movieTitle,
                                movieId: cardId,
                                imageUrl: imageUrl,
                                isFavorite: true,
                                isWatchlist: false,
                            },
                        ],
                    }));
                    setOpenMenu(!openMenu);
                }
            } else {
                // Movie already exists in user's list
                console.log("Movie already exists in user's list");
            }
        } catch (error) {
            console.error(error);


  // console.log(data);

  const handleClick = () => {
    console.log("clicked");
    setOpenMenu(!openMenu);
  };
  const favoriteHanlder = async (movieTitle, cardId, userId, imageUrl) => {
    try {
      const movieRes = await axios.post(
        " http://localhost:3000/favorite-movie",
        {
          title: movieTitle,
          movieId: cardId.toString(),
          userId: userId,
          imageUrl: imageUrl,
          isFavorite: true,
          isWatchlist: false,
        },
        { withCredentials: true }
      );
      if (movieRes.status === 201) {
        // Check if the movie is already in the user's list
        if (!user.movies.some((movie) => movie?.movieId === cardId)) {
          // Add the movie to the user's list
          setUser((prevUser) => ({
            ...prevUser,
            movies: [
              ...prevUser.movies,
              {
                title: movieTitle,
                movieId: cardId,
                imageUrl: imageUrl,
                isFavorite: true,
                isWatchlist: false,
              },
            ],
          }));
          setOpenMenu(!openMenu);
        }
      } else {
        // Movie already exists in user's list
        console.log("Movie already exists in user's list");
      }
    } catch (error) {
      console.error(error);
    }
  };
  const watchlistHandler = async (movieTitle, cardId, userId, imageUrl) => {
    try {
      const movieRes = await axios.post(
        " http://localhost:3000/favorite-movie",
        {
          title: movieTitle,
          movieId: cardId.toString(),
          imageUrl: imageUrl,
          userId: userId,
          isFavorite: false,
          isWatchlist: true,
        },
        { withCredentials: true }
      );
      if (movieRes.status === 201) {
        // Check if the movie is already in the user's list
        if (!user.movies.some((movie) => movie?.movieId === cardId)) {
          // Add the movie to the user's list
          setUser((prevUser) => ({
            ...prevUser,
            movies: [
              ...prevUser.movies,
              {
                title: movieTitle,
                movieId: cardId,
                imageUrl: imageUrl,
                isFavorite: true,
                isWatchlist: false,
              },
            ],
          }));
          setOpenMenu(!openMenu);
        }
      } else {
        // Movie already exists in user's list
        console.log("Movie already exists in user's list");
      }
    } catch (error) {
      console.error(error);
    }
  };
    
    return (
        <div className="carousel">
            {
                <div className="carouselItems">
                    {data?.map((item) => {
                        return (
                            <div
                                className="carouselItem"
                                key={item.id}
                                style={{ filter: openMenu ? "blur(4px)" : "none" }}
                            >
                                <div className="posterBlock">
                                    <img
                                        className="lazy-load-image-background"
                                        src={`https://image.tmdb.org/t/p/w400${item.poster_path}`}
                                        alt={item.title || item.name}
                                        onClick={() => navigate(`/${item.mediaType}/${item.id}`)}
                                    />
                                    <CircleRating
                                        rating={
                                            item && item.vote_average
                                                ? item.vote_average.toFixed(1)
                                                : 0
                                        }
                                    />
                                    <Menu>
                                        <MenuHandler>
                                            <IconButton
                                                size="sm"
                                                color="white"
                                                variant="text"
                                                className="bg-tranparent !absolute top-4 right-4 rounded-full"
                                            >
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="currentColor"
                                                    className="w-9 h-9 border-2 text-5xl font-bold text-orange-700 border-orange-700 rounded-full p-1 bg-transparent hover:bg-orange-700 hover:text-white hover:font-bold transition-all duration-300 ease-in-out"
                                                    onClick={() => handleClick()}
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M4.5 12a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Zm6 0a1.5 1.5 0 1 1 3 0 1.5 1.5 0 0 1-3 0Z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </IconButton>


                        <Typography variant="small" className="font-medium">
                          Favorite
                        </Typography>
                      </MenuItem>
                      <hr className="my-2" />
                      <MenuItem
                        onClick={() =>
                          watchlistHandler(
                            item.title || item.name,
                            item.id,
                            user?._id,
                            item.poster_path
                          )
                        }
                        className="flex items-center gap-2"
                      >
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          className="w-6 h-6"
                        >
                          <path
                            fillRule="evenodd"
                            d="M6.32 2.577a49.255 49.255 0 0 1 11.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 0 1-1.085.67L12 18.089l-7.165 3.583A.75.75 0 0 1 3.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93Z"
                            clipRule="evenodd"
                          />
                        </svg>

                        <Typography variant="small" className="font-medium">
                          Watchlist
                        </Typography>
                      </MenuItem>
                    </MenuList>
                  </Menu>
                </div>
                <div className="textBlock">
                  <span className="title">{item.title || item.name}</span>
                  <span className="date">
                    {dayjs(item.release_Date).format("MMM D, YYYY")}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      }
    </div>
  );
};

export default ElaCard;
