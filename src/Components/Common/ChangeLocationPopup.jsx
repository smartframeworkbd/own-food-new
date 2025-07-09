import { Button } from "react-bootstrap";
import { BsXLg } from "react-icons/bs";
import { FaMapMarkerAlt } from "react-icons/fa";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
import labels from "../../translationData/location.json";
import { useState } from "react";
const ChangeLocationPopup = ({
  zip,
  trancateText,
  userAddress,
  setUserAddress,
  SetZip,
}) => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [location, setLocation] = useState(null);
  const [showLocationDiv, setLocationDiv] = useState(true);
  //   const [userAddress, setUserAddress] = useState(null);
  const searchOptions = {
    componentRestrictions: { country: ["BD"] },
  };
  const handleSelect = async (value) => {
    // setFindAddress(true);
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
  const closeZipCodePopup = () => {
    setLocationDiv(true);
    SetZip(!zip);
  };
  const toggleDivs = () => {
    setLocationDiv(!showLocationDiv);
  };
  return (
    <div className={zip ? "zipCodePopup active" : "zipCodePopup"}>
      <div className='d-flex justify-content-center'>
        <div className='zipCode_input position-relative text-center'>
          <div className='w-100'>
            <div>
              <h2>{labels.title.bn}</h2>
              {showLocationDiv ? (
                <div>
                  <div className='row justify-content-between mt-4 '>
                    <div className='locationSpace'>
                      <span>
                        {" "}
                        <FaMapMarkerAlt color='black' />
                      </span>
                      <span className='ps-1 text-black'>
                        {trancateText(userAddress)}
                      </span>
                    </div>
                    <div className='smc'>
                      <span className='zipCodeBtn' onClick={toggleDivs}>
                        {labels.changeLocation.bn}
                      </span>
                    </div>
                  </div>
                </div>
              ) : (
                <div>
                  <div className='d-flex justify-content-between mt-4'>
                    <div>
                      <span>
                        <FaMapMarkerAlt />
                      </span>
                      <span className='ps-1 '>
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
                              <div className='autocomplete-dropdown-container'>
                                {loading && <div>Loading...</div>}
                                {suggestions.map((suggestion) => {
                                  const className = suggestion.active
                                    ? "suggestion-item--active text-black"
                                    : "suggestion-item text-black";
                                  // inline style for demonstration purpose
                                  const style = suggestion.active
                                    ? {
                                        backgroundColor: "#fafafa",
                                        cursor: "pointer",
                                        color: "white",
                                      }
                                    : {
                                        backgroundColor: "#ffffff",
                                        cursor: "pointer",
                                        color: "white",
                                      };
                                  return (
                                    <div
                                      {...getSuggestionItemProps(suggestion, {
                                        className,
                                        style,
                                      })}
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
                className='btn_done aligns-items-center mt-5 locationSaveBtn'
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
              className='closeIcon position-absolute'
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
  );
};

export default ChangeLocationPopup;
