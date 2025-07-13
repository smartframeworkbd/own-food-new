import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SearchDropdown from "./SearchDropdown/SearchDropdown";
import { BaseURL } from "../../../Helper/config";
import './SearchBar.css'
const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("foods");
  const [loading, setLoading] = useState(false);
  const [rawResult, setRawResult] = useState([]); 

  const { coordinate } = useSelector((state) => state.location);
  const cacheRef = useRef(new Map()); 

  const filteredResults = useMemo(() => {
    if (!rawResult || rawResult.length === 0) return [];
    const resultObj = rawResult.find(obj => obj[activeTab]);
    return resultObj ? resultObj[activeTab] : [];
  }, [rawResult, activeTab]);

  const fetchData = useCallback(
    async (searchQuery) => {
      if (!coordinate?.lat || !coordinate?.lon) return;
      setLoading(true);

      try {
        const response = await axios.get(`${BaseURL}/topbar-search`, {
          params: {
            query: searchQuery,
            tab:"all",
            userLat: coordinate.lat,
            userLan: coordinate.lon,
          },
        });
        cacheRef.current.set(searchQuery, response.data);
        setRawResult(response.data);
        // setActiveTab(response.data[0])
        // console.log(response.data[0])
      } catch (error) {
        console.error("Search API error:", error);
        setRawResult([]);
      } finally {
        setLoading(false);
      }
    },
    [coordinate]
  );


  useEffect(() => {
    if (query.trim().length === 0) {
      setRawResult([]);
      return;
    }

    const debounce = setTimeout(() => {
      const cached = cacheRef.current.get(query);
      if (cached) {
        setRawResult(cached); 
      } else {
        fetchData(query); 
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, fetchData]);

  return (
    <div className="ownfood-search-container">
      <div className="ownfood-search-input-wrapper">
        <input
          type="text"
          placeholder="Search your favorite food..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          className="ownfood-search-input"
        />
        <span className="ownfood-search-icon">🔍</span>
      </div>

      {query.trim().length > 0 && (
        <SearchDropdown
          results={filteredResults}
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          loading={loading}
          fullResult={rawResult} 
        />
      )}
    </div>
  );
};

export default SearchBar;
