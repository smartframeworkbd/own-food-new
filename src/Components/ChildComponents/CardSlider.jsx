import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { getBannersAPI } from "../../API/BannersAPI";
import { useSelector } from "react-redux";

const CardSlider = () => {
  useEffect(() => {
    getBannersAPI().then((res) => {
      if (res === true) {
      }
    });
  }, []);

  let BannerList = useSelector((state) => state.banner.allBannerList);
  const PreviousBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <div className="carousel-arrow-left d-none d-lg-block ">
          <AiOutlineArrowLeft
            className="text-white text-bold p-1 mt-1"
            size={45}
          />
        </div>
      </div>
    );
  };
  const NextBtn = (props) => {
    const { className, onClick } = props;
    return (
      <div className={className} onClick={onClick}>
        <div className="carousel-arrow-right d-none d-lg-block">
          <AiOutlineArrowRight
            className="text-white text-bold p-1 mt-1"
            size={45}
          />
        </div>
      </div>
    );
  };

  const settings = {
    dots: false,
    infinite: true,

    slidesToShow: 3,
    slidesToScroll: 1,
    speed: 500,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    cssEase: "linear",
    pauseOnHover: true,
    responsive: [
      {
        breakpoint: 1025,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 850,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="CardSlider">
      <Container>
        <Row>
          <Col>
            <Slider
              {...settings}
              prevArrow={<PreviousBtn />}
              nextArrow={<NextBtn />}
            >
              {BannerList.length > 0 &&
                BannerList?.map((item, index) => (
                  <div className="cardSlider_body" key={index}>
                    <div
                      style={{ backgroundColor: item?.bannerBackgroundColor }}
                      className={" cardSlider_body_inner d-flex"}
                    >
                      <div className="textFile ">
                        <h4>
                          {item?.bannerTitle.split(" ").slice(0, 10).join(" ")}
                        </h4>
                        {/* <h5>Get 500 Tk voucher in first order</h5> */}
                        <Link to={`${item?.bannerButtonURL}`}>
                          {item?.bannerButtonLabel}
                        </Link>
                      </div>
                      <div className="imgFile ">
                        <img
                          className="img-fluid"
                          src={item?.bannerImage}
                          alt=""
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </Slider>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default CardSlider;
