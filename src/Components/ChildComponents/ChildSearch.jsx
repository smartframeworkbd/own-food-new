import React, { useEffect } from "react";
import { useState } from "react";
import {
  FaEye,
  FaHeart,
  FaPlay,
  FaQuestion,
  FaRegStar,
  FaStar,
  FaTheRedYeti,
} from "react-icons/fa";
import { AiFillHeart, AiOutlineShopping } from "react-icons/ai";
import { GetFoodByCategoryAPI } from "../../API/CategoryAPI";
import {
  Link,
  useNavigate,
  useNavigation,
  useParams,
  useLocation,
} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import PageLoading from "../Elements/PageLoading";
import VisibilitySensor from "react-visibility-sensor";
import { Col, Container, Modal, Row } from "react-bootstrap";
import { GiOpenedFoodCan } from "react-icons/gi";
import Rating from "react-rating";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import { useRef } from "react";
import store from "../../Redux/Store/Store";
import { setFoodByCategoryList } from "../../Redux/State-slice/CategorySlice";
import {
  addItem,
  addItemToCart,
  setCartList,
} from "../../Redux/State-slice/CartSlice";
import { Toaster, toast } from "react-hot-toast";
import Tooltip from "rc-tooltip";
import ShoppingPopUp from "../Common/ShoppingPopUp";
// import userIcon from "/Assets/Img/user.png"

import labels from "../../translationData/currency.json";
import Swal from "sweetalert2";
import useLocationCustom from "../../customHooks/useLocation";

const dummyImg = "/Assets/Img/Logo.png";
const naImg = "/Assets/Img/na.png";

