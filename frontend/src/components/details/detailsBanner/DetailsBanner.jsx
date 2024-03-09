import { useState } from "react";
import dayjs from "dayjs";
import ContentWrapper from "../../../components/contentWrapper/ContentWrapper.jsx";
import CircleRating from "../../../components/circleRating/CircleRating.jsx";
import { PlayIcon } from "../../../components/details/Playbtn.jsx";
import PosterFallback from "../../../assets/no-poster.png";
import "./style.scss";

const DetailsBanner = ({ id, movieInfo }) => {
    const [loading, setLoading] = useState(false);
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
                                                src={`https://image.tmdb.org/t/p/original${movieInfo.backdrop_path}`}
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
                                            <CircleRating rating={movieInfo.vote_average} />
                                            <PlayIcon />
                                            <span className="text">Watch Trailer</span>
                                        </div>
                                    </div>
                                    <div className="overview">
                                            <div className="heading">
                                                Overview
                                            </div>
                                            <div className="description">
                                                {movieInfo.overview}
                                            </div>
                                        </div>
                                </div>
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
