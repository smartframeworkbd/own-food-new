import React from "react";
import LeftFilter from "../LeftFilter/LeftFilter";
import Search from "../Search/Search";
import DailyDeals from "../DailyDeals/DailyDeals";
import FoodCardPreOrderReview from "../../Common/Cards/FoodCardPreorderReview/FoodCardPreOrderReview";
import "./AllFood.css";
const AllFood = () => {
  return (
    <div className="container all-food">
      <div className="row">
        <div className="col-md-3 d-none d-md-block">
          <LeftFilter />
        </div>

        <div className="col-md-9">
          {/* Main content here (food items etc.) */}

          <Search />

          <DailyDeals />
          <h5 className="Foodcard-title">Indian</h5>
          <div className="row">
            {[1, 2, 3].map((item, index) => (
              <div className="col-md-4 mb-3" key={index}>
                <FoodCardPreOrderReview />
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllFood;
