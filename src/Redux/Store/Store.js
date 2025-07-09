import { configureStore } from "@reduxjs/toolkit";
import bannerReducer from "../State-slice/BannerSlice";
import homePageReducer from "../State-slice/HomePageSlice";
import categoryReducer from "../State-slice/CategorySlice";
import FoodDiaryReducer from "../State-slice/FoodDiarySlice";
import CartReducer from "../State-slice/CartSlice";
import SellerReducer from "../State-slice/SellerSlice";
import RecipeReducer from "../State-slice/RecipeSlice";
import LocationReduce from "../State-slice/Location";
const store = configureStore({
  reducer: {
    banner: bannerReducer,
    homePage: homePageReducer,
    category: categoryReducer,
    foodDiary: FoodDiaryReducer,
    cart: CartReducer,
    seller:SellerReducer,
    location:LocationReduce,
    recipe:RecipeReducer
  },
});

export default store;
