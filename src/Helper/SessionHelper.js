
import { DashBoardLink ,FrontEndLink} from "../Helper/config";
var createHost = require("cross-domain-storage/host");
var storageHost = createHost([
  {
    origin: FrontEndLink, 
    allowedMethods: ["get", "set", "remove"],
  },
  {
    origin:  DashBoardLink , 
    allowedMethods: ["get"],
  },
]);
class SessionHelper {
  setToken(Token) {
    localStorage.setItem("Token", Token);
    localStorage.setItem("Token2", JSON.stringify(Token));
  }
  getToken() {
    return localStorage.getItem("Token");
  }
  setUserDetails(UserDetails) {
    localStorage.setItem("UserDetails", JSON.stringify(UserDetails));
  }
  getUserDetails() {
    return JSON.parse(localStorage.getItem("UserDetails"));
  }
  setEmail(Email) {
    localStorage.setItem("Email", Email);
  }
  getEmail() {
    return localStorage.getItem("Email");
  }
  setMobile(Email) {
    localStorage.setItem("Mobile", Email);
  }
  getMobile() {
    return localStorage.getItem("Mobile");
  }
  setOTP(OTP) {
    localStorage.setItem("OTP", OTP);
  }
  getOTP() {
    return localStorage.getItem("OTP");
  }
  removeSessions = () => {
    localStorage.clear();
    window.location.href = "/login";
  };
}
export const {
  setEmail,
  getEmail,
  setMobile,
  getMobile,
  setOTP,
  getOTP,
  setToken,
  getToken,
  setUserDetails,
  getUserDetails,
  removeSessions,
} = new SessionHelper();