import React, { useState } from "react";
import "./Search.css";
import LeftFilter from "../LeftFilter/LeftFilter";

const Search = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="Search-bar-container">
        <input
          type="text"
          className="Search-input"
          placeholder="Search for food"
        />
        <button className="Search-filter-button" onClick={toggleSidebar}>
          ☰ Filter
        </button>
      </div>

      {/* Sidebar */}
      <div className={`Search-sidebar ${showSidebar ? "Search-show" : ""}`}>
        <button className="Search-close-btn" onClick={toggleSidebar}>
          ✖
        </button>
        <LeftFilter />
      </div>

      {/* Overlay */}
      {showSidebar && (
        <div className="Search-overlay" onClick={toggleSidebar}></div>
      )}
    </>
  );
};

export default Search;
