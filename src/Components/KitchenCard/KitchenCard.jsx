import React from 'react';
import './KitchenCard.css';
import { Locate, LocateFixedIcon, MapPin, Star } from 'lucide-react';
import { Button } from 'react-bootstrap';
import kitchen1 from '../../assets/kitchen1.png';

const KitchenCard = (item) => {
  console.log(item)
  return (
    <div className="kitchen-card">
      <div className="kitchen-info-section row">
        <div className="kitchen-image col-12  text-center d-flex justify-content-center mb-3">
          <img src={
            item.sellerProfilePhoto.length > 0?
                            (() => {
                              const imageUrl = item?.sellerProfilePhoto[0]?.extraLarge?.imageUrl

                              if (imageUrl) {
                                // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                    '?width=90&height=90&quality=100';
                                
                                return newImageUrl;
                              }
                              
                              return '';
                            })(): kitchen1
                          }
          
           alt="Kitchen" />
        </div>
        <div className="kitchen-details col-12">
          <h3> {item?.kitchenName?.length > 10
                            ? `${item.kitchenName.slice(0, 10)}...`
                            : item?.kitchenName}</h3>
          <div className="info-row d-flex align-items-center justify-content-center justify-content-md-start gap-3 mt-2">
            <div> <span className="text-nowrap">Active Food:  {item?.foodData?.length > 0
                            ? item?.foodData?.[0]?.count
                            : 0}</span></div>
            <div className="vertical-divider"></div>
            <div className="d-flex align-items-center gap-1">
              <Star size={16} color="#fbbf24" />
             <span className='text-nowrap'> Reviews (23)</span>
            </div>
          </div>

          <div className='kitchen-location d-flex align-items-center justify-content-center'>
            <span>
                <MapPin/>
            </span>
            <span>{
              item.address?.length > 15? `${item.address.slice(0, 15)}...`:item.address

              
              }</span>
          </div>
        </div>
      </div>
      <div className="kitchen-button mt-3">
        <Button variant="primary" className="w-100 rounded">
          Any WISH?
        </Button>
      </div>
    </div>
  );
};

export default KitchenCard;
