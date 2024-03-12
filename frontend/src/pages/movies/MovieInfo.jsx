import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "../../components/details/detailsBanner/DetailsBanner.jsx";
import Cast from "../../components/details/cast/Cast.jsx";

function MovieInfo() {
    const [movieInfo, setMovieInfo] = useState(null);
    const [credits, setCredits] = useState(null);
    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [creditsLoading, setCreditsLoading] = useState(false);
    const { mediaType, id } = useParams();

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
                    `https://api.themoviedb.org/3/${mediaType}/${id}?language=en-US`,
                    options
                );
                const movieData = await movieResponse.json();
                setMovieInfo(movieData);

                // Fetch credits
                const creditsResponse = await fetch(
                    `https://api.themoviedb.org/3/${mediaType}/${id}/credits?language=en-US`,
                    options
                );
                const creditsData = await creditsResponse.json();
                setCredits(creditsData);

                // Fetch videos
                const videosResponse = await fetch(
                    `https://api.themoviedb.org/3/${mediaType}/${id}/videos?language=en-US`,
                    options
                );
                const videosData = await videosResponse.json();
                setVideos(videosData);

                setLoading(false);
            } catch (error) {
                console.error("Fehler beim Laden der Daten:", error);
                setLoading(false);
            }
        };

        fetchData();
    }, [mediaType, id]);

    if (loading) {
        return <div>Laden...</div>;
    }

    return (
        <div>
            <DetailsBanner
                id={id}
                movieInfo={movieInfo}
                crew={credits?.crew}
                video={videos?.results?.[0]}
            />
            <Cast data={credits?.cast} loading={creditsLoading} />
        </div>
    );
}

export default MovieInfo;
