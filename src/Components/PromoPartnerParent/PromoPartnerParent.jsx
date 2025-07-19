import React from 'react';
import PromoPartnerCard from '../PromoPartnerCard/PromoPartnerCard';
import image1 from '../../assets/partner1.png'
import image2 from '../../assets/partner2.png'

const partnerData = [
  {
    title: 'List Your Recipe on Ownfood',
    description: 'Would you like millions of new customers to enjoy your amazing food and groceries? Let’s start our partnership today!',
    buttonText: 'Become a Seller',
    image:image1 , 
    bgColor: '#fff4d6',
    type:"seller",
    btnClass: 'btn-primary'
  },
  {
    title: 'Become A Ownfood Hero',
    description: 'Are you a man of speed and a master of navigation? Become a Ownfood Hero and earn  .',
    buttonText: 'Join as a Hero',
   type:"rider",
    image: image2, 
    bgColor: '#e8f0ff',
    btnClass: 'btn-primary'
  }
];

const PartnerPromoSection = () => {
  return (
    <div className="container my-5">
      <div className="row g-5 p-3">
        {partnerData.map((item, index) => (
          <div className="col-md-6" key={index}>
            <PromoPartnerCard {...item} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default PartnerPromoSection;
