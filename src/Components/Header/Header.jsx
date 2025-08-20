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
import { DashBoardLink } from '../../Helper/config';
import labels from "../../translationData/menu.json";
import getTranslation from "../../Helper/getTranslationUtility";

const NavigationBar = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const User = JSON.parse(localStorage.getItem("UserDetails"));
const [user, setUser] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  const [paneLeft, SetpanLeft] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
  });
  const handleOpen = () => setOpenSearch(true);
  const handleClose = () => setOpenSearch(false);
  const cart = useSelector((state) => state.cart.cartItems);


  const [selectedLang, setSelectedLang] = useState("en");
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelect = (lang) => {
    setCurrentLanguage(currentLanguage === "en" ? "bn" : "en");
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
const handleLogout = () => {
  localStorage.removeItem("UserDetails");
  localStorage.removeItem("Token");
  window.location.reload(false);
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
              <span>Earn Money</span>
              <span>

                <BanknoteArrowDown />
              </span>

            </Link>

            <Link to={'/all-food'} className="action-button">

              <span>  Order Now</span>
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

            <a target='_blank' className="text-link" href={`${DashBoardLink}/become-seller`}>Become a Seller</a>

            <a target='_blank' className="text-link" href={`${DashBoardLink}/become-rider`}>Join as a Hero</a>


            <button onClick={() => {
              setState({ isPaneOpen: true });
            }} className="cart-button">
              <ShoppingCart size={24} color="#6b7280" />
              <span className="cart-badge">
                {cart.length || 0}
              </span>
            </button>


           

            {
              user!=null  ? (
                <ul class="navbar-list bg-white ">
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
                </ul>) : <button className="login-button">
                <User2 size={16} color="#6b7280" />
                <span className="login-text"><Link to={'/CustomerLogin'}>Login</Link> / <Link to={'/CustomerRegistration'}>Join</Link></span>
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
