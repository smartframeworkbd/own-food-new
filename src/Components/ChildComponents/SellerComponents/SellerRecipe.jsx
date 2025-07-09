import React, { useEffect } from "react";
import { GetRecipeByUserAPI } from "../../../API/RecipeAPI";
import { useSelector } from "react-redux";
import RecipeCard from "../../Common/Cards/RecipeCard/RecipeCard";
import { getUserDetails } from "../../../Helper/SessionHelper";
import { useSearchParams } from "react-router-dom";

const SellerRecipe = () => {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get("userId");
  useEffect(() => {
    GetRecipeByUserAPI(userId);
  }, []);
  const recipeList = useSelector(
    (state) => state.recipe.getAllRecipeByUserData
  );
  return (
    <div className='row'>
      {!!recipeList &&
        recipeList.map((item, index) => (
          <RecipeCard data={item} index={index} />
        ))}
    </div>
  );
};

export default SellerRecipe;
