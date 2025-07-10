import React, { useState } from "react";
import "./LeftFilter.css";
import Range from "../../Common/Range/Range";

const LeftFilter = ({ setFilters }) => {
  console.log("setFilters", setFilters);
  const [filterState, setFilterState] = useState({
    foodType: "",
    mealType: [],
    category: [],
    priceMin: 0,
    priceMax: 1200,
  });

  const foodTypes = ["Ready", "Instant", "Catering", "PreOrder"];
  const mealTypes = ["Breakfast", "Lunch", "Evening Snacks", "Dinner"];
  const categories = ["Biryani", "Burger", "Pizza", "Chicken", "Snacks"];

  // Handle radio (foodType)
  const handleFoodTypeChange = (e) => {
    const foodType = e.target.value;
    const updated = { ...filterState, foodType };
    setFilterState(updated);
    setFilters(updated);
  };

  // Handle checkbox for arrays
  const handleCheckboxChange = (e, type) => {
    const value = e.target.value;
    const checked = e.target.checked;
    const updatedArray = checked
      ? [...filterState[type], value]
      : filterState[type].filter((item) => item !== value);

    const updated = { ...filterState, [type]: updatedArray };
    setFilterState(updated);
    setFilters(updated);
  };

  // Handle Range update
  const handleRangeChange = (key, value) => {
    const updated = { ...filterState, [key]: value };
    setFilterState(updated);
    setFilters(updated);
  };

  const handleClearAll = () => {
    const cleared = {
      foodType: "",
      mealType: [],
      category: [],
      priceMin: 0,
      priceMax: 1200,
    };
    setFilterState(cleared);
    setFilters(cleared);
  };

  return (
    <div className="filter-sidebar p-3 border rounded">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h5 className="mb-0">Filter</h5>
        <button className="btn btn-sm btn-custom-blue" onClick={handleClearAll}>
          Clear all
        </button>
      </div>

      {/* Sort By / Food Type */}
      <div className="mb-4">
        <h6>Food Type</h6>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="foodType"
            id="all"
            value=""
            checked={filterState.foodType === ""}
            onChange={handleFoodTypeChange}
          />
          <label className="form-check-label" htmlFor="all">All</label>
        </div>
        {foodTypes.map((type) => (
          <div className="form-check" key={type}>
            <input
              className="form-check-input"
              type="radio"
              name="foodType"
              id={type}
              value={type.toUpperCase()}
              checked={filterState.foodType === type.toUpperCase()}
              onChange={handleFoodTypeChange}
            />
            <label className="form-check-label" htmlFor={type}>
              {type}
            </label>
          </div>
        ))}
      </div>

      {/* Meal Type */}
      <div className="mb-4">
        <h6>Meal Type</h6>
        {mealTypes.map((meal, index) => (
          <div className="form-check" key={meal}>
            <input
              className="form-check-input"
              type="checkbox"
              value={meal}
              id={`meal-${index}`}
              checked={filterState.mealType.includes(meal)}
              onChange={(e) => handleCheckboxChange(e, "mealType")}
            />
            <label className="form-check-label" htmlFor={`meal-${index}`}>
              {meal}
            </label>
          </div>
        ))}
      </div>

      {/* Price Range */}
      <Range
        min={0}
        max={1200}
        label="Price Range (TK)"
         onChange={(min, max) => {
    handleRangeChange("priceMin", min);
    handleRangeChange("priceMax", max);
  }}
      />

      {/* Delivery Time (optional) */}
      {/* <Range min={0} max={100} label="Delivery Time (min)" /> */}

      {/* Food Categories */}
      <div className="mb-2">
        <h6>Food Categories</h6>
        <input type="text" className="form-control mb-2" placeholder="Search" disabled />
        {categories.map((cat, index) => (
          <div className="form-check" key={cat}>
            <input
              className="form-check-input"
              type="checkbox"
              value={cat}
              id={`cat-${index}`}
              checked={filterState.category.includes(cat)}
              onChange={(e) => handleCheckboxChange(e, "category")}
            />
            <label className="form-check-label" htmlFor={`cat-${index}`}>
              {cat}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftFilter;
