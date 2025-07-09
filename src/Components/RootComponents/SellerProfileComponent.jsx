import React from "react";
import SellerProfile from "../ChildComponents/SellerProfile";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const SellerProfileComponent = () => {
  return (
    <>
      <Header />
      <div className='Space__For__Header'></div>
      <SellerProfile />
      <Footer />
    </>
  );
};

export default SellerProfileComponent;
