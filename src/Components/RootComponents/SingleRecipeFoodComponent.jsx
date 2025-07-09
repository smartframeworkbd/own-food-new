import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AllRecipeCategory from "../ChildComponents/AllRecipeCategory";
import SingleRecipeFood from "../ChildComponents/SingleRecipeFood";
import Footer from "../Common/Footer";
import Header from "../Common/Header";

const SingleRecipeFoodComponent = () => {
  return (
    <>
      {/* <Header /> */}
      <div className='Space__For__Header'></div>
      <SingleRecipeFood />
      {/* <Footer /> */}
    </>
  );
};

export default SingleRecipeFoodComponent;
