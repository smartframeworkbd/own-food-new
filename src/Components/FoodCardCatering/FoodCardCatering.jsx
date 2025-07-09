import React from 'react';
import './FoodCardCatering.css';
import image from '../../assets/cateringfood.png';
import kitchen from '../../assets/kitchen1.png';
import { CircleHelp, Coffee, Eye, ShoppingCart } from 'lucide-react';

const FoodCardCatering = () => {
  return (
    <div className="card food-card-catering shadow-sm p-0 m-2">
      <div className="row g-0">
        {/* Food Image Section */}
        <div className="col-12 position-relative">
          {/* Kitchen Name Label */}
          <div className="kitchen-label">Dhaka Special Kitchen</div>
          <img src={image} alt="food" className="img-fluid food-img" />

          {/* Discount Badge */}
          <div className="starburst example" id="example-2"><span>12% OFF</span></div>

          {/* Icon Container */}
          <div className="icon-container">
            <div className="icon-item"><CircleHelp size={16} /><span>1.32K</span></div>
            <div className="icon-item"><Eye size={16} /><span>1.32K</span></div>
            <div className="icon-item"><ShoppingCart size={16} /></div>
          </div>

          {/* Overlay Text */}
          <div className="overlay-text">5% DISCOUNT</div>

          {/* Bottom Info Bar */}
          <div className="bottom-info-bar">
            <div><span>Pre Order</span></div>
            <div className="d-flex align-items-center"><Coffee size={16} /><span>03.56m</span></div>
          </div>
        </div>

        {/* Footer Info */}
        <div className="footer-info">
          <div className="px-2 py-1">
            <h6 className="mb-1 fw-semibold">Corporate Lunch Package</h6>
            <div className="d-flex align-items-center gap-2 mb-2">
              <span className="fw-bold">৳120</span>
              <del className="text-muted">৳140</del>
            </div>

            <div className="d-flex align-items-center gap-2 mb-2">
              <img src={kitchen} alt="kitchen" className="rounded-circle" width="24" height="24" />
              <span className="small">Sumaiya Kitchen</span>
            </div>
<div className="food-items-container">
  {["Rice", "Beef", "Salad", "Daal", "Fish Fry", "Moju 125 ml"].map((item, index) => (
    <span key={index} className="food-item-pill">{item}</span>
  ))}
</div>
            {/* <div className="row g-1 small text-muted">
              <div className="col">Rice</div>
              <div className="col">Beef</div>
              <div className="col">Salad</div>
              <div className="col">Daal</div>
            </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FoodCardCatering;
