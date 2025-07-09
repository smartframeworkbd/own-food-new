import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BaseURL } from "../../Helper/config";
import { useSelector } from "react-redux";

let dummyImg = "/Assets/Img/Logo.png"; // Assets/Img/Logo.png

let dummyImages = [
  "/Assets/Img/Recipe/imgHub_1_2.png",
  "/Assets/Img/Recipe/imgHub_1_3.png",
  "/Assets/Img/Recipe/imgHub_1_4.png",
];
const HomePageStyleOne = (data) => {
  const [style1LeftData, setStyleLeft2Data] = useState([]);
  const [style1RightData, setStyle1RightData] = useState([]);

  let style1_catId_1 = data?.data?.sectionCategories1[0]?.value;
  let style1_catId_2 = data?.data?.sectionCategories2[0]?.value;

  let style1_foodTypeCatId_1Data = data?.data?.sectionFoodTypeCategories1;
  let style1_foodTypeCatId_1;
  let style1_foodTypeCatId_2Data = data?.data?.sectionFoodTypeCategories2;
  let style1_foodTypeCatId_2;
  if (style1_foodTypeCatId_1Data && style1_foodTypeCatId_1Data.length > 0) {
    style1_foodTypeCatId_1 = style1_foodTypeCatId_1Data.map(
      (option) => option.value
    );
  }
  if (style1_foodTypeCatId_2Data && style1_foodTypeCatId_2Data.length > 0) {
    style1_foodTypeCatId_2 = style1_foodTypeCatId_2Data.map(
      (option) => option.value
    );
  }
  // debugger;
  const { coordinate, error } = useSelector((state) => state.location);
  useEffect(() => {
    if (
      coordinate &&
      coordinate?.lat !== null &&
      coordinate?.lon !== null &&
      style1_catId_1 !== undefined
    ) {
      // const { lat, lng } = coordinates;
      let postBody = {};
      let postBody1 = {};
      postBody["categoryID"] = [style1_catId_1];
      postBody["foodType"] = style1_foodTypeCatId_1;
      postBody1["categoryID"] = [style1_catId_2];
      postBody1["foodType"] = style1_foodTypeCatId_2;
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
  
  }, [coordinate, style1_catId_1, style1_catId_2]);

  let newStyle1LeftData = style1LeftData;
  // [0]?.data;
  let newStyle1RightData = style1RightData;
  // [0]?.data;

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

  // responsive images
  const getImageUrl = (item) => {
    // if (!item || !item.foodImage || item.foodImage.length === 0) {
    //   return dummyImages[Math.floor(Math.random() * 3)];
    // }

    // const image =
    //   windowWidth < 600
    //     ? item.foodImage[0].extraLarge.imageUrl
    //     : windowWidth < 1200
    //     ? item.foodImage[0].extraLarge.imageUrl
    //     : item.foodImage[0].large.imageUrl;
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
    <section className='Recipe_Gallery section py-2 '>
      <div className='top__gallery'>
        <Container>
          <Row className="g-3">
            <Col lg={6} className='leftSide'>
              <div className='leftSide_inner'>
                <div className='header_text'>
                  {/* <h2>{data.length > 0 ? data[0]?.sectionTitle1 : null}</h2> */}
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

                <Row>
                  {newStyle1LeftData?.length > 0 &&
                    newStyle1LeftData?.map((item, index) => {
                      if (index === 0) {
                        return (
                          <Col xs={12}>
                            <div className='topBar'>
                              <Link to={`/ProductsDetails/${item._id}`}>
                                <div className='imgFile'>
                                  <div>
                                    <img
                                      className=''
                                      loading="lazy"
                                      // style={{
                                      //   height: "340px",
                                      //   width: "670px",
                                      //   objectFit: "cover",
                                      // }}
                                      src={getImageUrl(item)}
                                      alt=''
                                    />
                                  </div>
                                  <div
                                    className='overlay__text'
                                    style={{
                                      height: "340px",
                                    }}
                                  >
                                    <div className='inner__body'>
                                      <div className='d-flex justify-content-center'>
                                        <div>
                                          <h3>
                                            {newStyle1LeftData === undefined
                                              ? null
                                              : item?.foodName}
                                          </h3>
                                          <p>
                                            {newStyle1LeftData === undefined
                                              ? null
                                              : item?.description}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </Link>
                            </div>
                          </Col>
                        );
                      }
                    })}
                  <Col xs={12}>
                    <div className='buttonBar row'>
                      {newStyle1LeftData?.length > 0 &&
                        newStyle1LeftData?.map((item, index) => {
                          if (index > 0 && index < 4) {
                            return (
                              <div
                                key={index}
                                className={
                                  index === 3
                                    ? `col-12 col-lg-4 col-sm-4 col-4 overflow-hidden `
                                    : `col-12 col-lg-4 col-sm-4 col-4 overflow-hidden `
                                }
                              >
                                <Link
                                  to={
                                    index === 3
                                      ? `/Category/${item.categoryID}`
                                      : `/ProductsDetails/${item._id}`
                                  }
                                >
                                  <div className='imgFile fastImg recp'>
                                    <div>
                                      <img
                                        className=''
                                        // style={{
                                        //   height: "143px",
                                        //   width: "210px",
                                        //   objectFit: "cover",
                                        // }}
                                        src={getImageUrl(item)}
                                        alt=''
                                      />
                                    </div>
                                    <div
                                      className={
                                        index === 3
                                          ? `overlay__text_more`
                                          : `overlay__text`
                                      }
                                    >
                                      <div className='inner__body'>
                                        <div>
                                          <h3 className='text-white'>
                                            {index === 3
                                              ? `MORE`
                                              : `${item?.foodName}`}
                                          </h3>
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            );
                          }
                        })}
                    </div>
                  </Col>
                </Row>
              </div>
            </Col>

            <Col lg={6} className='rightSide'>
              <div className='rightSide_inner'>
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
                <div className=''>
                  <Row className='g-2'>
                    {newStyle1RightData?.length > 0 &&
                      newStyle1RightData?.map((item, index) => {
                        if (index === 0) {
                          return (
                            <Col key={index} lg={8} sm={12}>
                              <div className='leftBar'>
                                <Link to={`/ProductsDetails/${item._id}`}>
                                  <div className='imgFile'>
                                    <div>
                                      <img
                                        className=''
                                        // style={{
                                        //   height: "491px",
                                        //   width: "460px",
                                        //   overflow: "hidden",
                                        //   objectFit: "cover",
                                        // }}
                                        src={getImageUrl(item)}
                                        alt=''
                                      />
                                    </div>
                                    <div className='overlay__text'>
                                      <div className='inner__body'>
                                        <div>
                                          <h3>
                                            {index === 3
                                              ? `MORE`
                                              : `${item?.foodName}`}
                                          </h3>
                                          {index !== 3 && (
                                            <p>
                                              {newStyle1LeftData === undefined
                                                ? dummyImg
                                                : item?.description}
                                            </p>
                                          )}
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </Link>
                              </div>
                            </Col>
                          );
                        }
                      })}
                    <Col lg={4} sm={12}>
                      <div className='rightBar '>
                        <Row>
                          <Col xs={12}>
                            {newStyle1RightData?.length > 0 &&
                              newStyle1RightData?.map((item, index) => {
                                if (index > 0 && index < 4) {
                                  return (
                                    <Link
                                      to={
                                        index === 3
                                          ? `/Category/${item.categoryID}`
                                          : `/ProductsDetails/${item._id}`
                                      }
                                    >
                                      <div
                                        className='imgFile firstImg'
                                        key={index}
                                      >
                                        <div>
                                          <img
                                            className='adIMG img_fluid'
                                            src={getImageUrl(item)}
                                            alt=''
                                          />
                                        </div>
                                        <div
                                          className={
                                            index === 3
                                              ? `overlay__text_more`
                                              : `overlay__text`
                                          }
                                        >
                                          <div className='inner__body'>
                                            <div>
                                              <h3>
                                                {index === 3
                                                  ? `MORE`
                                                  : `${item?.foodName}`}
                                              </h3>
                                              {/* {index !== 3 && (
                                              <p>
                                                {newStyle1RightData ===
                                                undefined
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
                          </Col>
                        </Row>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </div>
    </section>
  );
};

export default HomePageStyleOne;
