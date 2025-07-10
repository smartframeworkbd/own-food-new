import React, { useState } from "react";
import "./Search.css";
import LeftFilter from "../LeftFilter/LeftFilter";


const Search = ({setSearch,setFilters}) => {
  const [showSidebar, setShowSidebar] = useState(false);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="search-bar-container">
        <input
          type="text"
          onChange={(e)=>setSearch(e.target.value)}
          className="search-input"
          placeholder="Search for food"
        />
        <button className="filter-button" onClick={toggleSidebar}>
          ☰ Filter
        </button>
      </div>

      {/* Sidebar */}
      <div className={`sidebar ${showSidebar ? "show" : ""}`}>
        <button className="close-btn" onClick={toggleSidebar}>
          ✖
        </button>
        {/* FilterSidebar component call */}
        <LeftFilter setFilters={setFilters} />
      </div>

      {/* Overlay */}
      {showSidebar && <div className="overlay" onClick={toggleSidebar}></div>}
    </>
  );
};

export default Search;
