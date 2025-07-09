import React from "react";
import OTP from "../ChildComponents/OTP";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const OTPComponent = () => {
  return (
    <>
      <Header />
      <div className='Space__For__Header'></div>
      <OTP />
      <Footer />
    </>
  );
};

export default OTPComponent;
