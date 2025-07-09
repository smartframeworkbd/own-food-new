import React from "react";
import "./LeftFilter.css";
import Range from "../../Common/Range/Range";


const LeftFilter = () => {
  return (
    <div className="filter-sidebar p-3 border rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filter</h5>
        <button className="btn btn-sm btn-custom-blue">Clear all</button>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <h6>Sort by</h6>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="default"
            defaultChecked
          />
          <label className="form-check-label" htmlFor="default">
            Default
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="ready"
          />
          <label className="form-check-label" htmlFor="ready">
            Ready food
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="instant"
          />
          <label className="form-check-label" htmlFor="instant">
            Instant food
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="catering"
          />
          <label className="form-check-label" htmlFor="catering">
            Catering
          </label>
        </div>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="sort"
            id="preorder"
          />
          <label className="form-check-label" htmlFor="preorder">
            Pre Order
          </label>
        </div>
      </div>

      {/* Meal Type */}
      <div className="mb-4">
        <h6>Meal Type</h6>
        {["Breakfast", "Lunch", "Evening Snacks", "Dinner"].map(
          (meal, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`meal-${index}`}
              />
              <label className="form-check-label" htmlFor={`meal-${index}`}>
                {meal}
              </label>
            </div>
          )
        )}
      </div>

      <Range min={0} max={1200} label="Price Range (TK)" />
      <Range min={0} max={100} label="Delivery Time (min)" />

      {/* Food Categories */}
      <div className="mb-2">
        <h6>Food Categories</h6>
        <input type="text" className="form-control mb-2" placeholder="Search" />
        {["Biryani", "Burger", "Pizza", "Chicken", "Snacks"].map(
          (cat, index) => (
            <div className="form-check" key={index}>
              <input
                className="form-check-input"
                type="checkbox"
                id={`cat-${index}`}
              />
              <label className="form-check-label" htmlFor={`cat-${index}`}>
                {cat}
              </label>
            </div>
          )
        )}
      </div>
    </div>
  );
};

export default LeftFilter;
