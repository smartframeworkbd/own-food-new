import React from "react";
import CardSlider from "../ChildComponents/CardSlider";
import Circle from "../ChildComponents/Circle";
import Circle_2 from "../ChildComponents/Circle_2";
import InstantFood from "../ChildComponents/InstantFood";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const CountryCategoryComponent = () => {
  return (
    <>
      <Header />
      <div className='Space__For__Header'></div>
      <CardSlider />
      <InstantFood title={"South Indian"} />
      <Circle_2 />
      <Footer />
    </>
  );
};

export default CountryCategoryComponent;
