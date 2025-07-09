import React, { useContext } from "react";
import { useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { Link, useNavigate } from "react-router-dom";
import { RecoveryVerifyEmail, RecoveryVerifyMobile } from "../../API/UsersAPI";
import { ErrorToast, IsEmail, IsMobile } from "../../Helper/FormHelper";
import labels from "../../translationData/forgotPassword.json";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";

const ForgetPassword = () => {
  let emailRef = useRef();
  let navigate = useNavigate();
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const VerifyEmailOrMobile = async (e) => {
    e.preventDefault();

    let email = emailRef.value;
    if (IsEmail(email)) {
      let result = await RecoveryVerifyEmail(email);
      if (result) {
        localStorage.setItem("forgetEmail", JSON.stringify(email));
        navigate("/forget-password-otp");
      }
    } else if (IsMobile(email)) {
      let result = await RecoveryVerifyMobile(email);
      if (result) {
        localStorage.setItem("forgetMobile", JSON.stringify(email));
        navigate("/forget-password-otp");
      }
    } else {
      ErrorToast("Please enter a valid email address or mobile number.");
    }
  };
  return (
    <div class="ForgetPassword">
      <div class="container-fluid">
        <div class="row">
          <div class="col-xl-5 col-lg-6 col-md-12 bg-color-23">
            <div class="form-section">
              <h3>{getTranslation("formTitle", currentLanguage, labels)}</h3>
              <div class="login-inner-form">
                <form action="#" method="GET">
                  <div class="form-group clearfix">
                    <label for="first_field" class="form-label">
                      {getTranslation("email", currentLanguage, labels)}
                    </label>
                    <div class="form-box">
                      <input
                        ref={(input) => (emailRef = input)}
                        name="email"
                        type="email"
                        class="form-control"
                        id="first_field"
                        placeholder={labels.email.bn}
                        aria-label="Email address"
                      />
                      <i class="flaticon-mail-2">
                        {" "}
                        <HiOutlineMail />
                      </i>
                    </div>
                  </div>
                  <div class="form-group mb-0">
                    <button
                      onClick={VerifyEmailOrMobile}
                      type="submit"
                      class="btn btn-primary btn-lg btn-theme"
                    >
                      SEND
                    </button>
                  </div>
                </form>
              </div>
              <p class="text-center">
                {getTranslation("formFooterTitle", currentLanguage, labels)}
                <Link to="/CustomerLogin">
                  {currentLanguage === "bn"
                    ? labels.formFooterTitle.loginHere.bn
                    : labels.formFooterTitle.loginHere.en}
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

export default ForgetPassword;
