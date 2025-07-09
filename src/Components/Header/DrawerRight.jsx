import React, { useContext, useEffect, useState } from 'react'
import ReactSlidingPane from 'react-sliding-pane';
import currencyLabels from "../../translationData/currency.json";
import labels from "../../translationData/menu.json";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";
import { BaseURL } from '../../Helper/config';
import { useNavigate } from 'react-router-dom';
import { FaEdit,FaPlus,FaMinus } from 'react-icons/fa';
import toast from 'react-hot-toast';
import CartDateSelect from "../Common/DateTime/CartDateSelect";
import { AiOutlineClose } from 'react-icons/ai';
import { addAdditionalInfo, addItem, decreaseItem, removeItem } from '../../Redux/State-slice/CartSlice';
import { useDispatch } from 'react-redux';

const DrawerRight = ({cart=[],state, setState}) => {
    //  const [state, setState] = useState({
    //     isPaneOpen: false,
    //   });
    
      const [selectedTime, setSelectedTime] = useState(null);
      const [selectedDate, setSelectedDate] = useState(null);
    
      const [additionalInfo, setAdditionalInfo] = useState("");
      const [editingItem, setEditingItem] = useState(null);
    
      const User = JSON.parse(localStorage.getItem("UserDetails"));

       const removeCartData = (id) => {
    dispatch(removeItem(id));
    toast.success("Food Remove successful!", {
      position: "bottom-center",
    });
  };

  useEffect(() => {
      localStorage.setItem("cartList", JSON.stringify(cart));
    }, [cart]);
 const increaseQty = (item) => {
    dispatch(addItem(item));
  };

  const decreaseQty = (item) => {
    dispatch(decreaseItem(item));
  };
      const handleEdit = (itemId) => {
    // alert()
    setEditingItem(itemId);
  };
   const handleInfoChange = (itemId, value) => {
      setAdditionalInfo((prev) => ({
        ...prev,
        [itemId]: value,
      }));
    };
    const dispatch = useDispatch();
  
    const handleSaveInfo = (itemId) => {
  
  
      let data = {
        additionalInfo: additionalInfo[itemId],
        id: itemId
      }
      dispatch(addAdditionalInfo(data))
      setEditingItem(null);
    };
  const navigate = useNavigate();
    const checkOut = async () => {
        if (User) {
          try {
            await fetch(`${BaseURL}/create-cart-items`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ customerID: User?._id, cartItem: cart }),
            })
              .then((res) => res.json())
              .then((data) => {
                if (data.status === "Success") {
                  navigate("/CheckOut");
                  // <Navigate to={"/checkOut"} />;
                  toast.success("Check Out successful!", {
                    position: "bottom-center",
                  });
                }
              });
          } catch (e) { }
        } else {
          navigate("/CustomerLogin");
        }
        //localStorage.setItem("checkOut", JSON.stringify({ cart, total }));
      };
      const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
    
    let total = 0;
  let max = 0;
  for (let i = 0; i < cart?.length; i++) {
    let orderBeforeTime = cart[i]?.foodOrderBeforeTime;

    if (typeof orderBeforeTime === "string" && orderBeforeTime.includes("day")) {
      const days = parseInt(orderBeforeTime);
      orderBeforeTime = days * 24;
    }
    else if (typeof orderBeforeTime === "string" && orderBeforeTime.includes("hours")) {
      orderBeforeTime = parseInt(orderBeforeTime);
    }

    // Update the max orderBeforeTime
    if (orderBeforeTime > max) {
      max = orderBeforeTime;
    }

    // Calculate total price
    total = total + cart[i].foodQty * cart[i].foodSalePrice;
  }

  return (
    <div>   <ReactSlidingPane
            className="some-custom-class"
            overlayClassName="some-custom-overlay-class"
            isOpen={state.isPaneOpen}
            width="400px"
            onRequestClose={() => setState({ paneLeft: false })}
          >
            <aside className="cart-sidebar active">
              <div className="cart-header">
                <div className="cart-total">
                  <i className="fas fa-shopping-basket"></i>
                  <span>total item ({cart?.length})</span>
                </div>

                <button
                  className="cart-close"
                  onClick={() => {
                    setState({ isPaneOpen: false });
                  }}
                >
                  <span className="icofont-close">
                    <AiOutlineClose />
                  </span>
                </button>
              </div>
              <ul className="cart-list">
                {cart.length > 0 && (
                  <div className="kitchenName">
                    <h2>
                      {cart?.length > 0 &&
                        cart[0]?.sellerInfo &&
                        cart[0]?.sellerInfo[0]?.kitchenName}
                    </h2>
                  </div>
                )}
                <div>
                  {/* hello dev{max}
                  {Date} */}
                  {cart && cart[0]?.foodType === "PREORDER" && (
                    <CartDateSelect
                      selectedDate={selectedDate}
                      setSelectedDate={setSelectedDate}
                      selectedTime={selectedTime}
                      setSelectedTime={setSelectedTime}
                      max={max}
                    />
                  )}
                </div>
                {cart?.map((item, index) => (
                  <li className="cart-item" key={index}>
                    <div className="cart-media">
                      <a>
                        <img
                          src={item?.foodImage && item?.foodImage[0]?.orginalImageUrl}
                          alt="product"
                        />
                      </a>
                      <button
                        className="cart-delete"
                        onClick={() => removeCartData(item?._id)}
                      >
                        <i className="far fa-trash-alt"></i>
                      </button>
                    </div>
                    <div className="cart-info-group">
                      <div className="cart-info d-lg-flex justify-content-between align-content-center">
                        <div>
                          <h6>
                            <a href="#">{item?.foodName}</a>
                          </h6>

                          {item?.foodPrice !== item?.foodSalePrice && (
                            <p
                              style={{
                                color: "red",
                                textDecoration: "line-through",
                              }}
                            >
                              Price -
                              {currencyLabels.country === "Bangladesh"
                                ? currencyLabels.currency.bdt.symbol
                                : currencyLabels.currency.usa.symbol}
                              {item?.foodPrice}
                            </p>
                          )}

                          <p>
                            Price -
                            {currencyLabels.country === "Bangladesh"
                              ? currencyLabels.currency.bdt.symbol
                              : currencyLabels.currency.usa.symbol}
                            {item?.foodSalePrice}
                          </p>
                          {cart && cart[0]?.foodType === "PREORDER" && (
                            <p>Order Before {item?.foodOrderBeforeTime}</p>
                          )}
                        </div>
                        <div>
                          <span className="text-bold">{item.foodType}</span>
                        </div>
                      </div>
                      <div className="cart-action-group">
                        <div className="product-action">
                          <button
                            onClick={() => decreaseQty(item)}
                            className="action-minus"
                            title="Quantity Minus"
                          >
                            <FaMinus />
                          </button>

                          <span
                            className="action-input ps-1 pe-1 rounded"
                            style={{ backgroundColor: "#ead4d44f" }}
                          >
                            {item.foodQty}
                          </span>

                          <button
                            onClick={() => increaseQty(item)}
                            className="action-plus"
                            title="Quantity Plus"
                          >
                            <FaPlus />
                          </button>
                        </div>
                        <div>
                          <h6>
                            {currencyLabels.country === "Bangladesh"
                              ? currencyLabels.currency.bdt.symbol
                              : currencyLabels.currency.usa.symbol}
                            {item?.foodQty * item?.foodSalePrice}
                          </h6>
                        </div>
                      </div>
                      <div className="cart-edit">


                        {
                          item.additionalInfo && <p>{item.additionalInfo}</p>
                        }

                        {editingItem === item?._id ? (
                          <div className="d-flex gap-1">
                            <input
                              type="text"
                              className="form-control"
                              value={additionalInfo[item?._id] || ""}
                              onChange={(e) =>
                                handleInfoChange(item?._id, e.target.value)
                              }
                              placeholder="Write additional info"
                            />
                            <button
                              className="btn btn-primary btn-sm"
                              onClick={() => handleSaveInfo(item?._id)}
                            >
                              Save
                            </button>
                          </div>
                        ) : (
                          <button
                            className="cart-edit-icon"
                            onClick={() => handleEdit(item?._id)}
                          >
                            <FaEdit />
                          </button>
                        )}
                      </div>
                      {/* <div>
                        {additionalInfo[item?._id] ? (
                          <div>
                            <p>{additionalInfo[item._id]}</p>
                            {editingItem === item?._id ? (
                              <div className="d-flex gap-1">
                                <input
                                  type="text"
                                  className="form-control"
                                  value={additionalInfo[item?._id] || ""}
                                  onChange={(e) => handleInfoChange(item?._id, e.target.value)}
                                  placeholder="Write additional info"
                                />
                                <button
                                  className="btn btn-primary btn-sm"
                                  onClick={() => handleSaveInfo(item?._id)}
                                >
                                  Save
                                </button>
                              </div>
                            ) : (
                              <button
                                className="cart-edit-icon"
                                onClick={() => handleEdit(item?._id)}
                              >
                                <FaEdit />
                              </button>
                            )}
                          </div>
                        ) : (
                          <button
                            className="cart-edit-icon"
                            onClick={() => handleEdit(item?._id)}
                          >
                            <FaEdit />
                          </button>
                        )}
                      </div> */}

                    </div>
                  </li>
                ))}
                {/* <form onSubmit={handleAdditionalSubmit}>
                  <li>
                    <input
                      type="text"
                      placeholder="Additional Information:"
                      value={additionalInfo}
                      onChange={handleAdditionalChange}
                      className="form-control mt-3"
                    />
                  </li>
          
                </form> */}
              </ul>
              <div className="cart-footer">
                {/* <button className="coupon-btn">
                  
                  {getTranslation("couponTitle", currentLanguage, labels)}
                </button> */}
                {/* <form className="coupon-form">
                  <input type="text" placeholder="Enter your coupon code" />
                  <button type="submit">
                    <span>
                      {getTranslation(
                        "couponTitle.btn",
                        currentLanguage,
                        labels
                      )}
                    </span>
                  </button>
                </form> */}

                {/* <Link to={"/CheckOut"} className='cart-checkout-btn'> */}
                <button
                  className="w-100 h-100 cart-checkout-btn"
                  onClick={() => {
                    setState({ isPaneOpen: false });
                    checkOut();
                  }}
                >
                  <span className="checkout-label">
                    {/* {labels.cartBTN.bn} */}
                    {getTranslation("cartBTN", currentLanguage, labels)}
                  </span>
                  <span className="checkout-price">
                    {currencyLabels.country === "Bangladesh"
                      ? currencyLabels.currency.bdt.symbol
                      : currencyLabels.currency.usa.symbol}
                    {total}
                  </span>
                </button>
                {/* </Link> */}
              </div>
            </aside>
          </ReactSlidingPane></div>
  )
}

export default DrawerRight