import React from 'react'
import { Outlet } from 'react-router-dom'
// import Footer from '../Common/Footer'
import useIsMobile from '../../customHooks/useIsMobile'
import BottomBar from '../../MobileLayout/BottomBar'
// import Header from '../Header'
import Footer from '../Footer/Footer'
import MobileHeader from '../MobileHeader/MobileHeader'
import NavigationBar from '../Header/Header'
const HomeLayout = () => {
  const isMobile = useIsMobile();
  return (
    <div>
      <div style={{ display: "block", '@media print': { display: "none" } }}>
        {/* <Header /> */}

        {
          isMobile? <MobileHeader/>:   <NavigationBar
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