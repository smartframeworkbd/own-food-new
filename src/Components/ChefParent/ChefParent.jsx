import React from "react";
import Slider from "react-slick";
import "./ChefParent.css";
import KitchenCard from "../KitchenCard/KitchenCard";
import ChefCard from "../ChefCard/ChefCard";
// import RecipeCard from "../RecipeCard/RecipeCard";

const ChefParent = () => {
  const sliderRef = React.useRef();

  const foodData = [
    {
      title: "Hot Pizza",
      description: "Tasty and crispy pizza",
      buttonText: "Order Now",
      image: "/images/pizza.png",
      bgColor: "#FFF4E3",
      btnClass: "btn-warning"
    },
    {
      title: "Burger Combo",
      description: "Delicious and juicy burger",
      buttonText: "Get Deal",
      image: "/images/burger.png",
      bgColor: "#E3F7FF",
      btnClass: "btn-info"
    },
    {
      title: "Cheese Burst",
      description: "Extra cheesy delight",
      buttonText: "Try Now",
      image: "/images/cheese.png",
      bgColor: "#FDEDED",
      btnClass: "btn-danger"
    },
    {
      title: "Veg Delight",
      description: "Healthy and tasty",
      buttonText: "Order Now",
      image: "/images/veg.png",
      bgColor: "#E5FFE5",
      btnClass: "btn-success"
    },
    {
      title: "Fries Pack",
      description: "Crispy golden fries",
      buttonText: "Get It",
      image: "/images/fries.png",
      bgColor: "#FFFBEA",
      btnClass: "btn-warning"
    }
  ];

  const settings = {
    dots: false,
    infinite: foodData.length > 4,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2.5,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1.5,
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
    <div className="recipe-slider-wrapper py-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div className="d-flex align-items-center gap-3">
          <h4 className="fw-bold m-0">kitchen</h4>
          {/* <select className="form-select food-type-dropdown">
            <option>Food Type</option>
          </select> */}
        </div>
        <div className="d-flex align-items-center gap-2">
          <a href="#" className="see-more-link">See More</a>
          <button className="nav-btn" onClick={() => sliderRef.current.slickPrev()}>{'<'}</button>
          <button className="nav-btn" onClick={() => sliderRef.current.slickNext()}>{'>'}</button>
        </div>
      </div>
{/* 
      <div className="d-flex tab-buttons mb-3">
        <div className="border rounded">
          <button className="tab-btn active">Offer</button>
          <button className="tab-btn">Latest</button>
          <button className="tab-btn">Top</button>
        </div>
      </div> */}

      <Slider {...settings} ref={sliderRef} className="custom-slider">
        {foodData.map((food, index) => (
          <div className="slider-item" key={index}>
            <ChefCard {...food} />
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default ChefParent;
