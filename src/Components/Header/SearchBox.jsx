import React, { useEffect, useState } from 'react'
import Modal from "@mui/material/Modal";
import { Box } from '@mui/material';
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import useIsMobile from '../../customHooks/useIsMobile';
import Typography from "@mui/material/Typography";
import PropTypes from "prop-types";
import Avatar from "@mui/material/Avatar";
import { Link, Navigate, useLocation, useNavigate } from "react-router-dom";
import { BaseURL } from '../../Helper/config';
import { useSelector } from 'react-redux';
import axios from 'axios';
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
const SearchBox = ({handleClose,openSearch,SetpanLeft,handleSubmit}) => {
      const [results, setResults] = useState([]);
      const { coordinate, error } = useSelector((state) => state.location);
        const [searchText, setSearchText] = useState("");
      const [value, setValue] = useState(0);
    
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
    const fetchData = async (query, tab) => {
      try {
        const response = await axios.get(
          `${BaseURL}/topbar-search?query=${query}&tab=${tab}&userLat=${coordinate.lat}&userLan=${coordinate.lon}`
        );

        console.log(response.data,"from-header")
        setResults(response.data);
      } catch (error) {
        console.error("Error fetching search data:", error);
      }
    };

     const handleInputChange = (event) => {
      console.log(event.target.value)
    setSearchText(event.target.value);
  };

    const isMobile = useIsMobile();
  
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
 
      useEffect(() => {
      
    
        if ((!isMobile) || (isMobile && searchText)) {
          fetchData(searchText, "all");
        }
    
      }, [searchText, coordinate]);
  return (
    <div>
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
  )
}

export default SearchBox