import React, { useState, useRef } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

import Cities from "../../Database/Cities";
import osmProviders from "../../Database/Osm-providers";
import { Container } from "react-bootstrap";

const Map = () => {
  const [center, setCenter] = useState({ lat: 23.777176, lng: 90.407608 });
  const ZOOM_LEVEL = 6;
  const mapRef = useRef();

  return (
    <section className='Map'>
      <>
        <div className='row' style={{ zIndex: -1 }}>
          <div className='col text-center'>
            <div className='headerText '>
              <div>
                <h2>
                  <span className='sf_init_title'>Find Us In This</span>{" "}
                  <span className='sf_text-theme'>State</span>
                </h2>
              </div>
            </div>
            <div
              className='col mt-3'
              style={{ position: "relative", overflow: "hidden" }}
            >
              <MapContainer
                center={center}
                zoom={ZOOM_LEVEL}
                ref={mapRef}
                scrollWheelZoom={false}
                style={{ height: 400, width: "100wh" }}
              >
                <TileLayer
                  url={osmProviders.maptiler.url}
                  attribution={osmProviders.maptiler.attribution}
                />

                {Cities.map((city, idx) => (
                  <Marker position={[city.lat, city.lng]} key={idx}>
                    <Popup>
                      <b>
                        {city.city}, {city.country}
                      </b>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          </div>
        </div>
      </>
    </section>
  );
};

export default Map;
