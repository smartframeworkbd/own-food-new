import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BaseURL } from "../../Helper/config";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
let dummyImg = "/Assets/Img/Logo.png";
let dummyImages = [
  "Assets/Img/Recipe/imgHub_1_2.png",
  "Assets/Img/Recipe/imgHub_1_3.png",
  "Assets/Img/Recipe/imgHub_1_3.png",
];
const HomePageStyleTwo = (data) => {
  const [style1LeftData, setStyleLeft2Data] = useState([]);
  const [style1RightData, setStyle1RightData] = useState([]);
  // const Style2 = data?.data?.filter((item) => item.sectionStyle === "Style2");

  let style2_catId_1 = data?.data?.sectionCategories1[0]?.value;

  let style2_catId_2 = data?.data?.sectionCategories2[0]?.value;

  let style2_foodTypeCatId_1Data = data?.data?.sectionFoodTypeCategories1;
  let style2_foodTypeCatId_1;
  let style2_foodTypeCatId_2Data = data?.data?.sectionFoodTypeCategories2;
  let style2_foodTypeCatId_2;
  if (style2_foodTypeCatId_1Data && style2_foodTypeCatId_1Data.length > 0) {
    style2_foodTypeCatId_1 = style2_foodTypeCatId_1Data.map(
      (option) => option.value
    );
  }
  if (style2_foodTypeCatId_2Data && style2_foodTypeCatId_2Data.length > 0) {
    style2_foodTypeCatId_2 = style2_foodTypeCatId_2Data.map(
      (option) => option.value
    );
  }

  const { coordinate, error } = useSelector((state) => state.location);

  useEffect(() => {
    if (
      coordinate &&
      coordinate?.lat !== null &&
      coordinate?.lon !== null &&
      style2_catId_1 !== undefined &&
      style2_catId_2 !== undefined
    ) {
      let postBody = {};
      let postBody1 = {};
      postBody["categoryID"] = [style2_catId_1];
      postBody["foodType"] = style2_foodTypeCatId_1;
      postBody1["categoryID"] = [style2_catId_2];
      postBody1["foodType"] = style2_foodTypeCatId_2;
      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody
        )
        .then((res) => {
          setStyleLeft2Data(res.data.data);
        });

      axios
        .post(
          BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
          postBody1
        )
        .then((res) => {
          setStyle1RightData(res.data.data);
        });
    }
   
  }, []);

  let newStyle2LeftData = style1LeftData;
  // [0]?.data;
  let newStyle1RightData = style1RightData;
  // [0]?.data;

  // debugger;

  // responsive images
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    // Update window width when the window is resized
    const handleResize = () => setWindowWidth(window.innerWidth);
    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const getImageUrl = (item) => {
    if (!item || !item.foodImage || item.foodImage.length === 0) {
      return dummyImages[Math.floor(Math.random() * 3)];
    }
    const imageUrl = item?.foodImage && item.foodImage[0].extraLarge.imageUrl
    if (imageUrl) {
      // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
      const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                          '?width=650&height=450&quality=100';
      
      return newImageUrl;  
      
    }
    return ''
  };
  // responsive images
  return (
    <section className='Recipe_Gallery section pt-2 pb-5'>
      <Container>
        <div className='bottom__gallery'>
          <Row className="g-3">
            <Col lg={6} className='leftSide'>
              <div className='leftSide__inner'>
                <div className='header_text'>
                  {/* <h2>{"item?.sectionTitle1"}</h2> */}
                  <div>
                    <span className='sf_text-theme'>
                      {" "}
                      {data?.data?.sectionTitle1}
                      {/* {data?.data?.sectionTitle1
                        .split(" ")
                        .slice(0, -1)
                        .join(" ")}{" "} */}
                    </span>{" "}
                    <span class='sf_init_title'>
                      {" "}
                      {/* {data?.data?.sectionTitle1.split(" ").pop()} */}
                    </span>{" "}
                  </div>
                </div>
                <div className='d-flex flex-column flex-md-row gap-1 g-sm-0 g-1 '>
                  <div className='leftBar  pe-lg-2 pe-xl-2 pe-xxl-2 row g-1 '>
                    {newStyle2LeftData.length > 0 &&
                      newStyle2LeftData?.map((item, index) => {
                        if (index < 2) {
                          return (
                            <Link
                              to={`/ProductsDetails/${item._id}`}
                              className='col-12 col-lg-12 col-md-12 col-xl-12 col-xxl-12 col-sm-6'
                            >
                              <div className='imgFile  secondImg'>
                                <div>
                                  <img
                                    className=''
                                    style={{
                                      height: "290",
                                      objectFit: "cover",
                                    }}
                                    src={getImageUrl(item)}
                                    alt=''
                                  />
                                </div>
                                <div className='overlay__text'>
                                  <div className='inner__body'>
                                    <div className='d-flex align-items-center justify-content-center'>
                                      <h3>
                                        {newStyle2LeftData === undefined
                                          ? undefined
                                          : item?.foodName}
                                      </h3>
                                      {/* <p>
                                        {newStyle2LeftData === undefined
                                          ? undefined
                                          : item?.description}
                                      </p> */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        }
                      })}
                  </div>
                  <div className='rightBar row g-sm-1 g-1 mt-lg-0 mt-xl-0 mt-xxl-0 mt-1 mt-md-0 mt-1'>
                    {newStyle2LeftData?.length > 0 &&
                      newStyle2LeftData?.map((item, index) => {
                        if (index > 1 && index <= 4) {
                          return (
                            <Link
                              className='col-12 col-md-12 col-lg-12'
                              to={
                                index === 4
                                  ? `/Category/${item.categoryID}`
                                  : `/ProductsDetails/${item._id}`
                              }
                            >
                              <div className='imgFile firstImg'>
                              
                                <img
                                  style={{
                                    height: "193",
                                    objectFit: "cover",
                                  }}
                                  // src="/Assets/Img/Logo.png"
                                  src={getImageUrl(item)}
                                  alt=''
                                />
                                {/* </div> */}
                                <div
                                  className={
                                    index === 4
                                      ? `overlay__text_more`
                                      : `overlay__text`
                                  }
                                >
                                  <div className='inner__body'>
                                    <div>
                                      <h3>
                                        {index === 4
                                          ? `MORE`
                                          : `${item?.foodName}`}
                                      </h3>
                                      {/* {index !== 4 && (
                                        <p>
                                          {newStyle2LeftData === undefined
                                            ? null
                                            : item?.description}
                                        </p>
                                      )} */}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Link>
                          );
                        }
                      })}
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={6} className='rightSide'>
              <div className='rightSide__inner'>
                <div className='header_text'>
                  <div>
                    <span className='sf_text-theme'>
                      {" "}
                      {data?.data?.sectionTitle2}
                      {/* {data?.data?.sectionTitle2
                        .split(" ")
                        .slice(0, -1)
                        .join(" ")}{" "} */}
                    </span>{" "}
                    <span class='sf_init_title'>
                      {" "}
                      {/* {data?.data?.sectionTitle2.split(" ").pop()} */}
                    </span>{" "}
                  </div>
                </div>
                <div className='topBar'>
                  {newStyle1RightData?.length > 0 &&
                    newStyle1RightData?.map((item, index) => {
                      if (index < 1) {
                        return (
                          <Link to={`/ProductsDetails/${item._id}`}>
                            <div className='imgFile firstImg'>
                              <div>
                                <img
                                  className=' '
                                  style={{
                                    // height: "450px",
                                    overflow: "hidden",
                                    objectFit: "cover",
                                  }}
                                  src={getImageUrl(item)}
                                  alt=''
                                />
                              </div>

                              <div className='overlay__text'>
                                <div className='inner__body'>
                                  <div className='d-flex align-items-center '>
                                    <h3>
                                      {newStyle2LeftData === undefined
                                        ? undefined
                                        : item?.foodName}
                                    </h3>
                                    {/* <p>
                                      {newStyle2LeftData === undefined
                                        ? undefined
                                        : item?.description}
                                    </p> */}
                                  </div>
                                </div>
                              </div>
                            </div>
                          </Link>
                        );
                      }
                    })}
                </div>
                <div className='bottomBar gap-3'>
                  {newStyle1RightData?.length > 0 &&
                    newStyle1RightData?.map((item, index) => {
                      if (index > 1 && index <= 4) {
                        return (
                          <Link
                            to={
                              index === 4
                                ? `/Category/${item.categoryID}`
                                : `/ProductsDetails/${item._id}`
                            }
                          >
                            {" "}
                            <div className='imgFile thirdImg'>

                              {

                              }
                              <div>
                                <img
                                  style={{
                                    // height: "120px",
                                    // width: "210px",
                                    objectFit: "cover",
                                  }}
                                  loading="lazy"
                                  src={
                                    getImageUrl(item)
                                    // newStyle1RightData[4] &&
                                    // newStyle1RightData[4]?.foodImage[0].extraLarge
                                    //   ?.imageUrl === undefined
                                    //   ? dummyImages[
                                    //       Math.floor(Math.random() * 3)
                                    //     ]
                                    //   : newStyle1RightData[4]?.foodImage[0]
                                    //       .extraLarge?.imageUrl
                                  }
                                  alt=''
                                />
                              </div>
                              <div
                                className={
                                  index === 4
                                    ? `overlay__text_more`
                                    : `overlay__text`
                                }
                              >
                                <div className='inner__body'>
                                  <div>
                                    <h3>
                                      {index === 4
                                        ? `MORE`
                                        : `${item?.foodName}`}
                                    </h3>
                                    {index !== 4 && (
                                      <p>
                                        {newStyle2LeftData === undefined
                                          ? undefined
                                          : item?.description}
                                      </p>
                                    )}
                                  </div>
                                </div>
                              </div>
                            </div>{" "}
                          </Link>
                        );
                      }
                    })}
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>
    </section>
  );
};

export default HomePageStyleTwo;
