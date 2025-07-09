import React, { useEffect, useState } from "react";
// import Geocode from "react-geocode";
import axios from "axios";

import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import { BsXLg } from "react-icons/bs";
import { Button, Col, Container, Offcanvas, Row } from "react-bootstrap";
import {
  FaAngleDown,
  FaAngleRight,
  FaArrowLeft,
  FaArrowRight,
  FaBars,
  FaCartPlus,
  FaMapMarkerAlt,
  FaMinus,
  FaPlus,
  FaSearch,
  FaUserCheck,
  FaUserCog,
} from "react-icons/fa";

import labels from "../../translationData/location.json";
import { useSelector } from "react-redux";

const GetCurrentLocationWrapper = () => {

  

  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  //const [changeUserAddress, setChangeUserAddress] = useState(null);
  const [findAddress, setFindAddress] = useState(false);

  const [location, setLocation] = useState(null);

  const [zip, SetZip] = useState(false);

  //In Location details popup show previous address
  const [showLocationDiv, setLocationDiv] = useState(true);
  const { coordinate, error } = useSelector((state) => state.location);
  const toggleDivs = () => {
    setLocationDiv(!showLocationDiv);
  };
  const closeZipCodePopup = () => {
    setLocationDiv(true);
    SetZip(!zip);
  };

  const zipControl = () => {
    SetZip(!zip);
    // localStorage.removeItem('address')
  };
  useEffect(()=>{
    const localStorageLocation = localStorage.getItem("location");
    if(!!coordinate && !localStorageLocation){
      fetchAddress(coordinate?.lat,coordinate?.lon)
    }

  },[coordinate])

  useEffect(() => {

    const add = localStorage.getItem("address");
    if (add) {
      setUserAddress(add);

    }



    const locationData = localStorage.getItem("location");
    if (locationData) {
      setLocation(JSON.parse(locationData));
    }
  }, []);

  // Save data to localStorage whenever location changes
  useEffect(() => {
    if (location) {
      localStorage.setItem("location", JSON.stringify(location));
    }
  }, [location]);



  const fetchAddress = (latitude, longitude) => {
   
    const apiKey = "AIzaSyC8OF1nF6le5FMM6MPRGNX5qf9EN1-jpz8";

    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;
    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {

          const address = response.data.results[0].formatted_address;


          const { address_components } = response.data.results[0];
          const area =
            address_components.find((component) =>
              component.types.includes("sublocality")
            )?.long_name || "";
          const city =
            address_components.find((component) =>
              component.types.includes("locality")
            )?.long_name || "";
          const state =
            address_components.find((component) =>
              component.types.includes("administrative_area_level_1")
            )?.long_name || "";
          const country =
            address_components.find((component) =>
              component.types.includes("country")
            )?.long_name || "";

          setUserAddress(`${address}`);
          // setChangeUserAddress(add);
          localStorage.setItem("address", `${address}`);

          const newData = {
            latitude: `${latitude}`,
            longitude: `${longitude}`,
            address: `${address}`,
            area: `${area}`,
            city: `${city}`,
            state: `${state}`,
            country: `${country}`,
          };
          setLocation(newData);
          localStorage.setItem("location", newData);
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  };

  const handleSelect = async (value) => {
    setFindAddress(true);
    const updateAddress = value;

    setUserAddress(`${updateAddress}`);
    localStorage.setItem("address", value);

    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    const lat = latLng.lat;
    const lng = latLng.lng;

    setLatitude(lat);
    setLongitude(lng);
    // localStorage.setItem("latitude", lat);
    // localStorage.setItem("longitude", lng);


    const { address_components } = result[0];
    const area =
      address_components.find((component) =>
        component.types.includes("sublocality")
      )?.long_name || "";
    const city =
      address_components.find((component) =>
        component.types.includes("locality")
      )?.long_name || "";
    const state =
      address_components.find((component) =>
        component.types.includes("administrative_area_level_1")
      )?.long_name || "";
    const country =
      address_components.find((component) =>
        component.types.includes("country")
      )?.long_name || "";

    const newData = {
      latitude: `${lat}`,
      longitude: `${lng}`,
      address: `${updateAddress}`,
      area: `${area}`,
      city: `${city}`,
      state: `${state}`,
      country: `${country}`,
    };
    setLocation(newData);
  };

  const searchOptions = {
    componentRestrictions: { country: ["BD"] },
  };

  const removeSpecialCharacters = (input) => {
    const pattern = /[^a-zA-Z0-9\s]/g;
    const cleaned = input.replace(pattern, "");
    return cleaned;
  };

  const trancateText = (text, maxLength) => {
    const afterText =
      text?.length > maxLength ? text.slice(0, maxLength) : text;
    return afterText;
  };
  return (
    <div className="zipCode">
      <div>
        <div className="zipCodeBtn" onClick={zipControl}>
          {userAddress?.length === 0 ? (
            <span>Find your location </span>
          ) : (
            <span className="ps-2">{trancateText(userAddress, 15)} </span>
          )}

          <span>
            <FaMapMarkerAlt />
          </span>
        </div>
        <div className={zip ? "zipCodePopup active" : "zipCodePopup"}>
          <div className="d-flex justify-content-center">
            <div className="zipCode_input position-relative text-center">
              <div className="w-100">
                <div>
                  <h2>{labels.title.bn}</h2>
                  {showLocationDiv ? (
                    <div>
                      <div className="row justify-content-between mt-4 ">
                        <div className="locationSpace">
                          <span>
                            {" "}
                            <FaMapMarkerAlt />
                          </span>
                          <span className="ps-1 ">
                            {trancateText(userAddress)}
                          </span>
                        </div>
                        <div className="smc">
                          <span className="zipCodeBtn" onClick={toggleDivs}>
                            {labels.changeLocation.bn}
                          </span>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <div>
                      <div className="d-flex justify-content-between mt-4">
                        <div>
                          <span>
                            <FaMapMarkerAlt />
                          </span>
                          <span className="ps-1 ">
                            <PlacesAutocomplete
                              searchOptions={searchOptions}
                              value={userAddress}
                              onChange={setUserAddress}
                              onSelect={handleSelect}
                            >
                              {({
                                getInputProps,
                                suggestions,
                                getSuggestionItemProps,
                                loading,
                              }) => (
                                <div>
                                  <input
                                    {...getInputProps({
                                      placeholder: userAddress
                                        ? userAddress
                                        : "Type your location",
                                      className: "location-search-input",
                                    })}
                                  />
                                  <div className="autocomplete-dropdown-container">
                                    {loading && <div>Loading...</div>}
                                    {suggestions.map((suggestion) => {
                                      const className = suggestion.active
                                        ? "suggestion-item--active"
                                        : "suggestion-item";
                                      // inline style for demonstration purpose
                                      const style = suggestion.active
                                        ? {
                                            backgroundColor: "#fafafa",
                                            cursor: "pointer",
                                          }
                                        : {
                                            backgroundColor: "#ffffff",
                                            cursor: "pointer",
                                          };
                                      return (
                                        <div
                                          {...getSuggestionItemProps(
                                            suggestion,
                                            {
                                              className,
                                              style,
                                            }
                                          )}
                                        >
                                          <span>{suggestion.description}</span>
                                        </div>
                                      );
                                    })}
                                  </div>
                                </div>
                              )}
                            </PlacesAutocomplete>
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                  <div></div>

                  <Button
                    className="btn_done aligns-items-center mt-5 locationSaveBtn"
                    onClick={closeZipCodePopup}
                  >
                    {labels.button.bn}
                  </Button>

                  {/* <div className='filterBtn  mt-4'>
                          <div className=' d-flex justify-content-center'>
                            <span>Filter</span>
                          </div>
                        </div> */}
                </div>
                <div
                  className="closeIcon position-absolute"
                  onClick={closeZipCodePopup}
                >
                  <span>
                    <BsXLg />
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GetCurrentLocationWrapper;
