import React from 'react';
import './FoodCardPreorder.css';
import image from '../../assets/food.png'
import review from '../../assets/review.png'
import image1 from '../../assets/recipe1.png';
import labels from "../../translationData/currency.json";

import { CircleHelp, Coffee, Eye, Heart, Share2, ShoppingCart, ThumbsUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../Redux/State-slice/CartSlice';
import toast from 'react-hot-toast';
// import sampleImg from './food-sample.jpg'; // Replace with your image path

const FoodCardPreorder = (item) => {
  const sellerImgUrlRaw = item?.sellerInfo?.[0]?.sellerProfilePhoto?.[0]?.extraLarge?.imageUrl;

const sellerImgUrl = sellerImgUrlRaw
  ? sellerImgUrlRaw.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
    '?width=80&height=80&quality=100'
  : '';


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
        <div className="col-auto label-vertical ">
          {item?.sellerInfo && item?.sellerInfo[0]?.kitchenName}
        </div>

        <div className="col position-relative">
          <img src={
            item?.foodImage?.[0]?.extraLarge?.imageUrl
      ? item.foodImage[0].extraLarge.imageUrl.replace(
          'http://assets.ownfood.com/uploads',
          'https://assets.ownfood.com/uploads'
        ) + '?width=291&height=225&quality=100'
      : ''
          } alt="food" className="img-fluid food-img" />

          {/* Discount Badge */}

          {(!!item.foodDiscountPrice || !!item.foodDiscountPercentage) && (
                                <>
                                    {!!item?.foodDiscountPrice && item?.foodPrice !== item?.foodSalePrice && (
                                      
                                                <div class="starburst example" id="example-2"><span>{item.foodDiscountPrice} TK OFF</span></div>

                                      
                                   
                                    )}
                                    {!!item.foodDiscountPercentage && item?.foodPrice !== item?.foodSalePrice && (
                                       
                                                                                       <div class="starburst example" id="example-2"><span>{item.foodDiscountPercentage}% OFF</span></div>

                                      
                                    )}
                                </>
                            )}
          {/* <div class="starburst example" id="example-2"><span>12% OFF</span></div> */}
          {/* Right Icons */}
         <div className="icon-list text-white justify-content-center h-100">
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <span className='icon-item'>
                <CircleHelp />
              </span>
              <span>

                1.32K
              </span>
            </div>
            <div className='d-flex flex-column justify-content-center align-items-center'>
              <span className='icon-item'>
              <Eye />
            </span><span>
                1.32K
              </span></div>
            <div onClick={() => handleAddToCart(item)} className='d-flex flex-column justify-content-center align-items-center'>
              <span className='icon-item'><ShoppingCart /></span>


              {/* <span> 1.32K</span> */}
            </div>
          </div>

          {/* Overlay Discount Text */}
          <div className="overlay-text text-warning">5% DISCOUNT</div>

          <div className='overlay-text-fw justify-content-between'>

            <div>
                <span>{item?.foodType}</span>
            </div>
              <div className='d-flex gap-1'>
                <span>
                    <Coffee />
                </span>
                 <span>
                 {
                  item.foodOrderBeforeTime
                 }
                </span>
            </div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="footer-info ">
          <div className="row align-items-center px-2 py-1 mb-1">
            <div className="col-4 d-flex justify-content-end">
              <div className="avatar bg-secondary rounded-circle">
                <img className="avatar bg-secondary rounded-circle" src={sellerImgUrl} />
              </div>
            </div>
            <div className="col-8">
              <div className="text-truncate fw-medium">{item.foodName}</div>

              <div className="d-flex justify-content-between align-items-center">
                <span  className="d-flex align-items-end "><img src={review} style={{ height: '20px', width: "20px" }} /> <span className='ms-1'>9.5%</span></span>
                <div>
                  <span className="fw-bold text-dark fs-5"> {labels.country === "Bangladesh"
                                                  ? labels.currency.bdt.symbol
                                                  : labels.currency.usa.symbol}
                                              {item?.foodSalePrice}</span>
                  <span className="text-muted text-decoration-line-through ms-1 font-bold "> {labels.country === "Bangladesh"
                                                ? labels.currency.bdt.symbol
                                                : labels.currency.usa.symbol}
                                            {item?.foodPrice}</span>
                </div>
              </div>
            </div>

          </div>





          <div className="d-flex justify-content-between bg-primary text-white rounded-bottom">
            <span>Preorder Food</span>
            <span> {
                  item.foodOrderBeforeTime
                 }</span>
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
  );
};

export default FoodCardPreorder;
