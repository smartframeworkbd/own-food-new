import React from "react";
import CardSlider from "../ChildComponents/CardSlider";
import ChildSearch from "../ChildComponents/ChildSearch";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const SearchComponent = () => {
  return (
    <>
      {/* <Header /> */}
      <div className="Space__For__Header"></div>
      <CardSlider />

      <ChildSearch />
      {/* <Footer /> */}
    </>
  );
};

export default SearchComponent;
