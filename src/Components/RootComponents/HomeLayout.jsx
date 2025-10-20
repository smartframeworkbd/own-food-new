import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
// import Footer from '../Common/Footer'
import useIsMobile from '../../customHooks/useIsMobile'
import BottomBar from '../../MobileLayout/BottomBar'
// import Header from '../Header'
import Footer from '../Footer/Footer'
import MobileHeader from '../MobileHeader/MobileHeader'
import NavigationBar from '../Header/Header'
import { useSelector } from 'react-redux'
const HomeLayout = () => {
  const isMobile = useIsMobile();
    const [paneLeft, SetpanLeft] = useState(false);
      const cart = useSelector((state) => state.cart.cartItems);
      const [state, setState] = useState({
    isPaneOpen: false,
  });
    const [userAddress, setUserAddress] = useState(null);

  return (
    <div>
      <div style={{ display: "block", '@media print': { display: "none" } }}>
        {/* <Header /> */}

        {
          isMobile? <MobileHeader userAddress={userAddress} setUserAddress={setUserAddress} paneLeft={paneLeft} SetpanLeft={SetpanLeft} cart={cart} state={state} setState={setState}/>: 
            <NavigationBar userAddress={userAddress} setUserAddress={setUserAddress}  state={state} setState={setState} cart={cart} paneLeft={paneLeft} SetpanLeft={SetpanLeft}
          />

        }
     
      </div>
      <div>
        <Outlet />
      </div>
      <div style={{ display: "block", '@media print': { display: "none" } }}>
        {!isMobile && <Footer/>}
        {
          isMobile && <BottomBar />
        }
      </div>
    </div>
  )
}

export default HomeLayout