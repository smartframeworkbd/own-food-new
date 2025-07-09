import React from "react";
import ResetPassword from "../ChildComponents/ResetPassword";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const ResetPasswordComponent = () => {
  return (
    <>
      <Header />
      <div className='Space__For__Header'></div>
      <ResetPassword />
      <Footer />
    </>
  );
};

export default ResetPasswordComponent;
