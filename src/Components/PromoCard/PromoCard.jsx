import React from 'react';
import './PromoCard.css';
import { Link } from 'react-router-dom';

const PromoCard = ({ data }) => {
  // console.log(data.data)
  //  {item?.bannerTitle.split(" ").slice(0, 10).join(" ")}
  const { bannerTitle, bannerImage, bannerButtonLabel, bannerBackgroundColor, bannerButtonURL } = data
  return (
    <div className="promo-card">
      <div className="promo-card-content" style={{ backgroundColor: bannerBackgroundColor }}>
        <div className="promo-text">
          <h5 className="text-white mb-3">{bannerTitle}</h5>
          <Link to={`${bannerButtonURL}`}>
            <button className="btn btn-light fw-bold w-fit">{bannerButtonLabel}</button>
          </Link>
        </div>
        <div className="promo-image-container">
          <img src={bannerImage} alt="Promo" className="promo-image" />
        </div>
      </div>
    </div>
  );
};

export default PromoCard;
