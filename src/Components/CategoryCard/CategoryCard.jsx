import React from 'react';
import './CategoryCard.css'; // Custom CSS
import { Link } from 'react-router-dom';
// import iceCreamIcon from './assets/ice-cream.png'; // Adjust path to your image

const CategoryCard = ({data}) => {
  
  return (
    <Link to={`/Category/${data?._id}`}>
    <div className="category-card d-flex align-items-center  gap-2">
      <div className="icon">
        <img src={data.categoryImage} alt="Ice Cream" className="icon-img " />
      </div>
      <div className="text">
        <h5 className="mb-0">{data.categoryName}</h5>
      </div>
    </div></Link>
    
  );
};

export default CategoryCard;
