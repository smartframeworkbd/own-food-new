import { createSlice } from "@reduxjs/toolkit";
export const HomePageSlice = createSlice({
  name: "homePage",
  initialState: {
    homePageList: [],
  },
  reducers: {
    setHomePageList: (state, action) => {
      state.homePageList = action.payload;
    },
  },
});
export const { setHomePageList } = HomePageSlice.actions;
export default HomePageSlice.reducer;
