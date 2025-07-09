import { createSlice } from "@reduxjs/toolkit";
export const BannerSlice = createSlice({
  name: "banner",
  initialState: {
    allBannerList: [],
  },
  reducers: {
    setBannerList: (state, action) => {
      state.allBannerList = action.payload;
    },
  },
});
export const { setBannerList } = BannerSlice.actions;
export default BannerSlice.reducer;
