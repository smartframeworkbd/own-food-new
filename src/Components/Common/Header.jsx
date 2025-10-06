import React, { useContext, useState } from "react";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";
import { IoLanguageOutline } from "react-icons/io5";
import {
  FaAngleDown,
  FaAngleRight,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaCartPlus,
  FaMapMarkerAlt,
  FaMinus,
  FaPlus,
  FaSearch,
  FaUserCheck,
  FaUserCog,
  FaUser,
  FaArrowDown,
  FaBell,
  FaEdit,
} from "react-icons/fa";
import { AiOutlineClose } from "react-icons/ai";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Typography from "@mui/material/Typography";
import Box from "@mui/material/Box";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import ImageIcon from "@mui/icons-material/Image";
import WorkIcon from "@mui/icons-material/Work";
import BeachAccessIcon from "@mui/icons-material/BeachAccess";

import Modal from "@mui/material/Modal";
import SlidingPane from "react-sliding-pane";
import "react-sliding-pane/dist/react-sliding-pane.css";

import {
  addAdditionalInfo,
  addItem,
  addItemLocally,
  decreaseItem,
  removeItem,
} from "../../Redux/State-slice/CartSlice";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Uber_image } from "../../Database/ImgData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { ErrorToast, IsMobile, SuccessToast } from "../../Helper/FormHelper";
import { setBannerList } from "../../Redux/State-slice/BannerSlice";
import { BaseURL, DashBoardLink, FrontEndLink } from "../../Helper/config";
import axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  GetAllCategoryAPI,
  GetLimitedCategoryAPI,
} from "../../API/CategoryAPI";
import { GetLimitedSellerAPI } from "../../API/SellerAPI";

import GetCurrentLocation from "./GetCurrentLocationWrapper";

import getTranslation from "../../Helper/getTranslationUtility";
import labels from "../../translationData/menu.json";
import currencyLabels from "../../translationData/currency.json";

import { LabelSharp } from "@mui/icons-material";

import SideBar from "./SideBar/SideBar";
import { LanguageContext } from "../../Context/LanguageContext";
import CartDateSelect from "./DateTime/CartDateSelect";
import moment from "moment";
import ShowLocation from "./ShowLocation/ShowLocation";
import GetCurrentLocationComponent from "./GetCurrentLocationWrapper";
import AnotherSearchLocation from "./AnotherSearchLocation";
import GetCurrentLocationWrapper from "./GetCurrentLocationWrapper";
import Swal from "sweetalert2";
import useIsMobile from "../../customHooks/useIsMobile";

