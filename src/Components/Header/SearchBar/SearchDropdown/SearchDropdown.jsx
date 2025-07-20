import React, { useMemo } from "react";
import SearchProductCard from "../../../Common/Cards/SearchProductCard/SearchProductCard";

const SearchDropdown = ({ results, activeTab, setActiveTab, fullResult,setShowDropdown }) => {
  const tabs=["foods","kitchen","categories"]
  // const tabs = useMemo(() => {
  //   return fullResult.map(obj => Object.keys(obj)[0]);
  // }, [fullResult]);

  return (
    <div className="ownfood-search-dropdown">
      <div className="ownfood-search-tabs">
        {tabs.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={activeTab === tab ? "ownfood-tab active" : "ownfood-tab"}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      <div className="ownfood-search-results">
        {results.length > 0 ? (
          results.map((item, i) => (
            <SearchProductCard setShowDropdown={setShowDropdown} key={item._id || i} item={item} />
          ))
        ) : (
          <p className="ownfood-no-result">No items found</p>
        )}
      </div>

      <div className="ownfood-search-footer">
        <button className="ownfood-see-all-btn">See all results</button>
      </div>
    </div>
  );
};


export default SearchDropdown;
