import React, { useEffect, useMemo, useState } from "react";
import "./LeftFilter.css";
import Range from "../../Common/Range/Range";
import { GetAllCategoryAPI } from "../../../API/CategoryAPI";
import { useSelector } from "react-redux";

const LeftFilter = ({ setFilters, defaultCategoryId }) => {
  const [filterState, setFilterState] = useState({
    foodType: "",
    mealType: [],
    categoryID: defaultCategoryId || "",
    priceMin: 0,
    priceMax: 1200,
  });
  const [categorySearch, setCategorySearch] = useState("");


  const foodTypes = ["Ready", "Instant", "Catering", "PreOrder"];
  const mealTypes = ["Breakfast", "Lunch", "Evening Snacks", "Dinner"];
  useEffect(() => {
    if (defaultCategoryId && defaultCategoryId !== filterState.categoryID) {
      setFilterState((prev) => ({ ...prev, categoryID: defaultCategoryId }));
      setFilters((prev) => ({ ...prev, categoryID: defaultCategoryId }));
    }
  }, [defaultCategoryId]); 
  const allCategoryList = useSelector((state) => state.category.allCategoryList);

  useEffect(() => {
    GetAllCategoryAPI();
  }, []);

  const memoizedCategories = useMemo(() => allCategoryList || [], [allCategoryList]);
  const filterCategories = useMemo(() => {
    return memoizedCategories.filter(cat =>
      cat.categoryName.toLowerCase().includes(categorySearch.toLowerCase())
    );
  },
    [memoizedCategories, categorySearch]
  )
  const handleFoodTypeChange = (e) => {
    const updated = { ...filterState, foodType: e.target.value };
    setFilterState(updated);
    setFilters(updated);
  };

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

  const handleCategoryChange = (e) => {
    const updated = { ...filterState, categoryID: e.target.value };
    setFilterState(updated);
    setFilters(updated);
  };

  const handleRangeChange = (key, value) => {
    const updated = { ...filterState, [key]: value };
    setFilterState(updated);
    setFilters(updated);
  };

  const handleClearAll = () => {
    const cleared = {
      foodType: "",
      mealType: [],
      categoryID: "",
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

      {/* Food Type */}
      <div className="mb-4">
        <h6>Food Type</h6>
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="foodType"
            value=""
            checked={filterState.foodType === ""}
            onChange={handleFoodTypeChange}
          />
          <label className="form-check-label">All</label>
        </div>
        {foodTypes.map((type) => (
          <div className="form-check" key={type}>
            <input
              className="form-check-input"
              type="radio"
              name="foodType"
              value={type.toUpperCase()}
              checked={filterState.foodType === type.toUpperCase()}
              onChange={handleFoodTypeChange}
            />
            <label className="form-check-label">{type}</label>
          </div>
        ))}
      </div>

      {/* Meal Type */}
      {/* <div className="mb-4">
        <h6>Meal Type</h6>
        {mealTypes.map((meal, index) => (
          <div className="form-check" key={meal}>
            <input
              className="form-check-input"
              type="checkbox"
              value={meal}
              checked={filterState.mealType.includes(meal)}
              onChange={(e) => handleCheckboxChange(e, "mealType")}
              id={`meal-${index}`}
            />
            <label className="form-check-label" htmlFor={`meal-${index}`}>
              {meal}
            </label>
          </div>
        ))}
      </div> */}

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

      {/* Food Categories */}
      <div className="mb-2">
        <h6>Food Categories</h6>
        <input type="text" className="form-control mb-2" placeholder="Search"

          value={categorySearch}
          onChange={(e) => setCategorySearch(e.target.value)}
        />
        <div className="form-check">
          <input
            className="form-check-input"
            type="radio"
            name="category"
            value=""
            checked={filterState.categoryID === ""}
            onChange={handleCategoryChange}
          />
          <label className="form-check-label">All</label>
        </div>
        {filterCategories.map((cat, index) => (
          <div className="form-check" key={cat._id}>
            <input
              className="form-check-input"
              type="radio"
              name="category"
              value={cat._id}
              id={`cat-${index}`}
              checked={filterState.categoryID === cat._id}
              onChange={handleCategoryChange}
            />
            <label className="form-check-label" htmlFor={`cat-${index}`}>
              {cat.categoryName}
            </label>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeftFilter;
