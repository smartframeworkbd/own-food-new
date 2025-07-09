
import axios from "axios";
import { BaseURL } from "../Helper/config";
import { ErrorToast } from "../Helper/FormHelper";
import {
  getAllFoodDiaryByUser,
  setAllFoodDiaryList,
} from "../Redux/State-slice/FoodDiarySlice";
import store from "../Redux/Store/Store";

// get-banners API

export const getAllFoodDiaryAPI = async () => {
  const token = localStorage.getItem("Token")
  try {
    let URL = BaseURL + "/get-food-diary";
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(setAllFoodDiaryList(res.data.data));
      return true;
    } else {
      ErrorToast("Something went wrong! getAllBlogAPI -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something went wrong! getAllBlogAPI -2");
    return false;
  }
};

export const getFoodDiaryByUserAPI = async (id) => {
  const token = localStorage.getItem("Token")
  try {
    let URL = `${BaseURL}/get-food-diary-by-user/${id}`;

    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(getAllFoodDiaryByUser(res.data.data[0].FoodDiaryData));
      return true;
    }
  } catch (e) {}
};
