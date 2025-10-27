import React, { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { HiOutlineMail, HiOutlinePhone } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { VscReferences } from "react-icons/vsc";
import { Link, useNavigate } from "react-router-dom";
import { createUsersAPI } from "../../API/UsersAPI";
import {
  ErrorToast,
  IsEmail,
  IsEmpty,
  IsMobile,
} from "../../Helper/FormHelper";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import labels from "../../translationData/signUp.json";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import getTranslation from "../../Helper/getTranslationUtility";
import { LanguageContext } from "../../Context/LanguageContext";

const CustomerRegistration = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const [mobile, setMobile] = useState('');
  const [error, setError] = useState('');

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordField, setShowPasswordField] = useState(null);
  const [coordinates, setCoordinates] = useState({
    latitude: "",
    longitude: "",
  });
  const [password, setPassword] = useState("");
  const [confPassword, setConfirmPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const [passwordValidateMsg, setPasswordValidateMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [longitude, setLongitude] = useState(null);
  const [isChecked, setisChecked] = useState(false);
  const [mobileErMsg, setMobileErMsg] = useState("");
  const [emailErMsg, setEmailErMsg] = useState("");
  const [nameError, setNameError] = useState("");
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isNumberValid, setIsNumberValid] = useState(false);
  let fullNameRef,
    emailRef,
    passRef,
    mblref,
    refarenceref = useRef();
  let navigate = useNavigate();

  const termsControl = (e) => {
    setisChecked(e.target.checked);
  };
  const handleTogglePassword = (field) => {
    setShowPasswordField(field);
    setShowPassword(!showPassword);
  };
  useEffect(() => {
    navigator.geolocation.getCurrentPosition((position) => {

      setCoordinates({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude,
      });
      // setLongitude(position.coords.longitude);
    });
  }, []);
  const handleConfirmPassword = (e) => {
    let confirmPassword = e.target.value;
    setConfirmPassword(confirmPassword);
    validatePasswords(password, confirmPassword);
  };
  const handlePassword = (e) => {
    let Password = e.target.value;
    setPassword(Password);
    validatePasswords(e.target.value, confPassword);
  };
  const validatePasswords = (newPassword, newConfirmPassword) => {
    const uppercaseRegex = /[A-Z]/;
    const specialCharRegex = /[!@#$%^&*()_+{}\[\]:;<>,.?~\\-]/;
    const uppercaseValid = uppercaseRegex.test(newPassword);
    const specialCharValid = specialCharRegex.test(newPassword);
    // if (!uppercaseValid) {
    //   setPasswordValidateMsg("At List One UpperCase");
    // }
    // if (!specialCharValid) {
    //   setPasswordValidateMsg("At List One Special Character");
    // }
    // if (specialCharValid && uppercaseValid) {
    //   setPasswordValidateMsg("Password Strong");
    // }
    if (newPassword !== newConfirmPassword) {
      setErrorMsg("Password Does not Matched");
      setSuccessMsg("");
    } else if (newPassword === newConfirmPassword) {
      setErrorMsg("");
      setSuccessMsg("Password Matched");
    }
  };
  const handleMobileNumberExist = async (event) => {
    let mobileNumber = event?.target?.value;
    // if(mobileNumber){
    let result = await axios.get(
      `${BaseURL}/mobile-number-validation/${mobileNumber}`
    );
    if (result.data.status == 200) {
      setMobileErMsg(result.data.message);
      setIsNumberValid(true);
    } else {
      setMobileErMsg("");
      setIsNumberValid(false);
    }
    // }

  };

  const handleEmailExist = async (event) => {
    let emailExist = event.target.value;
    try {
      let result = await axios.get(`${BaseURL}/email-validation/${emailExist}`);
      if (result.data.status === 200) {
        setEmailErMsg(result.data.message);
        setIsEmailValid(true);
      } else {
        setEmailErMsg("");
        setIsEmailValid(false);
      }

    }
    catch (e) {

    }

  };
  const validateName = (name) => {

    const nameRegex = /^[A-Za-z\s]+$/;
    return nameRegex.test(name);
  };
  const RegistrationSubmit = async (event) => {
    event.preventDefault();
    let userFullName = fullNameRef.value;
    let email = emailRef.value;
    let userPassword = passRef.value;
    let mobileNumber = mblref.value;
    let reference = refarenceref.value;
    if (!validateName(userFullName)) {
      setNameError("Name cannot contain numbers or special characters");
      fullNameRef.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    } else {
      setNameError("");
    }
    validatePasswords(password, confPassword);
    if (IsEmpty(userFullName)) {
      ErrorToast("Name Required !");

      fullNameRef.scrollIntoView({ behavior: "smooth", block: "center" });

    } else if (IsEmpty(userPassword)) {
      // ErrorToast("Password Required !");
      passRef.scrollIntoView({ behavior: "smooth", block: "center" });

    } else if (!IsEmail(email)) {
      setEmailErMsg(" valid Email Required!")
      // ErrorToast("Email Required!");
      emailRef.scrollIntoView({ behavior: "smooth", block: "center" });

    } else if (isChecked === false) {
      ErrorToast("please Agree Terms Of Service!");
    } else if (!IsMobile(mobileNumber)) {
      setMobileErMsg("Enter Valid Mobile Number")
      // setMobileErMsg("")
      // setMobileErMsg("")
      // ErrorToast("Enter Valid Mobile Number");
      mblref.scrollIntoView({ behavior: "smooth", block: "center" });

    } else if (isEmailValid) {
      setEmailErMsg("Email Address already used!")

      // ErrorToast("Email Address already used!");
      emailRef.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    } else if (isNumberValid) {
      setMobileErMsg("Phone number already used!")
      // ErrorToast("Phone number already used!");
      mblref.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    }
    else if (!IsMobile(reference) && reference.length>0) {
      setMobileErMsg("Enter Valid Mobile Number")
      mblref.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }
    else if (userPassword !== confPassword) {
      setMobileErMsg("Password Not match!")
      // newPassword, newConfirmPassword
      // ErrorToast("Phone number already used!");
      mblref.scrollIntoView({ behavior: "smooth", block: "center" });

      return;
    }

    else {
      let result = await createUsersAPI(
        userFullName,
        email,
        mobileNumber,
        userPassword,
        coordinates,
        reference
      );
      if (result) {
        navigate("/OTP");
      }
    }
  };
  const mobileRegex = /^01[3-9][0-9]{8}$/;

  const handleMobileChange = (event) => {
    const value = event.target.value;
    setMobile(value);





    if (value.length === 11) {
      if (mobileRegex.test(value)) {
        setError('');
      } else {
        setError('Invalid Bangladeshi mobile number!!');
      }
    } else {
      setError('Invalid Bangladeshi mobile number!!');
    }
  };

  return (
    <div className="CustomerRegistration mt-5">
      <div className="container-fluid">
        <div className="row">
          <div className="col-xl-5 col-lg-6 col-md-12 bg-color-23 pb-5 pt-5">
            <div className="form-section">
              <h3>{getTranslation("formTitle", currentLanguage, labels)}</h3>
              <div className="login-inner-form">
                <form action="#" method="GET">
                  <div className="form-group clearfix">
                    <label for="third_field" class="form-label">
                      {/* {labels.fullName.bn} */}
                      {getTranslation("fullName", currentLanguage, labels)} *
                    </label>
                    <div class="form-box">
                      <input
                        ref={(input) => (fullNameRef = input)}
                        name="name"
                        type="text"
                        class="form-control"
                        id="third_field"
                        placeholder={getTranslation(
                          "fullName",
                          currentLanguage,
                          labels
                        )}
                        aria-label="Full Name"
                      />
                      <i class="flaticon-user">
                        <AiOutlineUser />
                      </i>
                    </div>

                  </div>
                  {nameError && <span className="text-danger">{nameError}</span>}
                  <div className="form-group clearfix">
                    <label for="first_field" className="form-label">

                      {getTranslation("email", currentLanguage, labels)}  *



                    </label>
                    <div class="form-box">
                      <input
                        ref={(input) => (emailRef = input)}
                        name="email"
                        type="email"
                        class="form-control"
                        onBlur={handleEmailExist}
                        id="first_field"
                        placeholder={getTranslation(
                          "email",
                          currentLanguage,
                          labels
                        )}
                        aria-label="Email Address"
                      />
                      <i class="flaticon-mail-2">
                        {" "}
                        <HiOutlineMail />
                      </i>
                    </div>
                  </div>
                  {emailErMsg && (
                    <span className="text-danger">{emailErMsg}</span>
                  )}

                  <div className="form-group clearfix">
                    <label for="first_field" className="form-label">

                      {getTranslation("mobile", currentLanguage, labels)} *
                    </label>
                    <div className="form-box">
                      <input
                        ref={(input) => (mblref = input)}
                        name="mobile"
                        onBlur={handleMobileNumberExist}
                        type="text"
                        onChange={handleMobileChange}

                        class="form-control"
                        id="first_field"
                        placeholder={getTranslation(
                          "mobile",
                          currentLanguage,
                          labels
                        )}
                        aria-label="Phone Number"
                      />
                      <i class="flaticon-mail-2">
                        {" "}
                        <HiOutlinePhone />
                      </i>
                    </div>
                  </div>

                  {error && <span className="text-danger">{error}</span>}


                  {mobileErMsg && (
                    <span className="text-danger">{mobileErMsg}</span>
                  )}
                  <div className="form-group clearfix">
                    <label for="second_field" className="form-label">
                      {labels.password.bn} *
                    </label>
                    <div className="form-box">
                      <input
                        ref={(input) => (passRef = input)}
                        name="password"
                        type={
                          showPassword && showPasswordField === "password"
                            ? "text"
                            : "password"
                        }
                        className="form-control"
                        onChange={handlePassword}
                        autocomplete="off"
                        id="second_field"
                        placeholder={getTranslation(
                          "password",
                          currentLanguage,
                          labels
                        )}
                        aria-label="Password"
                      />
                      <div className="eye-container">
                        <span
                          className="eye"
                          onClick={() => handleTogglePassword("password")}
                        >
                          {showPassword && showPasswordField === "password" ? (
                            <>
                              <IoMdEye size={20} color="#0d6efd" />
                            </>
                          ) : (
                            <>
                              <IoIosEyeOff size={20} color="#0d6efd" />
                            </>
                          )}
                        </span>
                      </div>
                      <i className="flaticon-password">
                        <RiLockPasswordFill />
                      </i>
                    </div>
                  </div>
                  {passwordValidateMsg && (
                    <span className="text-danger">{passwordValidateMsg}</span>
                  )}

                  <div class="form-group clearfix">
                    <label for="second_field" class="form-label">

                      {getTranslation(
                        "confirmPassword",
                        currentLanguage,
                        labels
                      )}

                      *
                    </label>
                    <div class="form-box">
                      <input

                        type={
                          showPassword &&
                            showPasswordField === "confirmpassword"
                            ? "text"
                            : "password"
                        }
                        className="form-control password"
                        autocomplete="off"
                        id="confirmpassword"
                        onChange={handleConfirmPassword}
                        placeholder={getTranslation(
                          "confirmPassword",
                          currentLanguage,
                          labels
                        )}
                        aria-label="Password"
                      />
                      <div className="eye-container">
                        <span
                          className="eye"
                          onClick={() =>
                            handleTogglePassword("confirmpassword")
                          }
                        >
                          {showPassword &&
                            showPasswordField === "confirmpassword" ? (
                            <>
                              <IoMdEye size={20} color="#0d6efd" />
                            </>
                          ) : (
                            <>
                              <IoIosEyeOff size={20} color="#0d6efd" />
                            </>
                          )}
                        </span>
                      </div>

                      <i className="flaticon-password">
                        <RiLockPasswordFill />
                      </i>
                    </div>
                  </div>
                  <div>
                    {errorMsg && (
                      <span className="text-danger ">{errorMsg}</span>
                    )}
                    {successMsg && (
                      <span className="text-success">{successMsg}</span>
                    )}
                  </div>

                  <div className="form-group clearfix">
                    <label for="first_field" className="form-label">
                      {/* {labels.reference.bn} */}
                      {getTranslation("reference", currentLanguage, labels)}
                    </label>
                    <div className="form-box">
                      <input
                        ref={(input) => (refarenceref = input)}
                        name="reference"
                        type="text"
                        className="form-control"
                        id="first_field"
                        placeholder={getTranslation(
                          "reference",
                          currentLanguage,
                          labels
                        )}
                        aria-label="Reference "
                      />
                      <i className="flaticon-mail-2">
                        {" "}
                        <VscReferences />
                      </i>
                    </div>
                  </div>

                  <div className="form-group checkbox clearfix">
                    <div className="clearfix float-start">
                      <div className="form-check">
                        <input
                          onClick={(e) => termsControl(e)}
                          className="form-check-input"
                          type="checkbox"
                          id="rememberme"
                        />
                        <label className="form-check-label" for="rememberme">
                          {/* {labels.terms.bn} */}
                          {getTranslation("terms", currentLanguage, labels)}
                        </label>
                      </div>
                    </div>
                  </div>
                  <div className="form-group clearfix mb-0">
                    <button
                      onClick={RegistrationSubmit}
                      type="submit"
                      className="btn btn-primary btn-lg btn-theme"
                    >
                      Register
                    </button>
                  </div>
                </form>
              </div>
              <p class="text-center">
                {getTranslation("formFooterTitle", currentLanguage, labels)}
                <Link to="/CustomerLogin" className="text-primary fw-bold">
                  {getTranslation(
                    "formFooterTitle.loginHere",
                    currentLanguage,
                    labels
                  )}
                </Link>
              </p>
            </div>
          </div>
          <div className="col-xl-7 col-lg-6 col-md-12 bg-img">
            <div className="info">
              <img src="/Assets/Img/login__logo_1.jpeg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerRegistration;
