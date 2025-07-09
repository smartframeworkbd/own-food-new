import React from "react";
import "./RecipeCard.css";
import { Container } from "react-bootstrap";
import { Link } from "react-router-dom";
const RecipeCard = ({ data, index }) => {
  return (
    <div className="col-xl-3 col-lg-6 col-md-6 col-sm-9 recipe-card">
      <div className="allRecipeCatItem">
        <div key={index}>
          <div className="single-recipe-cat-items">
            <div className="imgFile">
              <img
                className="img-fluid"
                src={
                  data.recipeReadyFoodImage &&
                  data.recipeReadyFoodImage[0]?.extraLarge?.imageUrl
                }
                alt=""
              />
            </div>
            <div className="textFile">
              <Link to={`/SingleRecipeFood/${data?._id}`}>b
                <h3>{data?.recipeName}</h3>
              </Link>
              {/* <p> {data?.user[0]?.userFullName}</p> */}
              <p className="mt-1">
                {/* <strong>From:</strong> {`${data?.seller[0]?.kitchenName}`} */}
              </p>
              <div className="img-overlay">
                <img
                  src={
                    "a"
                    // data.seller[0] &&
                    // data?.seller[0]?.sellerProfilePhoto[0]?.small?.imageUrl
                  }
                  alt=""
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RecipeCard;
