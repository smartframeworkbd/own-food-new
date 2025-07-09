import React, { useState } from "react";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown";
import DropdownButton from "react-bootstrap/DropdownButton";

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
import { BsXLg } from "react-icons/bs";
import {
  addItem,
  decreaseItem,
  removeItem,
} from "../../Redux/State-slice/CartSlice";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { Uber_image } from "../../Database/ImgData";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { useEffect } from "react";
import { ErrorToast, SuccessToast } from "../../Helper/FormHelper";
import { setBannerList } from "../../Redux/State-slice/BannerSlice";
import { BaseURL } from "../../Helper/config";
import axios from "axios";
import PlacesAutocomplete from "react-places-autocomplete";
import {
  GetAllCategoryAPI,
  GetLimitedCategoryAPI,
} from "../../API/CategoryAPI";
import { GetLimitedSellerAPI } from "../../API/SellerAPI";
const Header = ({
  address,
  changeUserAddress,
  handleSelect,
  searchOptions,
  setUserAddress,
}) => {
  const [showSettings, setShowSettings] = useState(false);
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [show, setShow] = useState(false);
  const toggleOffcanvas = () => {
    setShow(!show);
  };
  // const [show, setShow] = useState(false);

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
  const [zip, SetZip] = useState(false);

  useEffect(() => {
    GetAllCategoryAPI();

    GetLimitedCategoryAPI(4);
    GetLimitedSellerAPI(2);
  }, []);
  let allCategory = useSelector((state) => state.category.allCategoryList);
  let limitedCategory = useSelector(
    (state) => state.category.limitedCategoryList
  );
  let limitedSeller = useSelector((state) => state.seller.limitedSellerList);
  // const getCategory =async ()=>{
  //   const data = await axios.get('http://localhost:5000/api/v1/get-category/10')

  // }
  //In Location details popup show previous address
  const [showLocationDiv, setLocationDiv] = useState(true);

  const toggleDivs = () => {
    setLocationDiv(!showLocationDiv);
  };

  const closeZipCodePopup = () => {
    setLocationDiv(true);
    SetZip(!zip);
  };

  const zipControl = () => {
    SetZip(!zip);
    // localStorage.removeItem('address')
  };

  const style = {
    position: "absolute",
    top: "0%",
    width: "100%",
    bgcolor: "background.paper",
    //   border: "2px solid #000",
    boxShadow: 24,
    height: 500,
    p: 4,
  };

  function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
      <div
        role='tabpanel'
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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const cart = useSelector((state) => state.cart);

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
    window.location.reload(false);
  };

  let total = 0;
  for (let i = 0; i < cart.length; i++) {
    total = total + cart[i].foodQty * cart[i].foodPrice;
  }
  useEffect(() => {
    localStorage.setItem("cartList", JSON.stringify(cart));
  }, [cart]);

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
      } catch (e) {}
    }
    //localStorage.setItem("checkOut", JSON.stringify({ cart, total }));
  };
  // useEffect(() => {}, []);
  const location = useLocation();

  return (
    <header className='Header shadow'>
      {/* ================== Nav Section ================== */}
      <div className='container-fluid'>
        <div className=' header-content'>
          <Link to={"/"}>
            <img src='/Assets/Img/Logo.png' alt='logo' className='logo' />
          </Link>

          <button
            className='btn_barger'
            onClick={(e) => {
              e.preventDefault();
              SetpanLeft(true);
            }}
          >
            <i class='fas fa-bars fa-lg '></i>
          </button>

          <div className='zipCode position-relative'>
            <div>
              <div className='zipCodeBtn' onClick={zipControl}>
                <span>
                  <FaMapMarkerAlt />
                </span>
                <span className='ps-2'>{address}</span>
              </div>
              <div className={zip ? "zipCodePopup active" : "zipCodePopup"}>
                <div className='d-flex justify-content-center'>
                  <div className='zipCode_input position-relative '>
                    <div className='w-100'>
                    <div>
                        <h2>Location details</h2>
                        {showLocationDiv ? (
                        <div>
                          <div className='d-flex justify-content-between mt-4'>
                            <div>
                              <span>
                                <FaMapMarkerAlt />
                              </span>
                              <span className='ps-1 '>{address}</span>
                            </div>
                            <div>
                              <span className='zipCodeBtn' onClick={toggleDivs}>Change</span>
                            </div>
                          </div>
                        </div>
                        ) : (
                        <div>
                          <div className='d-flex justify-content-between mt-4'>
                            <div>
                              <span>
                                <FaMapMarkerAlt />
                              </span>
                              <span className='ps-1 '>
                              <PlacesAutocomplete
                                searchOptions={searchOptions}
                                value={changeUserAddress}
                                onChange={setUserAddress}
                                onSelect={handleSelect}
                              >
                                {({
                                  getInputProps,
                                  suggestions,
                                  getSuggestionItemProps,
                                  loading,
                                }) => (
                                  <div>
                                    <input
                                      {...getInputProps({
                                        placeholder: "Search Places ...",
                                        className: "location-search-input",
                                      })}
                                    />
                                    <div className='autocomplete-dropdown-container'>
                                      {loading && <div>Loading...</div>}
                                      {suggestions.map((suggestion) => {
                                        const className = suggestion.active
                                          ? "suggestion-item--active"
                                          : "suggestion-item";
                                        // inline style for demonstration purpose
                                        const style = suggestion.active
                                          ? {
                                              backgroundColor: "#fafafa",
                                              cursor: "pointer",
                                            }
                                          : {
                                              backgroundColor: "#ffffff",
                                              cursor: "pointer",
                                            };
                                        return (
                                          <div
                                            {...getSuggestionItemProps(
                                              suggestion,
                                              {
                                                className,
                                                style,
                                              }
                                            )}
                                          >
                                            <span>
                                              {suggestion.description}
                                            </span>
                                          </div>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </PlacesAutocomplete>
                              </span>
                            </div>
                          </div>
                        </div>
                        )}
                        <div></div>

                        <Button className='btn_done aligns-items-center' onClick={closeZipCodePopup}>
                          Done
                        </Button>

                        <div className='filterBtn  mt-4'>
                          <div className=' d-flex justify-content-center'>
                            <span>Filter</span>
                          </div>
                        </div>
                      </div>
                      <div
                        className='closeIcon position-absolute'
                        onClick={closeZipCodePopup}
                      >
                        <span>
                          <BsXLg />
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className=' d-flex justify-content-between  '>
            <span
              className='zip-form ms-1'
              onClick={() => {
                handleOpen();
              }}
            >
              <label
                htmlFor='searchInput'
                className='d-flex gap-3 justify-content-center align-items-center'
              >
               
                <span>Search Food Drinks...</span>
                <span>
                  <FaSearch />
                </span>
              

                {/* <input placeholder=' Search Food Drinks...' /> */}
              </label>
            </span>
          </div>

          <nav class='nav  bg-white'>
            <div class='container-fluid '>
              <div class='row'>
                <div class='col-12'>
                  <div class='navbar-content'>
                    <ul class='navbar-list bg-white'>
                      <li class='navbar-item dropdown'>
                        <a class='navbar-link' href='#'>
                          ALL FOOD <FaAngleDown />
                        </a>
                        <ul class='dropdown-position-list'>
                          {
                            allCategory && allCategory.map(item=><li>
                              <a href={`/Category/${item?._id}`}>{item?.categoryName}</a>
                            </li>)
                          }
                          {/* <li>
                            <a href='#'>Popular Kitchen</a>
                          </li>
                          <li>
                            <a href='#'>Instant Food</a>
                          </li>
                          <li>
                            <a href='#'>Pre-Order Food</a>
                          </li>
                          <li>
                            <a href='#'>Wish Order</a>
                          </li>
                          <li>
                            <a href='#'>Catering Food</a>
                          </li>
                          <li>
                            <a href='#'>Find us in these state</a>
                          </li>
                          <li>
                            <a href='#'>All Categories</a>
                          </li> */}
                        </ul>
                      </li>

                      <li className='navbar-item'>
                        <a class='navbar-link ' href='#'>
                          CATERING
                        </a>
                      </li>

                      <li className='navbar-item'>
                        <a class='navbar-link ' href='#'>
                          RECIPE
                        </a>
                      </li>

                      <li className='navbar-item'>
                        <a class='navbar-link ' href='#'>
                          DIARY
                        </a>
                      </li>
                    </ul>
                    {/* <div
                      className='user-card'
                      onMouseEnter={() => setShowSettings(true)}
                      onMouseLeave={() => setShowSettings(false)}
                    >
                      <div className='username'>{User.userFullName}</div>
                      {User && <div className='settings'>{User.userFullName}</div>}
                    </div> */}

                    {User !== null ? (
                      <>
                        <button
                          type='button'
                          onClick={() => handleLogout()}
                          class='btnSign btn-primary'
                        >
                          {" "}
                          <i class='fa-solid fa-right-to-bracket me-1'></i>
                          Logout
                        </button>
                        {/* <button
                          className='header-widget header-cart '
                          title='Cartlist'
                          onClick={() => {
                            setState({ isPaneOpen: true });
                          }}
                        >
                          <i className='fas fa-shopping-basket'></i>
                          <sup>{cart?.length}</sup>
                        </button> */}
                      </>
                    ) : (
                      <div>
                        <Link to={"/CustomerRegistration"}>
                          <button type='button' class='btnopen btn-primary'>
                            <i class='fa-solid fa-right-to-bracket me-1'></i>
                            Open Your Account
                          </button>
                        </Link>

                        <Link to={"/CustomerLogin"}>
                          <button
                            type='button'
                            class='btnSign btn-primary'
                            onClick={() => {
                              navigate("login");
                            }}
                          >
                            {" "}
                            <i class='fa-solid fa-right-to-bracket me-1'></i>
                            Sign In
                          </button>
                        </Link>
                      </div>
                    )}
                    {location.pathname !== "/CheckOut" ? (
                      <>
                        {" "}
                        <button
                          className='header-widget header-cart '
                          title='Cartlist'
                          onClick={() => {
                            setState({ isPaneOpen: true });
                          }}
                        >
                          <i className='fas fa-shopping-basket'></i>
                          <sup>{cart?.length}</sup>
                        </button>
                      </>
                    ) : null}

                    <div>
                      {/* <Link to={"/CustomerRegistration"}>
                        <button type='button' class='btnopen btn-primary'>
                          <i class='fa-solid fa-right-to-bracket me-1'></i>
                          Open Your Account
                        </button>
                      </Link> */}

                      {/* <Link to={"/CustomerLogin"}>
                        <button
                          type='button'
                          class='btnSign btn-primary'
                          onClick={() => {
                            navigate("login");
                          }}
                        >
                          {" "}
                          <i class='fa-solid fa-right-to-bracket me-1'></i>
                          Sign In
                        </button>
                      </Link>

                      <button
                        className='header-widget header-cart '
                        title='Cartlist'
                        onClick={() => {
                          setState({ isPaneOpen: true });
                        }}
                      >
                        <i className='fas fa-shopping-basket'></i>
                        <sup>{cart?.length}</sup>
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </nav>
        </div>
      </div>

      {/* ================== Drawer Left /Left Sidebar ================== */}
      <div style={{ zIndex: 999 }}>
        <SlidingPane
          className='slidingpaneLeft'
          isOpen={paneLeft}
          from='left'
          width='320px'
          z-Index='27'
          onRequestClose={() => SetpanLeft(false)}
        >
          <div className='d-flex'>
            <div className='row'>
              <div className='col-md-10'>
                <a href='https://ownfood.hostdivine.com/'>
                  {" "}
                  <img
                    src={"/Assets/Img/ownfood.png"}
                    className='img-fluid'
                    alt=''
                  />
                </a>
              </div>
              <div className='col-md-2'>
                {" "}
                <button
                  class=''
                  onClick={() => {
                    SetpanLeft(false);
                  }}
                >
                  <i class='icofont-close'></i>
                </button>
              </div>
            </div>
          </div>

          <div className='sidebar overflow-hidden'>
            <div>
              <div className='sidebar-item mt-5'>
                <div className='sidebar-title'>
                  <span>EARN MONEY</span>
                </div>
              </div>

              <div className='sidebar-item'>
                <div className='sidebar-title' onClick={handleShow}>
                  <span>ALL FOOD</span>
                  <FaAngleRight size={25} />
                </div>
              </div>

              <div className='sidebar-item'>
                <div className='sidebar-title'>
                  <span>CATERING</span>
                </div>
              </div>

              <div className='sidebar-item'>
                <Link to={"/Faq"} className='d-block'>
                  <div className='sidebar-title'>
                    <span>FAQ</span>
                  </div>
                </Link>
              </div>

              <div className='sidebar-item'>
                <div className='sidebar-title'>
                  <span>Dairy</span>
                </div>
              </div>
              <div className='sidebar-item'>
                <div className='sidebar-title'>
                  <span>
                    <a
                      href='https://seller.envyfy.com/'
                      style={{ color: "black" }}
                    >
                      {" "}
                      My DashBoard{" "}
                    </a>{" "}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </SlidingPane>
      </div>

      <Offcanvas
        show={show}
        toggleOffcanvas={toggleOffcanvas}
        onHide={handleCloseSidebar}
        style={{ width: 319 }}
      >
        <Offcanvas.Header>
          <Offcanvas.Title>
            <div className='d-flex align-items-center ms-4'>
              <div onClick={toggleOffcanvas}>
                {" "}
                <FaArrowLeft />
              </div>
              <div className='ms-5'>
                {" "}
                <h4>Main Menu</h4>
              </div>
            </div>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          {allCategory.map((item) => (
            <div className='sidebar-item'>
              <div className='sidebar-title'>
                {" "}
                <a href={`/Category/${item?._id}`}>{item.categoryName}</a>
              </div>
            </div>
          ))}
          {/* <div className='secoundTitle'> ALL FOOD</div> */}
        </Offcanvas.Body>
      </Offcanvas>

      {/* ================== drawer Right / Right Sidebar ================== */}
      <div>
        <SlidingPane
          className='some-custom-class'
          overlayClassName='some-custom-overlay-class'
          isOpen={state.isPaneOpen}
          width='400px'
          onRequestClose={() => setState({ paneLeft: false })}
        >
          <aside className='cart-sidebar active  '>
            <div className='cart-header'>
              <div className='cart-total'>
                <i className='fas fa-shopping-basket'></i>
                <span>total item ({cart?.length})</span>
              </div>

              <button
                className='cart-close'
                onClick={() => {
                  setState({ isPaneOpen: false });
                }}
              >
                <span className='icofont-close'>
                  <AiOutlineClose />
                </span>
              </button>
            </div>
            <ul className='cart-list'>
              {cart?.map((item, index) => (
                <li className='cart-item' key={index}>
                  <div className='cart-media'>
                    <a href='javascript:void(0)'>
                      <img
                        src={item?.foodImage[0].orginalImageUrl}
                        alt='product'
                      />
                    </a>
                    <button
                      className='cart-delete'
                      onClick={() => removeCartData(item?._id)}
                    >
                      <i className='far fa-trash-alt'></i>
                    </button>
                  </div>
                  <div className='cart-info-group'>
                    <div className='cart-info'>
                      <h6>
                        <a href='product-single.html'>{item?.foodName}</a>
                      </h6>
                      <p>Price - ${item?.foodPrice}</p>
                    </div>
                    <div className='cart-action-group'>
                      <div className='product-action'>
                        <button
                          onClick={() => decreaseQty(item)}
                          className='action-minus'
                          title='Quantity Minus'
                        >
                          <FaMinus />
                        </button>

                        <span
                          className='action-input ps-1 pe-1 rounded'
                          style={{ backgroundColor: "#ead4d44f" }}
                        >
                          {item.foodQty}
                        </span>

                        <button
                          onClick={() => increaseQty(item)}
                          className='action-plus'
                          title='Quantity Plus'
                        >
                          <FaPlus />
                        </button>
                      </div>
                      <h6>${item?.foodQty * item?.foodPrice}</h6>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
            <div className='cart-footer'>
              <button className='coupon-btn'>Do you have a coupon code?</button>
              <form className='coupon-form'>
                <input type='text' placeholder='Enter your coupon code' />
                <button type='submit'>
                  <span>apply</span>
                </button>
              </form>
              {User ? (
                <button className='cart-checkout-btn' onClick={checkOut}>
                  <span className='checkout-label'>Proceed to Checkout</span>
                  <span className='checkout-price'>${total}</span>
                </button>
              ) : (
                <Link to={"/CheckOut"}>
                  <button className='cart-checkout-btn' onClick={checkOut}>
                    <span className='checkout-label'>Proceed to Checkout</span>
                    <span className='checkout-price'>${total}</span>
                  </button>
                </Link>
              )}
              {/* <Link to={"/CheckOut"}> */}
              {/* <button className='cart-checkout-btn' onClick={checkOut}>
                <span className='checkout-label'>Proceed to Checkout</span>
                <span className='checkout-price'>${total}</span>
              </button> */}
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
          aria-labelledby='modal-modal-title'
          aria-describedby='modal-modal-description'
        >
          <Box sx={style}>
            <div className='container-fluid'>
              <div className='d-flex  justify-content-between align-items-center'>
                <a href='https://ownfood.hostdivine.com'>
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
                >
                  <i class='fas fa-bars fa-lg '></i>
                </button>
                <form className='sf_search-form'>
                  <input
                    id='searchInput'
                    type='text'
                    placeholder='Food, groceries, drinks, etc'
                    style={{ marginLeft: 5 }}
                  />
                  <button>
                    <i className='fas fa-search'></i>
                  </button>
                </form>

                {/* <form className="header-form "></form> */}
                <button
                  type='button'
                  class='btn-close'
                  aria-label='Close'
                  onClick={() => {
                    handleClose();
                  }}
                ></button>
              </div>
              <div className='mt-3'>
                {" "}
                <Box className='container' sx={{ width: "71%" }}>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    <Tabs
                      value={value}
                      onChange={handleChange}
                      aria-label='basic tabs example'
                    >
                      <Tab label='All' {...a11yProps(0)} />
                      <Tab label='Kitchen' {...a11yProps(1)} />
                      {/* <Tab label='Grocery' {...a11yProps(2)} /> */}
                    </Tabs>
                  </Box>
                  <TabPanel value={value} index={0}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {limitedCategory &&
                        limitedCategory.map((item) => (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                {/* <ImageIcon /> */}
                                <img
                                  src={item.categoryImage}
                                  alt=''
                                  className='img-fluid'
                                />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.categoryName}
                              // secondary='Jan 9, 2014'
                            />
                          </ListItem>
                        ))}
                    </List>
                  </TabPanel>
                  <TabPanel value={value} index={1}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      {limitedSeller &&
                        limitedSeller.map((item) => (
                          <ListItem>
                            <ListItemAvatar>
                              <Avatar>
                                <img
                                  src={
                                    item?.sellerProfilePhoto[0]?.small?.imageUrl
                                  }
                                  alt=''
                                  className='img-fluid'
                                />
                              </Avatar>
                            </ListItemAvatar>
                            <ListItemText
                              primary={item.kitchenName}
                              // secondary='Jan 9, 2014'
                            />
                          </ListItem>
                        ))}
                      {/* <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary='Photos'
                          secondary='Jan 9, 2014'
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Work' secondary='Jan 7, 2014' />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <BeachAccessIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary='Vacation'
                          secondary='July 20, 2014'
                        />
                      </ListItem> */}
                    </List>
                  </TabPanel>
                  {/* <TabPanel value={value} index={2}>
                    <List
                      sx={{
                        width: "100%",
                        maxWidth: 360,
                        bgcolor: "background.paper",
                      }}
                    >
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <ImageIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary='Photos'
                          secondary='Jan 9, 2014'
                        />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <WorkIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText primary='Work' secondary='Jan 7, 2014' />
                      </ListItem>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar>
                            <BeachAccessIcon />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText
                          primary='Vacation'
                          secondary='July 20, 2014'
                        />
                      </ListItem>
                    </List>
                  </TabPanel> */}
                </Box>
              </div>
            </div>
          </Box>
        </Modal>
      </div>
    </header>
  );
};

export default Header;
