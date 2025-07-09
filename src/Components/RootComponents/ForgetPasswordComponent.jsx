import React from "react";
import ForgetPassword from "../ChildComponents/ForgetPassword";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const ForgetPasswordComponent = () => {
  return (
    <>
      <Header />
      <div className='Space__For__Header'></div>
      <ForgetPassword />
      <Footer />
    </>
  );
};

export default ForgetPasswordComponent;
