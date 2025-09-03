import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { BaseURL } from "../../Helper/config";
import axios from "axios";
import { getToken } from "../../Helper/SessionHelper";
import { toast } from "react-hot-toast";
import { GoogleMap, Marker, LoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

const ModalCheckOutEdit = (props) => {
  const { onHide, item, onUpdate } = props;
  
  const [country, setCountry] = useState([]);
  const [countryID, setCountryID] = useState("6505745d7efd849768bce05e");
  const [districtId, setDistrictID] = useState("");
  const [zoneId, setZoneID] = useState("");
  const [areaId, setAreaID] = useState("");
  const [blockId, setBlockID] = useState("");
  const [validated, setValidated] = useState(false);
  const [districts, setDistricts] = useState([]);
  const [zones, setZones] = useState([]);
  const [areas, setAreas] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null
  });
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  
  const UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  let Token = getToken();
  const reload = () => window.location.reload();

  useEffect(() => {
    const getCountry = async () => {
      const res = await fetch(`${BaseURL}/get-country`);
      const data = await res.json();
      if (data) {
        setCountry(data?.data);
      }
    };
    getCountry();
    
    const getDistricts = async () => {
      const res = await fetch(`${BaseURL}/get-districts`);
      const data = await res.json();
      if (data) {
        setDistricts(data?.data);
      }
    };
    getDistricts();
  }, []);

  useEffect(() => {
    const getZones = async () => {
      if (districtId) {
        const res = await fetch(`${BaseURL}/get-zones-by-district/${districtId}`);
        const data = await res.json();
        if (data) {
          setZones(data?.data);
          // Reset dependent dropdowns
          setZoneID("");
          setAreaID("");
          setBlockID("");
          setAreas([]);
          setBlocks([]);
        }
      }
    };
    getZones();
  }, [districtId]);

  useEffect(() => {
    const getAreas = async () => {
      if (zoneId) {
        const res = await fetch(`${BaseURL}/get-areas-by-zone/${zoneId}`);
        const data = await res.json();
        if (data) {
          setAreas(data?.data);
          // Reset dependent dropdowns
          setAreaID("");
          setBlockID("");
          setBlocks([]);
        }
      }
    };
    getAreas();
  }, [zoneId]);

  useEffect(() => {
    const getBlocks = async () => {
      if (areaId) {
        const res = await fetch(`${BaseURL}/get-blocks-by-area/${areaId}`);
        const data = await res.json();
        if (data) {
          setBlocks(data?.data);
          // Reset dependent dropdown
          setBlockID("");
        }
      }
    };
    getBlocks();
  }, [areaId]);

  // Initialize form with existing data
  useEffect(() => {
    const loadInitialData = async () => {
      if (item) {
        // Set existing values
        setUserAddress(item.addressText || "");
        
        // Set coordinates if they exist
        if (item.coordinate) {
          setCoordinates({
            lat: item.coordinate.lat || null,
            lng: item.coordinate.lng || null
          });
        }
        
        // Load district and set districtId
        if (item.districtID) {
          setDistrictID(item.districtID);
          
          // Load zones based on district
          try {
            const zonesRes = await fetch(`${BaseURL}/get-zones-by-district/${item.districtID}`);
            const zonesData = await zonesRes.json();
            if (zonesData) {
              setZones(zonesData?.data);
              
              // Set zoneId if it exists in the loaded zones
              if (item.zoneID && zonesData?.data?.some(zone => zone.serialId === item.zoneID)) {
                setZoneID(item.zoneID);
                
                // Load areas based on zone
                try {
                  const areasRes = await fetch(`${BaseURL}/get-areas-by-zone/${item.zoneID}`);
                  const areasData = await areasRes.json();
                  if (areasData) {
                    setAreas(areasData?.data);
                    
                    // Set areaId if it exists in the loaded areas
                    if (item.areaID && areasData?.data?.some(area => area.serialId === item.areaID)) {
                      setAreaID(item.areaID);
                      
                      // Load blocks based on area
                      try {
                        const blocksRes = await fetch(`${BaseURL}/get-blocks-by-area/${item.areaID}`);
                        const blocksData = await blocksRes.json();
                        if (blocksData) {
                          setBlocks(blocksData?.data);
                          
                          // Set blockId if it exists in the loaded blocks
                          if (item.blockID && blocksData?.data?.some(block => block.serialId === item.blockID)) {
                            setBlockID(item.blockID);
                          } else {
                            setBlockID("");
                          }
                        }
                      } catch (error) {
                        console.error("Failed to fetch blocks:", error);
                      }
                    } else {
                      setAreaID("");
                    }
                  }
                } catch (error) {
                  console.error("Failed to fetch areas:", error);
                }
              } else {
                setZoneID("");
              }
            }
          } catch (error) {
            console.error("Failed to fetch zones:", error);
          }
        } else {
          setDistrictID("");
        }
        
        setIsDataLoaded(true);
      }
    };
    
    loadInitialData();
  }, [item]);

  // Google map integration
  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);
    setCoordinates({
      lat: ll.lat,
      lng: ll.lng
    });
    setUserAddress(value);
  };

  const handleSave = () => {
    const form = document.getElementById('editAddressForm');
    const country = countryID;
    const name = form.name.value;
    const phoneNumber = form.phoneNumber.value;
    const address = form.address.value;
    const addressNote = form.addressNote.value;
    const addressType = form.addressType.value;
    const defauladdressType = form.defaultaddress.checked;
    
    if (getToken()) {
      axios
        .post(
          BaseURL + "/update-address-book/" + item?._id,
          {
            districtID: districtId,
            zoneID: zoneId,
            areaID: areaId,
            blockID: blockId,
            Name: name,
            phoneNumber: phoneNumber,
            countryID: country,
            customerID: UserDetails?._id,
            address: address,
            addressText: userAddress,
            addressNote: addressNote,
            addressType: addressType,
            default: defauladdressType,
            coordinate: coordinates
          },
          {
            headers: {
              token: Token,
              Accept: "application/json",
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          if (res.data.status === "Success") {
            toast.success("Delivery address updated successfully!", {
              position: "bottom-center",
            });
            onUpdate({
              _id: item._id,
              Name: name,
              phoneNumber: phoneNumber,
              districtID: districtId,
              zoneID: zoneId,
              areaID: areaId,
              blockID: blockId,
              countryID: country,
              address: address,
              addressText: userAddress,
              addressNote: addressNote,
              addressType: addressType,
              default: defauladdressType,
              coordinate: coordinates
            });
            onHide(true);
          } else {
            toast.error("Please fill in all required fields");
          }
        });
    }
    setValidated(true);
  };

  const searchOptions = {
    componentRestrictions: { country: ['BD'] },
  };

  const handleDrag = (event) => {
    setCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng()
    });
  };

  return (
    <>
      <style>
        {`
          .mobile-native-modal .form-control,
          .mobile-native-modal .form-select {
            border: 2px solid #dee2e6 !important;
            border-radius: 0.5rem !important;
            padding: 0.75rem 1rem !important;
            font-size: 1rem !important;
            transition: all 0.3s ease !important;
          }
          
          .mobile-native-modal .form-control:focus,
          .mobile-native-modal .form-select:focus {
            border-color: #0d6efd !important;
            box-shadow: 0 0 0 0.25rem rgba(13, 110, 253, 0.25) !important;
          }
          
          .mobile-native-modal .form-control::placeholder {
            color: #6c757d !important;
          }
          
          .mobile-native-modal .form-select {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16'%3e%3cpath fill='none' stroke='%23343a40' stroke-linecap='round' stroke-linejoin='round' stroke-width='2' d='m1 6 7 7 7-7'/%3e%3c/svg%3e") !important;
            background-position: right 0.75rem center !important;
            background-size: 16px 12px !important;
          }
          
          .mobile-native-modal .location-search-input {
            border: 2px solid #dee2e6 !important;
            border-radius: 0.5rem !important;
            padding: 0.75rem 1rem !important;
            font-size: 1rem !important;
            width: 100% !important;
          }
          
          .mobile-native-modal .autocomplete-dropdown-container {
            border: 2px solid #dee2e6 !important;
            border-top: none !important;
            border-radius: 0 0 0.5rem 0.5rem !important;
            max-height: 300px !important;
            overflow-y: auto !important;
            z-index: 1000 !important;
          }
          
          .mobile-native-modal .suggestion-item {
            padding: 0.75rem 1rem !important;
            cursor: pointer !important;
            border-bottom: 1px solid #eee !important;
          }
          
          .mobile-native-modal .suggestion-item:last-child {
            border-bottom: none !important;
          }
          
          .mobile-native-modal .suggestion-item--active {
            background-color: #f8f9fa !important;
          }
          
          .radio-toolbar input[type="radio"] {
            display: none;
          }
          
          .radio-toolbar label {
            display: inline-block;
            background-color: #fff;
            padding: 10px 20px;
            font-family: sans-serif, Arial;
            font-size: 16px;
            border: 2px solid #dee2e6;
            border-radius: 0.5rem;
            cursor: pointer;
          }
          
          .radio-toolbar input[type="radio"]:checked+label {
            background-color: #0d6efd;
            color: white;
            border-color: #0d6efd;
          }
          
          .switch {
            position: relative;
            display: inline-block;
            width: 50px;
            height: 24px;
          }
          
          .switch input {
            opacity: 0;
            width: 0;
            height: 0;
          }
          
          .slider {
            position: absolute;
            cursor: pointer;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: #ccc;
            transition: .4s;
            border-radius: 24px;
          }
          
          .slider:before {
            position: absolute;
            content: "";
            height: 16px;
            width: 16px;
            left: 4px;
            bottom: 4px;
            background-color: white;
            transition: .4s;
            border-radius: 50%;
          }
          
          input:checked + .slider {
            background-color: #0d6efd;
          }
          
          input:checked + .slider:before {
            transform: translateX(26px);
          }
        `}
      </style>
      
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="address-modal mobile-native-modal"
        fullscreen="sm-down"
      >
        <Modal.Header closeButton className="bg-primary text-white py-3">
          <Modal.Title id="contained-modal-title-vcenter" className="fs-5">
            <i className="fas fa-edit me-2"></i>
            Edit Delivery Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-0 p-md-4">
          <Form
            noValidate
            validated={validated}
            id="editAddressForm"
            className="mobile-form"
          >
            <div className="card border-0 shadow-sm mb-4 rounded-0 rounded-md-3">
              <div className="card-body p-3 p-md-4">
                <h5 className="card-title mb-4 pb-2 border-bottom fs-6">
                  <i className="fas fa-user me-2 text-primary"></i>
                  Contact Information
                </h5>
                
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0" controlId="validationCustom01">
                    <Form.Label className="fw-medium">Full Name</Form.Label>
                    <Form.Control
                      required
                      type="text"
                      name="name"
                      placeholder="Enter your full name"
                      defaultValue={item?.Name}
                    />
                    <Form.Control.Feedback type="invalid" className="mt-1">
                      Please provide your name.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group as={Col} xs={12} md={6} controlId="validationCustom02">
                    <Form.Label className="fw-medium">Phone Number</Form.Label>
                    <Form.Control
                      required
                      type="tel"
                      name="phoneNumber"
                      placeholder="Enter your phone number"
                      defaultValue={item?.phoneNumber}
                    />
                    <Form.Control.Feedback type="invalid" className="mt-1">
                      Please provide a valid phone number.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
              </div>
            </div>
            
            <div className="card border-0 shadow-sm mb-4 rounded-0 rounded-md-3">
              <div className="card-body p-3 p-md-4">
                <h5 className="card-title mb-4 pb-2 border-bottom fs-6">
                  <i className="fas fa-map me-2 text-primary"></i>
                  Location Details
                </h5>
                
                <Row className="mb-3">
                  <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0" controlId="validationCustom03">
                    <Form.Label className="fw-medium">District</Form.Label>
                    <Form.Select
                      value={districtId}
                      onChange={(e) => setDistrictID(e.target.value)}
                      required
                    >
                      <option value="">Select District</option>
                      {districts?.map((i) => (
                        <option key={i.serialId} value={i.serialId}>
                          {i?.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="mt-1">
                      Please select a district.
                    </Form.Control.Feedback>
                  </Form.Group>
                  
                  <Form.Group as={Col} xs={12} md={6} controlId="validationCustom04">
                    <Form.Label className="fw-medium">Zone</Form.Label>
                    <Form.Select
                      value={zoneId}
                      onChange={(e) => setZoneID(e.target.value)}
                      disabled={!districtId}
                      required
                    >
                      <option value="">Select Zone</option>
                      {zones?.map((i) => (
                        <option key={i.serialId} value={i.serialId}>
                          {i?.name}
                        </option>
                      ))}
                    </Form.Select>
                    <Form.Control.Feedback type="invalid" className="mt-1">
                      Please select a zone.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Row>
                
                {areas.length > 0 && (
                  <Row className="mb-3">
                    <Form.Group as={Col} xs={12} md={6} className="mb-3 mb-md-0" controlId="validationCustom05">
                      <Form.Label className="fw-medium">Area</Form.Label>
                      <Form.Select
                        value={areaId}
                        onChange={(e) => setAreaID(e.target.value)}
                        disabled={!zoneId}
                        required
                      >
                        <option value="">Select Area</option>
                        {areas?.map((i) => (
                          <option key={i.serialId} value={i.serialId}>
                            {i?.name}
                          </option>
                        ))}
                      </Form.Select>
                      <Form.Control.Feedback type="invalid" className="mt-1">
                        Please select an area.
                      </Form.Control.Feedback>
                    </Form.Group>
                    
                    {blocks.length > 0 && (
                      <Form.Group as={Col} xs={12} md={6} controlId="validationCustom06">
                        <Form.Label className="fw-medium">Block</Form.Label>
                        <Form.Select
                          value={blockId}
                          onChange={(e) => setBlockID(e.target.value)}
                          disabled={!areaId}
                        >
                          <option value="">Select Block</option>
                          {blocks?.map((i) => (
                            <option key={i.serialId} value={i.serialId}>
                              {i?.name}
                            </option>
                          ))}
                        </Form.Select>
                      </Form.Group>
                    )}
                  </Row>
                )}
                
                <Form.Group className="mb-3" controlId="validationCustom07">
                  <Form.Label className="fw-medium">Address</Form.Label>
                  <Form.Control
                    required
                    type="text"
                    name="address"
                    placeholder="House no / Building / street / area"
                    defaultValue={item?.address}
                  />
                  <Form.Control.Feedback type="invalid" className="mt-1">
                      Please provide your address.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <Form.Group className="mb-3" controlId="validationCustom08">
                  <Form.Label className="fw-medium">Search Your Location</Form.Label>
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
                      <div className="position-relative">
                        <input
                          required
                          {...getInputProps({
                            placeholder: "Search for your address...",
                            className: "location-search-input",
                          })}
                        />
                        <div className="autocomplete-dropdown-container position-absolute w-100 mt-1 shadow-sm rounded">
                          {loading && <div className="p-3">Loading...</div>}
                          {suggestions.map((suggestion) => {
                            const className = suggestion.active
                              ? "suggestion-item--active bg-light p-3"
                              : "suggestion-item bg-white p-3";
                            return (
                              <div
                                {...getSuggestionItemProps(suggestion, {
                                  className,
                                })}
                                key={suggestion.placeId}
                              >
                                <span>{suggestion.description}</span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}
                  </PlacesAutocomplete>
                  <Form.Control.Feedback type="invalid" className="mt-1">
                    Please search and select your location.
                  </Form.Control.Feedback>
                </Form.Group>
                
                <div className="mb-3 rounded-3 overflow-hidden">
                  <GoogleMap
                    mapContainerStyle={{ 
                      height: "250px", 
                      width: "100%",
                      borderRadius: "0.75rem"
                    }}
                    center={coordinates}
                    zoom={18}
                  >
                    <Marker position={coordinates} draggable onDragEnd={handleDrag} />
                  </GoogleMap>
                </div>
                
                <Form.Group className="mb-3" controlId="validationCustom09">
                  <Form.Label className="fw-medium">Delivery Instructions (Optional)</Form.Label>
                  <Form.Control
                    as="textarea"
                    rows={3}
                    name="addressNote"
                    placeholder="Add any special instructions for delivery..."
                    defaultValue={item?.addressNote}
                  />
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="validationCustom10">
                  <Form.Label className="fw-medium">Address Label</Form.Label>
                  <div className="radio-toolbar d-flex gap-2">
                    <div>
                      <input
                        type="radio"
                        id="office"
                        name="addressType"
                        value="office"
                        defaultChecked={item?.addressType === 'office'}
                      />
                      <label htmlFor="office">Office</label>
                    </div>
                    <div>
                      <input
                        type="radio"
                        id="home"
                        name="addressType"
                        value="home"
                        defaultChecked={item?.addressType === 'home'}
                      />
                      <label htmlFor="home">Home</label>
                    </div>
                  </div>
                </Form.Group>
                
                <Form.Group className="mb-4" controlId="validationCustom11">
                  <div className="d-flex align-items-center">
                    <label className="switch me-3">
                      <input
                        type="checkbox"
                        name="defaultaddress"
                        defaultChecked={item?.default}
                      />
                      <span className="slider"></span>
                    </label>
                    <Form.Label className="mb-0 fw-medium">Set as default delivery address</Form.Label>
                  </div>
                </Form.Group>
              </div>
            </div>
            
            <div className="d-flex flex-column flex-md-row justify-content-end gap-2 gap-md-3 px-3 px-md-0 pb-3">
              <Button 
                variant="outline-secondary" 
                onClick={onHide}
                className="py-3 rounded-3 fw-medium mobile-button"
              >
                Cancel
              </Button>
              <Button 
                variant="primary" 
                type="button"
                onClick={handleSave}
                className="py-3 rounded-3 fw-medium mobile-button"
              >
                <i className="fas fa-save me-2"></i>
                Update Address
              </Button>
            </div>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
};

export default ModalCheckOutEdit;