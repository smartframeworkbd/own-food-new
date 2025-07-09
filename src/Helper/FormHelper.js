import toast, { Toaster } from "react-hot-toast";
import Swal from "sweetalert2";
// let EmailRegx = /\S+@\S+\.\S+/;
const EmailRegx = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]{2,}\.[a-zA-Z]{2,}$/;

let NumberRegx = /^[0-9]*$/;
let MobileRegx = /(^(\+88|0088)?(01){1}[3456789]{1}(\d){8})$/;
let phoneNumberValidationRegex = /^(\+?\d{1,4}[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9})$/;

class FormHelper {
  IsEmpty(value) {
    return value.length === 0;
  }
  IsMobile1(value) {
    return !MobileRegx.test(value);
  }
  IsNumber(value) {
    return NumberRegx.test(value);
  }
  IsEmail(value) {
    return EmailRegx.test(value);
  }

  IsMobile(mobile) {
   return phoneNumberValidationRegex.test(mobile);
  }

 IsNotEmpty(value) {
  return value !== null && value !== undefined && value !== '' && !(Array.isArray(value) && value.length === 0);
}

  ErrorToast(msg) {
    Swal.fire({
      position: "center",
      icon: "info",
      title: `${msg}`,
      showConfirmButton: false,
      timer: 1500,
    });
    // toast.error(msg, {
    //   position: "bottom-center",
    // });
  }
  SuccessToast(msg) {
    Swal.fire({
      position: "center",
      icon: "success",
      title: `${msg}`,
      showConfirmButton: false,
      timer: 1500,
    });
    // toast.success(msg, { position: "bottom-center" });
  }
  getBase64(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  }
}
export const {
  IsEmpty,
  IsMobile,
  IsNumber,
  IsEmail,
  IsNotEmpty,
  ErrorToast,
  getBase64,
  SuccessToast,
} = new FormHelper();