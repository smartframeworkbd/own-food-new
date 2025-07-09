import React from 'react';
import './PromoCard.css';

const PromoCard = ({data}) => {
  // console.log(data.data)
  const {title,image,buttonText,bgColor} = data
  return (
    <div className="promo-card">
    <div className="promo-card-content" style={{ backgroundColor: bgColor }}>
      <div className="promo-text">
        <h5 className="text-white mb-3">{title}</h5>
        <button className="btn btn-light fw-bold w-fit">{buttonText}</button>
      </div>
      <div className="promo-image-container">
        <img src={image} alt="Promo" className="promo-image" />
      </div>
    </div>
  </div>
  );
};

export default PromoCard;
