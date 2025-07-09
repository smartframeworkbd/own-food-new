import PlacesAutocomplete, { geocodeByAddress, getLatLng } from "react-places-autocomplete";
import { GoogleMap, Marker } from "@react-google-maps/api";
import { useContext, useEffect, useState } from "react";
import { FaTimes, FaLocationArrow } from 'react-icons/fa'; 
import { useDispatch, useSelector } from "react-redux";
import { IoMdLocate } from "react-icons/io";
import { fetchLocation } from "../Redux/State-slice/Location";
import { LanguageContext } from "../Context/LanguageContext";
import getTranslation from "./getTranslationUtility";
import labels from "../translationData/menu.json";
const MapSearch = ({ userAddress, setUserAddress, handleSelect }) => {
  const { coordinate } = useSelector((state) => state.location);
  const defaultCoordinates = { lat: 23.7810672, lng: 90.2548767 }; // Default coordinates

  const [coordinates, setCoordinates] = useState({
    lat: parseFloat(coordinate?.lat) || defaultCoordinates.lat,
    lng: parseFloat(coordinate?.lon) || defaultCoordinates.lng,
  });
  const dispatch = useDispatch();
  const [isSuggestionSelected, setIsSuggestionSelected] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const [isTyping, setIsTyping] = useState(false);
  
  const searchOptions = {
    componentRestrictions: { country: ["BD"] },
  };

  useEffect(() => {
    if (coordinate && coordinate.lat && coordinate.log) {
      setCoordinates({
        lat:parseFloat(coordinate.lat),
        lng:parseFloat(coordinate.lon)
      });
    }
  }, [coordinate]);

  const handleSuggestionSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
    setCoordinates({
      lat: ll.lat,
      lng: ll.lng,
    });
    setUserAddress(value);
    setIsSuggestionSelected(true);
    setIsTyping(false); 
  };

  const handleDrag = async (event) => {
    const newCoordinates = {
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    };
    setCoordinates(newCoordinates);

    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ location: newCoordinates }, (results, status) => {
      if (status === "OK" && results[0]) {
        const address = results[0].formatted_address;
        setUserAddress(address);
        setIsSuggestionSelected(true);
        setIsTyping(false);
      } else {
        console.error("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const handleClearInput = () => {
    setUserAddress("");
    setIsSuggestionSelected(false);
    setIsTyping(false);
  };

  const handleSubmit = () => {
    if (isSuggestionSelected && userAddress) {
      handleSelect(userAddress);
      setIsSuggestionSelected(false);
    }
  };
  
const handleLocateMe=()=>{
  dispatch(fetchLocation());
}
  
const markerPoint={
  lat:parseFloat(coordinates.lat),
  lng:parseFloat(coordinates.lng),
}
const customIcon = {
  url: '/Asstets/Img/mapIcon.jpg', // URL or path to your custom icon
  scaledSize: new window.google.maps.Size(50, 50), // Scale size of the icon (optional)
  origin: new window.google.maps.Point(0, 0), // Origin point of the icon (optional)
  anchor: new window.google.maps.Point(25, 50), // Anchor point of the icon (optional)
};
return (
    <div>
      <div className='w-full position-relative'>
        <PlacesAutocomplete
          searchOptions={searchOptions}
          value={userAddress}
          onChange={(value) => {
            setUserAddress(value);
            setIsSuggestionSelected(false);
            setIsTyping(true);
          }}
          onSelect={handleSuggestionSelect}
        >
          {({
            getInputProps,
            suggestions,
            getSuggestionItemProps,
            loading,
          }) => (
            <div className="input-wrapper position-relative">
              <div className="position-relative">
                <input
                  {...getInputProps({
                    placeholder: "Search Places ...",
                    className: "w-100 p-3 rounded border border-primary border-2 shadow-sm location-search-input",
                  })}
                />
                {userAddress ? (
                  <button
                    className="clear-button position-absolute"
                    onClick={handleClearInput}
                  >
                    <FaTimes />
                  </button>
                ) :  <div
                style={{
                  top:'30%'
                }}
                className="d-flex position-absolute end-0 justify-center align-items-center justify-content-center locate-btn"
                onClick={handleLocateMe}
              >
                <IoMdLocate />
                <span className="mx-1 locate-text">{getTranslation(
                              "locateMe",
                              currentLanguage,
                              labels
                            )}</span>
              </div>}

                {isSuggestionSelected && (
                  <button
                    className="submit-button position-absolute btn btn-primary"
                    onClick={handleSubmit}
                  >
                    <FaLocationArrow /> Submit
                  </button>
                )}
                 
              </div>

              <div className='autocomplete-dropdown-container'>
                {loading && <div>Loading...</div>}
                {suggestions.map((suggestion) => {
                  const className = suggestion.active
                    ? "suggestion-item--active"
                    : "suggestion-item";
                  const style = suggestion.active
                    ? { backgroundColor: "#fafafa", cursor: "pointer" }
                    : { backgroundColor: "#ffffff", cursor: "pointer" };
                  return (
                    <div
                      {...getSuggestionItemProps(suggestion, { className, style })}
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
      <div className='mt-1'>
      {/* <p>map loc{coordinates.lat},{c'oordinates.lng}</p> */}
        <GoogleMap
          mapContainerStyle={{ height: "400px", width: "100%" }}
          center={ coordinates }
          zoom={18}
        >

      
      <Marker
            // icon={customIcon}
              position={markerPoint}
              draggable
              onDragEnd={handleDrag}
            />
          {/* {coordinates.lat &&(
            <Marker
            icon={customIcon}
              position={markerPoint}
              draggable
              onDragEnd={handleDrag}
            />
          )} */}

{/* <Marker
            icon={customIcon}
              position={coordinates}
              draggable
              onDragEnd={handleDrag}
            /> */}
        </GoogleMap>
      </div>
    </div>
  );
};

export default MapSearch;