const ChildSearch = () => {
  let params = useParams();
  const [catId, setCatId] = useState();
  let [limitData, setLimitData] = useState(20);
  let [loader, setLoader] = useState(false);
  const [cuisinesShow, setCuisinesShow] = useState(false);
  const [tags, setTags] = useState(false);
  const [category, setCategory] = useState(false);
  const [subCategory, setSubCategory] = useState(false);
  const [moreFilters, setMoreFilters] = useState(false);
  const [rate, setRate] = useState(2);
  const [price, setPrice] = useState(0);
  const [tagData, setTagData] = useState([]);
  const [categoryData, setCategoryData] = useState([]);
  const [subCategoryData, setSubCategoryData] = useState([]);
  const [foodTypeId, setFoodTypeId] = useState("");
  const [foodAdditionalTags, setFoodAdditionalTags] = useState([]);
  const [foodTypeData, setFoodTypeData] = useState([]);
  let [newPostBody, setPostBody] = useState({});
  const [show, setShow] = useState(false);
  const [popupData, setPopupData] = useState({});
  // const [coordinates, setCoordinates] = useState({
  //   lat: null,
  //   lng: null,
  // });
  // const [error, setError] = useState("");
  // const [coordinatesReady, setCoordinatesReady] = useState(false);
  const colorNames = [
    "#16A34A",
    "#9333EA",
    "#DB2777",
    "#EA580C",
    "#FF0000",
    "#0000FF",
    "#00008B",
    "#800080",
    "#FF00FF",
    "#808080",
    "#FFA500",
    "#FFA500",
    "#800000",
    "#008000",
    "#808000",
  ];
  const handleClose = () => setShow(false);
  const randomColor = () => {
    return colorNames[Math.floor(Math.random() * colorNames.length)];
  };
  // useEffect(() => {
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         setCoordinates({
  //           lat: position.coords.latitude,
  //           lng: position.coords.longitude,
  //         });
  //         setCoordinatesReady(true);
  //         setError(null);
  //       },
  //       (error) => {
  //         setError(error.message);
  //         setCoordinatesReady(false);
  //       }
  //     );
  //   } else {
  //     setError("Geolocation is not supported by this browser.");
  //   }
  // }, []);
  // const { coordinates, error } = useLocation();
  // const dispatch = useDispatch();
  const { coordinate, error } = useSelector((state) => state.location);

  const location = useLocation();

  // Helper function to parse query parameters
  const useQuery = () => {
    return new URLSearchParams(location.search);
  };

  const query = useQuery();
  const lat = query.get("lat");
  const lon = query.get("lon");
  const q = query.get("q");

  useEffect(() => {
    // GetFoodByCategoryAPI(params.id, 10);
    // if(coordinatesReady){

    // }
    newPostBody.keyword = q;
    // newPostBody.categoryID = [params.id];
    if (foodAdditionalTags.length > 0) {
      newPostBody.foodAdditionalTags = foodAdditionalTags;
    } else {
      delete newPostBody.foodAdditionalTags;
    }
    if (foodTypeId) {
      newPostBody.foodTypeID = foodTypeId;
    } else {
      delete newPostBody.foodTypeID;
    }

    // if (
    //   !coordinates.lng ||
    //   !coordinates.lat ||
    //   coordinates.lat === null ||
    //   coordinates.lng === null
    // ) {
    //   Swal.fire({
    //     icon: "info",
    //     title: "enable your location ",
    //   });
    // }
    if (coordinate?.lat !== null && coordinate?.lon !== null && q !== null) {
      // const { lat, lng } = coordinates;
      axios
        .post(
          BaseURL +
            `/global-search?lat=${coordinate.lat}&lon=${coordinate.lon}&q=${q}`,
          newPostBody
        )
        .then((res) => {
          if (res.data.status === "Success") {
            store.dispatch(setFoodByCategoryList(res.data.data.foodData));
          }
        });
    }

    axios.get(BaseURL + "/get-additionaltags").then((res) => {
      setTagData(res.data.data);
    });

    axios.get(BaseURL + "/get-category").then((res) => {
      setCategoryData(res.data.data);
      setCatId(res.data.data);
    });

    axios
      .get(BaseURL + "/get-sub-category-by-single-category/" + params.id)
      .then((res) => {
        setSubCategoryData(res.data.data?.[0]?.subcategoryData);
      });

    axios.get(BaseURL + "/get-foodType").then((res) => {
      setFoodTypeData(res.data.data);
    });
  }, [newPostBody, params.id, foodAdditionalTags, foodTypeId, coordinate, q]);

  const loadMoreItem = (isVisible) => {
    // if (isVisible) {
    //   setLimitData(limitData + 10);
    //   setLoader(true);
    //   // GetFoodByCategoryAPI(params.id, limitData).then((res) => {
    //   //   if (res === true) {
    //   //     setLoader(false);
    //   //   }
    //   // });
    //   axios.post(BaseURL + "/filter", newPostBody).then((res) => {
    //     if (res.data.status === "Success") {
    //       store.dispatch(setFoodByCategoryList(res.data.data));
    //     }
    //   });
    // }
  };

  // const changeLink = () => {
  //   GetFoodByCategoryAPI(params.id, 10);
  //   setCategory(false);
  // };

  // const limitBySelect = (limit) => {
  //   GetFoodByCategoryAPI(params.id, limit);
  // };

  let allFoodByCategoryList = useSelector(
    (state) => state.category.allFoodByCategoryList
  );

  const dispatch = useDispatch();

  let subCatRef,
    tagRef,
    priceRef = useRef();

  const filterData = () => {
    let postBody = {};

    if (subCatRef) {
      newPostBody.subCategoryID = subCatRef;
    }
    if (price > 0) {
      newPostBody.foodPrice = parseInt(price);
    }
    setPostBody({ ...newPostBody });
  };
  const navigate = useNavigate();
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
    navigate(`/SellerProfile/${item?.sellerID}`);
  };

  function calculateTimeRemaining(nowTime, expiryDate) {
    const now = new Date(nowTime);
    const expiry = new Date(expiryDate);

    let difference = expiry - now;

    const hours = Math.floor(difference / (1000 * 60 * 60));
    difference -= hours * (1000 * 60 * 60);
    const minutes = Math.floor(difference / (1000 * 60));
    difference -= minutes * (1000 * 60);
    const seconds = Math.floor(difference / 1000);

    return { hours, minutes, seconds };
  }
  const FOOD_TYPE = {
    preorder: "PREORDER",
    instant: "INSTANT",
    catering: "CATERING",
  };
  useEffect(() => {
    if (error) {
      Swal.fire({
        icon: "warning",
        title: error?.message,
        text: "Enable your device location",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        closeOnClickOutside: false,
        showConfirmButton: false,
      });
    }
  }, [error]);
  return (
    <>
      {/* {error &&
        Swal.fire({
          icon: "warning",
          // title: `${error?.message}`,
          text: "enable your device location",
        })} */}
      <section>
        <div className="container">
          <div className="centerFilterBtn">
            <div className="filterBtn-group">
              {/* <div className='filterBtn'>
                <button
                  onClick={() => setCuisinesShow(true)}
                  className='me-2 myFilterBtn'
                >
                  All cuisines
                </button>
              </div> */}

              {/* <div className="filterBtn">
                <button className="me-2 myFilterBtn">Near Me</button>
              </div> */}

              <div className="filterBtn">
                <button
                  onClick={() => setCategory(true)}
                  className="me-2 myFilterBtn"
                >
                  All Category
                </button>
              </div>

              {/* <div className="filterBtn">
                <button
                  onClick={() => setSubCategory(true)}
                  className="me-2 myFilterBtn"
                >
                  All Sub-Category
                </button>
              </div> */}

              <div className="filterBtn">
                <button
                  onClick={() => setTags(true)}
                  className="me-2 myFilterBtn"
                >
                  Tags
                </button>
              </div>
              <div className="filterBtn">
                <button
                  onClick={() => setMoreFilters(true)}
                  className="me-2 myFilterBtn"
                >
                  More Filters
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="filterCategory">
        <Container>
          <Row>
            <Col xs={12}>
              {/* <button
                onClick={() => setCuisinesShow(true)}
                className='me-2 myBtn'
              >
                All cuisines
              </button>
              <button className='me-2 myBtn'>Near Me</button>
              <button onClick={() => setCategory(true)} className='me-2 myBtn'>
                All Category
              </button>
              <button
                onClick={() => setSubCategory(true)}
                className='me-2 myBtn'
              >
                All Sub-Category
              </button>
              <button onClick={() => setTags(true)} className='me-2 myBtn'>
                Tags
              </button>
              <button
                onClick={() => setMoreFilters(true)}
                className='me-2 myBtn'
              >
                More Filters
              </button> */}

              <Modal
                size="lg"
                show={cuisinesShow}
                onHide={() => setCuisinesShow(false)}
                aria-labelledby="example-modal-sizes-title-sm"
                className="filterCategoryModal"
              >
                <Modal.Header closeButton>
                  {/* <Modal.Title id='example-modal-sizes-title-sm'>
                    All cuisines
                  </Modal.Title> */}
                </Modal.Header>
                <Modal.Body>
                  <div className="allCuisines">
                    {/* <Row>
                      {[...Array(20)].map((item, index) => (
                        <Col lg={2}>
                          <div className='wrapper'>
                            <div className='imgFile'>
                              <img
                                src='https://cdn.shef.com/static/media/All-Cuisine-Icon_Globe_200x200px_Colour-HOVER.9cf42dfb.svg'
                                alt=''
                              />
                            </div>
                            <div className='textFile'>
                              <p>All cuisines</p>
                            </div>
                          </div>
                        </Col>
                      ))}
                    </Row> */}
                  </div>
                </Modal.Body>
              </Modal>

              <Modal
                size="lg"
                show={category}
                onHide={() => setCategory(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                className="filterCategoryModal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Category
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="dietary ">
                    {categoryData?.map((item, index) =>
                      item?.categoryName.length !== 0 ? (
                        <Link to={`/Category/${item?._id}`}>
                          <button
                            className="wrapper"
                            key={index}
                            // onClick={changeLink}
                          >
                            <span className="textFile">
                              {item?.categoryName.length === 0
                                ? ""
                                : item?.categoryName}
                            </span>
                          </button>
                        </Link>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </Modal.Body>
              </Modal>

              <Modal
                size="lg"
                show={subCategory}
                onHide={() => setSubCategory(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                className="filterCategoryModal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Sub-Category
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="dietary ">
                    {subCategoryData?.map((item, index) =>
                      item.categoryName.length !== 0 ? (
                        <button
                          className="wrapper"
                          // className={`wrapper ${
                          //   subCatRef === item._id ? "bg-primary" : ""
                          // }`}
                          key={index}
                          onClick={filterData}
                        >
                          <span
                            className="textFile"
                            ref={() => (subCatRef = item?._id)}
                          >
                            {item?.categoryName}
                          </span>
                        </button>
                      ) : (
                        ""
                      )
                    )}
                  </div>
                </Modal.Body>
              </Modal>

              <Modal
                size="lg"
                show={tags}
                onHide={() => setTags(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                className="filterCategoryModal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    Tags
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="dietary ">
                    {tagData?.map((item, index) => (
                      <button
                        className={`wrapper ${
                          foodAdditionalTags.includes(item.tagName)
                            ? "bg-primary"
                            : ""
                        }`}
                        key={index}
                        onClick={() =>
                          setFoodAdditionalTags((prevTags) => {
                            const tagIndex = prevTags.indexOf(item?.tagName);
                            if (tagIndex !== -1) {
                              const updatedTags = [...prevTags];
                              updatedTags.splice(tagIndex, 1);
                              return updatedTags;
                            } else {
                              return [...prevTags, item?.tagName];
                            }
                          })
                        }
                      >
                        <span className="textFile">{item?.tagName}</span>
                      </button>
                    ))}
                  </div>
                </Modal.Body>
              </Modal>

              <Modal
                size="lg"
                show={moreFilters}
                onHide={() => setMoreFilters(false)}
                aria-labelledby="example-modal-sizes-title-lg"
                className="filterCategoryModal"
              >
                <Modal.Header closeButton>
                  <Modal.Title id="example-modal-sizes-title-lg">
                    More Filters
                  </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <div className="moreFilters">
                    <Row>
                      <Col lg={4}>
                        <div className="wrapperOne">
                          <p className="textHeader">
                            Filter By Price = {price} $
                          </p>
                          <input
                            type="range"
                            defaultValue={price}
                            min="10"
                            max="1000"
                            onChange={(event) => setPrice(event.target.value)}
                            onClick={filterData}
                          />
                        </div>
                      </Col>
                      <Col lg={2}>
                        <div className="wrapperOne">
                          <div className="rating">
                            <p className="py-2">Filter By Review</p>
                            <form className="rating-form">
                              <label htmlFor="neutral" className="lb">
                                <input
                                  type="radio"
                                  name="rating"
                                  className="neutral"
                                  id="neutral"
                                  defaultValue="neutral"
                                />
                                <svg
                                  className="svg"
                                  xmlns="http://www.w3.org/2000/svg"
                                  xmlnsXlink="http://www.w3.org/1999/xlink"
                                  version="1.1"
                                  width="100%"
                                  height="100%"
                                  viewBox="0 0 24 24"
                                >
                                  <path d="M8.5,11A1.5,1.5 0 0,1 7,9.5A1.5,1.5 0 0,1 8.5,8A1.5,1.5 0 0,1 10,9.5A1.5,1.5 0 0,1 8.5,11M15.5,11A1.5,1.5 0 0,1 14,9.5A1.5,1.5 0 0,1 15.5,8A1.5,1.5 0 0,1 17,9.5A1.5,1.5 0 0,1 15.5,11M12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22C6.47,22 2,17.5 2,12A10,10 0 0,1 12,2M9,14H15A1,1 0 0,1 16,15A1,1 0 0,1 15,16H9A1,1 0 0,1 8,15A1,1 0 0,1 9,14Z" />
                                </svg>
                              </label>
                              <label htmlFor="super-happy" className="lb">
                                <input
                                  type="radio"
                                  name="rating"
                                  className="super-happy"
                                  id="super-happy"
                                  defaultValue="super-happy"
                                />
                                <svg className="svg" viewBox="0 0 24 24">
                                  <path d="M12,17.5C14.33,17.5 16.3,16.04 17.11,14H6.89C7.69,16.04 9.67,17.5 12,17.5M8.5,11A1.5,1.5 0 0,0 10,9.5A1.5,1.5 0 0,0 8.5,8A1.5,1.5 0 0,0 7,9.5A1.5,1.5 0 0,0 8.5,11M15.5,11A1.5,1.5 0 0,0 17,9.5A1.5,1.5 0 0,0 15.5,8A1.5,1.5 0 0,0 14,9.5A1.5,1.5 0 0,0 15.5,11M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2Z" />
                                </svg>
                              </label>
                            </form>
                          </div>
                        </div>
                      </Col>
                      <Col lg={6}>
                        <div className="wrapperOne">
                          <p className="textHeader">Filter By Food-Type</p>
                          <div className="dietary ">
                            {foodTypeData?.map((item, index) =>
                              item?.foodTypeName ? (
                                <button
                                  className={`wrapper ${
                                    foodTypeId === item._id ? "bg-primary" : ""
                                  }`}
                                  key={index}
                                  onClick={(e) => {
                                    if (foodTypeId === item._id) {
                                      setFoodTypeId(null); // or
                                    } else {
                                      setFoodTypeId(item._id);
                                    }
                                  }}
                                >
                                  <span className="textFile">
                                    {item?.foodTypeName}
                                  </span>
                                </button>
                              ) : (
                                ""
                              )
                            )}
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Modal.Body>
              </Modal>
            </Col>
          </Row>
        </Container>
      </div>
      <div className="Category ProfileFoodGallery">
        <section className="inner-section single-banner bannerstyle">
          <div className="container text-white"></div>
        </section>
        <section className="inner-section shop-part">
          <div className="container">
            <div className="row content-reverse">
              <div className="col-lg-12">
                {/* <div className='row'>
                  <div className='col-lg-12'>
                    <div className='top-filter d-flex justify-content-end'></div>
                  </div>
                </div> */}
                <div className="row">
                  {allFoodByCategoryList?.length !== undefined &&
                  allFoodByCategoryList?.length > 0 ? (
                    <>
                      {allFoodByCategoryList?.map((item, index) => {
                        if (item.foodType === FOOD_TYPE.instant) {
                          let remainingTime = calculateTimeRemaining(
                            item.nowTime,
                            item.expiryDate
                          );
                          let formattedTime = `${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`;
                          return (
                            <Col
                              xl={3}
                              lg={12}
                              className="mb-4 mt-4"
                              key={index}
                              // style={{ height: "390px" }}
                            >
                              <div
                                style={{
                                  backgroundColor: randomColor(),
                                  height: "410px",
                                }}
                              >
                                <div
                                  className={`inner__body `}
                                  style={{ height: "395px" }}
                                >
                                  <div className="img__file">
                                    <img
                                      className="img-fluid"
                                      crossorigin="anonymous"
                                      src={
                                        item?.foodImage &&
                                        item?.foodImage[0]?.extraLarge?.imageUrl ===
                                          undefined
                                          ? dummyImg
                                          : item?.foodImage[0]?.extraLarge?.imageUrl
                                      }
                                      alt=""
                                    />
                                    <div className="text_design">
                                      <h5 className="text-light">
                                        {item?.sellerInfo &&
                                          item?.sellerInfo[0]?.kitchenName}
                                      </h5>
                                    </div>
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
                                      <li className="btn-floating  blue">
                                        <button
                                          onClick={() => {
                                            setPopupData(item);
                                            setShow(true);
                                          }}
                                          className="material-icons buy"
                                        >
                                          <FaEye
                                            data-toggle="tooltip"
                                            data-placement="left"
                                            title="Details"
                                            color="white"
                                          />
                                        </button>
                                      </li>
                                    </ul>
                                    <div className="cart-top-label">
                                      <div className="d-flex  gap-1 cart-top-label-inner">
                                        <div className="food-type">
                                          <span>{item?.foodType}</span>
                                        </div>
                                        {(!!item.foodDiscountPrice ||
                                          !!item.foodDiscountPercentage) && (
                                          <>
                                            {!!item.foodDiscountPrice && (
                                              <div className="food-discount">
                                                <span>
                                                  {item.foodDiscountPrice}TK OFF
                                                </span>
                                              </div>
                                            )}
                                            {!!item.foodDiscountPercentage && (
                                              <div className="food-discount">
                                                <span>
                                                  {item.foodDiscountPercentage}%
                                                  OFF
                                                </span>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text__file">
                                    <div className="d-flex justify-content-between align-items-center top_header">
                                      <p className="price">
                                        {labels.country === "Bangladesh"
                                          ? labels.currency.bdt.symbol
                                          : labels.currency.usa.symbol}
                                        {item?.foodSalePrice}
                                        <br />

                                        {item.foodSalePrice !==
                                          item.foodPrice && (
                                          <span>
                                            <del className="text-danger">
                                              <span className="text-white">
                                                {labels.country === "Bangladesh"
                                                  ? labels.currency.bdt.symbol
                                                  : labels.currency.usa.symbol}
                                                {item?.foodPrice}
                                              </span>
                                            </del>
                                          </span>
                                        )}
                                      </p>

                                      <p className="intro">
                                        <i
                                          className="material-icons buy"
                                          onClick={() => handleAddToCart(item)}
                                        >
                                          add_shopping_cart
                                        </i>
                                      </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                      <Link
                                        to={`/ProductsDetails/${item?._id}`}
                                      >
                                        <p
                                          className=""
                                          style={{
                                            marginTop: -18,
                                            position: "relative",
                                          }}
                                        >
                                          <h2>{item?.foodName}</h2>
                                        </p>
                                      </Link>
                                    </div>
                                    {item?.sellerInfo &&
                                    item?.sellerInfo[0]?.sellerProfilePhoto
                                      .length > 0 ? (
                                      <Link
                                        to={`/SellerProfile/${item?.sellerInfo[0]?._id}`}
                                      >
                                        <div className="overlay__img">
                                          <img
                                            className="img-fluid"
                                            src={
                                              item?.sellerInfo[0]
                                                ?.sellerProfilePhoto[0]?.medium
                                                ?.imageUrl
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </Link>
                                    ) : (
                                      <Link
                                        to={`/SellerProfile/${
                                          item?.sellerInfo &&
                                          item?.sellerInfo[0]?._id
                                        }`}
                                      >
                                        <div className="overlay__img">
                                          <img
                                            className="img-fluid"
                                            style={{ width: "100%" }}
                                            src="/Assets/Img/user.png"
                                            alt=""
                                          />
                                        </div>
                                      </Link>
                                    )}
                                    <ul className="bottom_footer">
                                      {item?.foodAdditionalTags?.length > 0 ? (
                                        <>
                                          {item?.foodAdditionalTags?.map(
                                            (tag) => {
                                              if (tag === "No Alcohol") {
                                                return (
                                                  <li>
                                                    <img
                                                      src="/Assets/Img/pot-3.jpeg"
                                                      className="footer_img"
                                                      alt=""
                                                    />
                                                  </li>
                                                );
                                              } else if (tag === "murgi") {
                                                return (
                                                  <li>
                                                    <img
                                                      src="/Assets/Img/pot-2.jpeg"
                                                      className="footer_img"
                                                      alt=""
                                                    />
                                                  </li>
                                                );
                                              }
                                            }
                                          )}
                                        </>
                                      ) : null}
                                      {/* <li>
                                      <img
                                        src='/Assets/Img/pot-1.jpeg'
                                        className='footer_img'
                                        alt=''
                                      />
                                    </li>
                                   */}
                                    </ul>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    borderTop: "3px solid #d4d4d4",
                                    backgroundColor: "black",
                                    padding: "2px 7px",
                                  }}
                                  className="text-white d-flex justify-content-center"
                                >
                                  {`REMAINING ${formattedTime}`}
                                </div>
                              </div>
                            </Col>
                          );
                        } else if (item.foodType === FOOD_TYPE.preorder) {
                          return (
                            <Col
                              xl={3}
                              lg={12}
                              className="mb-4 mt-4"
                              key={index}
                              // style={{ height: "390px" }}
                            >
                              <div
                                style={{
                                  backgroundColor: randomColor(),
                                  height: "410px",
                                }}
                              >
                                <div
                                  className={`inner__body `}
                                  style={{ height: "395px" }}
                                >
                                  <div className="img__file">
                                    <img
                                      className="img-fluid"
                                      crossorigin="anonymous"
                                      src={
                                        item?.foodImage &&
                                        item?.foodImage[0]?.extraLarge?.imageUrl ===
                                          undefined
                                          ? dummyImg
                                          : item?.foodImage[0]?.extraLarge?.imageUrl
                                      }
                                      alt=""
                                    />
                                    <div className="text_design">
                                      <h5 className="text-light">
                                        {item?.sellerInfo &&
                                          item?.sellerInfo[0]?.kitchenName}
                                      </h5>
                                    </div>
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
                                      <li className="btn-floating  blue">
                                        <button
                                          onClick={() => {
                                            setPopupData(item);
                                            setShow(true);
                                          }}
                                          className="material-icons buy"
                                        >
                                          <FaEye
                                            data-toggle="tooltip"
                                            data-placement="left"
                                            title="Details"
                                            color="white"
                                          />
                                        </button>
                                      </li>
                                    </ul>
                                    <div className="cart-top-label">
                                      <div className="d-flex  gap-1 cart-top-label-inner">
                                        <div className="food-type">
                                          <span>{item?.foodType}</span>
                                        </div>
                                        {(!!item.foodDiscountPrice ||
                                          !!item.foodDiscountPercentage) && (
                                          <>
                                            {!!item.foodDiscountPrice && (
                                              <div className="food-discount">
                                                <span>
                                                  {item.foodDiscountPrice}tk off
                                                </span>
                                              </div>
                                            )}
                                            {!!item.foodDiscountPercentage && (
                                              <div className="food-discount">
                                                <span>
                                                  {item.foodDiscountPercentage}%
                                                  off
                                                </span>
                                              </div>
                                            )}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <div className="text__file">
                                    <div className="d-flex justify-content-between align-items-center top_header">
                                      <p className="price">
                                        {labels.country === "Bangladesh"
                                          ? labels.currency.bdt.symbol
                                          : labels.currency.usa.symbol}
                                        {item?.foodSalePrice}
                                        <br />
                                        {item.foodSalePrice !==
                                          item.foodPrice && (
                                          <span>
                                            <del className="text-danger">
                                              <span className="text-white">
                                                {labels.country === "Bangladesh"
                                                  ? labels.currency.bdt.symbol
                                                  : labels.currency.usa.symbol}
                                                {item?.foodPrice}
                                              </span>
                                            </del>
                                          </span>
                                        )}
                                      </p>

                                      <p className="intro">
                                        <i
                                          className="material-icons buy"
                                          onClick={() => handleAddToCart(item)}
                                        >
                                          add_shopping_cart
                                        </i>
                                      </p>
                                    </div>
                                    <div className="d-flex align-items-center justify-content-center">
                                      <Link
                                        to={`/ProductsDetails/${item?._id}`}
                                      >
                                        <p
                                          className=""
                                          style={{
                                            marginTop: -18,
                                            position: "relative",
                                          }}
                                        >
                                          <h2>{item?.foodName}</h2>
                                        </p>
                                      </Link>
                                    </div>
                                    {item?.sellerInfo &&
                                    item?.sellerInfo[0]?.sellerProfilePhoto
                                      .length > 0 ? (
                                      <Link
                                        to={`/SellerProfile/${item?.sellerInfo[0]?._id}`}
                                      >
                                        <div className="overlay__img">
                                          <img
                                            className="img-fluid"
                                            src={
                                              item?.sellerInfo[0]
                                                ?.sellerProfilePhoto[0]?.medium
                                                ?.imageUrl
                                            }
                                            alt=""
                                          />
                                        </div>
                                      </Link>
                                    ) : (
                                      <Link
                                        to={`/SellerProfile/${
                                          item?.sellerInfo &&
                                          item?.sellerInfo[0]?._id
                                        }`}
                                      >
                                        <div className="overlay__img">
                                          <img
                                            className="img-fluid"
                                            style={{ width: "100%" }}
                                            src="/Assets/Img/user.png"
                                            alt=""
                                          />
                                        </div>
                                      </Link>
                                    )}
                                    <ul className="bottom_footer">
                                      {item?.foodAdditionalTags?.length > 0 ? (
                                        <>
                                          {item?.foodAdditionalTags?.map(
                                            (tag) => {
                                              if (tag === "No Alcohol") {
                                                return (
                                                  <li>
                                                    <img
                                                      src="/Assets/Img/pot-3.jpeg"
                                                      className="footer_img"
                                                      alt=""
                                                    />
                                                  </li>
                                                );
                                              } else if (tag === "murgi") {
                                                return (
                                                  <li>
                                                    <img
                                                      src="/Assets/Img/pot-2.jpeg"
                                                      className="footer_img"
                                                      alt=""
                                                    />
                                                  </li>
                                                );
                                              }
                                            }
                                          )}
                                        </>
                                      ) : null}
                                      {/* <li>
                                    <img
                                      src='/Assets/Img/pot-1.jpeg'
                                      className='footer_img'
                                      alt=''
                                    />
                                  </li>
                                 */}
                                    </ul>
                                  </div>
                                </div>
                                <div
                                  style={{
                                    borderTop: "3px solid #d4d4d4",
                                    backgroundColor: "black",
                                    padding: "2px 7px",
                                  }}
                                  className="text-white d-flex justify-content-center"
                                >
                                  {`ORDEER BEFORE ${item.foodOrderBeforeTime}`}
                                </div>
                              </div>
                            </Col>
                          );
                        }
                      })}
                    </>
                  ) : (
                    <>
                      <div className="mt-4">
                        <h2>No Food Found!</h2>
                      </div>
                    </>
                  )}
                </div>
                <div className="d-flex justify-content-center mt-3">
                  <VisibilitySensor onChange={loadMoreItem}>
                    {loader === true ? (
                      <PageLoading />
                    ) : (
                      <>
                        <h4 className="text-danger">No More Foods Found!</h4>
                      </>
                    )}
                  </VisibilitySensor>
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
      {show === true ? (
        <ShoppingPopUp
          show={show}
          popupData={popupData}
          handleClose={handleClose}
        />
      ) : (
        ""
      )}
    </>
  );
};

export default ChildSearch;
