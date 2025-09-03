import React, { useState, useEffect } from "react";
import "./Search.css";
import LeftFilter from "../LeftFilter/LeftFilter";
import { ListFilter } from "lucide-react";

const Search = ({ setSearch, setFilters }) => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar);
  };

  return (
    <>
      <div className="allfood-search-bar-container">
        <input
          type="text"
          onChange={(e) => setSearch(e.target.value)}
          className="allfood-search-input"
          placeholder="Search for food"
        />
        {isMobile && (
          <button className="allfood-filter-button" onClick={toggleSidebar}>
            Filter <ListFilter size={18} className="allfood-filter-icon" />
          </button>
        )}
      </div>

      {isMobile && showSidebar && (
        <>
          <div className={`allfood-sidebar ${showSidebar ? "show" : ""}`}>
            <button className="allfood-close-btn" onClick={toggleSidebar}>
              ✖
            </button>
            <div className="allfood-sidebar-content">
              <LeftFilter setFilters={setFilters} />
            </div>
          </div>
          <div className="allfood-overlay" onClick={toggleSidebar}></div>
        </>
      )}
    </>
  );
};

export default Search;
