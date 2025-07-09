import React, { Component, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { AiFillHeart, AiOutlineShopping } from "react-icons/ai";
import { BsHeart } from "react-icons/bs";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import { FoodItem } from "../../Database/ImgData";
import { Container } from "react-bootstrap";
import { useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/State-slice/CartSlice";
import { toast } from "react-hot-toast";
import labels from "../../translationData/currency.json";
import FoodPresentationCard from "../Common/Cards/FoodPresentation/FoodPresentationCard";

const InstantFood = ({ title }) => {
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const [food, setFood] = useState([]);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const getFood = async () => {
    const data = await axios.get(`${BaseURL}/get-food`);
    setFood(data.data.data);
  };
  useEffect(() => {
    getFood();

  }, []);
  const settings = {
    infinite: true,
    speed: 500,

    autoplay: false,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
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
  const dispatch = useDispatch();

  const handleCart = (item) => {
    // dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
  };

  return (
    <Container
      className="InstantFood home-index-slider slider-arrow
      "
    >
      <div className="row  ">
        <div className="col">
          <div className="section-heading">
            <div className="headerText ">
              <div>
                <h2>
                  <span className="sf_init_title">{title}</span>
                  <span className="sf_text-theme"> Foods</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style={{ width: "99%" }}>
        <div className="row">
          <Slider className="row" {...settings}>
            {food.map((item, index) => (
              <FoodPresentationCard data={item} index={index} width={98} />

              // <div className="wrapper">
              //   <div className="product-card shadow">
              //     <div style={{ height: "200px" }} class="product-media">
              //       <div className="product-label">
              //         <label className="label-text new">new</label>
              //       </div>
              //       <button className="product-wish wish" tabindex="-1">
              //         <AiFillHeart />
              //       </button>
              //       <a className="product-image" tabindex="-1">
              //         <div className="img_animation">
              //           <img
              //             style={{
              //               objectFit: "cover",
              //               height: "200px",
              //               width: "220px",
              //             }}
              //             src={item?.foodImage[0]?.extraLarge?.imageUrl}
              //             className=""
              //             alt="product"
              //           />
              //         </div>
              //       </a>
              //       <div class="product-widget">
              //         <a
              //           title="Product View"
              //           href="#"
              //           className="fas fa-eye"
              //           data-bs-toggle="modal"
              //           data-bs-target="#product-view"
              //           tabindex="-1"
              //         ></a>
              //       </div>
              //     </div>
              //     <div className="product-content">
              //       <div className="product-rating">
              //         <span>
              //           {" "}
              //           <FaStar />
              //         </span>
              //         <span>
              //           {" "}
              //           <FaStar />
              //         </span>
              //         <span>
              //           {" "}
              //           <FaStar />
              //         </span>
              //         <span>
              //           {" "}
              //           <FaStar />
              //         </span>
              //         <span>
              //           {" "}
              //           <FaStar />
              //         </span>
              //         <a href="#" tabindex="-1">
              //           (3)
              //         </a>
              //       </div>
              //       <h6 className="product-name">
              //         <Link to={`/ProductsDetails/${item._id}`} tabindex="-1">
              //           Chaowmin
              //         </Link>
              //       </h6>
              //       <h6 className="product-price">
              //         <del>
              //           {labels.country === "Bangladesh"
              //             ? labels.currency.bdt.symbol
              //             : labels.currency.usa.symbol}
              //           {item.foodDiscountPrice}
              //         </del>
              //         <span>
              //           {labels.country === "Bangladesh"
              //             ? labels.currency.bdt.symbol
              //             : labels.currency.usa.symbol}
              //           {item.foodPrice} <small>/piece</small>
              //         </span>
              //       </h6>
              //       <button
              //         onClick={() => handleCart(item)}
              //         class="product-add"
              //         title="Add to Cart"
              //         tabindex="-1"
              //       >
              //         <AiOutlineShopping />
              //         <span>add</span>
              //       </button>
              //       <div class="product-action">
              //         <button
              //           className="button"
              //           title="Quantity Minus"
              //           tabindex="-1"
              //         >
              //           <i className="icofont-minus"></i>
              //         </button>
              //       </div>
              //     </div>
              //   </div>
              // </div>
            ))}
          </Slider>
        </div>
      </div>

      <div className="row">
        <div className="col">
          <div className="d-flex justify-content-center">
            <Link to={"/Category"}>
              <div className="custom__btn">
                <button>Show More</button>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default InstantFood;
