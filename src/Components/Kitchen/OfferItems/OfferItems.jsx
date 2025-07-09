import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Nav, Button } from 'react-bootstrap';
import './OfferItems.css';
import SellerProfileFoodCard from '../SellerProfileFoodCard/SellerProfileFoodCard';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { BaseURL } from '../../../Helper/config';

const OfferItems = ({ items = [], title = "", loading }) => {


  return (
    <div className="container party-cack-container">
      <div className="heading-section d-flex justify-content-between align-items-center mt-4 mb-3">
        <h3 className="heading-title">{title}</h3> {/* ✅ dynamic foodType label */}
        <Button className="wish-btn">Wish Your Food</Button>
      </div>

      <Row className="gy-4">
        {loading ? (
          <p>Loading...</p>
        ) : items.length > 0 ? (
          items.map((food, index) => (
            <Col md={6} lg={4} key={index}>
              <SellerProfileFoodCard food={food} />
            </Col>
          ))
        ) : (
          <p className="text-muted">No food items found for this category.</p>
        )}
      </Row>
    </div>
  );
};
export default OfferItems;
