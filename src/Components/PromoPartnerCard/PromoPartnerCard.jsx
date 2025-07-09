import React from 'react';
import './PromoPartnerCard.css';

const PromoPartnerCard = ({ title, description, buttonText, image, bgColor, btnClass }) => {
  return (
    <div className={`rounded row  promo-partner-inner-box`} style={{ backgroundColor: bgColor }}>
      <div className="col-4 d-flex align-items-end">
        <img src={image} alt="promo" className="partner-img-float img-fluid" />
      </div>
      <div className=" col-8 p-3">
        <h5 className="fw-bold">{title}</h5>
        <p className="mb-3">{description}</p>
        <button className={`btn ${btnClass}`}>{buttonText}</button>
      </div>
    </div>
  );
};

export default PromoPartnerCard;
