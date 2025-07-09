import React, { useRef, useState } from "react";
import { GoogleMap, useLoadScript, Marker } from "@react-google-maps/api";

const GoogleMapOne = () => {
  const [center, setCenter] = useState({ lat: 22.3522, lng: 91.8341 }); // Initial center
  const mapRef = useRef(null);

  //   const { isLoaded } = useLoadScript({
  //     googleMapsApiKey: YOUR_API_KEY,
  //   });
  //   if (!isLoaded) return <div>Loading map...</div>;
  return (
    <div>
      {" "}
      <GoogleMap
        mapContainerStyle={{ width: "100%", height: "400px" }}
        center={center}
        zoom={13}
        ref={mapRef}
      >
        <Marker position={center} />
      </GoogleMap>
    </div>
  );
};

export default GoogleMapOne;
