import React from "react";
import { Modal } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagramSquare,
  FaLinkedinIn,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import { useDispatch } from "react-redux";
import { addItem } from "../../Redux/State-slice/CartSlice";
import { toast } from "react-toastify";
import currencyLabels from "../../translationData/currency.json";
import { Link, useNavigate } from "react-router-dom";

const ShoppingPopUp = ({ show, handleClose, popupData }) => {
  const dispatch = useDispatch();
  const images = [
    {
      original: popupData?.foodImage[0].extraLarge.imageUrl,
      thumbnail: popupData?.foodImage[0].extraLarge.imageUrl,
    },
  ];
  const navigate = useNavigate();
  const handleAddCart = (item) => {
    dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
    navigate(`/SellerProfile/${item?.sellerID}`);
  };
  return (
    <div className='ShoppingPopUp container' style={{ padding: 10 }}>
      <Modal show={show} onHide={handleClose} animation={false} size='xl'>
        <Modal.Header closeButton>
          {/* <Modal.Title>Food Name</Modal.Title> */}
        </Modal.Header>
        <Modal.Body>
          <div className='product-view'>
            <div className='row'>
              <div className='col-md-6 col-lg-6'>
                <div className='view-gallery'>
                  <div class='image_slider'>
                    <ImageGallery
                      useTranslate3D={false}
                      items={popupData?.foodImage.map((image) => ({
                        original:   (() => {
                          const imageUrl = image?.extraLarge?.imageUrl

                          if (imageUrl) {
                            // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                            const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                '?width=355&height=205&quality=100';
                            
                            return newImageUrl;
                          }
                          
                          return '';
                        })()  ,
                        thumbnail:   (() => {
                          const imageUrl = image?.extraLarge?.imageUrl

                          if (imageUrl) {
                            // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                            const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                '?width=355&height=205&quality=100';
                            
                            return newImageUrl;
                          }
                          
                          return '';
                        })(),
                      }))}
                      showNav={false}
                      showPlayButton={false}
                      showFullscreenButton={false}
                    />
                  </div>
                </div>
              </div>
              <div className='col-md-6 col-lg-6'>
                <div className='view-details'>
                  {!!popupData?.sellerInfo?.length && (
                    <Link to={`/SellerProfile/${popupData?.sellerID}`}>
                      {" "}
                      <h1>{popupData?.sellerInfo[0]?.kitchenName}</h1>{" "}
                    </Link>
                  )}
                  <h3 className='view-name'>
                    <a>{popupData?.foodName}</a>
                  </h3>
                  <h6>{popupData?.foodType}</h6>
                  <div className='view-meta'>
                    <p>
                      Quantity:<span>{popupData?.foodQty}</span>
                    </p>
                  </div>
                  <div className='view-rating'>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <span>
                      <FaStar />
                    </span>
                    <a>(3 reviews)</a>
                  </div>
                  <h3 className='view-price'>
                    <del>
                      {currencyLabels.country === "Bangladesh"
                        ? currencyLabels.currency.bdt.symbol
                        : currencyLabels.currency.usa.symbol}
                      {popupData?.foodDiscountPrice}
                    </del>
                    <span>
                      {currencyLabels.country === "Bangladesh"
                        ? currencyLabels.currency.bdt.symbol
                        : currencyLabels.currency.usa.symbol}
                      {popupData?.foodPrice}
                      <small>/per kilo</small>
                    </span>
                  </h3>
                  <p className='view-desc'>{popupData?.description}</p>
                  {popupData?.foodAdditionalTags?.length > 0 && (
                    <div className='view-list-group'>
                      <label className='view-list-title'>tags:</label>
                      <ul className='view-tag-list'>
                        {popupData?.foodAdditionalTags?.map((item, index) => (
                          <li key={index}>
                            <a href='#'>{item}</a>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}

                  <div className='view-list-group'>
                    <label className='view-list-title'>Share:</label>
                    <ul className='view-share-list'>
                      <li>
                        <a
                          href='#'
                          className='icofont-facebook'
                          title='Facebook'
                        >
                          <FaFacebookF />
                        </a>
                      </li>
                      <li>
                        <a href='#' className='icofont-twitter' title='Twitter'>
                          <FaTwitter />
                        </a>
                      </li>
                      <li>
                        <a
                          href='#'
                          className='icofont-linkedin'
                          title='Linkedin'
                        >
                          <FaLinkedinIn />
                        </a>
                      </li>
                      <li>
                        <a
                          href='#'
                          className='icofont-instagram'
                          title='Instagram'
                        >
                          <FaInstagramSquare />
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className='view-add-group'>
                    <button
                      onClick={() => handleAddCart(popupData)}
                      className='product-add'
                      title='Add to Cart'
                    >
                      <i className='fas fa-shopping-basket'></i>
                      <span>add to cart</span>
                    </button>
                    {/* <div className='product-action'>
                      <button className='action-minus' title='Quantity Minus'>
                        <i className='icofont-minus'></i>
                      </button>
                      <input
                        className='action-input'
                        title='Quantity Number'
                        type='text'
                        name='quantity'
                        value='1'
                      />
                      <button  className='action-plus' title='Quantity Plus'>
                        <i className='icofont-plus'></i>
                      </button>
                    </div> */}
                  </div>
                  <div className='view-action-group'>
                    <a
                      className='view-wish wish'
                      href='#'
                      title='Add Your Wishlist'
                    >
                      <i className='icofont-heart'></i>
                      <span>Add To Favorite</span>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default ShoppingPopUp;
