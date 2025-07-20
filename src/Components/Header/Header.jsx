import { Menu, ShoppingCart, User, ChevronDown, SearchXIcon, Search, BanknoteArrowDown, ShoppingCartIcon } from 'lucide-react';
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
const NavigationBar = () => {
    const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  
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

  // Close dropdown if clicked outside
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
     
            <a  target='_blank' className="text-link" href={`${DashBoardLink}/become-rider`}>Join as a Hero</a>


            <button onClick={() => {
              setState({ isPaneOpen: true });
            }} className="cart-button">
              <ShoppingCart size={24} color="#6b7280" />
              <span className="cart-badge">
                {cart.length || 0}
              </span>
            </button>

            <button className="login-button">
              <User size={16} color="#6b7280" />
              <span className="login-text"><Link to={'/CustomerLogin'}>Login</Link> / <Link to={'/CustomerRegistration'}>Join</Link></span>
            </button>

            <div className="dropdown" ref={dropdownRef}>
              <button
                className="btn btn-light dropdown-toggle d-flex align-items-center gap-1"
                type="button"
                onClick={toggleDropdown}
              >
                🌐 <span>{selectedLang}</span> 
                
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
                  >                    <img style={{width:'20px'}} src='/Assets/Img/countryflag/bangladesh.png'/>

                 BN
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item d-flex align-items-center gap-2"
                    onClick={() => handleSelect("en")}
                  >
                    <img style={{width:'20px'}} src='/Assets/Img/countryflag/united-states.png'/>
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
