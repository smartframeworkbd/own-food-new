import React, { useContext, useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { loginUsersAPI } from "../../API/UsersAPI";
import { ErrorToast, IsEmail, IsEmpty } from "../../Helper/FormHelper";
import { useState } from "react";
import labels from "../../translationData/signIn.json";
import { IoIosEyeOff, IoMdEye } from "react-icons/io";
import getTranslation from "../../Helper/getTranslationUtility";
import { LanguageContext } from "../../Context/LanguageContext";
import { BaseURL } from "../../Helper/config";

const CustomerLogin = () => {
  // const [currentLanguage, setCurrentLanguage] = useState("en");
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  // Function to change the language
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  const [showPassword, setShowPassword] = useState(false);
  let emailRef,
    passRef = useRef();
  let navigate = useNavigate();

  const location = useLocation();
  const handleTogglePassword = (field) => {
    // setShowPasswordField(field);
    setShowPassword(!showPassword);
  };
  const LoginSubmit = async (event) => {
    event.preventDefault();
    let email = emailRef.value;
    let userPassword = passRef.value;

    if (IsEmpty(userPassword)) {
      ErrorToast("Password Required !");
    }
    // else if (!IsEmail(email)) {
    //   ErrorToast("Email Required!");
    // }
    else {
      let result = await loginUsersAPI(email, userPassword);
      if (result) {
        let targetURL = "/";
        await fetch(`${BaseURL}/central-auth`, {
          method: "POST",
          credentials: "include",
        });
        if (location.state != null) {
          // targetURL = location.state.form.pathname;
        }
        navigate(targetURL, { replace: true });
        window.location.reload(true);
        // navigate("/CustomerLogin");
      }
    }
  };

  return (
    <div class="CustomerLogin">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-12 bg-color-23">
            <div class="form-section">
              <h3>{getTranslation("formTitle", currentLanguage, labels)}</h3>
              <div class="login-inner-form">
                <form action="#" method="GET">
                  <div class="form-group clearfix">
                    <label for="first_field" class="form-label">
                      {/* {labels.email.bn} */}
                      {getTranslation("email", currentLanguage, labels)}
                    </label>
                    <div class="form-box">
                      <input
                        ref={(input) => (emailRef = input)}
                        name="email"
                        type="text"
                        class="form-control"
                        id="first_field"
                        placeholder={getTranslation(
                          "email",
                          currentLanguage,
                          labels
                        )}
                        aria-label="Email Address"
                      />
                      <i class="HiOutlineMail">
                        <HiOutlineMail />
                      </i>
                    </div>
                  </div>
                  <div class="form-group clearfix">
                    <label for="second_field" class="form-label">
                      {/* {labels.password.bn} */}
                      {getTranslation("password", currentLanguage, labels)}
                    </label>
                    <div class="form-box">
                      <input
                        ref={(input) => (passRef = input)}
                        name="password"
                        type={showPassword ? "text" : "password"}
                        class="form-control"
                        // autocomplete='off'
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
                          {showPassword ? (
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
                      <i class="RiLockPasswordFill">
                        {" "}
                        <RiLockPasswordFill />
                      </i>
                    </div>
                  </div>
                  <div class="checkbox form-group clearfix">
                    <div class="form-check float-start">
                      <input
                        class="form-check-input"
                        type="checkbox"
                        id="rememberme"
                      />
                      <label class="form-check-label" for="rememberme">
                        {/* {labels.remember.bn} */}
                        {getTranslation("remember", currentLanguage, labels)}
                      </label>
                    </div>
                    <Link
                      to="/ForgetPassword"
                      class="link-light float-end forgot-password text-primary"
                    >
                      {/* {labels.forgotPassword.bn} */}
                      {getTranslation(
                        "forgotPassword",
                        currentLanguage,
                        labels
                      )}
                    </Link>
                  </div>
                  <div class="form-group clearfix mb-0">
                    <button
                      onClick={LoginSubmit}
                      type="submit"
                      class="btn btn-primary btn-lg btn-theme"
                    >
                      Login
                    </button>
                  </div>
                </form>
              </div>
              <p class="text-center">
                {/* {labels.formFooterTitle.bn} */}
                {getTranslation("formFooterTitle", currentLanguage, labels)}
                <Link to="/CustomerRegistration" className="text-primary fw-bold">
                  {/* {labels.formFooterTitle.loginHere.bn} */}
                  {getTranslation(
                    "formFooterTitle.loginHere",
                    currentLanguage,
                    labels
                  )}
                </Link>
              </p>
            </div>
          </div>
          <div class="col-xl-7 col-lg-6 col-md-12 bg-img">
            <div class="info">
              <img src="/Assets/Img/login__logo_1.jpeg" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CustomerLogin;
