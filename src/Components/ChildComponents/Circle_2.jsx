import React, { useEffect, useState } from "react";
import ShoppingPopUp from "../Common/ShoppingPopUp";
import Slider from "react-slick";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Container } from "react-bootstrap";
import Tooltip from "rc-tooltip";
import "rc-tooltip/assets/bootstrap.css";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import CircleSingle from "../Elements/CircleSingle";
const Circle_2 = ({ data }) => {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);

  const [catId, setCatId] = useState([]);

  useEffect(() => {
    axios.get(BaseURL + "/get-circle-type-food").then((res) => {
      setCatId(res.data.data);
    });

    // axios.get(BaseURL + "/get-food-by-category/" + newID).then((res) => {
    //   // setCircleData(res.data.data);
    // });
  }, []);

  const color = [
    {
      bg: "#e11d48",
    },
    {
      bg: "#d946ef",
    },
    {
      bg: "#f97316",
    },
    {
      bg: "#78350f",
    },
    {
      bg: "#f59e0b",
    },
    {
      bg: "#bef264",
    },
  ];

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,

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
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  return (
    <section className=" Circle_2 shadow-lg pt-3">
      <Container className=" wrap_Upper">
        <div className="title-area text-center ">
          <span className="sf_sub-title "></span>
          <h2 className="sec-title">
            <span className="sf_init_title"> {data?.sectionTitle1}</span>{" "}
            {/* <span class=" sf_text-theme">{data?.sectionTitle1}</span> */}
          </h2>
        </div>

        <div className="pb-3 ">
          <div className="">
            <Slider {...settings}>
              {catId?.map((item, index) => {
                if (item?.circleCategoryID?.length !== 0) {
                  return (
                    <CircleSingle key={index} item={item} setShow={setShow} />
                  );
                }
                if (item?.circleSellerID?.length !== 0) {
                  return (
                    <CircleSingle key={index} item={item} setShow={setShow} />
                  );
                }
                if (item?.circleCountryID?.length !== 0) {
                  return (
                    <CircleSingle key={index} item={item} setShow={setShow} />
                  );
                }
                return <></>;
              })}
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default Circle_2;
