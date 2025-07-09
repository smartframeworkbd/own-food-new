import React, { useEffect, useState } from "react";
import { Tab, TabList, TabPanel, Tabs } from "react-tabs";
import ReactPlayer from "react-player";
import axios from "axios";
import { BaseURL } from "../Helper/config";
import { Link, Outlet, useParams } from "react-router-dom";
import { GetSellerAPI } from "../API/SellerAPI";
import { useSelector } from "react-redux";
import { Accordion, Button, Col, Container, Row } from "react-bootstrap";
import KitchenSlider from "./KitchenSlider";
import SellerProfileSkeleton from "../skelton/SellerProfileSkeleton";
import { FaExclamationTriangle } from "react-icons/fa";

const UpdateSellerProfile = () => {
  let profilePhoto;
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);
  const [recipeData, setRecipeData] = useState({});
  const [foodData, setFoodData] = useState([]);

  const [isSticky, setIsSticky] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);
  const [allKitchenPhoto, setAllKitchenPhoto] = useState([])

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup function to remove event listener
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);


  const getFood = async () => {
    try {
      const response1 = await axios.get(
        `${BaseURL}/get-food-by-seller/${id}/3`
      );
      if (response1.data.status === "Success") {
        profilePhoto =
          (sellerData?.sellerProfilePhoto &&
            sellerData?.sellerProfilePhoto[0]?.extraLarge?.imageUrl) ||
          "";

        setFoodData(response1?.data?.data[0]?.foodData);
      }
    } catch (error) {
      console.error(error);
    }
  };


  /// new 
  // useEffect(() => {
  //   setIsLoading(true);
  //   GetSellerAPI(id);

  // }, [id]);
  // useEffect(() => {
  //   async function getUser() {
  //     try {
  //       const response = await axios.get(
  //         `${BaseURL}/get-recipe-by-single-seller/${id}/5`
  //       );

  //       if (response.data.status === "Success") {
  //         setRecipeData(response?.data?.data);
  //       }
  //     } catch (error) {
  //       console.error(error);
  //     }
  //   }

  //   getUser();
  //   getFood();

  //   //  GetLimitedSellerAPI()

  //   const handleScroll = () => {
  //     const scrollPosition = window.scrollY;
  //     if (scrollPosition > 1000) {
  //       setIsSticky(true);
  //     } else {
  //       setIsSticky(false);
  //     }
  //   };
  //   window.addEventListener("scroll", handleScroll);
  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);
  const sellerData = useSelector((state) => state.seller.getSellerInfo);
  useEffect(() => {
    setIsLoading(true); // Set loading to true when fetching starts

    const fetchData = async () => {
      try {
        await GetSellerAPI(id); // Fetch seller data
        await getFood(); // Fetch food data
        const response = await axios.get(
          `${BaseURL}/get-recipe-by-single-seller/${id}/5`
        );

        if (response.data.status === "Success") {
          setRecipeData(response?.data?.data);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false); // Set loading to false after fetching
      }
    };
    const allImages = [
      ...(sellerData[0]?.kitchenImages?.map(image => {
        return [
          image?.large?.imageUrl,
          image?.medium?.imageUrl,
          image?.small?.imageUrl
        ].filter(Boolean); // Filter out undefined values
      }) || []),
      ...(sellerData[0]?.otherFoodSkillsMedia?.map(skill =>
        skill?.photo?.map(img => {
          return [
            img?.large?.imageUrl,
            img?.medium?.imageUrl,
            img?.small?.imageUrl
          ].filter(Boolean); // Filter out undefined values
        }) || []
      ) || [])
    ];

    setAllKitchenPhoto(allImages);
    fetchData();

    const handleScroll = () => {
      const scrollPosition = window.scrollY;
      setIsSticky(scrollPosition > 1000);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [id]);


  const userId = sellerData[0]?.userData[0]?._id


  const [selectedVideo, setSelectedVideo] = useState(sellerData[0]?.videos?.length > 0 && sellerData[0]?.videos[0] || "https://www.facebook.com/ownfood.bangladesh/videos/1238011743844591");

  if (isLoading) {
    return <SellerProfileSkeleton />
  }
  if (sellerData.length < 0 || !userId) {

    return <Container className="d-flex vh-100 align-items-center justify-content-center">
      <Row className="text-center">
        <Col>
          <FaExclamationTriangle size={60} color="#f5a623" />
          <h2 className="mt-4">No valid seller data found</h2>
          <p className="text-muted">
            Sorry, we couldn’t find any data for sellers at the moment. Please try again later or explore other options.
          </p>
          <Button variant="primary" className="mt-3" onClick={() => window.location.reload()}>
            Retry
          </Button>
        </Col>
      </Row>
    </Container>
  }

  return (
    <div className=''>
      {/* <Header /> */}
      <div className='UpdateSellerProfile row g-0'>
        {/* first section start */}
        <div className='col-12 p'>
          <div className='row profile-section gap-2'>
            <div className='col  '>
              <div className='d-flex align-items-center justify-content-center'>
                <div className='profile-picture'>
                  <img
                    alt=''
                    loading='lazy'
                    className='img-fluid '
                    src={

                      (() => {
                        const imageUrl = sellerData[0]?.sellerProfilePhoto[0]?.extraLarge?.imageUrl
                        if (imageUrl) {
                          // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                          const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                              '?width=890&height=430&quality=100';
                          
                          return newImageUrl;
                        }
                        
                        return '';
                      })() 
                    }
                  />
                </div>
              </div>
            </div>
            <div className='col-lg-8 col-md-12'>
              <div className='inner-section'>
                <div className='d-flex align-items-center justify-content-between'>
                  <div>
                    {" "}
                    <h1 className='text-uppercase SellerName'>
                      {sellerData[0] &&
                        sellerData[0]?.userData[0] &&
                        sellerData[0]?.userData[0]?.userFullName}
                    </h1>
                  </div>
                  <div>
                    {/* <h6>
                      <span className='sellerId'> seller id:</span> Something123
                    </h6> */}
                  </div>
                </div>

                <h3>{sellerData[0]?.kitchenName}</h3>
                {/* <p>Catering Service: Saiya</p> */}
                <p>I am {sellerData[0]?.pointLocation?.userAddress}</p>
                {/* <p>SellerID:sadiya123</p> */}
                <div className='othersinfo row justify-content-between g-3 p-2'>
                  <div className='col-md-6 col-12'>
                    <div className='msr'>
                      <p className='ms-1 text-white'>My Skill</p>
                    </div>

                    <div className='row p-2 mt-1 d-flex flex-wrap'>
                      {sellerData[0] &&
                        sellerData[0].otherFoodSkillsMedia?.length > 0 &&
                        sellerData[0].otherFoodSkillsMedia?.map((item, index) => (
                          <div
                            key={index}
                            className='col-6 col-sm-4 col-md-6 d-flex justify-content-center align-items-center my-1 s-content'
                          >
                            <span className='text-nowrap text-center'>{item?.foodType}</span>
                          </div>
                        ))}
                    </div>
                  </div>

                  <div className='col-md-6 col-12'>
                    <div className='msr'>
                      <p className='ms-1 text-white'>My Restriction</p>
                    </div>

                    <div className='row p-2 mt-1 d-flex flex-wrap'>
                      {sellerData[0] &&
                        sellerData[0].myRestrictions?.length > 0 &&
                        sellerData[0].myRestrictions?.map((item, index) => (
                          <div
                            key={index}
                            className='col-6 col-sm-4 col-md-6 d-flex justify-content-center align-items-center p-1 s-content'
                          >
                            <span className='text-nowrap text-center'>{item}</span>
                          </div>
                        ))}
                    </div>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
        {/* first section end */}

        {/* second section start */}

        <div className='col-12 second-section mt-4 shadow-sm'>
          <div className='row gap-1 centerslider-list'>
            {/* <div className='col-6 col-xl-4 col-lg-12 col-md-12 center-block center-slider'>
            
            </div> */}
            <div className='col video-player  '>
              <Tabs>
                <div
                  className='row  '
                  style={{
                    marginRight: "0px",

                  }}
                >
                  <div className='col-4 col-xl-4 col-lg-5 col-md-5 center-block center-slider'>
                    {sellerData[0]?.dishesMedia[0]?.photo ? (
                      <KitchenSlider data={sellerData[0]?.dishesMedia[0]?.photo} />
                    ) : null}
                  </div>

                  <div className="video-section col-xl-8 col-lg-7 col-md-7 row">
                    <div className="video col-12 col-xl-9 col-md-6 col-sm-12 video-player-item">
                      <div style={{ width: '100%', height: '100%' }}>
                        <ReactPlayer
                          className="react-player"
                          controls
                          url={selectedVideo || sellerData[0]?.videos && sellerData[0]?.videos[0]}
                          width="100%"
                          height="100%"
                        />
                      </div>
                    </div>


                    <div className="col-12 col-xl-3 col-md-6 col-sm-12 video-list">
                      <div className="row video-list-item">
                        <div className="col-12">

                          {sellerData[0]?.videos?.map((item, index) => {
                            // Function to check if URL is a YouTube link and extract the video ID
                            const getYouTubeThumbnail = (url) => {
                              const youtubeRegex = /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/(?:[^\/\n\s]+\/\S+\/|(?:v|e(?:mbed)?)\/|\S*?[?&]v=)|youtu\.be\/)([a-zA-Z0-9_-]{11})/;
                              const match = url.match(youtubeRegex);
                              return match ? `https://img.youtube.com/vi/${match[1]}/0.jpg` : null;
                            };

                            // Get the thumbnail URL (YouTube thumbnail or default image)
                            const thumbnailUrl =
                              getYouTubeThumbnail(item) ||
                              "https://images.unsplash.com/photo-1575936123452-b67c3203c357?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80";

                            return (
                              <Tab
                                className="col-12 video-item shadow-sm w-100"
                                key={`additional-${index}`}
                                onClick={() => setSelectedVideo(item)}
                              >
                                <div className="thumbContainer row gx-0">
                                  <div className="small-video col-12">
                                    <img
                                      style={{ height: "100%" }}
                                      className="img-fluid"
                                      src={thumbnailUrl}
                                      alt="Thumbnail"
                                    />
                                  </div>
                                  <div className="text-dark col-12">
                                    <p>{item?.description || "No description available"}</p>
                                  </div>
                                </div>
                              </Tab>
                            );
                          })}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </Tabs>
            </div>
          </div>


        </div>



        <div className='col-12 another-details'>
          <div className='another-details-inner'>
            <div className='d-flex ms-2'>
              <div className='me-2 p-3'>{`Total Food :${foodData?.length || 0
                }`}</div>
              <div className=' p-3' style={{ borderLeft: "1px solid white" }}>
                Review{" "}
              </div>
            </div>
            <div className='d-flex'>
              <div className='col'>
                <button className='wish'>
                  <Link to={`/wish-order?sellerId=${id}`} state={sellerData}>
                    Create Wish Order
                  </Link>
                </button>
              </div>
              <div className='col'>
                <button className='catering'>
                  {" "}
                  <Link to={`/catering-order`} state={sellerData}>
                    Create Catering Order
                  </Link>
                </button>
              </div>
            </div>
          </div>
        </div>


        {/* menuvbar end */}
        <div className='col-12 food-container'>
          <div className='row'>
            <div className='col-xl-2 col-md-3'>
              {windowWidth <= 576 && (
                <Accordion defaultActiveKey='1'>
                  <Accordion.Item eventKey='0'>
                    <Accordion.Header>Food Type</Accordion.Header>
                    <Accordion.Body>
                      <div className=' asidebar  bg-white shadow-lg'>
                        <Link
                          to={`/SellerProfile/${id}?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          All
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/instant?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          INSTANT
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/wish-order?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          wish food
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/catering?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          CATERING
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/pre-order?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          pre order
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/recipe?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          recipe
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/diary?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          my diary
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/experimental?userId=${sellerData[0]?.userData[0]?._id}`}
                          state={sellerData[0]?.myExperimentalFoodMedia}
                        >
                          EXPERIMENTAL
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/amazing-dish?userId=${sellerData[0]?.userData[0]?._id}`}
                          state={sellerData[0]?.dishesMedia}
                        >
                          AMAZING food
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/near-seller?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          near by seller
                        </Link>
                        <Link
                          to={`/SellerProfile/${id}/review?userId=${sellerData[0]?.userData[0]?._id}`}
                        >
                          review
                        </Link>
                      </div>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
              )}
              {windowWidth > 576 && (
                <div className=' asidebar  bg-white shadow-lg'>
                  <Link
                    to={`/SellerProfile/${id}?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    All
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/instant?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    INSTANT
                  </Link>

                  <Link
                    to={`/SellerProfile/${id}/catering?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    CATERING
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/pre-order?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    pre order
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/recipe?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    recipe
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/diary?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    my diary
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/experimental?userId=${sellerData[0]?.userData[0]?._id}`}
                    state={sellerData[0]?.myExperimentalFoodMedia}
                  >
                    EXPERIMENTAL
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/amazing-dish?userId=${sellerData[0]?.userData[0]?._id}`}
                    state={sellerData[0]?.dishesMedia}
                  >
                    AMAZING food
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/near-seller?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    near by seller
                  </Link>
                  <Link
                    to={`/SellerProfile/${id}/review?userId=${sellerData[0]?.userData[0]?._id}`}
                  >
                    review
                  </Link>
                </div>
              )}
            </div>


            <div className='col-12 col-xl-10 col-lg-9 col-md-9 col-sm-9'>
              <div className='row'>
                {/* <div className='col-12 day-container-children'>
                <div className='row p-3'>
                  <div className='col-12'>
                    <p>Pick a delivery date</p>
                  </div>
                  <div className='col-12'>
                    <hr style={{ margin: "2px" }} />
                  </div>
                  <div className='col-12 '>
                    <div className='row '>
                      <div className='col-2 border day'>
                        <div
                          className='d-flex flex-column justify-content-start
                           text-center'
                        >
                          <span className='sd-bold pick-day'>SUN</span>
                          <span>Jan 26</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div> */}
                <div
                  className='col-12 col-xl-12 all-items-container'
                  style={{ marginTop: "14px" }}
                >
                  <Outlet context={{ userId }} />
                </div>
              </div>
            </div>
          </div>
        </div>


      </div>

    </div>
  );
};

export default UpdateSellerProfile;