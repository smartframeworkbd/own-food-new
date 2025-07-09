import React, { useContext, useState } from "react";
import "./AnotherSearchLocation.css";
import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { IoMdLocate } from "react-icons/io";
import { FaLocationArrow } from "react-icons/fa";
import { FiEdit3 } from "react-icons/fi"; // Icon for typing indication
import { useDispatch } from "react-redux";
import { fetchLocation } from "../../Redux/State-slice/Location";
import { LanguageContext } from "../../Context/LanguageContext";
import labels from "../../translationData/menu.json";
import getTranslation from "../../Helper/getTranslationUtility";
const AnotherSearchLocation = ({ userAddress, setUserAddress, handleSelect }) => {
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [isUserTyping, setIsUserTyping] = useState(false);
  const [typeAddress, setTypeAddress] = useState("");
  const [selectedAddress, setSelectedAddress] = useState("");
  const [suggestionsAvailable, setSuggestionsAvailable] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const dispatch = useDispatch();
  const searchOptions = {
    componentRestrictions: { country: ["BD"] },
  };

  const handleChange = (value) => {
    setTypeAddress(value);
    setSelectedAddress(""); // Clear the selected address when typing starts again
    setSuggestionsAvailable(false); // Reset suggestions available
    setIsUserTyping(true); // Show the typing indicator icon while typing
  };

  const handleSelectSuggestion = async (value) => {
    setSelectedAddress(value); // Store the selected address
    setTypeAddress(value); // Update the input value
    setIsUserTyping(false); // Hide the typing indicator icon
    setSuggestionsAvailable(true); // Show the submit button after a valid suggestion is selected
  };

  const handleSubmit = async () => {
    if (selectedAddress && suggestionsAvailable) {
      try {
        // Save the address only after clicking submit
        setUserAddress(selectedAddress);
        handleSelect(selectedAddress);
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    } else {
      alert("Please select a valid location from the suggestions.");
    }
    setIsUserTyping(false); // Hide submit button after submission
  };

  const handleLocateMe = () => {
    dispatch(fetchLocation());
  };

  return (
    <>
      <div className="ALb-component">
        <div className="row g-0 gap-0 ALb-inner">
          {/* Search Box */}
          <div className="col-9 d-flex align-items-center">
            <PlacesAutocomplete
              searchOptions={searchOptions}
              value={typeAddress}
              onChange={handleChange}
              onSelect={handleSelectSuggestion} // Update the selected address on suggestion click
            >
              {({
                getInputProps,
                suggestions,
                getSuggestionItemProps,
                loading,
              }) => (
                <div className="w-100">
                  <div className="searchBox w-100">
                    <input
                      {...getInputProps({
                        placeholder: "Search Places ...",
                        className: "w-100 p-2 border-0 location-search-input",
                      })}
                    />
                  </div>

                  <div className="autocomplete-dropdown-container">
                    {loading && <div>Loading...</div>}
                    {suggestions.length > 0 && setSuggestionsAvailable(true)} 
                    {suggestions.map((suggestion) => {
                      // const className = suggestion.active
                      //   ? "suggestion-item-active"
                      //   : "suggestion-item";
                      const style = suggestion.active
                        ? { backgroundColor: "rgb(27 109 189)", cursor: "pointer",padding:"2px",color:"white" }
                        : { backgroundColor: "#ffffff", cursor: "pointer" };
                      return (
                        <div
                          {...getSuggestionItemProps(suggestion, { style })}
                          onClick={() => handleSelectSuggestion(suggestion.description)} // Handle suggestion selection
                        >
                          <span>{suggestion.description}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </PlacesAutocomplete>
          </div>

          {/* Button Section */}
          <div className="col-3 btn-component d-flex justify-content-center align-items-center">
            {isUserTyping ? (
              <div className="d-flex align-items-center text-white">
                <FiEdit3 /> {/* Typing indicator icon */}
              </div>
            ) : suggestionsAvailable ? (
              <div className="d-flex align-items-center text-white">
                <FaLocationArrow />
                <button className="submit-btn text-white" onClick={handleSubmit}>
                  Submit
                </button>
              </div>
            ) : (
              <div
                className="d-flex justify-center align-items-center justify-content-center locate-btn"
                onClick={handleLocateMe}
              >
                <IoMdLocate />
                <span className="mx-1 locate-text">{getTranslation(
                              "locateMe",
                              currentLanguage,
                              labels
                            )}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default AnotherSearchLocation;

