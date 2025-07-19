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
// import sampleImg from './food-sample.jpg'; // Replace with your image path

const FoodCardPreOrderReview = ({ item }) => {
 
  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
  };
  return (
    <div className="card food-card-preorder shadow-sm p-0 m-2">
      <div className="row g-0">
        <div className="col-auto label-vertical">
          {" "}
          {item?.sellerInfo?.[0]?.kitchenName || "Unknown Kitchen"}
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
              <span>1.32K</span>
            </div>
            <div className="d-flex flex-column justify-content-center align-items-center">
              <span className="icon-item">
                <Eye />
              </span>
              <span>1.32K</span>
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
          <div className="overlay-text text-warning">5% DISCOUNT</div>

          <div className="overlay-text-fw justify-content-between">
            <div>
              <span>{item?.foodType}</span>
            </div>
            <div className="d-flex gap-1">
              <span>
                <Coffee />
              </span>
              <span>03.56m</span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="row align-items-center px-2 py-1 mb-1">
            <div className="col-4 d-flex justify-content-end">
              <div className="avatar bg-secondary rounded-circle" />
            </div>
            <div className="col-8">
              <div className="text-truncate fw-medium">
                {item?.foodName || "Untitled Food"}
              </div>

              {/* Reactions */}
              <div className="d-flex justify-content-between mt-2 px-1">
                <div className="text-center text-danger small">
                  <BsHandThumbsUp size={16} />
                  <div>9.5%</div>
                </div>
                <div className="text-center text-danger small">
                  <BsEmojiSmile size={16} />
                  <div>9.5%</div>
                </div>
                <div className="text-center text-danger small">
                  <BsEmojiFrown size={16} />
                  <div>47.6%</div>
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
            <div className="footer-actions d-flex justify-content-around align-items-center border-top py-2">
              <div className="action-item d-flex align-items-center gap-1">
                <ThumbsUp size={16} /> <span>Like</span>
              </div>
              <div className="action-item d-flex align-items-center gap-1">
                <Heart size={16} /> <span>Love</span>
              </div>
              <div className="action-item d-flex align-items-center gap-1">
                <Share2 size={16} /> <span>Share</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCardPreOrderReview;
