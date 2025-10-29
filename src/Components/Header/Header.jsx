import { Menu, ShoppingCart, ChevronDown, SearchXIcon, Search, BanknoteArrowDown, ShoppingCartIcon, Globe, User2 } from 'lucide-react';
import logo from '../../assets/ownfood.png';
import "./Header.css"
import SideBar from '../Common/SideBar/SideBar';
import { useContext, useEffect, useRef, useState } from 'react';
import DrawerRight from './DrawerRight';
import ShowLocation from '../Common/ShowLocation/ShowLocation';
import SearchBox from './SearchBox';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './SearchBar/SearchBar';
import { LanguageContext } from '../../Context/LanguageContext';
import { BaseURL, DashBoardLink } from '../../Helper/config';
import labels from "../../translationData/menu.json";
import getTranslation from "../../Helper/getTranslationUtility";

const NavigationBar = ({ paneLeft, SetpanLeft, cart = [], state, setState, userAddress, setUserAddress }) => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const User = JSON.parse(localStorage.getItem("UserDetails"));
  const [user, setUser] = useState(null);
  // const [userAddress, setUserAddress] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  // const [paneLeft, SetpanLeft] = useState(false);

  // const handleOpen = () => setOpenSearch(true);
  const handleClose = () => setOpenSearch(false);
  // const cart = useSelector((state) => state.cart.cartItems);


  const [selectedLang, setSelectedLang] = useState(currentLanguage);
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);
  // console.log(currentLanguage,"language")

  const handleSelect = (lang) => {

    setCurrentLanguage(lang)
    setSelectedLang(lang);
    setIsOpen(false);
  };


  useEffect(() => {
    const checkUser = () => {
      const userData = JSON.parse(localStorage.getItem("UserDetails"));
      setUser(userData);
    };

    checkUser(); // On mount

    window.addEventListener("storage", checkUser);

    return () => window.removeEventListener("storage", checkUser);
  }, []);

  const handleLogout = async () => {
    try {
      await fetch(`${BaseURL}/logout`, {
        method: "POST",
        credentials: "include", // গুরুত্বপূর্ণ: কুকি পাঠানোর জন্য
      });

      // ✅ লোকাল স্টোরেজ / সেশন স্টোরেজ ক্লিয়ার করো
      localStorage.removeItem("user");    // নির্দিষ্ট item
      localStorage.removeItem("token");   // অথবা তোমার রাখা অন্য key
      // বা সব একসাথে:
      // localStorage.clear();
      localStorage.removeItem("UserDetails");
      localStorage.removeItem("Token");
      window.location.reload(false);
      sessionStorage.clear(); // যদি sessionStorage-এ কিছু থাকে

      // রিডাইরেক্ট বা UI আপডেট করো
      // window.location.href = "/login";
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  //   const handleLogout = () => {

  //     const handleLogout = async () => {
  //   try {
  //     await fetch("https://ownfood.localhost/logout", {
  //       method: "POST",
  //       credentials: "include", // গুরুত্বপূর্ণ: কুকি পাঠানোর জন্য
  //     });

  //     // ✅ লোকাল স্টোরেজ / সেশন স্টোরেজ ক্লিয়ার করো
  //     localStorage.removeItem("user");    // নির্দিষ্ট item
  //     localStorage.removeItem("token");   // অথবা তোমার রাখা অন্য key
  //     // বা সব একসাথে:
  //     // localStorage.clear();

  //     sessionStorage.clear(); // যদি sessionStorage-এ কিছু থাকে

  //     // রিডাইরেক্ট বা UI আপডেট করো
  //     window.location.href = "/login";
  //   } catch (error) {
  //     console.error("Logout failed:", error);
  //   }
  // };
  //     localStorage.removeItem("UserDetails");
  //     localStorage.removeItem("Token");
  //     window.location.reload(false);
  //   };
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);


  return (
    <>
      <SearchBox openSearch={openSearch} handleClose={handleClose} />
      <SideBar SetpanLeft={SetpanLeft} paneLeft={paneLeft} />
      <DrawerRight cart={cart} state={state} setState={setState} />
      <nav className="Header navbar">
        <ShowLocation
          userAddress={userAddress}
          setUserAddress={setUserAddress}
        />
        <div className="navbar-container">
          {/* Left Section - Menu and Logo */}
          <div className="navbar-left">
            <button onClick={(e) => {
              e.preventDefault();
              SetpanLeft(true);
            }} className="menu-button">
              <Menu size={24} color="#6b7280" />
            </button>
            <Link to={'/'} >
              <div className="logo-container">
                <div className="logo-icon">
                  <img src={logo} alt="Logo" />
                </div>
              </div>
            </Link>


            <div>
              <SearchBar />
            </div>
            {/* <div onClick={() => {
              handleOpen();
            }} className='search-icon'>
              <div className='search-icon-box'>
                <Search />

              </div>
            </div> */}
          </div>

          {/* Center Section - Action Buttons */}
          <div className="navbar-center">
            <Link to={'/earn-money'} className="action-button">
              <span> {getTranslation(
                "earnMoney",
                currentLanguage,
                labels
              )}</span>
              {/* earnMoney */}
              <span>

                <BanknoteArrowDown />
              </span>

            </Link>

            <Link to={'/all-food'} className="action-button">

              <span> {getTranslation(
                "orderNow",
                currentLanguage,
                labels
              )}</span>
              <span>
                <ShoppingCartIcon />
              </span>

            </Link>

            {/* <button className="action-button">

              <span>Party Orders</span>
              <span>🎉</span>
            </button> */}
          </div>

          {/* Right Section - User Controls */}
          <div className="navbar-right">

            <a target='_blank' className="text-link" href={`${DashBoardLink}/become-seller`}>{getTranslation(
              "becomeSeller",
              currentLanguage,
              labels
            )}</a>

            <a target='_blank' className="text-link" href={`${DashBoardLink}/become-rider`}>{getTranslation(
              "becomeRider",
              currentLanguage,
              labels
            )}</a>


            <button onClick={() => {
              setState({ isPaneOpen: true });
            }} className="cart-button">
              <ShoppingCart size={24} color="#6b7280" />
              <span className="cart-badge">
                {cart.length || 0}
              </span>
            </button>




            {
              user != null ? (
                <ul class="navbar-list bg-white ">
                  <li class="navbar-item dropdown">

                    <a class="navbar-link" href="#">

                      <img
                        src={
                          User?.userProfilePhoto?.length > 0
                            ? User?.userProfilePhoto[0]?.extraLarge?.imageUrl
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
                        <a style={{ cursor: "pointer" }} onClick={() => handleLogout()}>
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
                </ul>) : <button className="login-button">
                <User2 size={16} color="#6b7280" />
                <span className="login-text"><Link to={'/CustomerLogin'}>{getTranslation(
                  "signIN",
                  currentLanguage,
                  labels
                )}</Link> / <Link to={'/CustomerRegistration'}>{getTranslation(
                  "openAccount",
                  currentLanguage,
                  labels
                )}</Link></span>
              </button>
            }



            <div className="dropdown" ref={dropdownRef}>
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-1"
                type="button"
                onClick={toggleDropdown}
              >

                <Globe size={15} /> <span>{selectedLang}</span>

                {/* <ChevronDown size={16} /> */}
              </button>

              <ul
                className={`dropdown-menu ${isOpen ? "show" : ""}`}
                style={{ minWidth: "auto" }}
              >
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2"
                    onClick={() => handleSelect("bn")}
                  >                    <img style={{ width: '20px' }} src='/Assets/Img/countryflag/bangladesh.png' />

                    BN
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2"
                    onClick={() => handleSelect("en")}
                  >
                    <img style={{ width: '20px' }} src='/Assets/Img/countryflag/united-states.png' />
                    EN
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
