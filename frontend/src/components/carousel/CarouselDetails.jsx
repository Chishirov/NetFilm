import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import ContentWrapper from "../contentWrapper/ContentWrapper.jsx";
import PosterFallback from "../../assets/no-poster.png";
import CircleRatingSample from "../circleRating/CircleRatingSample.jsx";

const CarouselDitails = ({ data, loading, endpoint, title }) => {
  const [openMenu, setOpenMenu] = useState(false);
  const { user, setUser } = useContext(UserContext);
    const navigate = useNavigate();

    const responsive = {
        superLargeDesktop: {
            breakpoint: { max: 4000, min: 1024 },
            items: 5,
        },
        desktop: {
            breakpoint: { max: 1024, min: 800 },
            items: 5,
        },
        tablet: {
            breakpoint: { max: 800, min: 464 },
            items: 2,
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
        },
    };

    const skItem = () => (
        <div className="skeletonItem">
            <div className="posterBlock skeleton"></div>
            <div className="textBlock">
                <div className="title skeleton"></div>
                <div className="date skeleton"></div>
            </div>
        </div>
    );

    const renderData = () => {
        if (!data || !Array.isArray(data)) {
            return [];
        }

        return data.map((item, index) => (
            <div
                key={item.id}
                onClick={() => navigate(`/${item.media_type || endpoint}/${item.id}`)}
                style={{
                  display: "flex",
                    flexDirection: "column",

                  // backgroundColor:"red",
                    width: "calc(100% - 20px)",
                    height: "450px",
                    position: "relative",
                    marginRight: "20px",
                    marginTop: "10px",
                    marginBottom: "0px",
                    cursor: "pointer",
                }}
            >
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        position: "relative",
                        width: "100%",
                        height: "60%",
                    }}
                >
                    <img
                        className="posterBlock w-full h-full object-cover object-center absolute rounded-2xl"
                        style={{ width: "405px", height: "345px" }}
                        src={`https://image.tmdb.org/t/p/original${
                            item.poster_path || PosterFallback
                        }`}
                        alt={item.name}
                    />
                    <div
                        style={{
                            width: "50px",
                            height: "50px",
                            marginTop: "380px",
                            position: "relative",
                            bottom: "70px",
                            left: "10px",
                            borderRadius: "50%",
                        }}
                    >
                        <CircleRatingSample
                            rating={item.vote_average.toFixed(1)}
                            useStyle1={true}
                        />
                    </div>
                </div>
                <div className="textBlock flex flex-col mt-28 mb-0 w-52 ml-2 relative">
                    <span
                        className="text-sm text-orange-300 mt-0 mb-1"
                        style={{
                            fontSize: "1.2rem",
                            fontWeight: "bold",
                            color: "#e9bf6c",
                            overflow: "hidden",
                            whiteSpace: "nowrap",
                            textOverflow: "ellipsis",
                        }}
                    >
                        {item.title || item.name}
                    </span>

                    <span className="date text-sm text-gray-400 opacity-50">
                        {dayjs(item.release_date || item.first_air_date).format("MMM D, YYYY")}
                    </span>
                </div>
            </div>
        ));
    };

    return (
        <div
            className="carousel"
            // style={{
            //     width: "80%",
            //     display: "flex",
            //     flexDirection: "column",
            //     gap: "30px",
            //     justifyContent: "center",
            //     margin: "0 auto",
            // }}
        >
            <ContentWrapper>
                {title && <div className="text-white text-3xl"
                            style={{ marginTop: title === "Similar Movie" ? "0px" : "10px" }}

                >{title}
                
                </div>}

                {!loading ? (
                    <Carousel
                        responsive={responsive}
                        // infinite={true} autoPlay={true} autoPlaySpeed={5000} customTransition="all .5"
                    >
                        {renderData()}
                    </Carousel>
                ) : (
                    <div className="loadingSkeleton">
                        {[...Array(5)].map((_, index) => (
                            <React.Fragment key={index}>{skItem()}</React.Fragment>
                        ))}
                    </div>
                )}
            </ContentWrapper>
        </div>
    );
};

export default CarouselDitails;
