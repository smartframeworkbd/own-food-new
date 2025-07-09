import React, { useEffect, useState } from "react";

import { Link, useNavigate } from "react-router-dom";
import { Two_one, Uber_image, Four_two } from "../../Database/ImgData";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";
import { FaArrowLeft, FaArrowRight, FaStar } from "react-icons/fa";
import Slider from "react-slick";
import { Container } from "react-bootstrap";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import { useSelector } from "react-redux";
const FoodCatGallery = (data) => {
  const navigate = useNavigate();

  const [style5_one_Data, setStyle5_one_Data] = useState([]);
  const [style5_two_Data, setStyle5_two_Data] = useState([]);
  const [style5_three_Data, setStyle5_three_Data] = useState([]);
  const [style5_four_Data, setStyle5_four_Data] = useState([]);

  // const Style5 = data?.data?.filter((item) => item.sectionStyle === "Style5");

  let style5_catId_1 = data?.data?.sectionCategories1[0]?.value;
  let style5_catId_2 = data?.data?.sectionCategories2[0]?.value;
  let style5_catId_3 = data?.data?.sectionCategories3[0]?.value;
  let style5_catId_4 = data?.data?.sectionCategories4[0]?.value;

  let style5_foodTypeCatId_1Data = data?.data?.sectionFoodTypeCategories1;
  let style5_foodTypeCatId_2Data = data?.data?.sectionFoodTypeCategories2;
  let style5_foodTypeCatId_3Data = data?.data?.sectionFoodTypeCategories3;
  let style5_foodTypeCatId_4Data = data?.data?.sectionFoodTypeCategories4;
  let style5_foodType1;
  let style5_foodType2;
  let style5_foodType3;
  let style5_foodType4;
  if (style5_foodTypeCatId_1Data && style5_foodTypeCatId_1Data.length > 0) {
    style5_foodType1 = style5_foodTypeCatId_1Data.map((option) => option.value);
  }
  if (style5_foodTypeCatId_2Data && style5_foodTypeCatId_2Data.length > 0) {
    style5_foodType2 = style5_foodTypeCatId_2Data.map((option) => option.value);
  }
  if (style5_foodTypeCatId_3Data && style5_foodTypeCatId_3Data.length > 0) {
    style5_foodType3 = style5_foodTypeCatId_3Data.map((option) => option.value);
  }
  if (style5_foodTypeCatId_4Data && style5_foodTypeCatId_4Data.length > 0) {
    style5_foodType4 = style5_foodTypeCatId_4Data.map((option) => option.value);
  }

  const { coordinate, error } = useSelector((state) => state.location);
  useEffect(() => {
    // For Style1 section Left Data
    if (
      coordinate &&
      coordinate?.lat !== undefined &&
      coordinate?.lon !== undefined &&
      style5_catId_1 !== undefined
    ) {
      // const { lat, lng } = coordinates;
      let postBody = {};
      let postBody1 = {};
      let postBody2 = {};
      let postBody3 = {};
      // let postBody4 = {};
      postBody["categoryID"] = [style5_catId_1];
      postBody1["categoryID"] = [style5_catId_2];
      postBody2["categoryID"] = [style5_catId_3];
      postBody3["categoryID"] = [style5_catId_4];
      postBody["foodType"] = style5_foodType1;
      postBody1["foodType"] = style5_foodType2;
      postBody2["foodType"] = style5_foodType3;
      postBody3["foodType"] = style5_foodType4;
      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody
        )
        .then((res) => {
          setStyle5_one_Data(res.data.data);
        });

      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody1
        )
        .then((res) => {
          setStyle5_two_Data(res.data.data);
        });
      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody2
        )
        .then((res) => {
          setStyle5_three_Data(res.data.data);
        });
      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody3
        )
        .then((res) => {
          setStyle5_four_Data(res.data.data);
        });
    }
  }, [style5_catId_1, style5_catId_2, style5_catId_3, style5_catId_4]);

  let newStyle5_one_Data = style5_one_Data;
  // [0]?.data;
  let newStyle5_two_Data = style5_two_Data;
  // [0]?.data;
  let newStyle5_three_Data = style5_three_Data;
  // [0]?.data;
  let newStyle5_four_Data = style5_four_Data;
  // [0]?.data;
  // debugger;
  const settings = {
    infinite: true,
    speed: 500,

    autoplay: false,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    slidesToScroll: 1,
  };

  return (
    <Container className=' FoodCatGallery section'>
      <div className='container-fluid'>
        <div className='row g-3'>
          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            <div className='card'>
              <div className='card-header sf_top_card'>
                <h3 className='mt-1 sf_top_name'>
                  {" "}
                  {data?.data?.sectionTitle1}
                </h3>
              </div>
              <div className='row mt-1 g-2  card_product'>
                {newStyle5_one_Data === undefined &&
                newStyle5_one_Data?.length !== 0 ? null : (
                  <>
                    {newStyle5_one_Data?.length>0 &&  newStyle5_one_Data?.slice(0, 4)?.map((item, index) => {
                      return (
                        <div
                          className='col-md-6 card_navigate '
                          onClick={() => {
                            navigate(`/ProductsDetails/${item._id}`);
                          }}
                          key={index}
                        >
                          <div className='img_animation'>
                            <img
                              alt={`foodImage - ${item?.foodName}`}
                              src={item?.foodImage[0].extraLarge.imageUrl}
                              className='img-fluid '
                            />
                          </div>
                          <p
                            className='text-center'
                            style={{ fontWeight: "bold" }}
                          >
                            {item?.foodName}
                          </p>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <div className='col-md-12'>
                <Link
                  to={`/Category/${style5_catId_1}`}
                  className='see_more'
                  style={{ marginRight: 15 }}
                >
                  See more
                </Link>
              </div>
            </div>
          </div>

          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            <div className='card'>
              <div className='card-header sf_top_card'>
                <h3 className='mt-1 sf_top_name'>
                  {data?.data?.sectionTitle2}
                </h3>
              </div>
              <div className='row mt-1  g-2 card_product'>
                {newStyle5_two_Data === undefined &&
                newStyle5_two_Data?.length !== 0 ? null : (
                  <>
                    {newStyle5_two_Data?.length>0&&newStyle5_two_Data?.slice(0, 4)?.map((item, index) => {
                      return (
                        <div
                          className='col-md-6  card_navigate'
                          onClick={() => {
                            navigate(`/ProductsDetails/${item._id}`);
                          }}
                          key={index}
                        >
                          <div className='img_animation'>
                            <img
                              src={item?.foodImage[0].extraLarge.imageUrl}
                              className='img-fluid '
                              alt=''
                            />
                          </div>
                          <p
                            className='text-center'
                            style={{ fontWeight: "bold" }}
                          >
                            {" "}
                            {item?.foodName}
                          </p>
                        </div>
                      );
                    })}
                  </>
                )}
              </div>

              <div className='col-md-12'>
                <Link
                  to={`/Category/${style5_catId_2}`}
                  className='see_more'
                  style={{ marginRight: 15 }}
                >
                  See more
                </Link>
              </div>
            </div>
          </div>
          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            {style5_three_Data.length === 0 ? (
              ""
            ) : (
              <>
                <Slider {...settings}>
                  {newStyle5_three_Data?.length > 0 &&
                    newStyle5_three_Data?.map((item, index) => (
                      <div className='card single__inner__left' key={index}>
                        <div className='card-header sf_top_card'>
                          <h3 className='mt-1 sf_top_name'>
                            {" "}
                            {data?.data?.sectionTitle3}
                          </h3>
                        </div>
                        <div className='row mt-1 single_product_card'>
                          <div
                            className='single_product_card_navigation'
                            onClick={() => {
                              navigate(`/ProductsDetails/${item._id}`);
                            }}
                          >
                            <div className='img_animation leftSide'>
                              <img
                                src={item?.foodImage[0].extraLarge?.imageUrl}
                                className='img-fluid'
                                alt=''
                              />
                            </div>
                            <p className='mt-3' style={{ fontWeight: "bold" }}>
                              {item?.sellerName}
                            </p>
                          </div>
                          <div className='profileImg'>
                            {item?.sellerData &&
                            item?.sellerData[0]?.length > 0 ? (
                              <img
                                src={
                                  (() => {
                                    const imageUrl =item?.sellerData[0]?.extraLarge?.imageUrl
      
                                    if (imageUrl) {
                                      // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                      const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                          '?width=80&height=80&quality=100';
                                      
                                      return newImageUrl;
                                    }
                                    
                                    return '';
                                  })()
                                
                                }
                                alt=''
                              />
                            ) : (
                              <img src='/Assets/Img/user.png' alt='' />
                            )}
                          </div>
                        </div>
                        <div className='col-md-12'>
                          <Link
                            to={`/Category/${style5_catId_3}`}
                            className='see_more'
                            style={{ marginRight: 15 }}
                          >
                            See more
                          </Link>
                        </div>
                      </div>
                    ))}
                </Slider>
              </>
            )}
          </div>

          <div className='col-xl-3 col-lg-6 col-md-6 col-sm-6'>
            <div className='card '>
              <div className='card-header sf_top_card'>
                <h3 className='mt-1 sf_top_name'>
                  {" "}
                  {data?.data?.sectionTitle4}
                </h3>
              </div>
              <div className='row mt-1 single_product_card'>
                <div
                  className='single_product_card_navigation'
                  onClick={() => {
                    navigate(`/ProductsDetails/${newStyle5_four_Data[0]?._id}`);
                  }}
                >
                  <div className='img_animation rightSide'>
                    <img
                      src={
                        newStyle5_four_Data === undefined
                          ? null
                          : newStyle5_four_Data[0]?.foodImage[0].extraLarge.imageUrl
                      }
                      className='img-fluid'
                      alt=''
                    />
                  </div>

                  <p className='mt-3' style={{ fontWeight: "bold" }}>
                    {newStyle5_four_Data === undefined
                      ? null
                      : newStyle5_four_Data[0]?.foodName}
                  </p>
                  <Link
                    to={`/Category/${style5_catId_4}`}
                    className='see_more'
                    style={{ marginRight: 15 }}
                  >
                    See more
                  </Link>
                </div>
              </div>
              {/* <div className='col-md-12'>
                <Link
                 to={`/Category/${style5_catId_4}`}
                  className='see_more'
                  style={{ marginRight: 15 }}
                >
                  See more
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};

export default FoodCatGallery;
