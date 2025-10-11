import React, { useState, useEffect, useRef, useContext } from "react";
import { Navbar, Container, Button, Badge, Dropdown } from "react-bootstrap";
import { ShoppingCart, Menu, Globe, User2 } from "lucide-react";
import "./MobileHeader.css";
import logo from "../../assets/horizontalOwnfood.png";
import ShowLocation from "../Common/ShowLocation/ShowLocation";
import SideBar from "../Common/SideBar/SideBar";
import { Link } from "react-router-dom";
import DrawerRight from "../Header/DrawerRight";
import SearchBar from "../Header/SearchBar/SearchBar";
import { LanguageContext } from "../../Context/LanguageContext";
import { DashBoardLink } from "../../Helper/config";
import labels from "../../translationData/menu.json";
import getTranslation from "../../Helper/getTranslationUtility";

const MobileHeader = ({
  paneLeft,
  SetpanLeft,
  cart = [],
  state,
  setState,
  userAddress,
  setUserAddress,
}) => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const [user, setUser] = useState(null);

  // 🌐 Language Dropdown States
  const [selectedLang, setSelectedLang] = useState("bn");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang) => {
    setCurrentLanguage(lang);
    setSelectedLang(lang);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 👤 Handle user login state
  useEffect(() => {
    const checkUser = () => {
      const userData = JSON.parse(localStorage.getItem("UserDetails"));
      setUser(userData);
    };

    checkUser();
    window.addEventListener("storage", checkUser);
    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("UserDetails");
    localStorage.removeItem("Token");
    window.location.reload(false);
  };

  return (
    <>
      <SideBar SetpanLeft={SetpanLeft} paneLeft={paneLeft} />
      <DrawerRight cart={cart} state={state} setState={setState} />

      <div className="mobile-header-container shadow-sm sticky top-0">
        <ShowLocation setUserAddress={setUserAddress} userAddress={userAddress} />

        <Navbar bg="white" className="mobile-header">
          <Container className="justify-content-between align-items-center">
            {/* Left: menu + logo */}
            <div className="d-flex align-items-center gap-2">
              <div
                onClick={(e) => {
                  e.preventDefault();
                  SetpanLeft(true);
                }}
              >
                <Menu size={24} />
              </div>
              <div>
                <Link to={"/"}>
                  <img src={logo} alt="logo" className="horizontal-logo" />
                </Link>
              </div>
            </div>

            <div className="d-flex align-items-center gap-3">
              <div className="dropdown" ref={dropdownRef}>
                <button
                  className="btn btn-light dropdown-toggle d-flex align-items-center gap-1"
                  type="button"
                  onClick={toggleDropdown}
                >
                  <Globe size={15} /> <span>{selectedLang.toUpperCase()}</span>
                </button>

                <ul
                  className={`dropdown-menu ${isOpen ? "show" : ""}`}
                  style={{ minWidth: "auto" }}
                >
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSelect("bn")}
                    >
                      <img
                        style={{ width: "20px" }}
                        src="/Assets/Img/countryflag/bangladesh.png"
                        alt="Bangla"
                      />
                      BN
                    </button>
                  </li>
                  <li>
                    <button
                      className="dropdown-item d-flex align-items-center gap-2"
                      onClick={() => handleSelect("en")}
                    >
                      <img
                        style={{ width: "20px" }}
                        src="/Assets/Img/countryflag/united-states.png"
                        alt="English"
                      />
                      EN
                    </button>
                  </li>
                </ul>
              </div>

              {user ? (
                <Dropdown align="end">
                  <Dropdown.Toggle
                    variant="light"
                    id="dropdown-basic"
                    className="p-0 border-0"
                    style={{ height: "38px", width: "38px", overflow: "hidden" }}
                  >
                    <img
                      src={
                        user?.userProfilePhoto?.length > 0
                          ? user?.userProfilePhoto[0]?.extraLarge?.imageUrl
                          : "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                      }
                      alt="User Profile"
                      className="rounded-circle"
                      style={{ width: "38px", height: "38px", objectFit: "cover" }}
                    />
                  </Dropdown.Toggle>

                  <Dropdown.Menu>
                    <Dropdown.Item href={DashBoardLink}>
                      Hi, {user?.userFullName?.split(" ")[0]}
                    </Dropdown.Item>
                    <Dropdown.Item href={DashBoardLink}>{user?.userMobileNo}</Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Item href={DashBoardLink}>
                      {getTranslation("dashboard", currentLanguage, labels.profile)}
                    </Dropdown.Item>
                    <Dropdown.Item href="#">
                      {getTranslation("notification", currentLanguage, labels.profile)}
                    </Dropdown.Item>
                    <Dropdown.Item onClick={handleLogout} className="text-danger">
                      {getTranslation("logout", currentLanguage, labels.profile)}
                    </Dropdown.Item>
                  </Dropdown.Menu>
                </Dropdown>
                // <div className="dropdown">
                //   <button
                //   style={{height:"38px",width:"38px",overflow:"hidden"}}
                //     className="btn btn-light dropdown-toggle p-0 border-0"
                //     type="button"
                //     id="profileDropdown"
                //     data-bs-toggle="dropdown"
                //     aria-expanded="false"
                //   >
                //     <img
                //       src={
                //         user?.userProfilePhoto?.length > 0
                //           ? user?.userProfilePhoto[0]?.extraLarge?.imageUrl
                //           : "https://static.vecteezy.com/system/resources/thumbnails/002/002/403/small/man-with-beard-avatar-character-isolated-icon-free-vector.jpg"
                //       }
                //       alt="User Profile"
                //       className="rounded-circle"
                //       style={{ width: "38px", height: "38px", objectFit: "cover" }}
                //     />
                //   </button>
                //   <ul
                //     className="dropdown-menu dropdown-menu-end"
                //     aria-labelledby="profileDropdown"
                //   >
                //     <li>
                //       <a target="_parent" href={DashBoardLink} className="dropdown-item">
                //         Hi, {user?.userFullName?.split(" ")[0]}
                //       </a>
                //     </li>
                //     <li>
                //       <a target="_parent" href={DashBoardLink} className="dropdown-item">
                //         {user?.userMobileNo}
                //       </a>
                //     </li>
                //     <li><hr className="dropdown-divider" /></li>
                //     <li>
                //       <a target="_parent" href={DashBoardLink} className="dropdown-item">
                //         {getTranslation("dashboard", currentLanguage, labels.profile)}
                //       </a>
                //     </li>
                //     <li>
                //       <a href="#" className="dropdown-item">
                //         {getTranslation("notification", currentLanguage, labels.profile)}
                //       </a>
                //     </li>
                //     <li>
                //       <a
                //         href="#"
                //         onClick={handleLogout}
                //         className="dropdown-item text-danger"
                //       >
                //         {getTranslation("logout", currentLanguage, labels.profile)}
                //       </a>
                //     </li>
                //   </ul>
                // </div>
              ) : (
                <Button variant="light" className="d-flex align-items-center gap-1">
                  <User2 size={16} />
                  <span className="login-text">
                    <Link to={"/CustomerLogin"}>Login</Link> /{" "}
                    <Link to={"/CustomerRegistration"}>Join</Link>
                  </span>
                </Button>
              )}

              <div
                onClick={() => setState({ isPaneOpen: true })}
                className="position-relative cart-icon-wrapper"
              >
                <ShoppingCart size={22} />
                <Badge bg="primary" className="cart-badge">
                  {cart.length || 0}
                </Badge>
              </div>
            </div>
          </Container>
        </Navbar>

        {/* Search Bar */}
        <div className="px-3 py-2 bg-white">
          <SearchBar />
        </div>
      </div>
    </>
  );
};

export default MobileHeader;
