import React from "react";
import Slider from "react-slick";
import "./OfferFoodParent.css";
import FoodCard from "../FoodCard/FoodCard";

const OfferFoodParent = () => {
  const sliderRef = React.useRef();

  const foodData = [
    {
      title: "Hot Pizza",
      description: "Tasty and crispy pizza",
      buttonText: "Order Now",
      image: "/images/pizza.png",
      bgColor: "#FFF4E3",
      btnClass: "btn-warning",
    },
    {
      title: "Burger Combo",
      description: "Delicious and juicy burger",
      buttonText: "Get Deal",
      image: "/images/burger.png",
      bgColor: "#E3F7FF",
      btnClass: "btn-info",
    },
    {
      title: "Cheese Burst",
      description: "Extra cheesy delight",
      buttonText: "Try Now",
      image: "/images/cheese.png",
      bgColor: "#FDEDED",
      btnClass: "btn-danger",
    },
    {
      title: "Veg Delight",
      description: "Healthy and tasty",
      buttonText: "Order Now",
      image: "/images/veg.png",
      bgColor: "#E5FFE5",
      btnClass: "btn-success",
    },
    {
      title: "Fries Pack",
      description: "Crispy golden fries",
      buttonText: "Get It",
      image: "/images/fries.png",
      bgColor: "#FFFBEA",
      btnClass: "btn-warning",
    },
  ];

  const settings = {
    dots: false,
    infinite: foodData.length > 5,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.3,
        },
      },
    ],
  };

  return (
    <div className="offer-foods-wrapper py-3">
      <div className="row mb-3">
        {/* Title & Dropdown (Row 1) */}
        <div className="col-12 d-flex justify-content-between align-items-center mb-2">
          <h4 className="fw-bold m-0">Offer Foods</h4>
          <select className="form-select food-type-dropdown w-auto">
            <option>Food Type</option>
          </select>
        </div>

        {/* Tabs & See More/Nav (Row 2) */}
        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-2">
          {/* Tabs */}
          <div className="d-flex tab-buttons">
            <div className="border rounded">
              <button className="tab-btn active">Offer</button>
              <button className="tab-btn">Latest</button>
              <button className="tab-btn">Top</button>
            </div>
          </div>

          {/* See More + Nav Buttons */}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <a href="#" className="see-more-link">See More</a>
            <button className="nav-btn" onClick={() => sliderRef.current.slickPrev()}>{'<'}</button>
            <button className="nav-btn" onClick={() => sliderRef.current.slickNext()}>{'>'}</button>
          </div>
        </div>
      </div>

      {/* Slider */}
      <Slider {...settings} ref={sliderRef} className="custom-slider">
        {foodData.map((food, index) => (
          <div className="slider-item" key={index}>
            <FoodCard {...food} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default OfferFoodParent;
