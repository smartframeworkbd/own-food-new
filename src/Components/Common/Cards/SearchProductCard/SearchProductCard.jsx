import React from "react";
import { Link } from "react-router-dom";

const SearchProductCard = ({ item }) => {
  // Detect type based on existing fields
  const isFood = item?.foodName;
  const isKitchen = item?.kitchenName;
  const isCategory = item?.categoryName;
 const linkTo = isFood
    ? `/ProductsDetails/${item._id}`
    : isKitchen
    ? `/SellerProfile/${item._id}`
    : isCategory
    ? `/Category/${item._id}`
    : "#"; 
  return (
    <Link to={linkTo}>
    
        <div className="ownfood-product-card">
   
      <img
        src={
          isFood
            ? `${item.foodImage?.[0]?.extraLarge?.imageUrl}?height=50&width=50`
            : isKitchen
            ? `${item.sellerProfilePhoto?.[0]?.extraLarge?.imageUrl}?height=50&width=50`
            : isCategory
            ? item?.categoryImage
            : ""
        }
        alt={item.foodName || item.kitchenName || item.categoryName || "Item"}
        className="ownfood-product-img"
      />

      {/* Info Section */}
      <div className="ownfood-product-info">
        <p className="ownfood-product-title">
          {item.foodName || item.kitchenName || item.categoryName}
        </p>

        {/* Price only for food */}
        {/* {isFood && (
          <div className="ownfood-price-area">
            <span className="ownfood-price">{item.price}৳</span>
            {item.oldPrice && (
              <span className="ownfood-old-price">{item.oldPrice}৳</span>
            )}
          </div>
        )} */}
      </div>
    </div>
    </Link>

  );
};

export default SearchProductCard;
