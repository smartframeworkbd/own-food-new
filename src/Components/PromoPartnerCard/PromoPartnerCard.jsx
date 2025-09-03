import React from 'react';
import './PromoPartnerCard.css';
import { DashBoardLink } from '../../Helper/config';

const PromoPartnerCard = ({ title, description, buttonText, image, bgColor, btnClass,type }) => {
  let link=''
  if(type=="seller")
    link='/become-seller'
  else
    link='/become-rider'
  return (
    <div className={`rounded row  promo-partner-inner-box`} style={{ backgroundColor: bgColor }}>
      <div className="col-4 d-flex align-items-end">
        <img src={image} alt="promo" className="partner-img-float img-fluid" />
      </div>
      <div className=" col-8 p-3">
        <h5 className="fw-bold">{title}</h5>
        <p className="mb-3">{description}</p>
        <a href={`${DashBoardLink}${link}`}>
          <button className={`btn ${btnClass}`}>{buttonText}</button>
        </a>

      </div>
    </div>
  );
};

export default PromoPartnerCard;
