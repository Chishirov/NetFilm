import { useState } from "react";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import CircleRating from "../../../components/circleRating/CircleRating.jsx";
import { PlayIcon } from "../../../components/details/Playbtn.jsx";
import VideoPopup from "../../../components/videoPopup/VideoPopup.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";

const DetailsBanner = ({ id, movieInfo, video, crew }) => {
    const [loading, setLoading] = useState(false);
    const [show, setShow] = useState(false);
    const [videoId, setVideoId] = useState(null);

    const director = crew?.filter((c) => c.job === "Director");
    const writer = crew?.filter(
        (c) => c.job === "Screenplay" || c.job === "Story" || c.job === "Writer"
    );

    // const [genres, setGenres] = useState("")
    // const _genres = movieInfo?.genres?.map((g) => g.id);

    const toHoursAndMinutes = (totalMinutes) => {
        const hours = Math.floor(totalMinutes / 60);
        const minutes = totalMinutes % 60;
        return `${hours}h ${minutes > 0 ? minutes + "min" : ""}`;
    };
    return (
        <div className="detailsBanner">
            {!loading ? (
                <>
                    {movieInfo && (
                        <>
                            <div className="backdrop-img">
                                <img
                                    src={`https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`}
                                    alt={movieInfo.title}
                                />
                            </div>
                            <div className="opacity-layer"></div>
                            <ContentWrapper>
                                <div className="content">
                                    <div className="left">
                                        {movieInfo.poster_path ? (
                                            <img
                                                className="posterImg"
                                                src={`https://image.tmdb.org/t/p/original${movieInfo.poster_path}`}
                                            />
                                        ) : (
                                            <img className="posterImg" src={PosterFallback} />
                                        )}
                                    </div>
                                    <div className="right">
                                        <div className="title">
                                            {`${movieInfo.name || movieInfo.title}
                                            (${dayjs(
                                                movieInfo?.release_date || movieInfo?.first_air_date
                                            ).format("YYYY")})`}
                                        </div>
                                        <div className="subtitle">{movieInfo.tagline}</div>
                                        <div className="genres">
                                            {movieInfo?.genres?.map((g) => g.id).length > 0 ? (
                                                <div className="genre">
                                                    {movieInfo?.genres
                                                        ?.map((g) => g.name)
                                                        .join(", ")}
                                                </div>
                                            ) : null}
                                        </div>
                                        <div className="row">
                                            <CircleRating
                                                rating={movieInfo.vote_average.toFixed(1)}
                                            />
                                            <div className="playbtn"
                                                onClick={() => {
                                                    setShow(true);
                                                    setVideoId(video?.key);
                                                }}
                                            >
                                                <PlayIcon />
                                                <span className="text">Watch Trailer</span>
                                            </div>
                                        </div>

                                        <div className="overview">
                                            <div className="heading">Overview</div>
                                            <div className="description">{movieInfo.overview}</div>
                                        </div>
                                        <div className="info">
                                            {movieInfo.status && (
                                                <div
                                                    className="infoItem"
                                                    style={{ color: "white" }}
                                                >
                                                    <span className="text bold">Status: </span>
                                                    <span className="text">{movieInfo.status}</span>
                                                </div>
                                            )}
                                            {movieInfo.release_date && (
                                                <div className="infoItem">
                                                    <span className="text bold">
                                                        Release Date:{" "}
                                                    </span>
                                                    <span className="text">
                                                        {dayjs(movieInfo.release_date).format(
                                                            "MMM D, YYYY"
                                                        )}
                                                    </span>
                                                </div>
                                            )}
                                            {movieInfo.runtime && (
                                                <div className="infoItem">
                                                    <span className="text bold">Runtime: </span>
                                                    <span className="text">
                                                        {toHoursAndMinutes(movieInfo.runtime)}
                                                    </span>
                                                </div>
                                            )}
                                        </div>
                                        {director?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Director : {""}</span>
                                                <span className="text">
                                                    {director?.map((d, i) => {
                                                        return (
                                                            <span key={i}>
                                                                {d.name}
                                                                {director?.length - 1 !== i && ", "}
                                                            </span>
                                                        );
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {writer?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Writer: </span>
                                                <span className="text">
                                                    {writer?.map((w, i) => {
                                                        return (
                                                            <span key={i}>
                                                                {w.name}
                                                                {writer?.length - 1 !== i && ", "}
                                                            </span>
                                                        );
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo.production_companies?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">
                                                    Production Companies:{" "}
                                                </span>
                                                <span className="text">
                                                    {movieInfo.production_companies?.map((p, i) => {
                                                        return (
                                                            <span key={i}>
                                                                {p.name}
                                                                {movieInfo.production_companies
                                                                    ?.length -
                                                                    1 !==
                                                                    i && ", "}
                                                            </span>
                                                        );
                                                    })}
                                                </span>
                                            </div>
                                        )}
                                        {movieInfo?.created_by?.length > 0 && (
                                            <div className="info">
                                                <span className="text bold">Creator: </span>
                                                <span className="text">
                                                    {movieInfo?.created_by?.map((d, i) => (
                                                        <span key={i}>
                                                            {d.name}
                                                            {movieInfo?.created_by.length - 1 !==
                                                                i && ", "}
                                                        </span>
                                                    ))}
                                                </span>
                                            </div>
                                        )}
                                    </div>
                                </div>
                                <VideoPopup
                                    show={show}
                                    setShow={setShow}
                                    videoId={videoId}
                                    setVideoId={setVideoId}
                                />
                            </ContentWrapper>
                        </>
                    )}
                </>
            ) : (
                <div className="detailsBannerSkeleton">
                    <ContentWrapper>
                        <div className="left skeleton"></div>
                        <div className="right">
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                            <div className="row skeleton"></div>
                        </div>
                    </ContentWrapper>
                </div>
            )}
        </div>
    );
};

export default DetailsBanner;
