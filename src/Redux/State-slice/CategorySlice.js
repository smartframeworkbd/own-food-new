import { createSlice } from "@reduxjs/toolkit";
export const CategorySlice = createSlice({
  name: "category",
  initialState: {
    allCategoryList: [],
    allFoodByCategoryList: [],
    limitedCategoryList:[]
  },
  reducers: {
    setCategoryList: (state, action) => {
      state.allCategoryList = action.payload;
    },
    setFoodByCategoryList: (state, action) => {
      state.allFoodByCategoryList = action.payload;
    },
    setLimitedCategoryList:(state,action)=>{
      state.limitedCategoryList= action.payload

    }
  },
});
export const { setCategoryList, setFoodByCategoryList,setLimitedCategoryList } = CategorySlice.actions;
export default CategorySlice.reducer;
