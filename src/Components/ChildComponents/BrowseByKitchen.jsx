import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import { Link, useNavigate } from "react-router-dom";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
const BrowseByKitchen = ({ data }) => {
  const [foodData, setFoodData] = useState([]);

  let y = [];
  data?.sectionCategories1?.map((x) => y.push(x.value));
  let postBody = y;
  useEffect(() => {
    axios
      .post(BaseURL + "/get-seller-with-food-details", { _id: postBody })
      .then((res) => {
        setFoodData(res.data.data);
      });
  }, []);

 
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    autoplaySpeed: 3000,
    slidesToShow:
      foodData.length > 20 ? 10 : Math.ceil(foodData.length / 2) || 4,
    slidesToScroll: 2,
    responsive: [
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 6,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 5,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 3,
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
  return (
    <section className="BrowseByKitchen section  bg-img shadow-lg">
      <Container className="  bg-transparent_color">
        <div className="row ">
          <div className="col-12">
            <div className="section-heading">
              <div class="title-area text-center">
                <span class="sub-title"></span>
                <h2 class="sec-title">
                  <span className="sf_init_title">
                    {" "}
                    {data.sectionTitle1.split(" ").slice(0, -1).join(" ")}{" "}
                  </span>{" "}
                  <span class=" sf_text-theme">
                    {" "}
                    {data.sectionTitle1.split(" ").pop()}
                  </span>
                </h2>
              </div>
            </div>
          </div>
        </div>
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
                {foodData?.map((item, index) => (
                  <Link to={`/SellerProfile/${item?._id}`} key={index}>
                    <div
                      className="brand-wrap slick-slide slick-cloned mt-3 mb-5"
                      data-slick-index="-5"
                      aria-hidden="true"
                      tabIndex="-1"
                    >
                      <div className="brand-media">
                        <img
                          src={
                            item.sellerProfilePhoto.length > 0?
                            (() => {
                              const imageUrl = item?.sellerProfilePhoto[0]?.extraLarge?.imageUrl

                              if (imageUrl) {
                                // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                    '?width=80&height=80&quality=100';
                                
                                return newImageUrl;
                              }
                              
                              return '';
                            })()       
                              // ? item?.sellerProfilePhoto[0]?.medium?.imageUrl
                              : "/Assets/Img/user.png"
                          }
                          alt="brand"
                        />
                        <div className="brand-overlay"></div>
                      </div>
                      <div className="brand-meta">
                        <h4 className="sf_title_color_brand">
                          {item?.kitchenName?.length > 10
                            ? `${item.kitchenName.slice(0, 10)}...`
                            : item?.kitchenName}
                        </h4>

                        <p className="text-dark">
                          Total Foods:{" "}
                          {item?.foodData?.length > 0
                            ? item?.foodData?.[0]?.count
                            : 0}
                        </p>
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

export default BrowseByKitchen;
