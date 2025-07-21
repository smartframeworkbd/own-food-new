import React, { useState } from "react";
import "./FoodCard.css";
import review from "../../assets/review.png";
import {
  CircleHelp,
  Eye,
  ShoppingCart,
  ThumbsUp,
  Share2,
  Heart,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/State-slice/CartSlice";
import { toast } from "react-toastify";

const FoodCard = (item) => {
  const [showShareOptions, setShowShareOptions] = useState(false);

  const imageUrl = item?.foodImage[0]?.extraLarge?.imageUrl;
  // console.log(item);

  const foodImage = imageUrl
    ? imageUrl.replace(
        "http://assets.ownfood.com/uploads",
        "https://assets.ownfood.com/uploads"
      ) + "?width=291&height=225&quality=100"
    : "";

  const sellerImgUrlRaw =
    item?.sellerInfo?.[0]?.sellerProfilePhoto?.[0]?.extraLarge?.imageUrl;
  const sellerImgUrl = sellerImgUrlRaw
    ? sellerImgUrlRaw.replace(
        "http://assets.ownfood.com/uploads",
        "https://assets.ownfood.com/uploads"
      ) + "?width=80&height=80&quality=100"
    : "";

  const dispatch = useDispatch();
  const handleAddToCart = (item) => {
    dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
  };
  return (
    <div className="card food-card-default shadow-sm p-0 m-2">
      <div className="row g-0">
        <div className="col-auto label-vertical">
          {item?.sellerInfo?.[0]?.kitchenName || "Unknown Kitchen"}
        </div>

        <div className="col position-relative">
          <img src={foodImage} alt="food" className="img-fluid food-img" />

          {/* Discount Badge */}
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
              className="d-flex flex-column justify-content-center align-items-center"
            >
              <span className="icon-item">
                <ShoppingCart />
              </span>
            </div>
          </div>

          {/* Overlay Discount Text */}
          {/* <div className="overlay-text text-warning">5% DISCOUNT</div> */}
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="row align-items-center px-2 py-1 mb-1">
            <div className="col-4 d-flex justify-content-end">
              <div className="avatar bg-secondary rounded-circle">
                {sellerImgUrl && (
                  <img
                    src={sellerImgUrl}
                    alt="seller"
                    className="avatar bg-secondary rounded-circle"
                  />
                )}
              </div>
            </div>
            <div className="col-8">
              <div className="text-truncate fw-medium">
                {item?.foodName || "Untitled Food"}
              </div>

              <div className="d-flex justify-content-between align-items-center">
                <span className="d-flex justify-content-center align-items-center">
                  <img
                    src={review}
                    className="me-1"
                    style={{ height: "20px", width: "20px" }}
                    alt="review"
                  />
                  {item?.foodRating || "9.5%"}
                </span>
                <div>
                  <span className="fw-bold text-dark fs-5">
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
          </div>

          <div className="d-flex justify-content-between bg-primary text-white rounded-bottom px-2 py-1">
            <span>{item?.foodType || "Instant Food"}</span>
            <span>{item?.foodOrderBeforeTime || "--:--"}</span>
          </div>

          {/* Like, Comment, Share Section */}
          <div className="footer-actions d-flex justify-content-around align-items-center border-top py-2">
            <div className="action-item d-flex align-items-center gap-1">
              <ThumbsUp size={16} /> <span>Like</span>
            </div>
            <div className="action-item d-flex align-items-center gap-1">
              <Heart size={16} /> <span>Love</span>
            </div>
            <div className="action-item d-flex align-items-center gap-1">
              <Share2 size={16} /> <span>Share</span>
               {showShareOptions && (
    <div className="share-options bg-white border shadow-sm rounded p-2 position-absolute z-10" style={{ top: "120%", right: 0 }}>
      <div
        className="dropdown-item"
        onClick={() => {
          navigator.clipboard.writeText(window.location.href);
          toast.success("Link copied to clipboard!");
          setShowShareOptions(false);
        }}
      >
        📋 Copy Link
      </div>
      <a
        href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="dropdown-item"
      >
        🟢 WhatsApp
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="dropdown-item"
      >
        🔵 Facebook
      </a>
    </div>
  )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCard;
