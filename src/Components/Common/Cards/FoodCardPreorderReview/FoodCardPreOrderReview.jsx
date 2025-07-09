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
// import sampleImg from './food-sample.jpg'; // Replace with your image path

const FoodCardPreOrderReview = () => {
  return (
    
    <div className="card food-card-preorder shadow-sm p-0 m-2">
      <div className="row g-0">
        <div className="col-auto label-vertical">Dhaka Special Kitchen</div>

        <div className="col position-relative">
          <img src={image} alt="food" className="img-fluid food-img" />

          {/* Discount Badge */}
          {/* <div className="badge bg-primary discount-badge d-flex justify-content-center align-items-center"><span> 40% OFF</span></div> */}
          <div class="starburst example" id="example-2">
            <span>12% OFF</span>
          </div>
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
            <div className="d-flex flex-column justify-content-center align-items-center">
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
              <span>Pre Order</span>
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
                Pouring honey on .....
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
                  <span className="fw-bold text-dark fs-5">৳ 160</span>
                  <span className="text-muted text-decoration-line-through ms-1 font-bold">
                    ৳ 180
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCardPreOrderReview;
