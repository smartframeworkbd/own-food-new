import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import { BaseURL } from "../../Helper/config";

const naImg = "/Assets/Img/na.png";

//dummyImages[Math.floor(Math.random() * 3)]
const Receipebook_layoutTwo = ({ data }) => {
  let postBody = [];
  data?.sectionCategories1?.map((x) => postBody.push(x.value));

  // const {sectionCategories1}=data
  const [recipeData, setRecipeData] = useState([]);
  useEffect(() => {
    if (postBody.length > 0) {
      axios
        .post(`${BaseURL}/get-recipe-by-category`, {
          id: postBody,
          displayLimit: data.displayLimit,
        })
        .then((res) => {
          if (res.data.status == "Success") {
            setRecipeData(res.data.data);
          }
          // setData(res.data.data);
        });
    }
  }, []);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    autoplaySpeed: 3000,
    slidesToShow: Math.ceil(recipeData.length / 2),
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
  return (
    <Container className="Receipebook_layoutTwo">
      <div class="title-area text-center pb-3">
        <span class="sub-title"></span>
        <h2 class="sec-title">
          <span className="sf_init_title"> Recipe </span>{" "}
          <span class=" sf_text-theme">Book</span>
        </h2>
      </div>
      <div className="top__gallery">
        {" "}
        {recipeData.length !== 0 ? (
          <>
            <Slider {...settings}>
              {recipeData?.map((item, index) => {
                if (index % 2 === 0) {
                  return (
                    <>
                      <div className="leftSide ">
                        <div className="rightSide_inner w-100 h-100">
                          <div className="d-flex justify-content-center w-100 h-100">
                            <div className="leftBar w-100 h-100">
                              <div className="imgFile img_animation w-100 h-100">
                                <img
                                  className="img-fluid center_image "
                                  src={
                             
                                      (() => {
                                        const imageUrl =    item?.recipeReadyFoodImage&&
                                        item?.recipeReadyFoodImage[0]?.extraLarge
                                          ?.imageUrl
                                        if (imageUrl) {
                                          // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                          const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                              '?width=265&height=420&quality=100';
                                          
                                          return newImageUrl;
                                        }
                                        
                                        return '';
                                      })() 
                                  }
                                  alt=""
                                />
                                {item?.sellerID &&
                                  item?.sellerID?.userProfilePhoto?.length > 0 ? (
                                  <div className="sellerOverflowImg">
                                    <img
                                      alt={item?.sellerID?.userFullName || "author photo"}
                                      title={item?.sellerID?.userFullName || "author photo"}
                                      src={

                                        (() => {
                                          const imageUrl =  item?.sellerID?.userProfilePhoto[0]
                                          ?.extraLarge?.imageUrl
                                          if (imageUrl) {
                                            // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                            const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                                '?width=100&height=100&quality=100';
                                            
                                            return newImageUrl;
                                          }
                                          
                                          return '';
                                        })()  
                                       
                                      }

                                    />
                                  </div>
                                ) : null}

                                <div className="titleOverFlow">
                                  <Link to={`/SingleRecipeFood/${item?._id}`}>
                                    <h2>{item?.recipeName}</h2>
                                  </Link>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                } else {
                  return (
                    <>
                      <div className="rightSide">
                        <div className="rightSide_inner w-100 h-100">
                          <div className="d-flex justify-content-center w-100 h-100">
                           
                            <div
                              className="rightBar  w-50"
                            // style={{ height: "400px" }}
                            >
                              {[...Array(4)].map((_, index) => (
                                <div
                                  className="imgFile"
                                  style={{ height: "100px" }}
                                  key={index}
                                >
                                 
                                  {
                                    <img
                                      className="img-fluid"
                                      
                                      src={

                                        (() => {
                                          const imageUrl =     
                                          item?.recipeSteps[index]?.Photo[0]?.extraLarge
                                            ?.imageUrl ||item?.recipeReadyFoodImage[0]?.extraLarge
                                                  ?.imageUrl

                                          if (imageUrl) {
                                            // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                            const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                                '?width=200&height=200&quality=100';
                                            
                                            return newImageUrl;
                                          }
                                          
                                          return '';
                                        })() 
                                        
                              
                                       }
                                      alt=""
                                    />
                                  }
                                </div>
                              ))}
                              {/* {item?.recipeSteps &&
                                item?.recipeSteps?.map((i, index) => {
                                  if (index <= 3) {
                                    return (
                                      <div
                                        className="imgFile"
                                        style={{ height: "100px" }}
                                      >
                                        <img
                                          className="img-fluid"
                                        //  src={i?.Photo[0]?.small?.imageUrl}
                                          alt=""
                                        />
                                      </div>
                                    );
                                  } else {
                                    return (
                                      <div className="imgFile  w-100 h-100">
                                        <img
                                          className="img-fluid"
                                       //   src={i?.Photo[0]?.small?.imageUrl}
                                          alt=""
                                        />

                                        <Link to={"/"} className="moreOverFlow">
                                          More Items
                                        </Link>
                                      </div>
                                    );
                                  }
                                })} */}
                            </div>
                            <div className="leftBar h-100">
                              <div className="big_imgFileTwo h-100">
                                <img
                                  className="img-fluid last_image"
                                  src={
                                    (() => {
                                      const imageUrl =     
                                      item?.recipeSteps[index]?.Photo[0]?.extraLarge
                                        ?.imageUrl ||item?.recipeReadyFoodImage[0]?.extraLarge
                                              ?.imageUrl

                                      if (imageUrl) {
                                        // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                        const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                            '?width=170&height=420&quality=100';
                                        
                                        return newImageUrl;
                                      }
                                      
                                      return '';
                                    })() 
                                    // item?.recipeReadyfoodImage&&  item?.recipeReadyfoodImage[0]?.extraLarge
                                    //   ?.imageUrl
                                  }
                                  alt=""
                                />
                                {item?.sellerID &&
                                  item?.sellerID?.userProfilePhoto?.length > 0 ? (
                                  <div className="sellerOverflowImg">
                                    <img
                                      alt={item?.sellerID?.userFullName || "author photo"}
                                      title={item?.sellerID?.userFullName || "author photo"}
                                      className="last_image"
                                      src={
                                        item?.sellerID?.userProfilePhoto[0]
                                          ?.small?.imageUrl
                                      }
                                    
                                    />
                                  </div>
                                ) : null}

                                <div className="titleOverFlow">
                                  <Link to={`/SingleRecipeFood/${item._id}`}>
                                    <h2>{item?.recipeName}</h2>
                                  </Link>{" "}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                }
              })}
            </Slider>
          </>
        ) : null}
      </div>
    </Container>
  );
};

export default Receipebook_layoutTwo;
