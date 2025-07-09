import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import axios from "axios";
const GetCurrentLocation = ({ addressBind, setUserAddress, userAddress }) => {
  const [location, setLocation] = useState(null);

  const { coordinate, error } = useSelector((state) => state.location);

  useEffect(() => {
    const localStorageLocation = localStorage.getItem("location");
    if (!!coordinate && !localStorageLocation) {
     
      fetchAddress(coordinate?.lat, coordinate?.lon);
    }
  }, [coordinate]);

  useEffect(() => {
    const add = localStorage.getItem("address");
    if (add) {
      setUserAddress(add);
    }

    // if (!add && findAddress === false) {
    //   fetchLocation();
    // }

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
   
    // const apiKey = "AIzaSyCq3_f1JedG3GCgWnXgy3yuji4tjMZvitk";
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
          localStorage.setItem("location",JSON.stringify(newData));
        }
      })
      .catch((error) => {
      });
  };

  const trancateText = (text, maxLength) => {
    const afterText =
      text?.length > maxLength ? text.slice(0, maxLength) : text;
    return afterText;
  };
  return (
    <>
      {userAddress?.length === 0 ? (
        <span>Find your location </span>
      ) : (
        <span className='ps-2'>
          {!!addressBind ? trancateText(userAddress, addressBind) : userAddress}
        </span>
      )}
    </>
  );
};

export default GetCurrentLocation;
