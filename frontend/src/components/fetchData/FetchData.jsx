export const movieUrl = "https://api.themoviedb.org/3";

export const options = {
  method: "GET",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIyODNiYTg1NjdiMTE2NGRiNGVkNGViMGM5ZjU2NjI2ZCIsInN1YiI6IjY1Y2NhM2NkODk0ZWQ2MDE3YzI3ZWI3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.Pw8eoYZ5CaNJMj6lQ1SyYpvLFQbJviN9abfhsHQ8ASI",
  },
};
export const fetchData = async (mediaType, endpoint, currentPage, setState) => {
  try {
    const response = await fetch(
      `${movieUrl}/${mediaType}/${endpoint}?language=en-US&page=${currentPage}`,
      options
    );
    const data = await response.json();
    setState(data.results);
  } catch (error) {
    console.error(error);
  }
};

// // YourComponent.js
// import { useState } from 'react';
// import useMovieData from './useMovieData'; // Import the custom hook

// export const YourComponent = () => {
//   const movieUrl = 'your_movie_api_url_here'; // Replace with your actual API URL
//   const [currentPage, setCurrentPage] = useState(1);

//   // Fetch now playing movies
//   const nowPlayingMovies = useMovieData(`${movieUrl}/movie/now_playing`, currentPage);

//   // Fetch popular movies
//   const popularMovies = useMovieData(`${movieUrl}/movie/popular`, currentPage);

//   // Fetch top rated movies
//   const topRatedMovies = useMovieData(`${movieUrl}/movie/top_rated`, currentPage);

//   // Rest of your component logic...
// };

// // useMovieData.js (Custom Hook)
// import { useEffect } from 'react';

// export const useMovieData = (url, currentPage) => {
//   const [movies, setMovies] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const response = await fetch(`${url}?language=en-US&page=${currentPage}`);
//         if (!response.ok) {
//           throw new Error("Failed to fetch data");
//         }
//         const data = await response.json();
//         setMovies(data.results);
//       } catch (error) {
//         console.error(error);
//       }
//     };

//     fetchData();
//   }, [url, currentPage]);

//   return movies;
// };
