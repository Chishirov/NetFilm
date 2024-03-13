import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import DetailsBanner from "../../components/details/detailsBanner/DetailsBanner.jsx";
import { options, movieUrl } from "../../components/fetchData/FetchData.jsx";

function MovieInfo() {
  const [movieInfo, setMovieInfo] = useState(null);
  const [credits, setCredits] = useState(null);
  const [videos, setVideos] = useState(null);
  const [loading, setLoading] = useState(true);
  const { mediaType, id } = useParams();

  useEffect(() => {
    const fetchData = async (endpoint, setState) => {
      try {
        const response = await fetch(
          `${movieUrl}/${mediaType}/${id}/${endpoint}?language=en-US`,
          options
        );
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error("Fehler beim Laden der Daten:", error);
      }
    };
    const fetchEndpoints = async () => {
      setLoading(true);
      await fetchData("", setMovieInfo); // Fetch movie details
      await fetchData("credits", setCredits); // Fetch credits
      await fetchData("videos", setVideos); // Fetch videos
      setLoading(false);
    };

    fetchEndpoints();
  }, [mediaType, id]);

  //   useEffect(() => {
  //     const fetchData = async () => {
  //       try {
  //         // Fetch movie details
  //         const movieResponse = await fetch(
  //           `${movieUrl}/${mediaType}/${id}?language=en-US`,
  //           options
  //         );
  //         const movieData = await movieResponse.json();
  //         setMovieInfo(movieData);

  //         // Fetch credits
  //         const creditsResponse = await fetch(
  //           `${movieUrl}/${mediaType}/${id}/credits?language=en-US`,
  //           options
  //         );
  //         const creditsData = await creditsResponse.json();
  //         setCredits(creditsData);

  //         // Fetch videos
  //         const videosResponse = await fetch(
  //           `${movieUrl}/${mediaType}/${id}/videos?language=en-US`,
  //           options
  //         );
  //         const videosData = await videosResponse.json();
  //         setVideos(videosData);

  //         setLoading(false);
  //       } catch (error) {
  //         console.error("Fehler beim Laden der Daten:", error);
  //         setLoading(false);
  //       }
  //     };

  //     fetchData();
  //   }, [mediaType, id]);

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
    </div>
  );
}

export default MovieInfo;
