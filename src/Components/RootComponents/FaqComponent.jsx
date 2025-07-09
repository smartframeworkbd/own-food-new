import React from "react";
import Faq from "../ChildComponents/Faq";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const FaqComponent = () => {
  return (
    <>
      <Header />
      <div className='Space__For__Header'></div>
      <Faq />
      <Footer />
    </>
  );
};

export default FaqComponent;
