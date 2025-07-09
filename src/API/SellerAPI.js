import axios from "axios";
import { BaseURL } from "../Helper/config";
import { ErrorToast } from "../Helper/FormHelper";
import {
  getNearestSeller,
  getSellerFood,
  getSellerInfo,
  setLimitedSellerList,
} from "../Redux/State-slice/SellerSlice";
import store from "../Redux/Store/Store";
const token = localStorage.getItem("Token")

export const GetLimitedSellerAPI = async (limit) => {
  try {
    let URL = `${BaseURL}/get-become-seller/${limit}`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(setLimitedSellerList(res.data.data));
      return true;
    } else {
      ErrorToast("Something wrong! GetAllCategoryAPI -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong! GetAllCategoryAPI -2");
    return false;
  }
};
export const GetSellerAPI = async (id) => {
  try {
    let URL = `${BaseURL}/get-single-become-seller/${id}`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(getSellerInfo(res.data.data));
      return true;
    } else {
      ErrorToast("Something wrong! GetAllCategoryAPI -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong! GetAllCategoryAPI -2");
    return false;
  }
};
export const GetFoodBySellerAPI = async (id) => {
  try {
    let URL = `${BaseURL}/get-food-by-seller/${id}`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(getSellerFood(res?.data?.metaData));
      return true;
    } else {
      ErrorToast("Something wrong! GetFoodBySellerAPI -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong! GetFoodBySellerAPI -1");
    return false;
  }
};
export const GetNearestSellerAPI = async (postData) => {
  try {
    let URL = `${BaseURL}/get-nearest-seller`;
    
    // Send POST request with data and headers
    let res = await axios.post(URL, postData, {
      headers: {
        token: `${token}`, // Include token in headers
      },
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      
      // Assuming `res.data.data` contains the seller food list
      store.dispatch(getNearestSeller(res?.data?.data));
      
      return true;
    } else {
      ErrorToast("Something went wrong! GetNearestSellerAPI -1");
      return false;
    }
  } catch (e) {
    console.error("API Error:", e);
    ErrorToast("Something went wrong! GetNearestSellerAPI -2");
    return false;
  }
};