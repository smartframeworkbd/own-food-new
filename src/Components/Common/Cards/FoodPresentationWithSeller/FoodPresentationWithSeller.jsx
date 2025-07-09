import React from "react";
import { Col } from "react-bootstrap";
import { FaEye, FaHeart, FaPlay, FaQuestion, FaStar } from "react-icons/fa";
import { Link } from "react-router-dom";
import "../FoodPresentation/FoodPresentationCard.css";
import { Toaster, toast } from "react-hot-toast";
// import labels from "../../../translationData/currency.json";
import labels from "../../../../translationData/currency.json";
import { addItem } from "../../../../Redux/State-slice/CartSlice";
import { useDispatch } from "react-redux";
const FoodPresentationWithSeller = ({ data, index, width }) => {


    function calculateTimeRemaining(nowTime, expiryDate) {
        const now = new Date(nowTime);
        const expiry = new Date(expiryDate);

        let difference = expiry - now;

        const hours = Math.floor(difference / (1000 * 60 * 60));
        difference -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(difference / (1000 * 60));
        difference -= minutes * (1000 * 60);
        const seconds = Math.floor(difference / 1000);

        return { hours, minutes, seconds };
    }

    let remainingTime = calculateTimeRemaining(
        data.nowTime,
        data.expiryDate
    );

    let formattedTime = `${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`;
    const colorNames = [
        "#16A34A",
        "#9333EA",
        "#DB2777",
        "#EA580C",
        "#FF0000",
        "#0000FF",
        "#00008B",
        "#800080",
        "#FF00FF",
        "#808080",
        "#FFA500",
        "#FFA500",
        "#800000",
        "#008000",
        "#808000",
    ];
    const randomColor = () => {
        return colorNames[Math.floor(Math.random() * colorNames.length)];
    };
    const dispatch = useDispatch();
    const handleAddToCart = (item) => {
        dispatch(addItem(item));
        toast.success("Food add successful!", {
            position: "bottom-center",
        });
    };
    return (
        <div
            className='mb-4 col-xl-3 col-lg-6 col-md-6 col-sm-9  food-presentation-card'
            style={{ width: width ? `${width}%` : "" }}
            key={index}
        >
            <div
                style={{
                    backgroundColor: randomColor(),
                    height: "360px",
                }}
                className={`inner__body `}
            >
                <div className='img__file'>
                    <img
                        className='img-fluid'
                        crossorigin='anonymous'
                        loading="lazy"
                        src={
                            (() => {
                                const imageUrl = data?.foodImage && data?.foodImage[0]?.extraLarge?.imageUrl

                                if (imageUrl) {
                                  // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                  const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                      '?width=355&height=205&quality=100';
                                  
                                  return newImageUrl;
                                }
                                
                                return '';
                              })()      
                            // data?.foodImage && data?.foodImage[0]?.extraLarge?.imageUrl
                        
                        }
                        alt=''
                    />
                    <div className='text_design'>
                        <h5 className='text-light'>
                            {data?.sellerInfo && data?.sellerInfo[0]?.kitchenName}
                        </h5>
                    </div>
                    <ul className='card-action-buttons'>
                        <li>
                            <a href='/' className='btn-floating  white' alt=''>
                                <i className='material-icons grey-text text-darken-3'>
                                    <FaQuestion
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='Share'
                                    />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a className='btn-floating accent-2'>
                                <i className='material-icons like'>
                                    <FaHeart
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='Add to favorite'
                                    />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a id='buy' className='btn-floating  blue'>
                                <i className='material-icons buy'>
                                    <FaStar
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='Review'
                                    />
                                </i>
                            </a>
                        </li>
                        <li>
                            <a id='buy' className='btn-floating  blue'>
                                <i className='material-icons buy'>
                                    <FaPlay
                                        data-toggle='tooltip'
                                        data-placement='left'
                                        title='video'
                                    />
                                </i>
                            </a>
                        </li>
                        <li className='btn-floating  blue'>
                            <button
                                onClick={() => {
                                    // setPopupData(data);
                                    // setShow(true);
                                }}
                                className='material-icons buy'
                            >
                                <FaEye
                                    data-toggle='tooltip'
                                    data-placement='left'
                                    title='Details'
                                    color='white'
                                />
                            </button>
                        </li>
                    </ul>
                    <div className='cart-top-label'>
                        <div className='d-flex  gap-1 cart-top-label-inner'>
                            <div className='food-type'>
                                <span>{data?.foodType}</span>
                            </div>
                            {(!!data.foodDiscountPrice || !!data.foodDiscountPercentage) && (
                                <>
                                    {!!data?.foodDiscountPrice && data?.foodPrice !== data?.foodSalePrice && (
                                        <div className='food-discount'>
                                            <span>{data.foodDiscountPrice}TK OFF</span>
                                        </div>
                                    )}
                                    {!!data.foodDiscountPercentage && data?.foodPrice !== data?.foodSalePrice && (
                                        <div className='food-discount'>
                                            <span>{data.foodDiscountPercentage}% OFF</span>
                                        </div>
                                    )}
                                </>
                            )}
                        </div>
                    </div>
                </div>

                <div className='text__file'>
                    <div className='d-flex justify-content-between align-items-center top_header'>
                        <p className='price'>
                            {labels.country === "Bangladesh"
                                ? labels.currency.bdt.symbol
                                : labels.currency.usa.symbol}
                            {data?.foodSalePrice}
                            {/* <br /> */}

                            {data.foodSalePrice !== data.foodPrice && (
                                <span className="ms-1">
                                    <del className='text-danger'>
                                        <span className='text-white'>
                                            {labels.country === "Bangladesh"
                                                ? labels.currency.bdt.symbol
                                                : labels.currency.usa.symbol}
                                            {data?.foodPrice}
                                        </span>
                                    </del>
                                </span>
                            )}
                        </p>
                        {data?.sellerInfo &&
                            data?.sellerInfo[0]?.sellerProfilePhoto.length > 0 ? (
                            <Link to={`/SellerProfile/${data?.sellerInfo[0]?._id}`}>
                                <div className='overlay__img'>
                                    <img
                                        alt={data?.sellerInfo[0]?.kitchenName|| "kitchen photo"}
                                        title={data?.sellerInfo[0]?.kitchenName|| "kitchen photo"}
                                        className='img-fluid h-100'
                                        src={
                                            (() => {
                                                const imageUrl =data?.sellerInfo[0]?.sellerProfilePhoto[0]?.extraLarge?.imageUrl
      
                                                if (imageUrl) {
                                                  // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                                  const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                                      '?width=80&height=80&quality=100';
                                                  
                                                  return newImageUrl;
                                                }
                                                
                                                return '';
                                              })()       
                                        }
                                      
                                    />
                                </div>
                            </Link>
                        ) : (
                            <Link
                                to={`/SellerProfile/${data?.sellerInfo && data?.sellerInfo[0]?._id
                                    }`}
                            >
                                <div className='overlay__img'>
                                    <img
                                        className='img-fluid'
                                        style={{ width: "100%" }}
                                        src='/Assets/Img/user.png'
                                        alt=''
                                    />
                                </div>
                            </Link>
                        )}

                        <p className='intro'>
                            <i
                                className='material-icons buy'
                                onClick={() => handleAddToCart(data)}
                            >
                                add_shopping_cart
                            </i>
                        </p>
                    </div>

                    <div className='d-flex align-datas-center justify-content-center '>
                        <Link to={`/ProductsDetails/${data?._id}`}>
                            <p
                                className=''
                                style={{
                                    marginTop: -18,
                                    position: "relative",
                                }}
                            >
                                <h2>{data?.foodName}</h2>
                            </p>
                        </Link>
                    </div>
                    <ul className='bottom_footer'>
                        {data?.foodAdditionalTags?.length > 0 ? (
                            <>
                                {data?.foodAdditionalTags?.map((tag) => {
                                    if (tag === "No Alcohol") {
                                        return (
                                            <li>
                                                <img
                                                    src='/Assets/Img/pot-3.jpeg'
                                                    className='footer_img'
                                                    alt=''
                                                />
                                            </li>
                                        );
                                    } else if (tag === "murgi") {
                                        return (
                                            <li>
                                                <img
                                                    src='/Assets/Img/pot-2.jpeg'
                                                    className='footer_img'
                                                    alt=''
                                                />
                                            </li>
                                        );
                                    }
                                })}
                            </>
                        ) : null}
                        {/* <li>
          <img
            src='/Assets/Img/pot-1.jpeg'
            className='footer_img'
            alt=''
          />
        </li>
       */}
                    </ul>
                </div>
            </div>

            {
                data.foodType == "PREORDER" && <div
                    style={{
                        borderTop: "3px solid #d4d4d4",
                        backgroundColor: "black",
                        padding: "2px 7px",
                    }}
                    className="text-white d-flex justify-content-center"
                >
                    {`Order Before ${data.foodOrderBeforeTime}`}
                </div>

            }
            {
                data.foodType == "INSTANT" && <div
                    style={{
                        borderTop: "3px solid #d4d4d4",
                        backgroundColor: "black",
                        padding: "2px 7px",
                    }}
                    className="text-white d-flex justify-content-center"
                >

                    {`Remaining ${formattedTime}`}
                </div>

            }

        </div>
    );
};

export default FoodPresentationWithSeller;
