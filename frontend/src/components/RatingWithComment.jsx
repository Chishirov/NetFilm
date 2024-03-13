import {
  Typography,
  Avatar,
  // Rating,
  Card,
  List,
  ListItem,
  ListItemPrefix,
  IconButton,
} from "@material-tailwind/react";
import Rating from "@mui/material/Rating";
import axios from "axios";
import { useContext, useEffect, useState } from "react";

import "../styles/communityPage.css";
import { UserContext } from "../context/UserContext";
import { Button } from "flowbite-react";

export function RatingWithComment() {
  const [users, setUsers] = useState([]);
  const { user } = useContext(UserContext);
  const [moviesIds, setMoviesIds] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [deletedComment, setDeletedcoment] = useState(false);
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
  }, [deletedComment]);
  // useEffect(() => {
  //   // Function to fetch reviews for a movie
  //   const fetchReviewsForMovie = async (movieId) => {
  //     const url = `https://api.themoviedb.org/3/movie/${movieId}/reviews?language=en-US&page=1`;
  //     const options = {
  //       method: "GET",
  //       headers: {
  //         accept: "application/json",
  //         Authorization:
  //           "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NzdlMDBkMTIyZDg0MmZlZTYwYzFlNWY1MzUwZWVkNCIsInN1YiI6IjY1MmE2Yjk5MWYzZTYwMDExYzRhMmNmZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.27Of1P9G1YQOX5RsHqMkoga3b6WelSSkdIblIqP19YY",
  //       },
  //     };

  //     try {
  //       const response = await fetch(url, options);
  //       if (response.ok) {
  //         const data = await response.json();
  //         console.log("Reviews for movie ID", movieId, ":", data.results);
  //         setReviews((prevReviews) => [
  //           ...prevReviews,
  //           { movieId: movieId, data: data.results },
  //         ]);
  //       } else {
  //         console.error("Failed to fetch reviews for movie ID", movieId);
  //       }
  //     } catch (error) {
  //       console.error(
  //         "Error fetching reviews for movie ID",
  //         movieId,
  //         ":",
  //         error
  //       );
  //     }
  //   };

  //   moviesIds.forEach((movieId) => {
  //     fetchReviewsForMovie(movieId);
  //   });
  // }, [moviesIds]);
  const deleteComment = async (userId, movieId, commentId) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/delete-comment/${userId}/${movieId}/${commentId}`
      );
      console.log("response", response);
      setDeletedcoment(true);
    } catch (error) {
      console.error(error);
    }
  };
  console.log("users", users);
  console.log("---------moviesIds", moviesIds);
  console.log("reviews", reviews);
  console.log(user);
  console.log(user?.isAdmin);
  return (
    <>
      {users.map((userInfo) =>
        userInfo.movies.map((movie) => {
          return (
            movie.comments && (
              <div
                className="community-container"
                style={{ justifyContent: user.isAdmin ? "space-between" : "" }}
                key={movie._id}
              >
                <div className="community-box">
                  <Avatar src={userInfo?.image} alt="image" size="lg" />
                  <Typography variant="h6" className="mt-4">
                    {userInfo.username}
                  </Typography>
                  <Typography>
                    {new Date(movie.comments?.createdAt).toLocaleDateString(
                      "de"
                    )}
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

                    <Rating
                      name="read-only"
                      size="small"
                      value={movie.comments?.raiting || 0}
                      readOnly
                    />
                  </div>
                  <Typography
                    className="truncate ..."
                    variant="paragraph"
                    color="blue-gray"
                  >
                    &quot;
                    {movie.comments?.comment
                      ? movie.comments?.comment
                      : "comment removed"}
                    &quot;
                  </Typography>
                </div>
                {user?.isAdmin && (
                  <IconButton
                    color="red"
                    className="rounded-full"
                    onClick={() =>
                      deleteComment(
                        userInfo._id,
                        movie?.movieId,
                        movie?.comments?._id
                      )
                    }
                  >
                    <i className="fa-solid fa-xmark"></i>
                  </IconButton>
                )}
              </div>
            )
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
