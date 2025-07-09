import React from "react";
import Header from "../Common/Header";
import CheckOut from "../ChildComponents/CheckOut";
import Footer from "../Common/Footer";

const CheckOutComponent = () => {
  return (
    <>
      {/* <Header /> */}
      <div className='Space__For__Header'></div>

      <CheckOut />

      {/* <Footer /> */}
    </>
  );
};

export default CheckOutComponent;
