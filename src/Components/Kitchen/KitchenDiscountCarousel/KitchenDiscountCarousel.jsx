import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import './KitchenDiscountCarousel.css';
import { Copy } from 'lucide-react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseURL } from '../../../Helper/config';
const offers = [
  { id: 1, color: '#1A73E8', text: '25% OFF', code: 'Happynewyear2025' },
  { id: 2, color: '#EA4335', text: '25% OFF', code: 'Happynewyear2025' },
  { id: 3, color: '#34A853', text: '25% OFF', code: 'Happynewyear2025' },
  { id: 4, color: '#FBBC05', text: '25% OFF', code: 'Happynewyear2025' },
];

const KitchenDiscountCarousel = () => {
  const [coupons, setCoupons] = useState([]);
  let { id } = useParams();
  console.log(id, "id")
  const getCoupon = async () => {
    const res = await axios.get(`${BaseURL}/get-coupon-by-seller/${id}`)

    setCoupons(res.data?.data || []);

  }
  useEffect(() => {
    getCoupon()
  }, [id])

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    responsive: [
      {
        breakpoint: 768, // Mobile view
        settings: {
          slidesToShow: 1,
        },
      },
      {
        breakpoint: 992, // Tablet view
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <div className="container py-4">
      {coupons.length === 0 ? (
        <p>No offers available</p>
      ) : (
        <Slider {...settings}>
          {coupons.map((offer, index) => (
            <div key={index} className="px-2">
              <div className="discount-card shadow-sm">
                <div className="offer-badge" style={{ color: offer.color || '#1A73E8' }}>
                  <div className="position-relative top-0 left-0">
                    <svg className="blob" /* svg content here */ />
                    <span className="position-relative offer-text">
                      {offer.couponAmount}
                      {
                        offer.couponIsPercentage ? '%' : '৳'
                      }
                    </span>
                  </div>
                </div>
                <div className="offer-code text-muted d-flex align-items-center">
                  {offer.couponCode}
                  <Copy onClick={() => {
                    navigator.clipboard.writeText(offer.couponCode);
                    alert("Coupon code copied!");
                  }} height={16} width={16} className="ms-1" />
                </div>
              </div>
            </div>
          ))}
        </Slider>
      )}
    </div>
  );
};

export default KitchenDiscountCarousel;
