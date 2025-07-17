import React from "react";
import CustomerLogin from "../ChildComponents/CustomerLogin";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const CustomerLoginComponent = () => {
  return (
    <>
      {/* <Header /> */}
      <div className='Space__For__Header'></div>
      <CustomerLogin />
      {/* <Footer /> */}
    </>
  );
};

export default CustomerLoginComponent;
