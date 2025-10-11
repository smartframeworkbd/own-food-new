import React, { useState, useEffect, useCallback, useRef, useMemo } from "react";
import { useSelector } from "react-redux";
import axios from "axios";
import SearchDropdown from "./SearchDropdown/SearchDropdown";
import { BaseURL } from "../../../Helper/config";
import { Search } from "lucide-react";
import { Form } from "react-bootstrap";
import "./SearchBar.css";
import useIsMobile from "../../../customHooks/useIsMobile";

const SearchBar = () => {
  const [query, setQuery] = useState("");
  const [activeTab, setActiveTab] = useState("foods");
  const [loading, setLoading] = useState(false);
  const [rawResult, setRawResult] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);

  const inputRef = useRef(null);
  const dropdownRef = useRef(null);
  const { coordinate } = useSelector((state) => state.location);
  const cacheRef = useRef(new Map());
  const isMobile = useIsMobile();

  const filteredResults = useMemo(() => {
    if (!rawResult || rawResult.length === 0) return [];
    const resultObj = rawResult.find((obj) => obj[activeTab]);
    return resultObj ? resultObj[activeTab] : [];
  }, [rawResult, activeTab]);

  const fetchData = useCallback(async (searchQuery) => {
    if (!coordinate?.lat || !coordinate?.lon) return;
    setLoading(true);
    try {
      const response = await axios.get(`${BaseURL}/topbar-search`, {
        params: {
          query: searchQuery,
          tab: "all",
          userLat: coordinate.lat,
          userLan: coordinate.lon,
        },
      });
      cacheRef.current.set(searchQuery, response.data);
      console.log(response.data, "from API");
      setRawResult(response.data);
      setShowDropdown(true);
    } catch (error) {
      console.error("Search API error:", error);
      setRawResult([]);
    } finally {
      setLoading(false);
    }
  }, [coordinate]);

  useEffect(() => {
    console.log(query);
    if (query.trim().length === 0) {
      setRawResult([]);
      setShowDropdown(false);
      return;
    }

    const debounce = setTimeout(() => {
      const cached = cacheRef.current.get(query);
      console.log(cached, "from cache");
      
      if (cached) {
        setRawResult(cached);
        setShowDropdown(true);
      } else {
        console.log("fetching from API");
        fetchData(query);
      }
    }, 300);

    return () => clearTimeout(debounce);
  }, [query, fetchData]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      const isClickInsideInput = inputRef.current?.contains(event.target);
      const isClickInsideDropdown = dropdownRef.current?.contains(event.target);
      if (!isClickInsideInput && !isClickInsideDropdown) setShowDropdown(false);
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <>
      {isMobile ? (
        <Form className="position-relative w-100" ref={inputRef}>
          <Search
            size={18}
            className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted"
          />
          <Form.Control
            type="text"
            placeholder="Search for food, kitchen, or location..."
            className="ps-5 py-2 rounded-pill border border-primary"
            value={query}
            onChange={(e) => {
              console.log(e.target.value);
              setQuery(e.target.value)}}
          />
          {showDropdown && (
            <div ref={dropdownRef}>
              <SearchDropdown
                setShowDropdown={setShowDropdown}
                results={filteredResults}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                loading={loading}
                fullResult={rawResult}
              />
            </div>
          )}
        </Form>
      ) : (
        // 💻 Desktop Design
        <div className="ownfood-search-container" ref={inputRef}>
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

          {showDropdown && (
            <div ref={dropdownRef}>
              <SearchDropdown
                setShowDropdown={setShowDropdown}
                results={filteredResults}
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                loading={loading}
                fullResult={rawResult}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchBar;