const Header = () => {
  const { coordinate, error } = useSelector((state) => state.location);
  const [results, setResults] = useState([]);
  const [searchText, setSearchText] = useState("");
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [additionalInfo, setAdditionalInfo] = useState("");

  const handleInputChange = (event) => {
    setSearchText(event.target.value);
  };

  const [showSettings, setShowSettings] = useState(false);

  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };
  const toggleLanguage = () => {
    setCurrentLanguage(currentLanguage === "en" ? "bn" : "en");
  };

  const [show, setShow] = useState(false);
  const toggleOffcanvas = () => {
    setShow(!show);
  };

  const handleCloseSidebar = () => setShow(false);
  const handleShow = () => setShow(true);

  // const [active, setActive] = useState(false);
  const navigate = useNavigate();
  const [paneLeft, SetpanLeft] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
  });

  const [openSearch, setOpenSearch] = React.useState(false);
  const handleOpen = () => setOpenSearch(true);
  const handleClose = () => setOpenSearch(false);

  useEffect(() => {
    GetAllCategoryAPI();

    GetLimitedCategoryAPI(4);
    GetLimitedSellerAPI(2);
  }, []);

  let limitedCategory = useSelector(
    (state) => state.category.limitedCategoryList
  );
  let limitedSeller = useSelector((state) => state.seller.limitedSellerList);

  const style = {
    position: "absolute",
    top: "0%",
    width: "100%",
    bgcolor: "background.paper",
    //   border: "2px solid #000",
    boxShadow: 24,
    maxHeight: 500,
    p: 4,
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && (
          <Box sx={{ p: 3 }}>
            <Typography>{children}</Typography>
          </Box>
        )}
      </div>
    );
  }

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  function a11yProps(index) {
    return {
      id: `simple-tab-${index}`,
      "aria-controls": `simple-tabpanel-${index}`,
    };
  }
  const [value, setValue] = React.useState(0);

  // const handleChange = (event, newValue) => {
  //   setValue(newValue);
  //   let selectedTab = "all";
  //   if (newValue === 0) {
  //     selectedTab = "all";
  //   } else if (newValue === 1) {
  //     selectedTab = "kitchen";
  //   } else if (newValue === 2) {
  //     selectedTab = "foods";
  //   } else if (newValue === 3) {
  //     selectedTab = "categories";
  //   }
  //   fetchData(searchText, selectedTab);
  // };

  const handleChange = (event, newValue) => {
    setValue(newValue);

    let selectedTab = "all";
    if (newValue === 1) {
      selectedTab = "kitchen";
    } else if (newValue === 2) {
      selectedTab = "foods";
    } else if (newValue === 3) {
      selectedTab = "categories";
    }

    fetchData(searchText, selectedTab); // Fetch data based on selected tab
  };
  const isMobile = useIsMobile();

  useEffect(() => {
  

    if ((!isMobile) || (isMobile && searchText)) {
      fetchData(searchText, "all");
    }

  }, [searchText, coordinate]);
  const fetchData = async (query, tab) => {
    try {
      const response = await axios.get(
        `${BaseURL}/topbar-search?query=${query}&tab=${tab}&userLat=${coordinate.lat}&userLan=${coordinate.lon}`
      );
      setResults(response.data);
    } catch (error) {
      console.error("Error fetching search data:", error);
    }
  };

  const handleAdditionalChange = (e) => {
    setAdditionalInfo(e.target.value);
  };

  const handleAdditionalSubmit = (e) => {
    e.preventDefault();
    alert(`Additional Information Submitted: ${additionalInfo}`);
    setAdditionalInfo(""); // Clear the input after submission
  };

  const cart = useSelector((state) => state.cart.cartItems);

  const dispatch = useDispatch();
  const removeCartData = (id) => {
    dispatch(removeItem(id));
    toast.success("Food Remove successful!", {
      position: "bottom-center",
    });
  };

  const increaseQty = (item) => {
    dispatch(addItem(item));
  };

  const decreaseQty = (item) => {
    dispatch(decreaseItem(item));
  };

  const User = JSON.parse(localStorage.getItem("UserDetails"));

  const handleLogout = () => {
    // localStorage.clear();

    localStorage.removeItem("UserDetails");
    localStorage.removeItem("Token");
    window.location.reload(false);
  };

  let total = 0;
  let max = 0;
  for (let i = 0; i < cart?.length; i++) {
    let orderBeforeTime = cart[i]?.foodOrderBeforeTime;

    if (typeof orderBeforeTime === "string" && orderBeforeTime.includes("day")) {
      const days = parseInt(orderBeforeTime);
      orderBeforeTime = days * 24;
    }
    else if (typeof orderBeforeTime === "string" && orderBeforeTime.includes("hours")) {
      orderBeforeTime = parseInt(orderBeforeTime);
    }

    // Update the max orderBeforeTime
    if (orderBeforeTime > max) {
      max = orderBeforeTime;
    }

    // Calculate total price
    total = total + cart[i].foodQty * cart[i].foodSalePrice;
  }



  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    // let dateTime = selectedDate + selectedTime;
    if (!selectedDate || !selectedTime) return;


    // localStorage.setItem("orderTime", formattedDateTime);
  }, [selectedDate, selectedTime]);

  const checkOut = async () => {
    if (User) {
      try {
        await fetch(`${BaseURL}/create-cart-items`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ customerID: User?._id, cartItem: cart }),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.status === "Success") {
              navigate("/CheckOut");
              // <Navigate to={"/checkOut"} />;
              toast.success("Check Out successful!", {
                position: "bottom-center",
              });
            }
          });
      } catch (e) { }
    } else {
      navigate("/CustomerLogin");
    }
    //localStorage.setItem("checkOut", JSON.stringify({ cart, total }));
  };

  const location = useLocation();

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if lat and lon are undefined or null
    if (!coordinate?.lat || !coordinate?.lon) {
      Swal.fire({
        icon: "warning",
        title: "Location Not Found",
        text: "Enable your device location",
        showCancelButton: true,
        allowOutsideClick: false,
        allowEscapeKey: false,
        closeOnClickOutside: false,
        showConfirmButton: false,
      });
      return;
    }

    // Redirect if lat and lon are available
    window.location.href = `${FrontEndLink}/search?lat=${coordinate.lat}&lon=${coordinate.lon}&q=${searchText}`;
  };
  const [editingItem, setEditingItem] = useState(null);

  const handleEdit = (itemId) => {
    // alert()
    setEditingItem(itemId);
  };

  const handleInfoChange = (itemId, value) => {
    setAdditionalInfo((prev) => ({
      ...prev,
      [itemId]: value,
    }));
  };

  const handleSaveInfo = (itemId) => {


    let data = {
      additionalInfo: additionalInfo[itemId],
      id: itemId
    }
    dispatch(addAdditionalInfo(data))
    setEditingItem(null);
  };

  return (
    <>
      <header className="Header shadow">
        <ShowLocation
          userAddress={userAddress}
          setUserAddress={setUserAddress}
        />
        {/* ================== Nav Section ================== */}

        <div className="container-fluid">
          <div className="header-content">
            <div className="mobile-header ">
              {/* PROFILE AND CART SECTION START */}
              <div className="mobile-header-left-items">
                <button
                  className="header-widget header-cart d-lg-none "
                  title="Cartlist"
                  onClick={() => {
                    setState({ isPaneOpen: true });
                  }}
                >
                  <i
                    className="fas fa-shopping-basket"
                    style={{ fontSize: "1.5rem", marginRight: "12px" }}
                  ></i>
                  <sup>{cart?.length}</sup>
                </button>
                {User !== null ? (
                  <ul class="navbar-list bg-white d-lg-none">
                    <li class="navbar-item dropdown">

                      <a class="navbar-link" href="#">
                       
                        <img
                          src={
                            User?.userProfilePhoto?.length > 0
                              ? User?.userProfilePhoto[0]?.small?.imageUrl
                              :
                              "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                          }
                          alt="User Profile"
                          className="rounded-circle  top-0 end-0 m-2"
                          style={{ width: "50px", height: "50px", objectFit: "cover" }}
                        />
                      </a>
                      <ul class="dropdown-position-list" id="profDropDown">
                        <li>
                          <a target="_parent" href={DashBoardLink}>
                            Hi, {User?.userFullName?.split(" ")[0]}
                          </a>
                        </li>

                        <li>
                          <a target="_parent" href={DashBoardLink}>
                            {User.userMobileNo}
                          </a>
                        </li>
                        <hr style={{ margin: "0px" }} />
                        <li>
                          <a target="_parent" href={DashBoardLink}>
                            {/* {labels.profile.dashboard.bn} */}
                            {getTranslation(
                              "dashboard",
                              currentLanguage,
                              labels.profile
                            )}
                          </a>
                        </li>

                        <li>
                          <a href="#">
                            {/* {labels.profile.notification.bn} */}
                            {getTranslation(
                              "notification",
                              currentLanguage,
                              labels.profile
                            )}
                          </a>
                        </li>

                        <li>
                          <a onClick={() => handleLogout()}>
                            <i class="fa-solid fa-right-to-bracket me-1"></i>
                            {/* {labels.profile.logout.bn} */}
                            {getTranslation(
                              "logout",
                              currentLanguage,
                              labels.profile
                            )}
                          </a>
                        </li>
                      </ul>
                    </li>
                  </ul>
                ) : (
                  <div className="d-lg-none">
                    <Link to={"/CustomerLogin"}>
                      <button
                        type="button"
                        class="btnSign btn-primary p-2 mx-2"
                      // onClick={() => {
                      //   navigate("login");
                      // }}
                      >
                        {" "}
                        <i class="fa-solid fa-right-to-bracket me-1"></i>
                        {/* {signINLabel} */}
                        {getTranslation("signIN", currentLanguage, labels)}
                      </button>
                    </Link>
                  </div>
                )}
              </div>
              {/* PROFILE AND CART SECTION END */}

              {/* <div className="d-lg-none location-container"></div> */}
              <div className="mobile-header-right-items">
                <button
                  className="btn_barger"
                  onClick={(e) => {
                    e.preventDefault();
                    SetpanLeft(true);
                  }}
                >
                  <i class="fas fa-bars fa-lg "></i>
                </button>

                <Link to={"/"}>
                  <img src="/Assets/Img/Logo.png" alt="logo" className="logo" />
                </Link>
              </div>
            </div>

            <div className="dlg"></div>

            <div className=" d-flex justify-content-between nav-search-box mt-3 mb-2">
              <span
                className="zip-form ms-1"
                onClick={() => {
                  handleOpen();
                }}
              >
                <label
                  htmlFor="searchInput"
                  className="d-flex gap-3 justify-content-center align-items-center"
                >
                  <span style={{ fontSize: "16px", fontWeight: "normal" }}>
                    {getTranslation("searchurfood", currentLanguage, labels)}
                  </span>
                  <span>
                    <FaSearch className="search-icon" />
                  </span>
                </label>
              </span>
            </div>

            <nav class="nav  bg-white">
              <div class="container-fluid ">
                <div class="row">
                  <div class="col-12">
                    <div class="navbar-content">
                      <ul class="navbar-list bg-white">
                        <li className="navbar-item">
                          <a class="navbar-link " href="/earn-money">
                            {getTranslation(
                              "earnMoney",
                              currentLanguage,
                              labels
                            )}
                          </a>
                        </li>
                        {/* <li className="navbar-item">
                          <a
                            class="navbar-link "
                            href={`${FrontEndLink}/Category/64da6841bd44061552443a53`}
                          >
                            
                            {getTranslation(
                              "catering",
                              currentLanguage,
                              labels
                            )}
                          </a>
                        </li> */}

                        <li className="navbar-item">
                          <Link class="navbar-link " to={"/AllRecipe"}>
                            {/* //{labels.recipe.bn} */}
                            {getTranslation("recipe", currentLanguage, labels)}
                          </Link>
                        </li>
                      </ul>

                      {User !== null ? (
                        <ul class="navbar-list bg-white">
                          <li class="navbar-item dropdown">
                            <a class="navbar-link" href="#">
                              <img
                                src={
                                  User?.userProfilePhoto?.length > 0
                                    ? User?.userProfilePhoto[0]?.small?.imageUrl
                                    : "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                                }
                                alt="User Profile"
                                className="rounded-circle  top-0 end-0 m-2"
                                style={{ width: "50px", height: "50px", objectFit: "cover" }}
                              />
                            </a>
                            <ul
                              class="dropdown-position-list"
                              id="profDropDown"
                            >
                              <li>
                                <a target="_parent" href={DashBoardLink}>
                                  Hi, {User?.userFullName?.split(" ")[0]}
                                </a>
                              </li>

                              <li>
                                <a target="_parent" href={DashBoardLink}>
                                  {User.userMobileNo}
                                </a>
                              </li>
                              <hr style={{ margin: "0px" }} />
                              <li>
                                <a target="_parent" href={DashBoardLink}>
                                  {/* {labels.profile.dashboard.bn} */}
                                  {getTranslation(
                                    "dashboard",
                                    currentLanguage,
                                    labels.profile
                                  )}
                                </a>
                              </li>

                              <li>
                                <a href="#">
                                  {getTranslation(
                                    "notification",
                                    currentLanguage,
                                    labels.profile
                                  )}
                                </a>
                              </li>

                              <li>
                                <a href="#" onClick={() => handleLogout()}>
                                  <i class="fa-solid fa-right-to-bracket me-1"></i>
                                  {/* {labels.profile.logout.bn} */}
                                  {getTranslation(
                                    "logout",
                                    currentLanguage,
                                    labels.profile
                                  )}
                                </a>
                              </li>
                            </ul>
                          </li>
                        </ul>
                      ) : (
                        <div>
                          <Link to={"/CustomerRegistration"}>
                            <button type="button" class="btnopen btn-primary">
                              <i class="fa-solid fa-right-to-bracket me-1"></i>
                              {getTranslation(
                                "openAccount",
                                currentLanguage,
                                labels
                              )}
                            </button>
                          </Link>

                          <Link to={"/CustomerLogin"}>
                            <button
                              type="button"
                              class="btnSign btn-primary"
                            // onClick={() => {
                            //   navigate("login");
                            // }}
                            >
                              {" "}
                              <i class="fa-solid fa-right-to-bracket me-1"></i>
                              {/* {signINLabel} */}
                              {getTranslation(
                                "signIN",
                                currentLanguage,
                                labels
                              )}
                            </button>
                          </Link>
                        </div>
                      )}

                      <li className="navbar-item">
                        <div className="language-switcher">
                          <button
                            onClick={toggleLanguage}
                            className="d-flex align-items-center gap-1 text-white"
                          >
                            {currentLanguage === "bn" ? (
                              <img
                                src="/Assets/Img/countryflag/united-states.png"
                                alt=""
                                width="20"
                                height="20"
                              />
                            ) : (
                              <img
                                src="/Assets/Img/countryflag/bangladesh.png"
                                alt=""
                                width="20"
                                height="20"
                              />
                            )}
                            {currentLanguage === "en" ? "BN" : "EN"}
                          </button>
                        </div>
                      </li>

                      {location.pathname !== "/CheckOut" ? (
                        <>
                          <button
                            className="header-widget header-cart"
                            title="Cartlist"
                            onClick={() => {
                              setState({ isPaneOpen: true });
                            }}
                          >
                            <i className="fas fa-shopping-basket"></i>
                            <sup>{cart?.length}</sup>
                          </button>
                        </>
                      ) : null}
                    </div>
                  </div>
                </div>
              </div>
            </nav>
          </div>
        </div>

        <SideBar SetpanLeft={SetpanLeft} paneLeft={paneLeft} />

        {/* ================== drawer Right / Right Sidebar ================== */}
        <div>
          <SlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            isOpen={state.isPaneOpen}
            width="400px"
            onRequestClose={() => setState({ paneLeft: false })}
          >
            <aside className="cart-sidebar active">
              <div className="cart-header">
                <div className="cart-total">
                  <i className="fas fa-shopping-basket"></i>
                  <span>total item ({cart?.length})</span>
                </div>

                <button
                  className="cart-close"
                  onClick={() => {
                    setState({ isPaneOpen: false });
                  }}
                >
                  <span className="icofont-close">
                    <AiOutlineClose />
                  </span>
                </button>
              </div>
              <ul className="cart-list">
                {cart.length > 0 && (
                  <div className="kitchenName">
                    <h2>
                      {cart?.length > 0 &&
                        cart[0]?.sellerInfo &&
                        cart[0]?.sellerInfo[0]?.kitchenName}
                    </h2>
                  </div>
                )}
                <div>
                  {/* hello dev{max}
                  {Date} */}
                  {cart && cart[0]?.foodType === "PREORDER" && (
                    <CartDateSelect
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      max={max}
                    />
                  )}
                </div>
                {cart?.map((item, index) => (
                  <li className="cart-item" key={index}>
                    <div className="cart-media">
                      <a>
                        <img
                          src={item?.foodImage && item?.foodImage[0]?.extraLarge?.imageUrl}
                          alt="product"
                        />
                      </a>
                      <button
                        className="cart-delete"
                        onClick={() => removeCartData(item?._id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <div className="cart-info-group">
                      <div className="cart-info d-lg-flex justify-content-between align-content-center">
                        <div>
                          <h6>
                            <a href="#">{item?.foodName}</a>
                          </h6>

                          {item?.foodPrice !== item?.foodSalePrice && (
                            <p
                              style={{
                                color: "red",
                                textDecoration: "line-through",
                              }}
                            >
                              Price -
                              {currencyLabels.country === "Bangladesh"
                                ? currencyLabels.currency.bdt.symbol
                                : currencyLabels.currency.usa.symbol}
                              {item?.foodPrice}
                            </p>
                          )}

                          <p>
                            Price -
                            {currencyLabels.country === "Bangladesh"
                              ? currencyLabels.currency.bdt.symbol
                              : currencyLabels.currency.usa.symbol}
                            {item?.foodSalePrice}
                          </p>
                          {cart && cart[0]?.foodType === "PREORDER" && (
                            <p>Order Before {item?.foodOrderBeforeTime}</p>
                          )}
                        </div>
                        <div>
                          <span className="text-bold">{item.foodType}</span>
                        </div>
                      </div>
                      <div className="cart-action-group">
                        <div className="product-action">
                          <button
                            onClick={() => decreaseQty(item)}
                            className="action-minus"
                            title="Quantity Minus"
                          >
                            <FaMinus />
                          </button>

                          <span
                            className="action-input ps-1 pe-1 rounded"
                            style={{ backgroundColor: "#ead4d44f" }}
                          >
                            {item.foodQty}
                          </span>

                          <button
                            onClick={() => increaseQty(item)}
                            className="action-plus"
                            title="Quantity Plus"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <div>
                          <h6>
                            {currencyLabels.country === "Bangladesh"
                              ? currencyLabels.currency.bdt.symbol
                              : currencyLabels.currency.usa.symbol}
                            {item?.foodQty * item?.foodSalePrice}
                          </h6>
                        </div>
                      </div>
                      <div className="cart-edit">


                        {
                          item.additionalInfo && <p>{item.additionalInfo}</p>
                        }

                        {editingItem === item?._id ? (
                          <div className="d-flex gap-1">
                            <input
                              type="text"
                              className="form-control"
                              value={additionalInfo[item?._id] || ""}
                              onChange={(e) =>
                                handleInfoChange(item?._id, e.target.value)
                              }
                              placeholder="Write additional info"
                            />
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleSaveInfo(item?._id)}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            className="cart-edit-icon"
                            onClick={() => handleEdit(item?._id)}
                          >
                            <FaEdit />
                          </button>
                        )}
                      </div>
                      {/* <div>
                        {additionalInfo[item?._id] ? (
                          <div>
                            <p>{additionalInfo[item._id]}</p>
                            {editingItem === item?._id ? (
                              <div className="d-flex gap-1">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={additionalInfo[item?._id] || ""}
                                  onChange={(e) => handleInfoChange(item?._id, e.target.value)}
                                  placeholder="Write additional info"
                                />
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleSaveInfo(item?._id)}
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <button
                                className="cart-edit-icon"
                                onClick={() => handleEdit(item?._id)}
                              >
                                <FaEdit />
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            className="cart-edit-icon"
                            onClick={() => handleEdit(item?._id)}
                          >
                            <FaEdit />
                          </button>
                        )}
                      </div> */}

                    </div>
                  </li>
                ))}
                {/* <form onSubmit={handleAdditionalSubmit}>
                  <li>
                    <input
                      type="text"
                      placeholder="Additional Information:"
                      value={additionalInfo}
                      onChange={handleAdditionalChange}
                      className="form-control mt-3"
                    />
                  </li>
          
                </form> */}
              </ul>
              <div className="cart-footer">
                {/* <button className="coupon-btn">
                  
                  {getTranslation("couponTitle", currentLanguage, labels)}
                </button> */}
                {/* <form className="coupon-form">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit">
                    <span>
                      {getTranslation(
                        "couponTitle.btn",
                        currentLanguage,
                        labels
                      )}
                    </span>
                  </button>
                </form> */}

                {/* <Link to={"/CheckOut"} className='cart-checkout-btn'> */}
                <button
                  className="w-100 h-100 cart-checkout-btn"
                  onClick={() => {
                    setState({ isPaneOpen: false });
                    checkOut();
                  }}
                >
                  <span className="checkout-label">
                    {/* {labels.cartBTN.bn} */}
                    {getTranslation("cartBTN", currentLanguage, labels)}
                  </span>
                  <span className="checkout-price">
                    {currencyLabels.country === "Bangladesh"
                      ? currencyLabels.currency.bdt.symbol
                      : currencyLabels.currency.usa.symbol}
                    {total}
                  </span>
                </button>
                {/* </Link> */}
              </div>
            </aside>
          </SlidingPane>
        </div>

        {/* ================== Large Search ================== */}

        <div>
          {/* <Button onClick={handleOpen}>Open modal</Button> */}
          <Modal
            style={{ zIndex: 5 }}
            open={openSearch}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={{ ...style, overflow: "auto" }}>
              <div className="container-fluid">
                <div
                  className="d-flex  justify-content-between align-items-center"
                  id="searchModal"
                >
                  <a href="/" className="d-none d-lg-block">
                    <img
                      src={"/Assets/Img/Logo.png"}
                      style={{ width: 100, marginTop: -20 }}
                    />
                  </a>
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      SetpanLeft(true);
                    }}
                    style={{
                      height: 40,
                      // width: 40,
                      color: "#1b6dc1",
                    }}
                    className="d-none d-lg-block"
                  >
                    <i class="fas fa-bars fa-lg "></i>
                  </button>
                  <form
                    className="sf_search-form"
                    onSubmit={handleSubmit} // Attach the submit handler here
                  >
                    <input
                      id="searchInput"
                      type="text"
                      placeholder="Food, groceries, drinks, etc"
                      style={{ marginLeft: 5 }}
                      value={searchText}
                      onChange={handleInputChange}
                      onKeyUp={handleInputChange}
                    />

                    <button type="submit">
                      <i className="fas fa-search"></i>
                    </button>
                  </form>

                  {/* <form className="header-form "></form> */}
                  <button
                    type="button"
                    class="btn-close"
                    aria-label="Close"
                    onClick={() => {
                      handleClose();
                    }}
                  ></button>
                </div>
                <div className="mt-3">
                  {" "}
                  <Box className="container" sx={{ width: "100%", maxWidth: { xs: '65%', sm: '100%' } }}>
                    <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                      <Tabs style={isMobile ? { display: "none" } : {}} value={value} onChange={handleChange} aria-label="basic tabs example"

                        variant="scrollable" 
                        scrollButtons="auto"
                        textColor="primary"
                        indicatorColor="primary"
                      >
                        <Tab label="All" />
                        <Tab label="Kitchen" />
                        <Tab label="Food" />
                        <Tab label="Category" />
                      </Tabs>
                    </Box>


                    {value == 0 && (
                      <TabPanel value={value} index={0}>
                        <div className="container">
                          <div className="row">
                            {results.map((item, index) => (
                              <div style={{
                                borderRight: index !== results?.length - 1 && !isMobile ? "1px solid rgb(166, 163, 163)" : "none",
                              }}
                                key={index} className="col-12 col-md-4 mb-3">
                                <div className="tabcontents">
                                  {/* Kitchen Section */}
                                  {item?.kitchen?.length > 0 && (
                                    <>
                                      <h5>Kitchen</h5>
                                      <div className="d-flex flex-wrap">
                                        {item.kitchen.map((kitchen, kitchenIndex) => (
                                          <div
                                            key={kitchen._id}
                                            onClick={handleClose}
                                            className="d-flex align-items-center mt-3 col-6"
                                          >
                                            <Avatar>
                                              <Link to={`/SellerProfile/${kitchen?._id}`}>
                                                <img
                                                  src={
                                                    kitchen?.sellerProfilePhoto &&
                                                    kitchen?.sellerProfilePhoto[0]?.small?.imageUrl
                                                  }
                                                  alt={kitchen?.kitchenName || "Kitchen"}
                                                  className="img-fluid"
                                                />
                                              </Link>
                                            </Avatar>
                                            <Link to={`/SellerProfile/${kitchen?._id}`}>
                                              <span style={{ marginLeft: "12px" }}>
                                                {kitchen?.kitchenName.length < 10 ? kitchen?.kitchenName : `${kitchen.kitchenName.slice(0, 10)}...` || "N/A"}
                                              </span>
                                            </Link>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}

                                  {/* Food Section */}
                                  {item?.foods?.length > 0 && (
                                    <>
                                      <h5>Foods</h5>
                                      <div className="d-flex flex-wrap">
                                        {item.foods.map((food) => (
                                          <div
                                            key={food._id}
                                            onClick={handleClose}
                                            className="d-flex align-items-center mt-3 col-6"
                                          >
                                            <Avatar>
                                              <img
                                                src={
                                                  food?.foodImage && food?.foodImage[0]?.small?.imageUrl
                                                }
                                                alt={food.foodName || "Food"}
                                                className="img-fluid"
                                              />
                                            </Avatar>
                                            <Link to={`/ProductsDetails/${food._id}`}>
                                              <span style={{ marginLeft: "12px" }}>
                                                {food.foodName.length < 10 ? food.foodName : `${food.foodName.slice(0, 10)}...` || "N/A"}
                                              </span>
                                            </Link>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}

                                  {/* Category Section */}
                                  {item?.categories?.length > 0 && (
                                    <>
                                      <h5>Category</h5>
                                      <div className="d-flex flex-wrap">
                                        {item.categories.map((category) => (
                                          <div
                                            key={category._id}
                                            onClick={handleClose}
                                            className="d-flex align-items-center mt-3 col-6"
                                          >
                                            <Avatar>
                                              <img
                                                src={category?.categoryImage}
                                                alt={category.categoryName || "Category"}
                                                className="img-fluid"
                                              />
                                            </Avatar>
                                            <Link to={`/Category/${category._id}`}>
                                              <span style={{ marginLeft: "12px" }}>
                                                {category.categoryName.length < 10 ? category.categoryName : `${category.categoryName.slice(0, 10)}...` || "N/A"}

                                              </span>
                                            </Link>
                                          </div>
                                        ))}
                                      </div>
                                    </>
                                  )}
                                </div>
                              </div>
                            ))}

                          </div>
                        </div>
                      </TabPanel>




                    )}
                    {value == 1 && (
                      <TabPanel value={value} index={1}>
                        <div className="row tabcontents">
                          {results &&
                            results.map((item) => (
                              <div
                                onClick={() => handleClose()}
                                className="col-6 col-sm-4 col-md-4 col-lg-2 col-xl-2 mt-3 mb-3 mr-4 "
                              >
                                <div className="d-flex flex-start align-items-center">
                                  <Avatar>
                                    <img
                                      src={
                                        item?.sellerProfilePhoto &&
                                        item?.sellerProfilePhoto[0]?.small
                                          ?.imageUrl
                                      }
                                      alt=""
                                      className="img-fluid "
                                    />
                                  </Avatar>
                                  <Link
                                    component={Link}
                                    to={`/SellerProfile/${item?._id}`}
                                  >
                                    <span
                                      style={{
                                        padding: "5px",
                                        position: "relative",
                                        top: "8px",
                                        left: "12px",
                                      }}
                                    >
                                      {item?.kitchenName?.length < 10 ? item?.kitchenName : `${item?.kitchenName?.slice(0, 10)}...` || "N/A"}

                                      {/* {item?.kitchenName?.length !== 0
                                        ? item?.kitchenName
                                        : "N/A"} */}
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabPanel>
                    )}
                    {value == 2 && (
                      <TabPanel value={value} index={2}>
                        <div
                          onClick={() => handleClose()}
                          className="row tabcontents"
                        >
                          {results &&
                            results.map((item) => (
                              <div className="col-6 col-sm-4 col-md-4 col-lg-2 col-xl-2 mt-3 mb-3 mr-4">
                                <div className="d-flex flex-start align-items-center">
                                  <Avatar>
                                    <img
                                      src={
                                        item?.foodImage &&
                                        item?.foodImage[0]?.small?.imageUrl
                                      }
                                      alt=""
                                      className="img-fluid "
                                    />
                                  </Avatar>
                                  <Link
                                    component={Link}
                                    to={`/ProductsDetails/${item?._id}`}
                                  >
                                    <span
                                      style={{
                                        padding: "5px",
                                        position: "relative",
                                        top: "8px",
                                        left: "12px",
                                      }}
                                    >
                                      {item?.foodName?.length < 10 ? item?.foodName : `${item?.foodName?.slice(0, 10)}...` || "N/A"}
                                    </span>
                                  </Link>
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabPanel>
                    )}

                    {value == 3 && (
                      <TabPanel value={value} index={3}>
                        <div className="row tabcontents">
                          {results &&
                            results.map((item) => (
                              <div
                                onClick={() => handleClose()}
                                className="col-6 col-sm-4 col-md-4 col-lg-2 col-xl-2 mt-3 mb-3 mr-4"
                              >
                                <div className="d-flex flex-start align-items-center">
                                  <Avatar>
                                    <img
                                      src={
                                        item?.categoryImage &&
                                        item?.categoryImage
                                      }
                                      alt=""
                                      className="img-fluid "
                                    />
                                  </Avatar>
                                  <Link
                                    component={Link}
                                    to={`/Category/${item._id}`}
                                  >
                                    <span
                                      style={{
                                        padding: "5px",
                                        position: "relative",
                                        top: "8px",
                                        left: "12px",
                                      }}
                                    >
                                      {item?.categoryName?.length < 10 ? item?.categoryName : `${item?.categoryName?.slice(0, 10)}...` || "N/A"}

                                    </span>
                                  </Link>
                                </div>
                              </div>
                            ))}
                        </div>
                      </TabPanel>
                    )}
                  </Box>
                </div>
              </div>
            </Box>
          </Modal>
        </div>
      </header>
    </>
  );
};

export default Header;
