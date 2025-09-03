import React, { useEffect, useState, useRef } from "react";
import Slider from "react-slick";
import "./KitchenParent.css";
import KitchenCard from "../KitchenCard/KitchenCard";
import ChefCard from "../ChefCard/ChefCard";
import axios from "axios";
import { BaseURL } from "../../Helper/config";

const KitchenParent = ({ data }) => {
  const sliderRef = useRef();
  const [foodData, setFoodData] = useState([]);

  useEffect(() => {
    const postBody = data?.sectionCategories1?.map((x) => x.value) || [];
    if (postBody?.length === 0) return;

    axios
      .post(`${BaseURL}/get-seller-with-food-details`, { _id: postBody })
      .then((res) => {
        setFoodData(res.data.data || []);
      })
      .catch((err) => console.error("Failed to fetch kitchen data:", err));
  }, [data]);

  const settings = {
    dots: false,
    infinite: foodData?.length > 4,
    slidesToShow: 4.5,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 2.5 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 2 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 1.5 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 1 },
      },
    ],
  };

  return (
    <div className="kitchen-card-parent py-3 px-3">
      <div className="d-flex justify-content-between align-items-center flex-wrap mb-3">
        <div className="d-flex align-items-center gap-3">
          <h4 className="fw-bold m-0">{data?.sectionTitle1}</h4>
        </div>
        <div className="d-flex align-items-center gap-2">
          <a href="#" className="see-more-link">See More</a>
          <button className="nav-btn" onClick={() => sliderRef.current.slickPrev()}>{'<'}</button>
          <button className="nav-btn" onClick={() => sliderRef.current.slickNext()}>{'>'}</button>
        </div>
      </div>

      <Slider {...settings} ref={sliderRef} className="custom-slider">
        {foodData.map((item, index) => (
          <div className="slider-item" key={index}>
            {data?.sectionCardColor === "Chef" ? (
              <ChefCard  data={item} />
            ) : (
              <KitchenCard item={item} />
            )}
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default KitchenParent;
