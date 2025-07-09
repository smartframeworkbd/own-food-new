
// import axios from "axios";
// import React, { useEffect, useRef, useState } from "react";
// import { BaseURL } from "../../Helper/config";
// import { VerifyRegistrationOtp } from "../../API/OTPVerifyAPI";
// import { Link, useNavigate } from "react-router-dom";
// import toast from "react-hot-toast";
// import Swal from "sweetalert2";

// const WhatsAppOTP = () => {
//   const [showResend, setShowResend] = useState(false);
//   const [minutes, setMinutes] = useState(2);
//   const [seconds, setSeconds] = useState(30);
//   const [isTimerRunning, setIsTimerRunning] = useState(true);

//   let firstref = useRef(null);
//   let secRef = useRef(null);
//   let thirdRef = useRef(null);
//   let fourtRef = useRef(null);

//   let navigate = useNavigate();

//   const focusNextInput = (currentInput, nextInput) => {
//     if (currentInput.value.length === currentInput.maxLength) {
//       nextInput.focus();
//     }
//   };

//   // Reset timer function
//   const resetTimer = () => {
//     setMinutes(1);
//     setSeconds(30);
//     setShowResend(false);
//     setIsTimerRunning(true);
//   };

//   useEffect(() => {
//     let interval;
//     if (isTimerRunning) {
//       interval = setInterval(() => {
//         if (seconds > 0) {
//           setSeconds(seconds - 1);
//         } else if (minutes > 0) {
//           setMinutes(minutes - 1);
//           setSeconds(59);
//         } else {
//           clearInterval(interval);
//           setShowResend(true);
//           setIsTimerRunning(false);
//         }
//       }, 1000);
//     }
//     return () => clearInterval(interval);
//   }, [minutes, seconds, isTimerRunning]);

//   const handlePaste = (e) => {
//     e.preventDefault();
//     const pastedText = e.clipboardData.getData("text/plain");

//     if (/^\d{4}$/.test(pastedText)) {
//       const digits = pastedText.split("");
//       firstref.current.value = digits[0] || "";
//       secRef.current.value = digits[1] || "";
//       thirdRef.current.value = digits[2] || "";
//       fourtRef.current.value = digits[3] || "";
//     }
//   };

//   const sessionUser = JSON.parse(sessionStorage.getItem("user"));

//   const handleResend = async () => {
//     try {
//       const response = await axios.post(`${BaseURL}/resend-otp`, {
//         email: sessionUser.email,
//         mobile: sessionUser.userMobileNo,
//       });

//       if (response.data.status === "Success") {
//         toast.success("OTP Resent Successfully");
//         resetTimer(); // Reset the timer after successful resend
//         // Clear input fields
//         firstref.current.value = "";
//         secRef.current.value = "";
//         thirdRef.current.value = "";
//         fourtRef.current.value = "";
//         // Focus on first input
//         firstref.current.focus();
//       } else {
//         toast.error(response.data.message || "Failed to resend OTP");
//       }
//     } catch (error) {
//       console.error("Resend OTP Error:", error);
//       toast.error("Failed to resend OTP. Please try again.");
//     }
//   };

//   const handleOtp = async (event) => {
//     event.preventDefault();
//     const firstOtp = firstref.current.value;
//     const secondOtp = secRef.current.value;
//     const thirdOtp = thirdRef.current.value;
//     const fourthOtp = fourtRef.current.value;

//     // Check if all OTP fields are filled
//     if (!firstOtp || !secondOtp || !thirdOtp || !fourthOtp) {
//       toast.error("Please enter complete OTP");
//       return;
//     }

//     const otp = `${firstOtp}${secondOtp}${thirdOtp}${fourthOtp}`;

//     try {
//       let data = await VerifyRegistrationOtp(sessionUser.email, otp);
//       if (data) {
//         Swal.fire({
//           icon: "success",
//           title: "Welcome to OwnFood.",
//           text: "You have successfully created your account. Please log in to continue.",
//           confirmButtonText: "OK"
//         });

