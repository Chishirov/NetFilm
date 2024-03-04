import React, { useRef, useState } from "react";
import { BsFillArrowLeftCircleFill, BsFillArrowRightCircleFill } from "react-icons/bs";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import dayjs from "dayjs";

import ContentWrapper from "../contentWrapper/ContentWrapper";
import Img from "../lazyLoadImage/Img";
import PosterFallback from "../../assets/no-poster.png";
import CircleRating from "../circleRating/CircleRating";
import Genres from "../genres/Genres";
import useFetch from "../../hooks/useFetch";
import "./style.scss";

const Carousel = () => {
    const [endpoint, setEndpoint] = useState("day")
    // const {data, loading} = useFetch(`/discover/movie`)
     // const {data, loading} = useFetch(`/movie/upcoming`)
    // const {data, loading} = useFetch(`/trending/movie/${endpoint}`)
    // const {data, loading} = useFetch(`/trending/tv/${endpoint}`)
    const {data, loading} = useFetch(`/trending/all/${endpoint}`)
    
    
    
    const carouselContainer = useRef();
    console.log(carouselContainer);

    const { url } = useSelector((state) => state.home);
    const navigate = useNavigate();

    const navigation = (direction) => {
         const container = carouselContainer.current;
        const scrollAmount = direction === "left" 
        ? container.scrollLeft - (container.offsetWidth + 20)
        : container.scrollLeft + (container.offsetWidth + 20)
        container.scrollTo({
            top: 0,
            left: scrollAmount,
            behavior: "smooth",
        });
    };
console.log(data);
    const skItem = () => (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );

    return (
        <div className="carousel">
            <ContentWrapper>
            <BsFillArrowLeftCircleFill
                    className=" carouselLeftNav arrow"
                     onClick={() => navigation("left")}
                />
                <BsFillArrowRightCircleFill
                    className=" carouselRightNav arrow"
                     onClick={() => navigation("right")}
                />
                {!loading ? (
                    <div className="carouselItems" ref={carouselContainer}>
                        {data?.results.map((item) => {
                            const posterUrl = item.poster_path
                                ? `${url.poster}${item.poster_path}`
                                : PosterFallback;
                            return (
                                <div className="carouselItem" key={item.id}>
                                    <div className="posterBlock">
                                        <Img src={posterUrl} alt={item.title || item.name} />
                                        <CircleRating rating={item.vote_average.toFixed(1)} />
                                        <Genres data={item.genre_ids.slice(0, 2)} />
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
                ) : (
                    <div className="loadingSkeleton">
                        {Array.from({ length: 5 }).map((_, index) => (
                            <React.Fragment key={index}>{skItem()}</React.Fragment>
                        ))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default Carousel;
