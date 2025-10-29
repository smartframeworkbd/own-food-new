import axios from "axios";
import { BaseURL } from "../Helper/config";
import { ErrorToast, SuccessToast } from "../Helper/FormHelper";
import {
  setEmail,
  setToken,
  setUserDetails,
  setMobile,
} from "../Helper/SessionHelper";
import { setBannerList } from "../Redux/State-slice/BannerSlice";
import store from "../Redux/Store/Store";
import Swal from "sweetalert2";

// create Users API
const token = localStorage.getItem("Token")
export const createUsersAPI = async (
  userFullName,
  email,
  mobileNumber,
  userPassword,
  coordinates,
  reference
) => {
  try {
    let URL = BaseURL + "/create-users";
    let res = await axios.post(URL, {
      userFullName,
      email,
      userPassword,
      coordinate: coordinates,
      userMobileNo: mobileNumber,
      Reference: reference,
    });

    if (res.status === 200 && res.data["status"] === "Success") {
      store.dispatch(setBannerList(res.data.data));
      // SuccessToast("Registration successfully!");
      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: "Registration successfully!!!",
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      sessionStorage.setItem("user", JSON.stringify(res.data.data));
      return true;
    } else if (res.status === 200 && res.data.message) {
      Swal.fire({
        position: "center",
        icon: "info",
        title: `${res.data.message}`,
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else if (
      res?.status === 200 &&
      res?.data["status"] === "Fail" &&
      res?.data?.data?.keyPattern["email"] === 1
    ) {
      ErrorToast("User Already Exists!");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "User Already Exists!!!",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else if (
      res.status === 200 &&
      res.data["status"] === "Fail" &&
      res.data.data.keyPattern["userMobileNo"] === 1
    ) {
      ErrorToast("User Already Exists!");
      Swal.fire({
        position: "top-end",
        icon: "error",
        title: "Mobile Number Already Exists!!!",
        showConfirmButton: false,
        timer: 1500,
      });
      return false;
    } else if (res.status === 200) {
      // Swal.fire({
      //   position: "center",
      //   icon: "info",
      //   title: `${res.data.data}`,
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      // return false;
    }
  } catch (e) {
    ErrorToast("Something went wrong! createUsersAPI -2");
    return false;
  }
};

// Login In User

export const loginUsersAPI = async (email, userPassword) => {
  try {
    let URL = BaseURL + "/login-users";
    let res = await axios.post(URL, { email, userPassword }, {
        withCredentials: true,   
        headers: {
          "Content-Type": "application/json"
        }
      });
    console.log(res)

    if (res.status === 200 && res.data["status"] === "Success") {
      setToken(res.data["token"]);
      setUserDetails(res.data["data"]);
      // Swal.fire({
      //   position: "center",
      //   icon: "success",
      //   title: `Log in Successful`,
      //   showConfirmButton: false,
      //   timer: 1500,
      // });
      return true;
    } else if (res.status === 200 && res.data["status"] === "Fail") {
      ErrorToast(res.data.message);
      return false;
    } else {
      // ErrorToast("Something went wrong! loginUsersAPI -1");
      ErrorToast(res.data.data);
      return false;
    }
  } catch (e) {
    ErrorToast("Something went wrong! loginUsersAPI -2");
    return false;
  }
};

//! =================== Step One Recovery Verify Email ===================

// Step One Recovery Verify Email
export const RecoveryVerifyEmail = async (email) => {
  try {
    let URL = BaseURL + "/forget-password-verify-email/" + email;
    let res = await axios.post(URL);
    if (res.status === 200) {
      if (res.data["status"] === "Fail") {
        ErrorToast("No User Found");
        return false;
      } else {
        setEmail(email);
        SuccessToast(
          "A 4 Digit verification code has been sent to your email address. "
        );
        return true;
      }
    } else {
      ErrorToast("Something wrong RecoveryVerifyEmailAPI-1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong RecoveryVerifyEmailAPI-2");
    return false;
  }
};

// Step One Recovery Verify Mobile number
export const RecoveryVerifyMobile = async (mobile) => {
  try {
    let URL = BaseURL + "/forget-password-verify-mobile/" + mobile;
    let res = await axios.post(URL);
    if (res.status === 200) {
      if (res.data["status"] === "Fail") {
        ErrorToast("No User Found");
        return false;
      } else {
        setMobile(mobile);
        SuccessToast(
          "A 4 Digit verification code has been sent to your mobile number. "
        );
        return true;
      }
    } else {
      ErrorToast("Something wrong RecoveryVerifymobileAPI-1");
      return false;
    }
  } catch (e) {
    ErrorToast("Something wrong RecoveryVerifymobileAPI-2");
    return false;
  }
};
