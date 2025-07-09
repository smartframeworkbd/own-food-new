import axios from "axios";
import { BaseURL } from "../Helper/config";
import { ErrorToast } from "../Helper/FormHelper";
import { setHomePageList } from "../Redux/State-slice/HomePageSlice";
import store from "../Redux/Store/Store";

// get-banners API

export const getHomePageSections = async () => {
  
  const token = localStorage.getItem("Token")
  try {
    let URL = BaseURL + "/get-home-page-sections";
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(setHomePageList(res.data.data));
      return true;
    } else {
      ErrorToast("Something went wrong! getHomePageSections -1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something went wrong! getHomePageSections -2");
    return false;
  }
};
