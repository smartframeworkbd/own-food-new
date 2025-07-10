import React, { useState, useEffect } from "react";
import "./Range.css";

const Range = ({ min, max, label, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  useEffect(() => {
    if (onChange) {
      onChange(minVal, maxVal); 
    }
  }, [minVal, maxVal]); 

  return (
    <div className="range-wrapper mb-4">
      <label className="form-label fw-bold">
        {label}:{" "}
        <span className="text-primary">
          {minVal} - {maxVal}
        </span>
      </label>
      <div className="slider-container">
        <input
          type="range"
          min={min}
          max={max}
          value={minVal}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - 10);
            setMinVal(val);
          }}
          className="thumb thumb-left"
        />
        <input
          type="range"
          min={min}
          max={max}
          value={maxVal}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + 10);
            setMaxVal(val);
          }}
          className="thumb thumb-right"
        />
        <div className="slider-track" />
      </div>
    </div>
  );
};

export default Range;
