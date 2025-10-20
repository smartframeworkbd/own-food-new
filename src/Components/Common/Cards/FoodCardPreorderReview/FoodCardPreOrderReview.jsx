import React from "react";
import "./FoodCardPreOrderReview.css";
import image from "../../../../assets/food.png";
import { BsHandThumbsUp, BsEmojiSmile, BsEmojiFrown } from "react-icons/bs";

import {
  CircleHelp,
  Coffee,
  Eye,
  Heart,
  Share2,
  ShoppingCart,
  ThumbsUp,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../../../Redux/State-slice/CartSlice";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import sampleImg from './food-sample.jpg'; // Replace with your image path

const FoodCardPreOrderReview = ({ item }) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
    const sellerId = item?.sellerInfo?.[0]?._id;
    if (sellerId) {
      navigate(`/SellerProfile/${sellerId}`);
    }
  };
  // console.log(item)
  return (
    <>
        <div className="card food-card-preorder shadow-sm p-0 m-2">
      <div className="row g-0">
        <div className="col-auto label-vertical">
          <Link to={`/SellerProfile/${item?.sellerInfo?.[0]?._id}`} className="text-decoration-none text-dark">

            {" "}
            {item?.sellerInfo?.[0]?.kitchenName || "Unknown Kitchen"}
          </Link>
        </div>

        <div className="imageparents col position-relative">
          <img
            src={item?.foodImage && item?.foodImage[0]?.extraLarge?.imageUrl}
            alt="food"
            className="img-fluid food-img"
          />

          {/* Discount Badge */}
          {/* <div className="badge bg-primary discount-badge d-flex justify-content-center align-items-center"><span> 40% OFF</span></div> */}
          {(!!item?.foodDiscountPrice || !!item?.foodDiscountPercentage) && (
            <div className="starburst example" id="example-2">
              <span>
                {item?.foodDiscountPrice
                  ? `${item?.foodDiscountPrice} TK OFF`
                  : `${item?.foodDiscountPercentage}% OFF`}
              </span>
            </div>
          )}
          {/* Right Icons */}
          <div className="icon-list text-white justify-content-center h-100">
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="icon-item">
                <CircleHelp />
              </span>
              <span>0</span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="icon-item">
                <Eye />
              </span>
              <span>0</span>
            </div>
            <div
              onClick={() => handleAddToCart(item)}
              className=" d-flex flex-column justify-content-center align-items-center"
            >
              <span className="icon-item">
                <ShoppingCart />
              </span>

              {/* <span> 1.32K</span> */}
            </div>
          </div>

          {/* Overlay Discount Text */}
          {/* <div className="overlay-text text-warning">5% DISCOUNT</div> */}

          <div className="overlay-text-fw justify-content-between">
            <div>
              <span>{item?.foodType}</span>
            </div>
            <div className="d-flex gap-1">
              <span>
                <Coffee />
              </span>
              <span>{item?.foodOrderBeforeTime}</span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="row align-items-center px-2 py-1 mb-1">
            <div className="col-4 d-flex justify-content-end">
              <Link to={`/SellerProfile/${item?.sellerInfo?.[0]?._id}`} className="text-decoration-none text-dark">

                <div style={{ height: '60px', width: '60px', overflow: 'hidden' }} className="avatar bg-secondary rounded-circle">
                  <img src={`${item?.sellerInfo?.[0]?.sellerProfilePhoto[0]?.extraLarge.imageUrl}?height=60&width=60`} />

                </div>
              </Link>
            </div>
            <div className="col-8">
              <div className="text-truncate fw-medium">
               

                <Link to={`/ProductsDetails/${item?._id}`} className="text-decoration-none text-dark">

                  {item?.foodName || "Untitled Food"}
                </Link>
              </div>

              {/* Reactions */}
              <div className="d-flex justify-content-between mt-2 px-1">
                <div className="text-center text-danger small">
                  <BsHandThumbsUp size={16} />
                  <div>{item.totalGood}</div>
                </div>
                <div className="text-center text-danger small">
                  <BsEmojiSmile size={16} />
                  <div>{item.totalBetter}</div>
                </div>
                <div className="text-center text-danger small">
                  <BsEmojiFrown size={16} />
                  <div>{item.totalBest}</div>
                </div>
              </div>
              {/* Price */}
              <div className="d-flex justify-content-between align-items-center">
                <div>
                  <span className="fw-bold text-dark fs-5">
                    {" "}
                    ৳ {item?.foodSalePrice}
                  </span>
                  {item?.foodPrice &&
                    item?.foodPrice !== item?.foodSalePrice && (
                      <span className="text-muted text-decoration-line-through ms-1">
                        ৳ {item.foodPrice}
                      </span>
                    )}
                </div>
              </div>
            </div>
            {/* <div className="footer-actions d-flex justify-content-around align-items-center border-top py-2">
              <div className="action-item d-flex align-items-center gap-1">
                <ThumbsUp size={16} /> <span>Like</span>
              </div>
              <div className="action-item d-flex align-items-center gap-1">
                <Heart size={16} /> <span>Love</span>
              </div>
              <div className="action-item d-flex align-items-center gap-1">
                <Share2 size={16} /> <span>Share</span>
              </div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
      {/* {show === true ? (
        <ShoppingPopUp
          show={show}
          handleClose={handleClose}
          popupData={popupData}
        />
      ) : (
        ""
      )} */}
      
      </>

  );
};

export default FoodCardPreOrderReview;
