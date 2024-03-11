import {
  Typography,
  Avatar,
  // Rating,
  Card,
  List,
  ListItem,
  ListItemPrefix,
} from "@material-tailwind/react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useEffect, useState } from "react";
export function RatingWithComment() {
  const [users, setUsers] = useState([]);
  const [moviesIds, setMoviesIds] = useState([]);
  const [reviews, setReviews] = useState([]);
  // const [comments, setComents] = useState([]);
  // const [rating, setRating] = useState(0);
  // const [title, setTitle] = useState("");
  let movieIds = [];
  useEffect(() => {
    const getAllUser = async () => {
      try {
        const usersResponse = await axios.get(
          "http://localhost:3000/getAllUser"
        );
        if (usersResponse.status === 200) {
          usersResponse.data.forEach((user) => {
            user.movies.forEach((movie) => {
              const movieId = movie.movieId;
              if (!movieIds.includes(movieId)) {
                movieIds.push(movieId);
                console.log(movieId);
              }
              return movieIds;
            });
          });
          console.log("movieIds.........", movieIds);
          setUsers(usersResponse.data);
          setMoviesIds(movieIds);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getAllUser();
  }, []);
  useEffect(() => {
    // Function to fetch reviews for a movie
    const fetchReviewsForMovie = async (movieId) => {
      const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
      const options = {
        method: "GET",
        headers: {
          accept: "application/json",
          Authorization:
            "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdlMDBkMTIyZDg0MmZlZTYwYzFlNWY1MzUwZWVkNCIsInN1YiI6IjY1MmE2Yjk5MWYzZTYwMDExYzRhMmNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27Of1P9G1YQOX5RsHqMkoga3b6WelSSkdIblIqP19YY",
        },
      };

      try {
        const response = await fetch(url, options);
        if (response.ok) {
          const data = await response.json();
          console.log("Reviews for movie ID", movieId, ":", data.results);
          setReviews((prevReviews) => [
            ...prevReviews,
            { movieId: movieId, data: data.results },
          ]);
        } else {
          console.error("Failed to fetch reviews for movie ID", movieId);
        }
      } catch (error) {
        console.error(
          "Error fetching reviews for movie ID",
          movieId,
          ":",
          error
        );
      }
    };

    moviesIds.forEach((movieId) => {
      fetchReviewsForMovie(movieId);
    });
  }, [moviesIds]);
  console.log("users", users);
  console.log("---------moviesIds", moviesIds);
  console.log("reviews", reviews);

  return (
    <>
      {users.map((user) =>
        user.movies.map((movie) => {
          return (
            <div
              key={movie._id}
              style={{
                padding: "10px",
                margin: "50px",
                height: "170px",
                display: "flex",
                borderRadius: "20px",
                alignContent: "center",
                alignItems: "center",
                gap: "40px",
                borderBottom: "2px solid ",
                backgroundColor: "#ffffff",
              }}
            >
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                }}
              >
                <Avatar
                  src="https://images.unsplash.com/flagged/photo-1570612861542-284f4c12e75f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
                  alt="image"
                  size="lg"
                />
                <Typography variant="h6" className="mt-4">
                  {user.username}
                </Typography>
                {/* Assuming movie.comments.createdAt is a property of user.movies */}
                <Typography>
                  {new Date(movie.comments?.createdAt).toLocaleDateString("de")}
                </Typography>
              </div>
              <div
                className="truncate ..."
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "10px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    gap: "10px",
                    alignItems: "flex-start",
                    flexWrap: "wrap",
                  }}
                >
                  <Typography variant="h6" color="blue">
                    @{movie.title}
                  </Typography>
                  {/* Assuming rating is a property of movie.comments */}
                  <Rating
                    name="read-only"
                    size="small"
                    value={movie.comments?.raiting} // Corrected 'raiting' to 'rating'
                    readOnly
                  />
                </div>
                {/* Assuming comment is a property of movie.comments */}
                <Typography
                  className="truncate ..."
                  variant="paragraph"
                  color="blue-gray"
                >
                  &quot;{movie.comments?.comment}&quot;
                </Typography>
              </div>
            </div>
          );
        })
      )}
    </>
  );
}

// <div style={{ margin: "50px" }}>
//   {reviews.map((review) =>
//     review.data.map((rewiewer) => (
//       <div key={rewiewer.author}>
//         <Card
//           style={{ width: "70%", margin: "10px" }}
//           key={rewiewer.author}
//         >
//           <List>
//             <ListItem>
//               <ListItemPrefix>
//                 <Avatar
//                   variant="circular"
//                   //  alt={user.username}
//                   src="https://docs.material-tailwind.com/img/face-3.jpg"
//                 />
//                 <Typography variant="h6" color="blue-gray">
//                   {/* {user.username} */}
//                   {rewiewer.author}
//                 </Typography>
//               </ListItemPrefix>
//               <div>
//                 <ListItemPrefix>
//                   <Typography variant="h6" color="blue-gray">
//                     {/* {movie.title} */}
//                   </Typography>
//                   <Rating
//                     name="read-only"
//                     size="small"
//                     value={rewiewer.author_details.rating}
//                     readOnly
//                   />
//                 </ListItemPrefix>
//               </div>
//               <div>
//                 <Typography
//                   className="ext-clip overflow-hidden ..."
//                   variant="paragraph"
//                   color="blue-gray"
//                   // style={{
//                   //   whiteSpace: "nowrap",
//                   //   overflow: "hidden",
//                   //   textOverflow: "ellipsis",
//                   // }}
//                 >
//                   &quot;{rewiewer.content.slice(0, 300)}&quot;
//                 </Typography>
//               </div>
//             </ListItem>
//           </List>
//         </Card>
//       </div>
//     ))
//   )}
// </div>
