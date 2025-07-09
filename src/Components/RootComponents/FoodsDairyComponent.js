import React from "react";
import Header from "../Common/Header";
import FoodsDairy from "../ChildComponents/FoodsDairy";
import Footer from "../Common/Footer";

const FoodsDairyComponent = () => {
  return (
    <>
      {/* <Header /> */}
      <div className='Space__For__Header'></div>
      <FoodsDairy />
      {/* <Footer /> */}
    </>
  );
};

export default FoodsDairyComponent;
