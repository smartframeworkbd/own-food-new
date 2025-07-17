import SlidingPane from "react-sliding-pane";
import { useContext, useState, useEffect } from "react";
import { FaAngleRight } from "react-icons/fa";
import { Link } from "react-router-dom";
import OffcanvasSideBar from "./OffcanvasSideBar";
import { useSelector } from "react-redux";
import { GetAllCategoryAPI } from "../../../API/CategoryAPI";
import getTranslation from "../../../Helper/getTranslationUtility";
import labels from "../../../translationData/menu.json";
import { LanguageContext } from "../../../Context/LanguageContext";
import { DashBoardLink, FrontEndLink } from "../../../Helper/config";
import { FiPhoneCall } from "react-icons/fi";

const SideBar = ({ SetpanLeft, paneLeft }) => {


  const [show, setShow] = useState(false);
  const handleShow = () => setShow(true);
  const toggleOffcanvas = () => setShow(!show);
  const handleCloseSidebar = () => setShow(false);

  const User = JSON.parse(localStorage.getItem("UserDetails"));

  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  useEffect(() => {
    GetAllCategoryAPI();
  }, []);

  let data = useSelector((state) => state.category.allCategoryList);

  const handleLogout = () => {
    // localStorage.clear();

    localStorage.removeItem("UserDetails");
    localStorage.removeItem("Token");
    window.location.reload(false);
  };

  return (
    <>
      <div style={{ zIndex: 999 }}>
        <SlidingPane
          className="slidingpaneLeft"
          isOpen={paneLeft}
          from="left"
          onRequestClose={() => SetpanLeft(false)}
          width={window.innerWidth >= 768 ? "320px" : "85%"}
        >
          <div className="slidingpane-content d-flex flex-column h-100">
            {/* Top Section */}
            <div>
              <div className="d-flex">
                <div className="row">
                  <div className="col-md-10 mb-2 mt-1">
                    <a href={FrontEndLink}>
                      <img
                        src={"/Assets/Img/Logo.png"}
                        className="img-fluid w-50"
                        alt=""
                      />
                    </a>
                  </div>
                  <div className="col-md-2">
                    <button
                      className=""
                      onClick={() => {
                        SetpanLeft(false);
                      }}
                    >
                      <i className="icofont-close"></i>
                    </button>
                  </div>
                </div>
              </div>

              <div className="sidebar overflow-hidden">
                {/* Sidebar Items */}
                <div className="sidebar-item">
                  <Link
                    to={"/earn-money"}
                    className="d-block"
                    onClick={() => SetpanLeft(false)} // Close sidebar on click
                  >
                    <div className="sidebar-title">
                      <span>
                        {getTranslation("earnMoney", currentLanguage, labels)}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="sidebar-item">
                  <div className="sidebar-title" onClick={handleShow}>
                    <span>
                      {getTranslation("category", currentLanguage, labels)}
                    </span>
                    <FaAngleRight size={25} />
                  </div>
                </div>
               
                <div className="sidebar-item">
                  <Link
                    to={"/AllRecipe"}
                    className="d-block"
                    onClick={() => SetpanLeft(false)} // Close sidebar on click
                  >
                    <div className="sidebar-title">
                      <span>
                        {getTranslation("recipe", currentLanguage, labels)}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="sidebar-item">
                  <Link
                    to={"/about-us"}
                    className="d-block"
                    onClick={() => SetpanLeft(false)} // Close sidebar on click
                  >
                    <div className="sidebar-title">
                      <span>
                        {getTranslation("about-us", currentLanguage, labels)}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="sidebar-item">
                  <Link
                    to={"/contact-us"}
                    className="d-block"
                    onClick={() => SetpanLeft(false)} // Close sidebar on click
                  >
                    <div className="sidebar-title">
                      <span>
                        {getTranslation("contact-us", currentLanguage, labels)}
                      </span>
                    </div>
                  </Link>
                </div>
                <div className="sidebar-item">
                  <Link
                    to={"/terms"}
                    className="d-block"
                    onClick={() => SetpanLeft(false)} // Close sidebar on click
                  >
                    <div className="sidebar-title">
                      <span>
                        {getTranslation(
                          "termsCondition",
                          currentLanguage,
                          labels
                        )}
                      </span>
                    </div>
                  </Link>
                </div>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="mt-auto p-3">
              {User !== null ? (
                <div>
                  <div className="d-flex align-items-center gap-1">
                    <img
                      src={User?.userProfilePhoto && User?.userProfilePhoto[0]?.orginalImageUrl}
                      alt=""
                      width="70px"
                    />

                    <div>
                      <h6 style={{fontSize:"14px"}}>Hi, {User?.userFullName}</h6>
                      <h6 style={{fontSize:"14px", marginTop:"-7px"}}>{User?.userMobileNo}</h6>
                    </div>
                  </div>

                  <button
                    className="sidebarLogoutbtn"
                    onClick={() => handleLogout()}
                  >
                    <i class="fa-solid fa-right-to-bracket me-1"></i>
                    {/* {labels.profile.logout.bn} */}
                    {getTranslation("logout", currentLanguage, labels.profile)}
                  </button>
                </div>
              ) : (
                <div>
                  <Link to={"/CustomerRegistration"}>
                    <button className="sidebarLogoutbtn">
                      <i class="fa-solid fa-right-to-bracket me-1"></i>
                      {getTranslation("openAccount", currentLanguage, labels)}
                    </button>
                  </Link>

                  <Link to={"/CustomerLogin"}>
                    <button className="sidebarLogoutbtn ms-2">
                      {" "}
                      <i class="fa-solid fa-right-to-bracket me-1"></i>
                      {getTranslation("signIN", currentLanguage, labels)}
                    </button>
                  </Link>
                </div>
              )}
              <h6>
                <FiPhoneCall /> Helpline:{" "}
                <a style={{ color: "black" }} href="tel:+8809643123456">
                  +8809643123456
                </a>
              </h6>
              <h6 className="d-lg-none mt-1 mb-1">App Version: 1.1.1.1</h6>
            </div>
          </div>
        </SlidingPane>
      </div>

      <OffcanvasSideBar
        show={show}
        toggleOffcanvas={toggleOffcanvas}
        handleCloseSidebar={handleCloseSidebar}
        data={data}
      />
    </>
  );
};

export default SideBar;
