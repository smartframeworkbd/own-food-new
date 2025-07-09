import React from "react";
import CustomerRegistration from "../ChildComponents/CustomerRegistration";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const CustomerRegistrationComponent = () => {
  return (
    <>
      <Header />
      <div className='Space__For__Header'></div>
      <CustomerRegistration />
      {/* <Footer /> */}
    </>
  );
};

export default CustomerRegistrationComponent;
