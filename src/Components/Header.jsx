import { Menu, ShoppingCart, User, ChevronDown, SearchXIcon, Search, BanknoteArrowDown, ShoppingCartIcon } from 'lucide-react';
import logo from '../assets/ownfood.png';
import "./Header.css"
import SideBar from './Common/SideBar/SideBar';
import { useState } from 'react';
import DrawerRight from './Header/DrawerRight';
import ShowLocation from './Common/ShowLocation/ShowLocation';
import SearchBox from './Header/SearchBox';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import SearchBar from './Header/SearchBar/SearchBar';
const NavigationBar = () => {
  const [userAddress, setUserAddress] = useState(null);
  const [openSearch, setOpenSearch] = useState(false);

  const [paneLeft, SetpanLeft] = useState(false);
  const [state, setState] = useState({
    isPaneOpen: false,
  });
  const handleOpen = () => setOpenSearch(true);
  const handleClose = () => setOpenSearch(false);
  const cart = useSelector((state) => state.cart.cartItems);

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
            <button className="action-button">
              <span>Earn Money</span>
              <span>

                <BanknoteArrowDown />
              </span>

            </button>

            <button className="action-button">

              <span>  Order Now</span>
              <span>
                <ShoppingCartIcon />
              </span>

            </button>

            <button className="action-button">

              <span>Party Orders</span>
              <span>🎉</span>
            </button>
          </div>

          {/* Right Section - User Controls */}
          <div className="navbar-right">
            <a href="#" className="text-link">Become a Seller</a>

            <a href="#" className="text-link">Join as a Hero</a>

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
              <span className="login-text"><Link to={'/CustomerLogin'}>Login</Link> / <Link to={'/CustomerRegistration '}>Join</Link></span>
            </button>

            <button className="language-button">
              <span className="language-icon">🌐</span>
              <span className="language-text">ENG</span>
              <ChevronDown size={16} />
            </button>
          </div>
        </div>
      </nav>
    </>
  );
};

export default NavigationBar;
