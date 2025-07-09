import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
//import ReactCodeInput from "react-code-input";
import { useNavigate } from "react-router-dom";
import { BaseURL } from "../../Helper/config";
import { ErrorToast, IsEmail, IsMobile } from "../../Helper/FormHelper";
import toast from "react-hot-toast";

const OTP = () => {
  let navigate = useNavigate();
  let [data, setData] = useState("");
  let email = localStorage.getItem("forgetEmail")
    ? JSON.parse(localStorage.getItem("forgetEmail"))
    : "";
  let mobile = localStorage.getItem("forgetMobile")
    ? JSON.parse(localStorage.getItem("forgetMobile"))
    : "";
  let EmailOrMobile = email;
  if (IsEmail(email)) {
    EmailOrMobile = email;
  } else if (IsMobile(mobile)) {
    EmailOrMobile = mobile;
  }

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  let firstref = useRef(null);
  let secRef = useRef(null);
  let thirdRef = useRef(null);
  let fourtRef = useRef(null);

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
  //const sessionUser = JSON.parse(sessionStorage.getItem("user"));
  const handleOtp = async (event) => {
    event.preventDefault();
    const firstOtp = firstref.current.value;
    const secondOtp = secRef.current.value;
    const thirdOtp = thirdRef.current.value;
    const fourthOtp = fourtRef.current.value;
    const otp = `${firstOtp}${secondOtp}${thirdOtp}${fourthOtp}`;
    // setOtp(otp)
    if (otp.length == 4) {
      await axios
        .post(
          BaseURL +
            "/verify-otp-service-forget-password/" +
            EmailOrMobile +
            "/" +
            otp
        )
        .then((res) => {
          if (res.status === 200 && res.data.status === "Success") {
            localStorage.setItem("OTP", JSON.stringify(otp));

            navigate("/Reset-Password");
          } else {
            ErrorToast("OTP Code Does Not Match!");
          }
        });
    }
  };

  return (
    <div>
      <section className="fxt-template-animation fxt-template-layout2">
        <div className="container">
          <div className="row">
            <div className="col-lg-6 col-12 fxt-bg-color">
              <div className="fxt-content">
                <div className="fxt-header">
                  <a href="#" className="fxt-logo">
                    <img src="/Assets/Img/ownfood.png" alt="Logo" />
                  </a>
                </div>
                <div className="fxt-form">
                  <a href="#" className="fxt-otp-logo">
                    <img
                      src="/Assets/Img/OTP/whatsapp-icon.png"
                      alt="Otp Logo"
                    />
                  </a>
                  <h2>Congratulations!</h2>
                  <p>
                    Please enter the OTP (one time password) to verify your
                    account. A Code has been sent to
                    {email && (
                      <span>{`${email?.slice(0, 3)}*****${email.slice(
                        8,
                        email.length
                      )}`}</span>
                    )}
                    {mobile && (
                      <span>{`${mobile?.slice(0, 3)}*****${mobile.slice(
                        8,
                        mobile.length
                      )}`}</span>
                    )}
                  </p>
                  <label>Enter OTP Code Here</label>

                  <form method="POST" id="otp-form">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <div className="fxt-form-row">
                        <input
                          ref={firstref}
                          type="text"
                          className="fxt-form-col otp-input form-control"
                          maxlength="1"
                          onPaste={handlePaste}
                          required
                          onChange={() =>
                            focusNextInput(firstref.current, secRef.current)
                          }
                          autoFocus
                        />
                        <input
                          type="text"
                          ref={secRef}
                          className="fxt-form-col otp-input form-control"
                          maxlength="1"
                          required
                          onChange={() =>
                            focusNextInput(secRef.current, thirdRef.current)
                          }
                        />
                        <input
                          type="text"
                          ref={thirdRef}
                          className="fxt-form-col otp-input form-control"
                          maxlength="1"
                          required
                          onChange={() =>
                            focusNextInput(thirdRef.current, fourtRef.current)
                          }
                        />
                        <input
                          type="text"
                          ref={fourtRef}
                          className="fxt-form-col otp-input form-control"
                          maxlength="1"
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
                    <div className="fxt-form-btn fxt-transformY-50 fxt-transition-delay-4">
                      <button
                        type="submit"
                        className="fxt-btn-fill"
                        onClick={handleOtp}
                      >
                        Verify
                      </button>
                    </div>
                  </form>

                  {/* <form method="POST" id="otp-form">
                    <div className="fxt-transformY-50 fxt-transition-delay-1">
                      <div className="row">
                        <div className="col-3">
                          <input
                            ref={firstref}
                            type="text"
                            className="otp-input form-control"
                            maxlength="1"
                            onPaste={handlePaste}
                            required
                            onChange={() =>
                              focusNextInput(firstref.current, secRef.current)
                            }
                            autoFocus
                          />
                        </div>

                        <div className="col-3">
                          <input
                            type="text"
                            ref={secRef}
                            className="col-3 otp-input form-control"
                            maxlength="1"
                            required
                            onChange={() =>
                              focusNextInput(secRef.current, thirdRef.current)
                            }
                          />
                        </div>

                        <div className="col-3">
                          <input
                            type="text"
                            ref={thirdRef}
                            className="col-3 otp-input form-control"
                            maxlength="1"
                            required
                            onChange={() =>
                              focusNextInput(thirdRef.current, fourtRef.current)
                            }
                          />
                        </div>

                        <div className="col-3">
                          <input
                            type="text"
                            ref={fourtRef}
                            className="col-3 otp-input form-control"
                            maxlength="1"
                            // onChange={() => focusNextInput(thirdRef.current, fourtRef.current)}

                            required
                          />
                        </div>
                      </div>
                    </div>
                    {seconds > 0 || minutes > 0 ? (
                      <p>
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p>Didn't recieve code?</p>
                    )}
                    <div className="fxt-form-btn fxt-transformY-50 fxt-transition-delay-4">
                      <button
                        type="submit"
                        className="fxt-btn-fill"
                        onClick={handleOtp}
                      >
                        Verify
                      </button>
                    </div>
                  </form> */}
                </div>
                <div className="fxt-footer">
                  <div className="fxt-transformY-50 fxt-transition-delay-7">
                    <p>
                      Not received your code?
                      <button className="fxt-btn-resend" type="submit">
                        Resend code
                      </button>
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <div
              className="col-lg-6 col-12 fxt-none-991 fxt-bg-img"
              //   data-bg-image='/Assets/Img/OTP/bg35-1.jpg'
            >
              <img src="/Assets/Img/OTP/bg35-1.jpg" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default OTP;