//         // toast.success("Your OTP has been verified");
//         navigate("/CustomerLogin");
//       }
//     } catch (error) {
//       toast.error("Invalid OTP. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <section className="OTP-W fxt-template-animation fxt-template-layout2">
//         <div className="container">
//           <div className="row">
//             <div className="col-lg-6 col-12 fxt-bg-color">
//               <div className="fxt-content">
//                 <div className="fxt-header">
//                   <a href="#" className="fxt-logo">
//                     <img src="/Assets/Img/ownfood.png" alt="Logo" />
//                   </a>
//                 </div>
//                 <div className="fxt-form">
//                   <a href="#" className="fxt-otp-logo">
//                     <img
//                       style={{ height: "50px" }}
//                       src="/Assets/Img/OTP/MessageIcon.png"
//                       alt="Otp Logo"
//                     />
//                   </a>
//                   <h2>Congratulations!</h2>
//                   <p>
//                     Please enter the OTP (one time password) to verify your
//                     account. A Code has been sent to{" "}
//                     {sessionUser && <span>{sessionUser?.userMobileNo}</span>}
//                   </p>
//                   <div>
//                     <Link to={"/CustomerRegistration"}>
//                       <p className="text-primary">change number</p>
//                     </Link>
//                   </div>

//                   <label>Enter OTP Code Here</label>
//                   <form method="POST" id="otp-form">
//                     <div className="fxt-transformY-50 fxt-transition-delay-1">
//                       <div className="fxt-form-row">
//                         <input
//                           ref={firstref}
//                           type="text"
//                           className="fxt-form-col otp-input form-control"
//                           maxLength="1"
//                           onPaste={handlePaste}
//                           required
//                           onChange={() =>
//                             focusNextInput(firstref.current, secRef.current)
//                           }
//                           autoFocus
//                         />
//                         <input
//                           type="text"
//                           ref={secRef}
//                           className="fxt-form-col otp-input form-control"
//                           maxLength="1"
//                           required
//                           onChange={() =>
//                             focusNextInput(secRef.current, thirdRef.current)
//                           }
//                         />
//                         <input
//                           type="text"
//                           ref={thirdRef}
//                           className="fxt-form-col otp-input form-control"
//                           maxLength="1"
//                           required
//                           onChange={() =>
//                             focusNextInput(thirdRef.current, fourtRef.current)
//                           }
//                         />
//                         <input
//                           type="text"
//                           ref={fourtRef}
//                           className="fxt-form-col otp-input form-control"
//                           maxLength="1"
//                           required
//                         />
//                       </div>
//                     </div>

//                     <div className="timer-section mt-3">
//                       {seconds > 0 || minutes > 0 ? (
//                         <p>
//                           Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
//                           {seconds < 10 ? `0${seconds}` : seconds}
//                         </p>
//                       ) : (
//                         <p>Didn't receive the code?</p>
//                       )}
//                     </div>

//                     <div className="fxt-form-btn fxt-transformY-50 fxt-transition-delay-4">
//                       {showResend ? (
//                         <button
//                           className="fxt-btn-fill"
//                           onClick={handleResend}
//                           type="button"
//                         >
//                           Resend Code
//                         </button>
//                       ) : (
//                         <button
//                           type="submit"
//                           className="fxt-btn-fill"
//                           onClick={handleOtp}
//                         >
//                           Verify
//                         </button>
//                       )}
//                     </div>
//                   </form>
//                 </div>
//               </div>
//             </div>
//             <div className="col-lg-6 col-12 fxt-none-991 fxt-bg-img">
//               <img src="/Assets/Img/OTP/ImageSide.png" alt="" />
//             </div>
//           </div>
//         </div>
//       </section>
//     </div>
//   );
// };

// export default WhatsAppOTP;
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { BaseURL } from "../../Helper/config";
import { VerifyRegistrationOtp } from "../../API/OTPVerifyAPI";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Swal from "sweetalert2";

