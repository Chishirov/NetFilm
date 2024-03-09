import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "../../components/details/detailsBanner/DetailsBanner.jsx";
// import Cast from "../../components/cast/Cast.jsx";
// import Credits from "../../components/credits/Credits.jsx";

function MovieInfo() {
    const [movieInfo, setMovieInfo] = useState(null);
    const [credits, setCredits] = useState(null);
    const [videos, setVideos] = useState(null);

    const { id } = useParams();

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

                // Fetch movie details
                const movieResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
                    options
                );
                const movieData = await movieResponse.json();
                setMovieInfo(movieData);

                // Fetch credits
                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/credits?language=en-US`,
                    options
                );
                const creditsData = await creditsResponse.json();
                setCredits(creditsData);

                // Fetch videos
                const videosResponse = await fetch(
                    `https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`,
                    options
                );
                const videosData = await videosResponse.json();
                setVideos(videosData);
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    return (
        <div>
            <DetailsBanner
                id={id}
                movieInfo={movieInfo}
                crew={credits?.crew}
                video={videos?.results?.[0]}
            />
            {/* <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} /> */}
            {/* <DetailsBanner video={videos?.results?.[0]} crew={credits?.crew} /> */}
            {/* <Cast data={credits?.cast} loading={creditsLoading} /> */}
            {/* <VideosSection data={data} loading={loading} /> */}
            {/* <Cast data={credits?.cast} loading={creditsLoading} /> */}
            {/* <Credits id={id} credits={credits} /> */}
        </div>
    );
}

export default MovieInfo;
