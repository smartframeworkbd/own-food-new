import React from "react";
import "./LeftFilter.css";
import Range from "../../Common/Range/Range";

const LeftFilter = () => {
  return (
    <div className="LeftFilter-sidebar p-3 border rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filter</h5>
        <button className="btn btn-sm LeftFilter-btn-custom-blue">
          Clear all
        </button>
      </div>

      {/* Sort By */}
      <div className="mb-4">
        <h6>Sort by</h6>
        {[
          { id: "default", label: "Default", checked: true },
          { id: "ready", label: "Ready food" },
          { id: "instant", label: "Instant food" },
          { id: "catering", label: "Catering" },
          { id: "preorder", label: "Pre Order" },
        ].map(({ id, label, checked }) => (
          <div className="form-check" key={id}>
            <input
              className="form-check-input"
              type="radio"
              name="sort"
              id={id}
              defaultChecked={checked}
            />
            <label className="form-check-label" htmlFor={id}>
              {label}
            </label>
          </div>
        ))}
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
