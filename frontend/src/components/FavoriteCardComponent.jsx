import React, { useContext, useEffect, useState } from "react";
import {
  Card,
  CardHeader,
  CardBody,
  Typography,
  Button,
} from "@material-tailwind/react";
import { UserContext } from "../context/UserContext";
import { MoviesContext } from "../context/MoviesContext";
function FavoriteCardComponent({ src, id, title, overview }) {
  const { user } = useContext(UserContext);
  const { movieInfo, setMovieInfo } = useContext(MoviesContext);

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
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          options
        );
        const data = await response.json();
        console.log("data in f.C", data);
        setMovieInfo(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);
  return (
    <>
      <Card className="w-full max-w-[48rem] flex-row">
        <CardHeader
          shadow={false}
          floated={false}
          className="m-0 w-2/5 shrink-0 rounded-r-none"
        >
          <img
            src={src}
            alt="card-image"
            className="h-full w-full object-cover"
          />
        </CardHeader>
        <CardBody>
          <Typography variant="h6" color="gray" className="mb-4 uppercase">
            {title}
          </Typography>
          <Typography variant="h4" color="blue-gray" className="mb-2">
            {overview}
          </Typography>

          <a href="#" className="inline-block">
            <Button variant="text" className="flex items-center gap-2">
              Learn More
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
                className="h-4 w-4"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.25 8.25L21 12m0 0l-3.75 3.75M21 12H3"
                />
              </svg>
            </Button>
          </a>
        </CardBody>
      </Card>
    </>
  );
}

export default FavoriteCardComponent;
