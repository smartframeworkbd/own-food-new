import axios from "axios";
import { BaseURL } from "../Helper/config";
import { ErrorToast } from "../Helper/FormHelper";

export const VerifyRegistrationOtp = async (email, otp) => {
  const token = localStorage.getItem("Token")
  try {
    let URL = `${BaseURL}/verify-otp-registration/${email}/${otp}`;
    let res = await axios.get(URL,{
      headers: {
        token: `${token}`, 
      },
    });
    if (res.status === 200 && res.data["status"] === "Success") {
      return true;
    } else {
      ErrorToast("You provided wrong otp!");
      return false;
    }
  } catch (e) {
    ErrorToast("Please reload the page");
  }
};
