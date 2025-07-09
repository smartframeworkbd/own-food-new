import { createSlice } from "@reduxjs/toolkit";
export const FoodDiarySlice = createSlice({
  name: "FoodDiary",
  initialState: {
    allFoodDiaryList: [],
    getAllFoodDiaryByUserData:[]
  },
  reducers: {
    setAllFoodDiaryList: (state, action) => {
      state.allFoodDiaryList = action.payload;
    },
    getAllFoodDiaryByUser:(state,action)=>{
      state.getAllFoodDiaryByUserData = action.payload
    }
  },
});
export const { setAllFoodDiaryList ,getAllFoodDiaryByUser} = FoodDiarySlice.actions;
export default FoodDiarySlice.reducer;
