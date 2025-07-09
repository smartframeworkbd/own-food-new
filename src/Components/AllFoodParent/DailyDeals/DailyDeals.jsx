import React from "react";
import Slider from "react-slick";

import cakeImg from "../../../assets/food.png";
import biryaniImg from "../../../assets/food.png";
import friedImg from "../../../assets/food.png";
import sausageImg from "../../../assets/food.png";

import "./DailyDeals.css";

const images = [cakeImg, biryaniImg, friedImg, sausageImg, cakeImg, biryaniImg];

const DailyDeals = () => {
  const Arrow = ({ className, onClick, direction }) => (
    <div
      className={`DailyDeals-custom-arrow ${
        direction === "left"
          ? "DailyDeals-left-arrow"
          : "DailyDeals-right-arrow"
      } ${className}`}
      onClick={onClick}
    >
      {direction === "left" ? "‹" : "›"}
    </div>
  );

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    arrows: true,
    prevArrow: <Arrow direction="left" />,
    nextArrow: <Arrow direction="right" />,
    responsive: [
      { breakpoint: 992, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 576, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="DailyDeals-custom-carousel-wrapper">
      <h5 className="DailyDeals-carousel-title">Your Daily Deals</h5>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="DailyDeals-carousel-slide">
            <img
              src={img}
              alt={`Deal ${idx}`}
              className="DailyDeals-carousel-image"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DailyDeals;
