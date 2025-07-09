import { createSlice } from "@reduxjs/toolkit";

const RecipeSlice = createSlice({
  name: "recipe",
  initialState: {
    getSingleRecipe: [],
    getAllRecipe: [],
    getAllRecipeCategoryData: [],
    getAllRecipeByCategoryData: [],
    getAllRecipeByUserData: [],
  },
  reducers: {
    getSingleRecipe: (state, action) => {
      state.getSingleRecipe = action.payload;
    },
    getAllRecipe: (state, action) => {
      state.getAllRecipe = action.payload;
    },
    getAllRecipeCategory: (state, action) => {
      state.getAllRecipeCategoryData = action.payload;
    },
    getAllRecipeByCategory: (state, action) => {
      state.getAllRecipeByCategoryData = action.payload;
    },
    getAllRecipeByUser: (state, action) => {
      state.getAllRecipeByUserData = action.payload;
    },
  },
});
export default RecipeSlice.reducer;
export const {
  getSingleRecipe,
  getAllRecipe,
  getAllRecipeCategory,
  getAllRecipeByCategory,
  getAllRecipeByUser,
} = RecipeSlice.actions;