const WhatsAppOTP = () => {
  const [showResend, setShowResend] = useState(false);
  const [minutes, setMinutes] = useState(2);
  const [seconds, setSeconds] = useState(30);
  const [isTimerRunning, setIsTimerRunning] = useState(true);
  const [otp, setOtp] = useState(""); // Single input field state

  let navigate = useNavigate();
  let inputRef = useRef(null);

  // Reset timer function
  const resetTimer = () => {
    setMinutes(1);
    setSeconds(30);
    setShowResend(false);
    setIsTimerRunning(true);
  };

  useEffect(() => {
    let interval;
    if (isTimerRunning) {
      interval = setInterval(() => {
        if (seconds > 0) {
          setSeconds(seconds - 1);
        } else if (minutes > 0) {
          setMinutes(minutes - 1);
          setSeconds(59);
        } else {
          clearInterval(interval);
          setShowResend(true);
          setIsTimerRunning(false);
        }
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [minutes, seconds, isTimerRunning]);

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedText = e.clipboardData.getData("text/plain");
    if (/^\d{4}$/.test(pastedText)) {
      setOtp(pastedText);
    }
  };

  const sessionUser = JSON.parse(sessionStorage.getItem("user"));

  const handleResend = async () => {
    try {
      const response = await axios.post(`${BaseURL}/resend-otp`, {
        email: sessionUser.email,
        mobile: sessionUser.userMobileNo,
      });

      if (response.data.status === "Success") {
        toast.success("OTP Resent Successfully");
        resetTimer();
        setOtp(""); // Clear input
        inputRef.current.focus();
      } else {
        toast.error(response.data.message || "Failed to resend OTP");
      }
    } catch (error) {
      console.error("Resend OTP Error:", error);
      toast.error("Failed to resend OTP. Please try again.");
    }
  };

  const handleOtp = async (event) => {
    event.preventDefault();
    if (otp.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP");
      return;
    }

    try {
      let data = await VerifyRegistrationOtp(sessionUser.email, otp);
      if (data) {
        Swal.fire({
          icon: "success",
          title: "Welcome to OwnFood.",
          text: "You have successfully created your account. Please log in to continue.",
          confirmButtonText: "OK"
        });

        navigate("/CustomerLogin");
      }
    } catch (error) {
      toast.error("Invalid OTP. Please try again.");
    }
  };

  return (
    <div>
      <section className="OTP-W fxt-template-animation fxt-template-layout2">
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
                      style={{ height: "50px" }}
                      src="/Assets/Img/OTP/MessageIcon.png"
                      alt="Otp Logo"
                    />
                  </a>
                  <h2>Congratulations!</h2>
                  <p>
                    Please enter the OTP (one time password) to verify your
                    account. A Code has been sent to{" "}
                    {sessionUser && <span>{sessionUser?.userMobileNo}</span>}
                  </p>
                  <div>
                    <Link to={"/CustomerRegistration"}>
                      <p className="text-primary">Change number</p>
                    </Link>
                  </div>

                  <label>Enter OTP Code Here</label>
                  <form method="POST" id="otp-form">
                    <div className="fxt-form-row">
                      <input
                        ref={inputRef}
                        type="text"
                        className="otp-input form-control"
                        maxLength="4"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        onPaste={handlePaste}
                        required
                        autoFocus
                      />
                    </div>

                    <div className="timer-section mt-3">
                      {seconds > 0 || minutes > 0 ? (
                        <p>
                          Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}:
                          {seconds < 10 ? `0${seconds}` : seconds}
                        </p>
                      ) : (
                        <p>Didn't receive the code?</p>
                      )}
                    </div>

                    <div className="fxt-form-btn fxt-transformY-50 fxt-transition-delay-4">
                      {showResend ? (
                        <button
                          className="fxt-btn-fill"
                          onClick={handleResend}
                          type="button"
                        >
                          Resend Code
                        </button>
                      ) : (
                        <button
                          type="submit"
                          className="fxt-btn-fill"
                          onClick={handleOtp}
                        >
                          Verify
                        </button>
                      )}
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-12 fxt-none-991 fxt-bg-img">
              <img src="/Assets/Img/OTP/ImageSide.png" alt="" />
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default WhatsAppOTP;

