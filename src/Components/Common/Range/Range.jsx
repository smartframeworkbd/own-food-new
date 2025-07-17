import React, { useState, useEffect, useRef } from "react";
import "./Range.css";

const Range = ({ min, max, label, step = 1, onChange }) => {
  const [minVal, setMinVal] = useState(min);
  const [maxVal, setMaxVal] = useState(max);

  const range = useRef(null);

  useEffect(() => {
    if (onChange) onChange(minVal, maxVal);
  }, [minVal, maxVal]);

  useEffect(() => {
    const percentMin = ((minVal - min) / (max - min)) * 100;
    const percentMax = ((maxVal - min) / (max - min)) * 100;

    if (range.current) {
      range.current.style.left = `${percentMin}%`;
      range.current.style.width = `${percentMax - percentMin}%`;
    }
  }, [minVal, maxVal]);

  return (
    <div className="range-wrapper mb-4">
      <label className="form-label fw-bold">{label}</label>
      <div className="slider-container">
        <div className="slider-track-bg" />
        <div className="slider-track" ref={range} />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={minVal}
          onChange={(e) => {
            const val = Math.min(Number(e.target.value), maxVal - 1);
            setMinVal(val);
          }}
          className="thumb thumb-left"
        />
        <input
          type="range"
          min={min}
          max={max}
          step={step}
          value={maxVal}
          onChange={(e) => {
            const val = Math.max(Number(e.target.value), minVal + 1);
            setMaxVal(val);
          }}
          className="thumb thumb-right"
        />
      </div>
      <div className="range-values mt-2 d-flex gap-2">
        <input
          type="number"
          className="form-control"
          value={minVal}
          onChange={(e) =>
            setMinVal(Math.min(Number(e.target.value), maxVal - 1))
          }
        />
        <span className="mt-1">to</span>
        <input
          type="number"
          className="form-control"
          value={maxVal}
          onChange={(e) =>
            setMaxVal(Math.max(Number(e.target.value), minVal + 1))
          }
        />
      </div>
    </div>
  );
};

export default Range;
