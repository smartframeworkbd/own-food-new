import React, { useState } from 'react';
import './FoodCardPreorder.css';
import image from '../../assets/food.png'
import review from '../../assets/review.png'
import image1 from '../../assets/recipe1.png';
import labels from "../../translationData/currency.json";

import { CircleHelp, Coffee, Eye, Heart, Share2, ShoppingCart, ThumbsUp } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { addItem } from '../../Redux/State-slice/CartSlice';
import toast from 'react-hot-toast';
import { Link, useNavigate } from 'react-router-dom';
import ReuseableModel from '../Modal/ReuseableModel';
import { Button } from 'react-bootstrap';

const FoodCardPreorder = (item) => {
  // console.log(item)
const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  
  const sellerImgUrlRaw = item?.sellerInfo?.[0]?.sellerProfilePhoto?.[0]?.extraLarge?.imageUrl;

const sellerImgUrl = sellerImgUrlRaw
  ? sellerImgUrlRaw.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
    '?width=80&height=80&quality=100'
  : '';

const navigate = useNavigate();
  const dispatch = useDispatch();
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
          {/* <div className="overlay-text text-warning">5% DISCOUNT</div> */}

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

              <Link to={`/SellerProfile/${item?.sellerInfo?.[0]?._id}`} className="text-decoration-none text-dark">
             
              <div className="avatar bg-secondary rounded-circle">
                <img className="avatar bg-secondary rounded-circle" src={sellerImgUrl} />
              </div>
               </Link>
            </div>
            <div className="col-8">

              <Link to={`/ProductsDetails/${item._id}`} className="text-decoration-none text-dark">
              <div className="text-truncate fw-medium">{item.foodName}</div>
              </Link>

              <div className="d-flex justify-content-between align-items-center">
                <span  className="d-flex align-items-end "><img src={review} style={{ height: '20px', width: "20px" }} /> <span className='ms-1'>{item?.totalReviews}</span></span>
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

            
        </div>
      </div>
   <ReuseableModel
  title="Share this food"
  show={isShareModalOpen}
  handleClose={() => setIsShareModalOpen(false)}
>
  <div className="container py-3">
    <h5 className="mb-3 text-center">Share this with others</h5>

    <div className="row text-center justify-content-center g-3">
      <div className="col-4">
        <a
          href={`https://wa.me/?text=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-success w-100 d-flex flex-column align-items-center"
        >
          <i className="bi bi-whatsapp fs-3"></i>
          WhatsApp
        </a>
      </div>

      <div className="col-4">
        <a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(window.location.href)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn btn-outline-primary w-100 d-flex flex-column align-items-center"
        >
          <i className="bi bi-facebook fs-3"></i>
          Facebook
        </a>
      </div>

      <div className="col-4">
        <button
          onClick={() => {
            navigator.clipboard.writeText(`${window.location.href}ProductsDetails/${item._id}`);
            toast.success("Link copied!");
            setIsShareModalOpen(false);
          }}
          className="btn btn-outline-secondary w-100 d-flex flex-column align-items-center"
        >
          <i className="bi bi-clipboard fs-3"></i>
          Copy Link
        </button>
      </div>
    </div>
  </div>
</ReuseableModel>

    </div>
  );
};

export default FoodCardPreorder;
