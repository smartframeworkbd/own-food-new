import axios from "axios";
import React, { useRef } from "react";
import { HiOutlineMail } from "react-icons/hi";
import { RiLockPasswordFill } from "react-icons/ri";
import { Link, useNavigate } from "react-router-dom";
import { BaseURL } from "../../Helper/config";
import { ErrorToast, IsEmpty } from "../../Helper/FormHelper";
import toast from "react-hot-toast";
const ResetPassword = () => {
  let passRef,
    confirmPassRef = useRef();
  let navigate = useNavigate();

  const LoginSubmit = async (event) => {
    event.preventDefault();
    let userPassword = passRef.value;
    let userConfirmPassword = confirmPassRef.value;
    let email = localStorage.getItem("forgetEmail")
      ? JSON.parse(localStorage.getItem("forgetEmail"))
      : "";
    let mobile = localStorage.getItem("forgetMobile")
      ? JSON.parse(localStorage.getItem("forgetMobile"))
      : "";

    let OTP = localStorage.getItem("OTP")
      ? JSON.parse(localStorage.getItem("OTP"))
      : "";
    let postBody = {
      email: email,
      mobile: mobile,
      userPassword: userPassword,
      otp: OTP,
    };

    if (IsEmpty(userPassword)) {
      ErrorToast("Password Required!");
    } else if (IsEmpty(userConfirmPassword)) {
      ErrorToast("Confirm Password Required!");
    } else if (userPassword !== userConfirmPassword) {
      ErrorToast("Password not match as same!");
    } else {
      axios.post(BaseURL + "/reset-password-service", postBody).then((res) => {
        if (res.status === 200 && res.data.status === "Success") {
          toast.success("Your password has been reset successful.");
          // window.location.href = "https://dashboard.ownfood.com.bd";
          navigate("/CustomerLogin");
        } else {
          ErrorToast("OTP Code Does Not Match!");
        }
      });
    }
  };

  return (
    <div class='CustomerLogin'>
      <div class='container-fluid'>
        <div class='row'>
          <div class='col-xl-5 col-lg-6 col-md-12 bg-color-23'>
            <div class='form-section'>
              <h3>Reset Your Password</h3>
              <div class='login-inner-form'>
                <form>
                  <div class='form-group clearfix'>
                    <label for='first_field' class='form-label'>
                      Enter New Password
                    </label>
                    <div class='form-box'>
                      <input
                        ref={(input) => (passRef = input)}
                        name='email'
                        type='password'
                        class='form-control'
                        id='first_field'
                        placeholder='Password'
                        aria-label='Password'
                      />
                      <i class='HiOutlineMail'>
                        <HiOutlineMail />
                      </i>
                    </div>
                  </div>
                  <div class='form-group clearfix'>
                    <label for='second_field' class='form-label'>
                      Re-Enter The Password
                    </label>
                    <div class='form-box'>
                      <input
                        ref={(input) => (confirmPassRef = input)}
                        name='confirm-password'
                        type='password'
                        class='form-control'
                        autocomplete='off'
                        id='second_field'
                        placeholder='Re-Enter Password'
                        aria-label='Re-Enter Password'
                      />
                      <i class='RiLockPasswordFill'>
                        {" "}
                        <RiLockPasswordFill />
                      </i>
                    </div>
                  </div>
                  {/* <div class='checkbox form-group clearfix'>
                    <div class='form-check float-start'>
                      <input
                        class='form-check-input'
                        type='checkbox'
                        id='rememberme'
                      />
                      <label class='form-check-label' for='rememberme'>
                        Remember me
                      </label>
                    </div>
                    <Link
                      to='/ForgetPassword'
                      class='link-light float-end forgot-password'
                    >
                      Forgot your password?
                    </Link>
                  </div> */}
                  <div class='form-group clearfix mb-0'>
                    <button
                      onClick={LoginSubmit}
                      type='submit'
                      class='btn btn-primary btn-lg btn-theme'
                    >
                      Change Password
                    </button>
                  </div>
                </form>
              </div>
              <p class='text-center'>
                Don't have an account?
                <Link to='/CustomerRegistration'> Register here</Link>
              </p>
            </div>
          </div>
          <div class='col-xl-7 col-lg-6 col-md-12 bg-img'>
            <div class='info'>
              <img src='/Assets/Img/login__logo_1.jpeg' />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
