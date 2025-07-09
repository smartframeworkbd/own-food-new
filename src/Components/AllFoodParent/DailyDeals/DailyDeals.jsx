import React from "react";
import Slider from "react-slick";


import cakeImg from "../../../assets/food.png";
import biryaniImg from "../../../assets/food.png";
import friedImg from "../../../assets/food.png";
import sausageImg from "../../../assets/food.png";

import "./DailyDeals.css";

const images = [cakeImg, biryaniImg, friedImg, sausageImg, cakeImg, biryaniImg];

const DailyDeals = () => {
  // Inline arrow replaced with class-based arrow
  const Arrow = ({ className, onClick, direction }) => (
    <div
      className={`custom-arrow ${
        direction === "left" ? "left-arrow" : "right-arrow"
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
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  return (
    <div className="custom-carousel-wrapper">
      <h5 className="carousel-title">Your Daily Deals</h5>
      <Slider {...settings}>
        {images.map((img, idx) => (
          <div key={idx} className="carousel-slide">
            <img src={img} alt={`Deal ${idx}`} className="carousel-image" />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DailyDeals;
