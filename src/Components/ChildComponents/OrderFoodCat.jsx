import axios from "axios";
import React, { useEffect, useState } from "react";
import { Container} from "react-bootstrap";
import {  FaHeart, FaPlay, FaQuestion, FaStar } from "react-icons/fa";

import { Link, useNavigate } from "react-router-dom";
// import { FoodItem } from "../../Database/ImgData";
import { BaseURL } from "../../Helper/config";
import ShoppingPopUp from "../Common/ShoppingPopUp";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../../Redux/State-slice/CartSlice";
import { toast } from "react-hot-toast";
import Slider from "react-slick";
import currencyLabels from "../../translationData/currency.json";

const OrderFoodCat = (data) => {
  const [popupData, setPopupData] = useState({});
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const [style4LeftData, setStyle4LeftData] = useState([]);
  const [style4RightData, setStyle4RightData] = useState([]);

  // const Style4 = data?.data?.filter((item) => item.sectionStyle === "Style4");

  let style4_catId_1 = data?.data?.sectionCategories1[0]?.value;
  let style4_catId_2 = data?.data?.sectionCategories2[0]?.value;

  let style4_foodTypeCatId_1Data = data?.data?.sectionFoodTypeCategories1;
  let style4_foodTypeCatId_1;
  let style4_foodTypeCatId_2Data = data?.data?.sectionFoodTypeCategories2;
  let style4_foodTypeCatId_2;

  if (style4_foodTypeCatId_1Data && style4_foodTypeCatId_1Data.length > 0) {
    style4_foodTypeCatId_1 = style4_foodTypeCatId_1Data.map(
      (option) => option.value
    );
  }
  if (style4_foodTypeCatId_2Data && style4_foodTypeCatId_2Data.length > 0) {
    style4_foodTypeCatId_2 = style4_foodTypeCatId_2Data.map(
      (option) => option.value
    );
  }

  const { coordinate, error } = useSelector((state) => state.location);
  useEffect(() => {
    if (
      coordinate &&
      coordinate?.lat !== null &&
      coordinate?.lon !== null &&
      style4_catId_1 !== undefined &&
      style4_catId_2 !== undefined
    ) {
      let postBody = {};
      let postBody1 = {};
      postBody["categoryID"] = [style4_catId_1];
      postBody["foodType"] = style4_foodTypeCatId_1;
      postBody1["categoryID"] = [style4_catId_2];
      postBody1["foodType"] = style4_foodTypeCatId_2;

      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody
        )
        .then((res) => {
          setStyle4LeftData(res?.data?.data);
        });

      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody1
        )
        .then((res) => {
          setStyle4RightData(res?.data?.data);
        });
    }

  }, []);

  let newStyle1LeftData = style4LeftData;
  // [0]?.data;
  let newStyle1RightData = style4RightData;
  // [0]?.data;

  // debugger;
  const dispatch = useDispatch();
  const handleCart = (item) => {
    dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
    navigate(`/SellerProfile/${item?.sellerID}`);
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    // initialSlide: 0, // Always start at the first slide
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true, // Allows looping for better UX on medium screens
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1, // Scroll only one slide at a time for smaller screens
          // initialSlide: 0, // Always start at the first slide
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
          infinite: true
          // initialSlide: 1, // Start at the first slide
        },
      },
    ],
  };

  return (
    <section className="OrderFoodCat">
      <Container>
        <div className="row g-2">
          <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
            <div class="shadow__inner p-2">
              <header class="py-2 header_text">
                <div>
                  <span className="sf_text-theme">
                    {" "}
                    {data?.data?.sectionTitle1}
                    {/* {data?.data?.sectionTitle1
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}{" "} */}
                  </span>{" "}
                  <span class="sf_init_title">
                    {/* {" "}
                    // {data?.data?.sectionTitle1.split(" ").pop()} */}
                  </span>{" "}
                </div>
              </header>

              <div class="card-bod  show-hide-content">
                <div class="row g-2">
                  {newStyle1LeftData === undefined ? null : (
                    <>
                      <Slider {...settings}>
                        {newStyle1LeftData.length>0 && newStyle1LeftData?.slice(0, 4)?.map((item, index) => (
                          <div
                            className="col-3 col-xl-3 col-lg-3 col-md-3 col-sm-3 rounded "
                            key={index}
                          >
                            <div className="product-card">
                              <div className="product-media">
                                <div className="product-label">
                                  <label className="label-text rate">4.8</label>
                                </div>
                                <button className="product-wish wish">
                                  {/* <i className='fas fa-heart'></i> */}
                                  <ul className="card-action-buttons">
                                    <li>
                                      <a
                                        href="/"
                                        className="btn-floating  white"
                                        alt=""
                                      >
                                        <i className="material-icons grey-text text-darken-3">
                                          <FaQuestion
                                            data-toggle="tooltip"
                                            data-placement="left"
                                            title="Share"
                                          />
                                        </i>
                                      </a>
                                    </li>
                                    <li>
                                      <a className="btn-floating accent-2">
                                        <i className="material-icons like">
                                          <FaHeart
                                            data-toggle="tooltip"
                                            data-placement="left"
                                            title="Add to favorite"
                                          />
                                        </i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        id="buy"
                                        className="btn-floating  blue"
                                      >
                                        <i className="material-icons buy">
                                          <FaStar
                                            data-toggle="tooltip"
                                            data-placement="left"
                                            title="Review"
                                          />
                                        </i>
                                      </a>
                                    </li>
                                    <li>
                                      <a
                                        id="buy"
                                        className="btn-floating  blue"
                                      >
                                        <i className="material-icons buy">
                                          <FaPlay
                                            data-toggle="tooltip"
                                            data-placement="left"
                                            title="video"
                                          />
                                        </i>
                                      </a>
                                    </li>
                                  </ul>
                                </button>

                                <Link
                                  className="product-image img-fluid"
                                  to={`/ProductsDetails/${item?._id}`}
                                >
                                  <div className="img_animation">
                                    <img
                                    loading="lazy"
                                      src={
                                        
                                        // item?.foodImage[0]?.extraLarge?.imageUrl
                                        (() => {
                                          const imageUrl = item?.foodImage && item?.foodImage[0]?.extraLarge?.imageUrl
          
                                          if (imageUrl) {
                                            // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                            const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                                '?width=355&height=205&quality=100';
                                            
                                            return newImageUrl;
                                          }
                                          
                                          return '';
                                        })()     
                                      
                                      }
                                      alt="product"
                                    />
                                  </div>
                                </Link>
                                <div className="product-widget">
                                  <span
                                    title="Product View"
                                    className="fas fa-eye"
                                    data-bs-toggle="modal"
                                    data-bs-target="#product-view"
                                    onClick={() => {
                                      setShow(true);
                                      setPopupData(item);
                                    }}
                                  ></span>
                                </div>
                              </div>
                              <div className="product-content">
                                {/* <div className="product-rating">
                                  <span>
                                    {" "}
                                    <FaStar />
                                  </span>
                                  <span>
                                    {" "}
                                    <FaStar />
                                  </span>
                                  <span>
                                    {" "}
                                    <FaStar />
                                  </span>
                                  <span>
                                    {" "}
                                    <FaStar />
                                  </span>
                                  <span>
                                    {" "}
                                    <FaStar />
                                  </span>
                                  <a href="#">(3)</a>
                                </div> */}
                                <h6 className="product-name">
                                  <Link to={`/ProductsDetails/${item._id}`}>
                                    {item?.foodName}
                                  </Link>
                                </h6>
                                <h6 className="product-price">
                                  {item?.foodDiscountPrice && (
                                    <>
                                      {currencyLabels.country === "Bangladesh"
                                        ? currencyLabels.currency.bdt.symbol
                                        : currencyLabels.currency.usa.symbol}
                                      <del>/{item?.foodDiscountPrice}</del>
                                    </>
                                  )}

                                  <span>
                                    {currencyLabels.country === "Bangladesh"
                                      ? currencyLabels.currency.bdt.symbol
                                      : currencyLabels.currency.usa.symbol}
                                    {item?.foodPrice} <medium>/piece</medium>
                                  </span>
                                </h6>
                                <button
                                  className="product-add"
                                  title="Add to Cart"
                                  onClick={() => handleCart(item)}
                                >
                                  <i className="fas fa-shopping-basket"></i>
                                  <span>add</span>
                                </button>
                                <div className="product-action">
                                  <button
                                    className="action-minus"
                                    title="Quantity Minus"
                                  >
                                    <i className="icofont-minus"></i>
                                  </button>
                                  <input
                                    className="action-input"
                                    title="Quantity Number"
                                    type="text"
                                    name="quantity"
                                    value="1"
                                  />
                                  <button
                                    className="action-plus"
                                    title="Quantity Plus"
                                  >
                                    <i className="icofont-plus"></i>
                                  </button>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Slider>
                    </>
                  )}

                  <div className="col-md-12">
                    <Link
                      to={`/Category/${style4_catId_1}`}
                      className="see_more_1"
                      style={{ marginRight: 15 }}
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
            <div class="shadow__inner p-2">
              <header className="py-2">
                {" "}
                <div className="header_text">
                  <span className="sf_text-theme">
                    {" "}
                    {data?.data?.sectionTitle1}
                    {/* {data?.data?.sectionTitle1
                      .split(" ")
                      .slice(0, -1)
                      .join(" ")}{" "} */}
                  </span>{" "}
                  <span class="sf_init_title">
                    {" "}
                    {/* {data?.data?.sectionTitle2.split(" ").pop()} */}
                  </span>{" "}
                </div>
              </header>
              <span></span>
              <div class="card-body searchform show-hide-content">
                <div className="row g-1">
                  {newStyle1RightData === undefined ? (
                    <></>
                  ) : (
                    <>
                      {newStyle1RightData.length>0 && newStyle1RightData?.slice(0, 4).map((item, index) => (
                        <div className="col-6  " key={index}>
                          <div
                            className="sf_product-card shadow"
                            onClick={() => {
                              navigate(`/ProductsDetails/${item._id}`);
                            }}
                          >
                            <div className="sf_product-media w-100">
                              <div className="sf_product-label">
                                <label className="label-text rate">4.8</label>
                              </div>
                              <button className="sf_product-wish wish">
                                <i className="fas fa-heart"></i>
                              </button>
                              <a className="sf_product-image w-100" href="#">
                                <div className="img_animation">
                                  <img

                                  loading="lazy"
                                    src={
                                      
                                      // item?.foodImage[0]?.extraLarge?.imageUrl
                                      (() => {
                                        const imageUrl = item?.foodImage && item?.foodImage[0]?.extraLarge?.imageUrl
        
                                        if (imageUrl) {
                                          // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                          const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                              '?width=355&height=205&quality=100';
                                          
                                          return newImageUrl;
                                        }
                                        
                                        return '';
                                      })()     
                                    
                                    
                                    }
                                    alt="product"
                                  />
                                </div>
                              </a>
                              <div className="sf_product-widget">
                                <h6 style={{color:"white"}}>{item?.foodName}</h6>
                                <a
                                  title="Product View"
                                  // href='#'
                                  className="fas fa-eye"
                                  data-bs-toggle="modal"
                                  data-bs-target="#product-view"
                                  onClick={() => {
                                    setPopupData(item);
                                    setShow(true);
                                  }}
                                ></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </>
                  )}

                  <div className="col-12 mt-3">
                    <Link
                      to={`/Category/${style4_catId_2}`}
                      className="see_more_2"
                      style={{ marginRight: 15 }}
                    >
                      See more
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      {show === true ? (
        <ShoppingPopUp
          show={show}
          handleClose={handleClose}
          popupData={popupData}
        />
      ) : (
        ""
      )}
    </section>
  );
};

export default OrderFoodCat;
