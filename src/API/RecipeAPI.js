import axios from "axios";
import { ErrorToast } from "../Helper/FormHelper";
import { BaseURL } from "../Helper/config";
import {
  getAllRecipe,
  getAllRecipeByCategory,
  getAllRecipeByUser,
  getAllRecipeCategory,
  getSingleRecipe,
} from "../Redux/State-slice/RecipeSlice";
import store from "../Redux/Store/Store";

export const GetSingleRecipe = async (id) => {
  const token = localStorage.getItem("Token")
  try {
    let URL = `${BaseURL}/get-single-recipe/${id}`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });
    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(getSingleRecipe(res.data.data));
      return true;
    } else {
      ErrorToast("Something wrong! Get Recipe -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong! Get Recipe -2");
  }
};
export const GetAllRecipe = async () => {
  const token = localStorage.getItem("Token")
  try {
    let URL = `${BaseURL}/get-recipe`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });
    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(getAllRecipe(res.data.data));
      return true;
    } else {
      ErrorToast("Something wrong! Get Recipe -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong! Get Recipe -2");
  }
};
export const GetRecipeCategory = async (status, limit) => {
  const token = localStorage.getItem("Token")
  try {
    // let URL = `${BaseURL}/get-recipe-category/${status}/${limit}`;
    let URL = `${BaseURL}/get-recipe-categories`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });
    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(getAllRecipeCategory(res.data.data));
      return true;
    } else {
      ErrorToast("Something wrong! Get Recipe -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong! Get Recipe -2");
  }
};
export const GetRecipeBySingleCategoryAPI = async (id) => {
  const token = localStorage.getItem("Token")
  try {
    let URL = `${BaseURL}/get-recipe-by-single-category/${id}`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });
    if (res.status === 200 && res.data["status"] === "Success") {
      // store.dispatch(getAllRecipeCategory(res.data.data));
      store.dispatch(getAllRecipeByCategory(res.data.data));
      return true;
    } else {
      ErrorToast("Something wrong! Get Recipe  -1");
      return false;
    }
  } catch (e) {}
};

export const GetRecipeByUserAPI = async (id) => {
  const token = localStorage.getItem("Token")
  try {
    let URL = `${BaseURL}/get-recipe-by-user/${id}`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });
    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(getAllRecipeByUser(res?.data?.data[0]?.FoodRecipeData));
      return true;
    } else {
      ErrorToast("Something wrong! Get Recipe  -1");
      return false;
    }
  } catch (e) {}
};
