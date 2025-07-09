import React, { Component, useEffect, useState } from "react";
import Slider from "react-slick";

import { Link } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Container } from "react-bootstrap";
import { GetAllCategoryAPI } from "../../API/CategoryAPI";
import { useSelector } from "react-redux";

const CountryBaseFoodCategories = () => {
  useEffect(() => {
    GetAllCategoryAPI();
  }, []);

  let AllCategoryList = useSelector((state) => state.category.allCategoryList);

  const settings = {
    dots: false,
    arrow:true,
    infinite: true,
    speed: 500,
    autoplay: true,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    autoplaySpeed: 3000,
    slidesToShow: 8,
    // AllCategoryList?.length >= 18
    //   ? Math.ceil(AllCategoryList?.length / 2)
    //   : AllCategoryList?.length > 10 && AllCategoryList?.length < 18
    //   ? Math.ceil(AllCategoryList?.length / 1.5)
    //   : AllCategoryList?.length,
    slidesToScroll: 1,

    responsive: [
      {
        breakpoint: 1030,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <section className="ClientTop sf_section brand-part">
      <Container>
        <div className="brand-slider slider-arrow slick-initialized slick-slider">
          <div className="slick-list draggable ">
            <div
              className="slick-track"
              style={{
                opacity: 1,
                width: "100%",
                transform: `translate3d(${-1300}, ${0}, ${0}    )`,
              }}
            >
              <Slider {...settings}>
                {AllCategoryList.map((item, index) => (
                  <div className="d-flex justify-content-center" key={index}>
                    <Link to={`/Category/${item?._id}`} className="d-inline">
                      <div
                        className="sf_brand-wrap slick-slide slick-cloned custCountryslider"
                        data-slick-index="-5"
                        aria-hidden="true"
                        tabIndex="-1"
                        style={{ width: 224 }}
                      >
                        <div className="sf_brand-media">
                          <img src={item?.categoryImage} alt="brand" />
                        </div>
                        <div className="brand-meta">
                          <h4>{item?.categoryName}</h4>
                        </div>
                      </div>
                    </Link>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CountryBaseFoodCategories;
