import React, { useEffect, useState } from "react";
import "./FeaturedItems.css";
import SellerProfileFoodCard from "../SellerProfileFoodCard/SellerProfileFoodCard";
import axios from "axios";
import { BaseURL } from "../../../Helper/config";
import { useParams } from "react-router-dom";

const FeaturedItems = ({ items = [], loading ,setFoodType,foodType}) => {
 

  return (
    <div className="kitchen-featured-items container py-4">
      {/* Filter Tabs */}
      <div className="d-flex gap-2 mb-3">
        {["ALL", "INSTANT", "PREORDER"].map(type => (
          <button
            key={type}
            className={`btn ${foodType === type ? "btn-warning text-white fw-semibold" : "btn-outline-secondary"}`}
            onClick={() => setFoodType(type)}
          >
            {type === "ALL" ? "All" : type === "INSTANT" ? "Instant Food" : "Pre order"}
          </button>
        ))}
      </div>

      {/* Title + CTA */}
      <div className="d-flex justify-content-start align-items-center mb-3">
        <h4 className="fw-semibold mb-0">Featured items</h4>
        <button className="btn btn-outline-primary ms-2">Wish Your Food</button>
      </div>

      {/* Cards Grid */}
      <div className="row g-3">
        {loading ? (
          <div className="text-center">Loading...</div>
        ) : items.length === 0 ? (
          <div className="text-center">No items found</div>
        ) : (
          items.slice(0,3).map((item, index) => (
            <div key={index} className="col-12 col-sm-6 col-md-4 col-lg-4">
              <SellerProfileFoodCard food={item} />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default FeaturedItems;
