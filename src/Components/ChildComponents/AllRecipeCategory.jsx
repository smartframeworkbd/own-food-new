import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import RecipeFeature from "../Elements/RecipeFeature";

const AllRecipeCategory = ({ recipeData}) => {

  return (
    <section className='allRecipeCategory'>
      <RecipeFeature  recipeData={recipeData} />
    </section>
  );
};

export default AllRecipeCategory;
