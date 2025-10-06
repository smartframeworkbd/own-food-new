import React, { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { getToken } from "../../Helper/SessionHelper";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import { Link, unstable_HistoryRouter, useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { toast } from "react-hot-toast";

import { decode as base64_decode, encode as base64_encode } from "base-64";

import { AiFillDelete, AiFillEdit, AiOutlinePlus } from "react-icons/ai";
import ModalCheckOut from "../Modal/ModalCheckOut";
import ModalCheckOutEdit from "../Modal/ModalCheckoutEdit";
import ModelAddressBook from "../Modal/ModelAddressBook";

import labels from "../../translationData/checkout.json";
import Swal from "sweetalert2";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";

import {
  addItem,
  addItemToCart,
  setCartList,
  removeAllItems,
} from "../../Redux/State-slice/CartSlice";

const CheckOut = () => {
  const [methodName, setMethodName] = useState("");
  const [CouponData, setCouponData] = useState([]);
  const [paySystemName, setPaySystemName] = useState("payNow");
  const [couponPrice, setCouponPrice] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(0);
  const [deliveryFeeRider, setDeliveryRider] = useState(0);
  const [finalSubTotal, setFinalSubTotal] = useState(0);
  const [deliveryDistance, setDeliveryDistance] = useState();
  const [coupon, setCoupon] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const [DefaultAddress, setDefaultAddress] = useState({});
  const [modalShow, setModalShow] = React.useState(false);
  const [modalShowEdit, setModalShowEdit] = React.useState(false);
  const [cart, setCart] = useState([]);
  const [subTotal, setSubTotal] = useState(0);
  const [addressBooks, setAddressBooks] = useState([]);
  const [addressToEdit, setAddressToEdit] = useState(null);
  const [cartData, setCartData] = useState([]);

  const [walletBalance, setWalletBalance] = useState(0); // You can fetch this from API
  const [useWallet, setUseWallet] = useState(true);

  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  const generateRandomNumber = () => {
    const newRandomNumber = Math.floor(Math.random() * 1000);
    if (newRandomNumber) {
      return newRandomNumber;
    } else {
      generateRandomNumber();
    }
  };

  let navigate = useNavigate();

  const dispatch = useDispatch();

  const UserDetails = JSON.parse(localStorage.getItem("UserDetails"));

  let COD_SERVICE_CHARGES = parseInt(process.env.REACT_APP_COD_SERVICE_CHARGES);
  let ORDER_THRESHOLD_AMOUNT = parseInt(
    process.env.REACT_APP_ORDER_THRESHOLD_AMOUNT
  );

  let ORDER_ADV_PERCENTAGET = parseInt(
    process.env.REACT_APP_ORDER_ADV_PERCENTAGE
  );

  let PAY_NOW_OFFER = parseInt(process.env.REACT_APP_PAY_NOW_OFFER);
  let ADVANCE_OFFER = parseInt(process.env.REACT_APP_ADVANCE_OFFER);

  let Token = getToken();
  const addressBook = async () => {
    const res = await fetch(
      `${BaseURL}/get-address-book-by-user/${UserDetails?._id}`
    );
    const data = await res.json();
    setAddressBooks(data.data);
  };
  const fetchData = async () => {
    const res = await fetch(
      `${BaseURL}/get-single-cart-by-user/${UserDetails?._id}`
    );
    // convert the data to json
    const data = await res.json();
    setCart(data.data[0]?.cartData[0]?.cartItem);
    setCartData(data.data[0]?.cartData[0]);
    // const addMoreKitchenLink = data.data[0]?.cartData[0]?.cartItem[0]?.sellerID;

    if (data.data[0]?.cartData[0]?.foodTotalPrice === undefined) {
      setSubTotal(0);
    } else {
      setSubTotal(data.data[0]?.cartData[0]?.foodTotalPrice);
    }
  };

  const fetchWalletData = async () => {
    const res = await axios.get(`${BaseURL}/get-user-wallet-balance/${UserDetails?._id}`)
    console.log(res);
    setWalletBalance(res.data.balance)

  }

  useEffect(() => {


    fetchWalletData()

    fetchData();

    addressBook();
  }, [UserDetails?._id]);

  let sericeFee = process.env.PLAT_FORM_FEE || 50;

  let taxesFee = 0;

  useEffect(() => {
    let totalPrice =
      subTotal + deliveryFee + sericeFee + taxesFee - couponPrice;
    let totalPriceCopy =
      subTotal + deliveryFee + sericeFee + taxesFee - couponPrice;
    if (paySystemName === "payNow") {
      totalPriceCopy -= PAY_NOW_OFFER;
      totalPrice -= PAY_NOW_OFFER;
    } else if (paySystemName === "advancePayment") {
      totalPriceCopy -=
        ADVANCE_OFFER;
      totalPrice = parseFloat((totalPriceCopy * ORDER_ADV_PERCENTAGET) / 100)
      // 
    } else if (paySystemName === "cashOnDelivery") {
      totalPriceCopy += COD_SERVICE_CHARGES;
      totalPrice += COD_SERVICE_CHARGES;
    }
    if (useWallet) {
      totalPriceCopy -= walletBalance;
      totalPrice -= walletBalance;
      if (totalPriceCopy < 0) {
        totalPriceCopy = 0;
      }
    }
    setTotalPrice(totalPrice);
    setFinalSubTotal(totalPriceCopy);
  }, [subTotal, deliveryFee, couponPrice, paySystemName, useWallet, walletBalance]);

  const handleAddressUpdate = (updatedAddress) => {
    addressBook();
  };


  useEffect(() => {
    axios
      .get(`${BaseURL}/get-coupon`)
      .then((res) => setCouponData(res.data.data))
      .catch((err) => console.error("Error fetching coupons:", err));
  }, []);

  ///handle order ---------------------------------------
  //validate order
  const validateOrder = (addressValue, methodName, paySystemName) => {
    if (!addressValue) {
      Swal.fire({
        title: "",
        text: "Please select delivery address!",
        icon: "error",
      });
      return false;
    }

    if (methodName.length <= 0 && paySystemName !== "cashOnDelivery") {
      Swal.fire({
        title: "",
        text: "Please choose payment method!",
        icon: "error",
      });
      return false;
    }

    return true;
  };

  const Order = async (e) => {
    e.preventDefault();
    const addressValue = e?.target?.address?.value;

    if (!validateOrder(addressValue, methodName, paySystemName)) {
      return;
    }

    const addressObject = addressBooks.find(
      (item) => item._id === addressValue
    );

    if (cart?.length === 0) {
      toast.error("Please Add Some Food!", { position: "bottom-center" });
      return;
    }

    const postBody = constructOrderPayload(addressObject);
    await submitOrder(postBody);
  };

  const constructOrderPayload = (addressObject) => {
    let postBody = {
      methodName,
      orderDeliveryAddressID: DefaultAddress._id,
      orderDeliveryAddress: addressObject,
      customerID: UserDetails?._id,
      sellerID: cart[0].sellerID,
      totalDistance: deliveryDistance,
      OrderLabel: cart[0].foodType,
      orderNotes: "",
      orderTotalAmount: finalSubTotal,
      dueAmount: finalSubTotal,
      payableAmount: totalPrice,
      deliveryCharge: deliveryFee,
      platFormFee: sericeFee,
      deliveryDateTime: localStorage.getItem("orderTime"),
      orderItems: cart,
      couponAmount: couponPrice,
      deliveryFeeForRider: deliveryFeeRider,
      paySystemName,
     isUseWallet: useWallet,
     walletBalance
    };

    if (coupon.length > 0) {
      postBody.couponCode = coupon
    }

    switch (paySystemName) {
      case "payNow":
        postBody.payNowOffer = PAY_NOW_OFFER;
        break;
      case "advancePayment":
        postBody.advanceOffer = ADVANCE_OFFER;
        postBody.partialPaymentAmount = totalPrice;
        break;
      case "cashOnDelivery":
        postBody.codCharge = COD_SERVICE_CHARGES;
        break;
    }

    return postBody;
  };
  // const token = localStorage.getItem("Token")
  const submitOrder = async (postBody) => {
    if (getToken()) {
      try {

        const res = await axios.post(`${BaseURL}/create-orders`, postBody, {
          headers: {
            token: Token,
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        });

        if (res.data.status === "Success") {
          // toast.success("Your order has been placed successfully!", { position: "bottom-center" });


          if (paySystemName !== "cashOnDelivery") {

            window.location.href = res.data.url;
          } else {
            navigate("/payment?paySystemName=cashOnDelivery");
          }
          dispatch(removeAllItems());
          localStorage.removeItem("cartList");
        } else {
          toast.error("Something went wrong");
        }
      } catch (error) {
        // console.error("Error placing order:", error);
        toast.error("An error occurred while placing the order.", {
          position: "bottom-center",
        });
      }
    } else {
      navigate("/CustomerLogin");
    }
  };

  const handleCoupon = () => {
    axios
      .post(`${BaseURL}/validate-coupon`, {
        couponCode: coupon,
        sellerId: cart[0]?.sellerID,
        customerId: UserDetails?._id,
      })
      .then((res) => {
        if (res.data.status === "Success") {
          setCouponPrice(res.data.discountAmount);
          toast.success("Coupon applied successfully!");
        } else {

          toast.error(res?.data?.message);
          setCouponPrice(0);
        }
      })
      .catch((err) => {
        console.error("Error validating coupon:", err);
        toast.error("Failed to validate coupon. Please try again.");
      });

  };

  const handleDefaultAddress = async (value) => {
    setDefaultAddress(value);
    let deliveryfeecal = await axios.post(`${BaseURL}/calculate-deliveryfee`, {
      AddressBookId: value._id,
      SellerId: cart[0]?.sellerID,
      OrderQuantity: cart?.length,
    });
    if (deliveryfeecal.data.status === "Success") {
      setDeliveryFee(Number(deliveryfeecal?.data?.deliveryFeeForBuyer));
      setDeliveryRider(Number(deliveryfeecal?.data?.deliveryFeeForRider));
      setDeliveryDistance(deliveryfeecal?.data?.distance);
    }
  };

  const bdtSymbol = `Tk`;
  //handle delete
  const handleDelete = async (item) => {
    try {
      const response = await axios.delete(
        `${BaseURL}/delete-address-book/${item._id}`
      );
      if (response.data.status === "Success") {
        toast.success("Address deleted successfully!");
        setAddressBooks((prevAddressBooks) =>
          prevAddressBooks.filter((address) => address._id !== item._id)
        );
      } else {
        toast.error("Failed to delete item!");
      }
    } catch (error) {
      toast.error("An error occurred while deleting the item!");
    }
  };
  return (
    <>
      <ModalCheckOut
        cartId={cartData?._id}
        show={modalShow}
        onUpdate={handleAddressUpdate}
        onHide={() => setModalShow(false)}
      />
      <ModalCheckOutEdit
        show={modalShowEdit}
        item={addressToEdit}
        onUpdate={handleAddressUpdate}
        onHide={() => setModalShowEdit(false)}
      />

      <section className="checkOut">
        <Container>
          <form onSubmit={Order}>
            <div className="inner">
              <Row>
                <Col lg={7}>
                  <div className="leftWrapper">
                    {/* <h3 className='sellerName'>Seller Name: Alex Kitchen</h3> */}
                    <div className="introDelivery">
                      {/* <h4>{labels.deliverDetails.bn}</h4> */}
                      <h4>
                        {getTranslation(
                          "deliverDetails",
                          currentLanguage,
                          labels
                        )}
                      </h4>
                    </div>

                    <div className="introDelivery">
                      <h4>
                        {getTranslation("address", currentLanguage, labels)}
                      </h4>
                      <div className="Priority ">
                        <div
                          className="p-inner shadow-sm"
                          onClick={() => setModalShow(true)}
                        >
                          <div className="d-flex align-content-center">
                            <AiOutlinePlus size={20} />
                            {/* <p className='mx-2'>{labels.Addaddress.bn}</p> */}
                            <p className="mx-2">
                              {getTranslation(
                                "Addaddress",
                                currentLanguage,
                                labels
                              )}
                            </p>
                          </div>
                          <div></div>
                        </div>
                        <>
                          {addressBooks.length > 0 &&
                            addressBooks.map((item, index) => {

                              return (
                                <div
                                  key={item?._id}
                                  className="d-flex align-items-center gap-1"
                                >
                                  <div>
                                    <input
                                      id={`address-${index}`}
                                      type="radio"
                                      required
                                      value={item._id}
                                      name="address"
                                      // defaultChecked={item.default === true}
                                      onClick={() => handleDefaultAddress(item)}
                                    />
                                  </div>
                                  <div>
                                    <label htmlFor={`address-${index}`}>
                                      <div className="p-inner shadow-hover bg-danger-hover">
                                        <div>
                                          <p className="text-bold">
                                            Deliver to: {item?.Name}
                                          </p>
                                          <p>{`${item?.districtData[0]?.name}, ${item?.zoneData[0]?.name},  ${item?.areaData[0]?.name} ${item?.blockData[0]?.name??""}`}</p>
                                          <p>{item?.phoneNumber}</p>
                                        </div>
                                        <div className="border border-success round p-1">
                                          <p>{item.addressType}</p>
                                        </div>
                                        <div
                                          className="d-flex align-items-center"
                                          style={{ marginLeft: "5px" }}
                                        >
                                          <AiFillEdit
                                            onClick={() => {
                                              setModalShowEdit(true);
                                              setAddressToEdit(item);
                                            }}
                                          />
                                          <div>
                                            <AiFillDelete
                                              onClick={() => handleDelete(item)}
                                            />
                                          </div>
                                        </div>
                                      </div>
                                    </label>
                                  </div>
                                </div>
                              );
                            })}
                        </>
                      </div>
                    </div>

                    <div className="introDelivery">
                      {/* <h4>{labels.orderSummary.bn}</h4> */}
                      <h4>
                        {getTranslation(
                          "orderSummary",
                          currentLanguage,
                          labels
                        )}
                      </h4>
                      <div className="Priority">
                        <div className="p-inner-single">
                          <div className="d-flex align-items-center justify-content-between">
                            <p>
                              {getTranslation(
                                "totalItems",
                                currentLanguage,
                                labels
                              )}
                              : {cart && cart?.length}
                            </p>
                            <a href={`/SellerProfile/${cartData?.cartItem?.length > 0 && cartData?.cartItem[0]?.sellerID}`}>
                              <span className="checkoutpricebtn fw-bold">
                                {getTranslation(
                                  "addmores",
                                  currentLanguage,
                                  labels
                                )}
                              </span>
                            </a>
                          </div>
                        </div>
                        <div className="p-inner-items">
                          {cart?.length > 0 ? (
                            <ul>
                              {cart?.map((item, index) => (
                                <li
                                  key={index}
                                  className="list-group-item d-flex align-items-center justify-content-between"
                                >
                                  <div className="d-flex align-items-start">
                                    <div className="me-3">

                                      <img
                                        src={

                                          ` ${item?.foodImage[0]?.extraLarge?.imageUrl}?height=80&width=80`
                                        }
                                        alt={item?.foodName || "Food Image"}
                                        className="img-thumbnail"
                                        style={{
                                          width: "80px",
                                          height: "80px",
                                          objectFit: "cover",
                                        }}
                                      />
                                    </div>
                                    <div>
                                      <h5 className="mb-1 text-primary">
                                        {item?.foodName}
                                      </h5>
                                      <small className="text-muted">
                                        Quantity: x {item?.foodQty}
                                      </small>
                                    </div>
                                  </div>
                                  <div>
                                    <button className="checkoutpagepricebtn fw-bold">
                                      {bdtSymbol} {item?.foodPrice?.toFixed(2)}
                                    </button>
                                  </div>
                                </li>
                              ))}
                            </ul>
                          ) : (
                            <p>
                              {getTranslation(
                                "NoOrderFound",
                                currentLanguage,
                                labels
                              )}
                            </p>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </Col>
                <Col lg={5}>
                  <div className="inner">
                    <div className="rightWrapper">
                      <div className="introDelivery">
                        <h4>
                          {getTranslation(
                            "orderTotal",
                            currentLanguage,
                            labels
                          )}{" "}
                          : {cart?.length}
                        </h4>
                      </div>
                      <div className="order-intro-list">
                        <ul>
                          <li>
                            <span>
                              {getTranslation(
                                "subTotal",
                                currentLanguage,
                                labels
                              )}
                              :
                            </span>{" "}
                            <span>
                              {bdtSymbol}
                              {subTotal}
                            </span>
                          </li>
                          <li>
                            <span>
                              {getTranslation(
                                "deliveryFee",
                                currentLanguage,
                                labels
                              )}
                              :
                            </span>{" "}
                            <span>
                              {bdtSymbol}
                              {deliveryFee}
                            </span>
                          </li>
                          <li>
                            <span>{labels.serviceFee.bn}:</span>{" "}
                            <span>
                              {bdtSymbol}
                              {sericeFee}
                            </span>
                          </li>

                          <li>
                            <span>
                              {getTranslation("taxes", currentLanguage, labels)}
                              :
                            </span>{" "}
                            <span>
                              {bdtSymbol}
                              {taxesFee}
                            </span>
                          </li>
                        </ul>
                      </div>
                      {couponPrice !== 0 && (
                        <div className="d-flex justify-content-between">
                          <p>discount:</p>
                          <span>
                            <del className="text-danger">{couponPrice}</del>
                          </span>{" "}
                        </div>
                      )}

                      {
                        paySystemName === "advancePayment" && <div className="total">
                        <p>
                          Sub Total:
                        </p>

                        <span>
                          {bdtSymbol}
                          {finalSubTotal}
                        </span>
                      </div>
                      }
                     

                      <div className="order-intro-list">
                        <ul>
                          {paySystemName === "payNow" &&
                            PAY_NOW_OFFER !== 0 && (
                              <li>
                                <span>Pay Now Offer:</span>{" "}
                                <span>{`-${PAY_NOW_OFFER}`}</span>
                              </li>
                            )}
                          {paySystemName === "advancePayment" &&
                            ADVANCE_OFFER !== 0 && (
                              <li>
                                <span>Advance Pay Offer:</span>{" "}
                                <span>{`-${ADVANCE_OFFER}`}</span>
                              </li>
                            )}
                          {paySystemName === "cashOnDelivery" &&
                            COD_SERVICE_CHARGES !== 0 && (
                              <li>
                                <span>Cash On Delivery Charge:</span>{" "}
                                <span>{`${COD_SERVICE_CHARGES}`}</span>
                              </li>
                            )}
                        </ul>
                      </div>
                      <div className="total">
                        <p>
                          {getTranslation("total", currentLanguage, labels)}:
                        </p>

                        {/* <span>{finalSubTotal}</span> */}
                        <span>
                          {bdtSymbol}
                          {totalPrice}
                        </span>
                      </div>

                      {
                        walletBalance > 0 && <div className="shadow-sm p-3 mb-3">
                          <div className="d-flex align-items-center justify-content-between mt-2">
                            <div className="d-flex align-items-center">
                              <input
                                defaultChecked
                                type="checkbox"
                                // value={"payNow"}
                                // defaultChecked
                                onChange={(e) => setUseWallet(e.target.checked)}
                                name="wallet"
                              />
                              <span className="ms-1">Wallet Balance</span>
                            </div>
                            <div className="d-flex">
                              {
                                ` ${bdtSymbol} ${walletBalance}`}

                            </div>
                          </div>
                        </div>
                      }

                      <div className="shadow-sm p-2">
                        <form>
                          <div>
                            <div className="d-flex align-items-center justify-content-between mt-2">
                              <div className="d-flex align-items-center">
                                <input
                                  defaultChecked
                                  type="radio"
                                  value={"payNow"}
                                  // defaultChecked
                                  onChange={(e) =>
                                    setPaySystemName(e.target.value)
                                  }
                                  name="paymentSystem"
                                />
                                <span className="ms-1">Pay Now</span>
                              </div>
                              <div className="d-flex">
                                {PAY_NOW_OFFER !== 0 &&
                                  `Get ${bdtSymbol} ${PAY_NOW_OFFER} tk bonus`}

                              </div>
                            </div>
                            <div className="d-flex align-items-center justify-content-between">
                              <div>
                                <input
                                  type="radio"
                                  value={"advancePayment"}
                                  onChange={(e) =>
                                    setPaySystemName(e.target.value)
                                  }
                                  name="paymentSystem"
                                />
                                <span className="ms-1">Advance Payment</span>
                              </div>
                              <div className="d-flex">
                                {ADVANCE_OFFER !== 0 &&
                                  `Get ${bdtSymbol}${ADVANCE_OFFER} tk bonus`}
                              </div>
                            </div>



                            {ORDER_THRESHOLD_AMOUNT >= finalSubTotal && (
                              <div className="d-flex align-items-center justify-content-between mt-2">
                                <div className="d-flex align-items-center">
                                  <input
                                    type="radio"
                                    value={"cashOnDelivery"}
                                    onChange={(e) =>
                                      setPaySystemName(e.target.value)
                                    }
                                    name="paymentSystem"
                                  />
                                  <span className="ms-1">Cash On Delivery</span>
                                </div>
                                <div className="d-flex">
                                  {COD_SERVICE_CHARGES !== 0 &&
                                    `Extra charge ${COD_SERVICE_CHARGES} tk `}
                                </div>
                              </div>
                            )}
                          </div>
                        </form>
                      </div>

                      <div className="shadow-sm p-2">
                        {paySystemName !== "cashOnDelivery" && (
                          <div className="inner">
                            <h6>{labels.paymentMethod.bn}</h6>
                            <form>
                              <div>
                                <div className="d-flex align-items-center justify-content-between">
                                  <div>
                                    <input
                                      type="radio"
                                      value={"shurjoPay"}
                                      onChange={(e) =>
                                        setMethodName(e.target.value)
                                      }
                                      name="paymentMethod"
                                    />
                                    <span className="ms-1">
                                      Credit/Debit Cards
                                    </span>
                                  </div>
                                  <div className="d-flex">
                                    <div>
                                      {" "}
                                      <img
                                        style={{
                                          height: "15px",
                                          width: "25px",
                                        }}
                                        src="./Assets/Img/payment/png/03.png"
                                        alt="mastercard"
                                      />
                                    </div>
                                    <div>
                                      {" "}
                                      <img
                                        style={{
                                          height: "15px",
                                          width: "25px",
                                        }}
                                        src="./Assets/Img/payment/png/02.png"
                                        alt="mastercard"
                                      />
                                    </div>
                                    <div>
                                      {" "}
                                      <img
                                        style={{
                                          height: "15px",
                                          width: "25px",
                                        }}
                                        src="./Assets/Img/payment/png/01.png"
                                        alt="mastercard"
                                      />
                                    </div>
                                  </div>
                                </div>

                                <div className="d-flex align-items-center justify-content-between mt-2">
                                  <div className="d-flex align-items-center">
                                    <input
                                      type="radio"
                                      value={"bkash"}
                                      onChange={(e) =>
                                        setMethodName(e.target.value)
                                      }
                                      name="paymentMethod"
                                    />
                                    <span className="ms-1">Bkash | Nagad</span>
                                  </div>
                                  <div className="d-flex">
                                    <div>
                                      <img
                                        style={{ height: "20px" }}
                                        src="./Assets/Img/payment/png/Bkash.png"
                                        alt="mastercard"
                                      />
                                    </div>{" "}
                                    <div>
                                      <img
                                        style={{ height: "20px" }}
                                        src="./Assets/Img/payment/png/Nagad.png"
                                        alt="mastercard"
                                      />
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </form>
                          </div>
                        )}
                      </div>

                      <div className="trams">
                        <p>
                          <strong>Terms:</strong> All prices incl. VAT. For your
                          order the ownfood additional conditions apply
                        </p>
                        <p>
                          Information about the processing of your data is
                          available in our privacy notice
                        </p>
                      </div>
                      <div className="promocode">
                        <div>
                          <div className="row gap-0 gx-0 border">
                            <div className="col-9">
                              <input
                                type="text"
                                onChange={(e) => setCoupon(e.target.value)}
                                placeholder="Enter Coupon"
                                className="form-control"
                              />
                            </div>
                            <div className="col-3">
                              <button
                                onClick={handleCoupon}
                                type="button"
                                className="btn btn-success w-100"
                              >
                                {getTranslation(
                                  "couponBTN",
                                  currentLanguage,
                                  labels
                                )}
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div className="payment-btn">
                        <button type="submit">
                          {paySystemName === "cashOnDelivery"
                            ? getTranslation(
                              "PaymentCODBTN",
                              currentLanguage,
                              labels
                            )
                            : getTranslation(
                              "PaymentBTN",
                              currentLanguage,
                              labels
                            )}
                        </button>
                      </div>
                    </div>
                  </div>
                </Col>
              </Row>
            </div>
          </form>
        </Container>
      </section>
    </>
  );
};

export default CheckOut;
