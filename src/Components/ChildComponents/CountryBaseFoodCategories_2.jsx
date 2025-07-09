import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Container } from "react-bootstrap";
const CountryBaseFoodCategories_2 = () => {
  const [flags, setFlags] = useState([]);
  useEffect(() => {
    fetch("https://restcountries.com/v3.1/all")
      .then((res) => res.json())
      .then((data) => setFlags(data));
  }, []);

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    // autoplay: true,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    autoplaySpeed: 3000,
    slidesToShow: 9,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
      {
        breakpoint: 500,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className='CountryBaseFoodCategories sf_section brand-part '>
      <Container>
        <div className='headerText '>
          <div>
            <h2>
              <span className='sf_init_title'>Food Base On</span>{" "}
              <span className='sf_text-theme'>Country</span>
            </h2>
          </div>
        </div>
        <div className='brand-slider slider-arrow slick-initialized slick-slider'>
          <div className='slick-list draggable '>
            <div
              className='slick-track'
              style={{
                opacity: 1,
                width: "100%",
                transform: `translate3d(${-1300}, ${0}, ${0}    )`,
              }}
            >
              <Slider {...settings}>
                {flags.map((item) => (
                  <Link to={"/CountryCategory"}>
                    <div
                      className='sf_brand-wrap slick-slide slick-cloned mt-3'
                      data-slick-index='-5'
                      aria-hidden='true'
                      tabIndex='-1'
                      style={{ width: 224 }}
                    >
                      <div className='sf_brand-media'>
                        <img
                          src={item.flags.png}
                          className='p-2 img-fluid'
                          alt='brand'
                        />
                        <div className='sf_brand-overlay'></div>
                      </div>
                      <div className='brand-meta'>
                        <h4>{item.name.common.slice(0, 7)}</h4>
                      </div>
                    </div>
                  </Link>
                ))}
              </Slider>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default CountryBaseFoodCategories_2;
