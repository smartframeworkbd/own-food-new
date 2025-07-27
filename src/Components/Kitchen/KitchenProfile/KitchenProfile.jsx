import React, { useEffect, useState } from 'react';
import { Badge, Button, Card, Col, Container, Image, Row } from 'react-bootstrap';
import './KitchenProfile.css';

import { useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import { GetSellerAPI } from '../../../API/SellerAPI';

const categories = ['Kitchen', 'Showcase', 'Offer', 'Review', 'Food', 'Recipe', 'Tips & Tricks'];
const toCamelCase = (str) => {
  return str
    ?.toLowerCase()
    .split(' ')
    .map(word => word.charAt(0).toUpperCase() + word.slice(1))
    .join(' ');
};
const KitchenProfile = ({onTypeClick}) => {
  let { id } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const sellerData = useSelector((state) => state.seller.getSellerInfo);
  console.log(sellerData);
  
  useEffect(() => {
    setIsLoading(true);

    const fetchData = async () => {
      try {
        await GetSellerAPI(id);

      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };


    fetchData();




  }, [id]);
  return (
    <div className="py-4 kitchen-profile-container">
      <div className="category-bar d-flex flex-wrap justify-content-center gap-2 mb-3">
        {categories.map((cat, idx) => (
          <Button key={idx} variant="primary" onClick={()=>onTypeClick(cat)} className=" px-3 py-1 text-nowrap">
            {cat}
          </Button>
        ))}
      </div>

      <div className="p-3 rounded-4 ">
        <Row className="align-items-centerx p-1">
          <Col xs="auto">

            <Image
              src={sellerData[0]?.userData[0]?.userProfilePhoto[0]?.extraLarge?.imageUrl}
              alt="Avatar"
              width={70}
              height={70}
            />
          </Col>
          <Col>
            <h4 className="mb-1 fw-bold title-text">{toCamelCase(sellerData[0]?.kitchenName)}</h4>
            <div className="d-flex align-items-center flex-wrap gap-2">
              <span className="text-muted details-text">Active Food: {sellerData[0]?.foodCount}</span>
              <span className="text-warning fw-bold">
                ★ 0 <small className="text-muted details-text">(0)</small>
              </span>
              <Link to={`/wish-order?sellerId=${id}`} state={sellerData}>
                <Button size="sm" variant="primary" className="fw-semibold">
                  Any WISH?
                </Button>
              </Link>

            </div>
            <div className="text-muted mt-1 small details-text">
              Address: {sellerData[0]?.pointLocation?.userAddress}
            </div>
          </Col>
        </Row>

        {/* <hr /> */}

        <div className="mb-2">
          <strong>My Skill</strong>
          <div className="text-muted small mt-1">{sellerData[0] &&
            sellerData[0].otherFoodSkillsMedia?.length > 0 &&
            sellerData[0].otherFoodSkillsMedia.map(item => item.foodType).join(" • ")}



          </div>
        </div>

        <div>
          <strong>My Restriction</strong>
          <p className="text-muted small mt-1 mb-0">
            {sellerData[0] &&
              sellerData[0].myRestrictions?.length > 0 &&
              sellerData[0].myRestrictions?.map(item => item).join(" • ")}
          </p>
        </div>


        {/* chef name and details section start */}
        <div className='chef-name-details row '>
          <div className="col-12 col-md-3  mb-3 mb-md-0">
            <img src={sellerData[0]?.sellerProfilePhoto[0]?.extraLarge?.imageUrl} alt="Chef" className="chef-img img-fluid" />
          </div>
          <div className="col-12 col-md-9">
            <h2 className="chef-name">{sellerData[0] &&
              sellerData[0]?.userData[0] &&
            toCamelCase(sellerData[0]?.userData[0]?.userFullName)  }</h2>
            <p className="chef-details">
              {
                sellerData[0]?.userData[0]?.description
              }       
              </p>
          </div>
        </div>


      </div>
    </div>
  );
};

export default KitchenProfile;
