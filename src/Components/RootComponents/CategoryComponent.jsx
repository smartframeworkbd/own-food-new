import React from "react";
import CardSlider from "../ChildComponents/CardSlider";
import Category from "../ChildComponents/Category";


const CategoryComponent = () => {
  return (
    <>
      {/* <Header /> */}
      <div className='Space__For__Header'></div>
     <div className="mt-5">
     <CardSlider />
     </div>

      <Category />
      {/* <Footer /> */}
    </>
  );
};

export default CategoryComponent;
