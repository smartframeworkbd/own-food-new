import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BaseURL } from "../../Helper/config";
import { VerifyRegistrationOtp } from "../../API/OTPVerifyAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const ForgetOTPForm = () => {
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);
  
  let firstref = useRef(null);
  let secRef = useRef(null);
  let thirdRef = useRef(null);
  let fourtRef = useRef(null);

  let navigate = useNavigate();
  const focusNextInput = (currentInput, nextInput) => {
    if (currentInput.value.length === currentInput.maxLength) {
      nextInput.focus();
    }
  };
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     if (seconds > 0) {
  //       setSeconds(seconds - 1);
  //     }

  //     if (seconds === 0) {
  //       if (minutes === 0) {
  //         clearInterval(interval);
  //       } else {
  //         setSeconds(59);
  //         setMinutes(minutes - 1);
  //       }
  //     }
  //   }, 1000);

  //   return () => {
  //     clearInterval(interval);
  //   };
  // }, [seconds]);
  const handlePaste = (e) => {
    e.preventDefault(); // Prevent the default paste behavior
    const pastedText = e.clipboardData.getData("text/plain");

    // Check if the pasted text is exactly four digits
    if (/^\d{4}$/.test(pastedText)) {
      // Split the four digits into individual characters
      const digits = pastedText.split("");

      // Fill the input fields with the individual digits
      firstref.current.value = digits[0] || "";
      secRef.current.value = digits[1] || "";
      thirdRef.current.value = digits[2] || "";
      fourtRef.current.value = digits[3] || "";
      // const otp = `${firstOtp}${secondOtp}${thirdOtp}${fourthOtp}`;
      // setOtp(otp)
    }
  };
  const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const handleOtp = async (event) => {
    event.preventDefault();
    const firstOtp = firstref.current.value;
    const secondOtp = secRef.current.value
    const thirdOtp = thirdRef.current.value;
    const fourthOtp = fourtRef.current.value;
    const otp = `${firstOtp}${secondOtp}${thirdOtp}${fourthOtp}`;
    // setOtp(otp)
    let data = await VerifyRegistrationOtp(sessionUser.email, otp);
    if (data) {
      toast.success("OTP Verified")
      navigate("/CustomerLogin");
    }
  };

  return (
    <div>
      <section class='fxt-template-animation fxt-template-layout2'>
        <div class='container'>
          <div class='row'>
            <div class='col-lg-6 col-12 fxt-bg-color'>
              <div class='fxt-content'>
                <div class='fxt-header'>
                  <a href='#' class='fxt-logo'>
                    <img src='/Assets/Img/ownfood.png' alt='Logo' />
                  </a>
                </div>
                <div class='fxt-form'>
                  <a href='#' class='fxt-otp-logo'>
                    <img
                      src='/Assets/Img/OTP/whatsapp-icon.png'
                      alt='Otp Logo'
                    />
                  </a>
                  <h2>Congratulations!</h2>
                  <p>
                    Please enter the OTP (one time password) to verify your
                    account. A Code has been sent to
                    {sessionUser && (
                      <span>{`${sessionUser?.userMobileNo?.slice(
                        0,
                        3
                      )}*****${sessionUser.userMobileNo.slice(8, 10)}`}</span>
                    )}
                  </p>
                  <label>Enter OTP Code Here</label>
                  <form method='POST' id='otp-form'>
                    <div class='fxt-transformY-50 fxt-transition-delay-1'>
                      <div class='fxt-form-row'>
                        <input
                          ref={firstref}
                          type='text'
                          class='fxt-form-col otp-input form-control'
                          maxlength='1'
                          onPaste={handlePaste}
                          required
                          onChange={() =>
                            focusNextInput(firstref.current, secRef.current)
                          }
                          autoFocus
                        />
                        <input
                          type='text'
                          ref={secRef}
                          class='fxt-form-col otp-input form-control'
                          maxlength='1'
                          required
                          onChange={() =>
                            focusNextInput(secRef.current, thirdRef.current)
                          }
                        />
                        <input
                          type='text'
                          ref={thirdRef}
                          class='fxt-form-col otp-input form-control'
                          maxlength='1'
                          required
                          onChange={() =>
                            focusNextInput(thirdRef.current, fourtRef.current)
                          }
                        />
                        <input
                          type='text'
                          ref={fourtRef}
                          class='fxt-form-col otp-input form-control'
                          maxlength='1'
                          // onChange={() => focusNextInput(thirdRef.current, fourtRef.current)}

                          required
                        />
                      </div>
                    </div>
                    {/* {seconds > 0 || minutes > 0 ? (
                      <p>
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>Didn't recieve code?</p>
                    )} */}
                    <div class='fxt-form-btn fxt-transformY-50 fxt-transition-delay-4'>
                      <button
                        type='submit'
                        class='fxt-btn-fill'
                        onClick={handleOtp}
                      >
                        Verify
                      </button>
                    </div>
                  </form>
                </div>
                <div class='fxt-footer'>
                  <div class='fxt-transformY-50 fxt-transition-delay-7'>
                    <p>
                      Not received your code?
                      <button class='fxt-btn-resend' type='submit'>
                        Resend code
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              class='col-lg-6 col-12 fxt-none-991 fxt-bg-img'
              //   data-bg-image='/Assets/Img/OTP/bg35-1.jpg'
            >
              <img src='/Assets/Img/OTP/bg35-1.jpg' alt='' />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ForgetOTPForm;
