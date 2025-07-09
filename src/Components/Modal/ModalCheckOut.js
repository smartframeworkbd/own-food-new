import React, { useEffect, useState } from "react";
import { Button, Card, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
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

const ModalCheckOut = (props) => {
  const { onHide, onUpdate, cartId } = props;
  const [country, setCountry] = useState([]);
  const [countryID, setCountryID] = useState("6505745d7efd849768bce05e");
  const [regionID, setReigionID] = useState(43);
  const [validated, setValidated] = useState(false);
  const [reigion, setReigion] = useState([]);
  const [city, setCity] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [coordinates, setCoordinates] = useState({
    lat: null,
    lng: null,
  });
  const [locationValid, setLocationValid] = useState(true);
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

    const getReigion = async () => {
      const res = await fetch(`${BaseURL}/get-reigion-by-country/${countryID}`);
      const data = await res.json();
      if (data) {
        setReigion(data?.data);
      }
    };

    getReigion();
    const getCity = async () => {
      const res = await fetch(`${BaseURL}/get-thana-by-region/${regionID}`);
      const data = await res.json();
      if (data) {
        setCity(data?.data);
      }
    };
    getCity();
  }, [countryID, regionID]);

  //goggle map intrigate

  const handleSelect = async (value) => {
    const result = await geocodeByAddress(value);
    const ll = await getLatLng(result[0]);


    axios.post(`${BaseURL}/validate-location`, {
      cartId,
      userLat: ll.lat,
      userLon: ll.lng,
    })
      .then((res) => {

        if (res.data.status === true) {
          setLocationValid(true); // Location is valid
          setCoordinates({
            lat: ll.lat,
            lng: ll.lng,
          });
          setUserAddress(value);
          toast.success("Location validated successfully!", {
            position: "bottom-center",
          });
        } else {
          setLocationValid(false); // Location is invalid
          toast.error("The location out of delivery zone!!", {
            position: "bottom-center",
          });
        }
      })
      .catch((err) => {
        setLocationValid(false); // Error handling
        toast.error("An error occurred while validating the location.", {
          position: "bottom-center",
        });
      });

  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const form = event.target;
    const country = countryID;
    const name = form.name.value;
    const phoneNumber = form.phoneNumber.value;
    const city = form.city.value;
    const region = form.region.value;
    // const addressType = form.addressType.value;
    // const address = form.address.value;

    if (!locationValid || !coordinates.lat || !coordinates.lng) {
      toast.error("select location for delivery!!", {
        position: "bottom-center",
      });
      return;
    }
    const addressNote = form.addressNote.value;

    const defauladdressType = form.defaultaddress.checked;

    if (getToken()) {



      axios
        .post(
          BaseURL + "/create-address-book",
          {
            cityNumericId: city,
            Name: name,
            phoneNumber: phoneNumber,
            regionNumericId: region,
            countryID: country,
            customerID: UserDetails?._id,
            // createdBy: "63e4bd183291fd211a3ad53e",
            // address: address,
            addressText: userAddress,

            addressNote: addressNote,

            // addressType: addressType,
            // shippingDefault: true,
            default: defauladdressType,
            coordinate: coordinates,
            // latitude: "203250",
            // logitude: "8569200",
            // zipCode: "45220",
            // status: true,
            // updatedBy: "Raj",
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
            toast.success("Delivery address saved successfully!", {
              position: "bottom-center",
            });

            onUpdate(true); // Pass the updated address back to the parent
            onHide(true);
            // localStorage.removeItem("checkOut");
            // reload();
          } else {
            toast.error("Give All Data");
          }
        });
    }
    // Order(name, phoneNumber, country, city, region);
    // }

    setValidated(true);
  };
  const searchOptions = {
    componentRestrictions: { country: ["BD"] },
  };
  const handleDrag = (event) => {
    setCoordinates({
      lat: event.latLng.lat(),
      lng: event.latLng.lng(),
    });
  };
  return (
    <>
      <Modal
        {...props}
        size="md"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton className="Model">
          <Modal.Title id="contained-modal-title-vcenter">
            Add Address
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <Form
                noValidate
                validated={validated}
                onSubmit={handleSubmit}
                className="d-flex flex-column gap-3"
              >
                <div className="shadow-sm p-3 d-flex flex-column gap-2">
                  {/* Name Field */}
                  <div className="d-flex justify-content-between align-content-center">
                    <h6 className="mx-1 pe-2 font-bold">Name</h6>
                    <Form.Group
                      md="4"
                      className="border border-gray-300 rounded w-75"
                      controlId="validationCustom01"
                    >
                      <Form.Control
                        required
                        type="text"
                        name="name"
                        placeholder="Enter your name"
                        className="border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2"
                      />
                      <Form.Control.Feedback className="text-success"></Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  {/* Phone Number Field */}
                  <div className="d-flex justify-content-between align-content-center">
                    <h6 className="mx-1 pe-2 font-bold">Phone</h6>
                    <Form.Group
                      md="4"
                      className="border border-gray-300 rounded w-75"
                      controlId="validationCustom01"
                    >
                      <Form.Control
                        required
                        type="number"
                        name="phoneNumber"
                        placeholder="Enter phone number"
                        className="border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2"
                      />
                      <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>

                <div className="shadow-sm p-3 d-flex flex-column gap-2">
                  {/* Region Field */}
                  <div className="d-flex justify-content-around align-content-center">
                    <h6 className="mx-1 pe-2 font-bold">Region</h6>
                    <select
                      onChange={(e) => setReigionID(e.target.value)}
                      name="region"
                      className="form-select border border-gray-300 shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 w-75"
                      aria-label="Default select example"
                    >
                      {reigion?.map((i) => (
                        <option key={i.id} value={i.id}>
                          {i?.regionName}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* City Field */}
                  <div className="d-flex justify-content-around align-content-center">
                    <h6 className="mx-1 pe-2 font-bold">Thana</h6>
                    <select
                      name="city"
                      className="form-select border border-gray-300 shadow-sm rounded focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 w-75"
                      aria-label="Default select example"
                    >
                      {city.length > 0
                        ? city?.map((i) => (
                          <option key={i.id} value={i.id}>
                            {i?.cityName}
                          </option>
                        ))
                        : null}
                    </select>
                  </div>

                  {/* Address Search (Google Places) */}
                  <div className="row">
                    <div className="col-3">
                      <p className="mx-1">select your Location</p>

                    </div>
                    <div className="col-9">
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
                          <div
                            style={{
                              border: "2px solid gray",
                              padding: "3px",
                              borderRadius: "5px",
                              boxShadow: "2px 2px 3px gray",
                            }}
                          >
                            <input
                              required
                              {...getInputProps({
                                placeholder: "Search Places ...",
                                className: "location-search-input ",
                              })}
                              className="border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2 w-100"
                            />
                            <div className="autocomplete-dropdown-container">
                              {loading && <div>Loading...</div>}
                              {suggestions.map((suggestion) => {
                                const className = suggestion.active
                                  ? "suggestion-item--active"
                                  : "suggestion-item";
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
                    </div>
                  </div>


                  {/* Google Map Section */}
                  <div>
                    <GoogleMap
                      mapContainerStyle={{ height: "200px", width: "100%" }}
                      center={coordinates}
                      zoom={18}
                    >
                      <Marker position={coordinates} draggable onDragEnd={handleDrag} />
                    </GoogleMap>
                  </div>

                  {/* Additional Instructions */}
                  <div className="d-flex justify-content-between align-content-center">
                    <h6 className="mx-1 font-bold">Additional Instructions</h6>
                    <Form.Group
                      md="4"
                      className="border border-gray-300 rounded w-75"
                      controlId="validationCustom01"
                    >
                      <Form.Control
                        required
                        type="text"
                        name="addressNote"
                        placeholder="Note/Instructions"
                        className="border border-gray-300 rounded shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 px-3 py-2"
                      />
                      <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                  </div>

                  {/* Default Address Toggle */}
                  <div className="d-flex">
                    <div className="toggle">
                      <label className="switch">
                        <input
                          type="checkbox"
                          name="defaultaddress"
                          defaultChecked
                        />
                        <span className="slider"></span>
                      </label>
                    </div>
                    <div>
                      <h6>Default Address</h6>
                    </div>
                  </div>
                </div>

                {/* Save Button */}
                <button className="btn btn-primary" type="submit">
                  Save
                </button>
              </Form>
            </div>
          </div>
        </Modal.Body>
        <Modal.Footer>
          {/* <Button onClick={props.onHide}>Close</Button> */}
        </Modal.Footer>
      </Modal>
    </>



    // <>
    //   <Modal
    //     {...props}
    //     size='md'
    //     aria-labelledby='contained-modal-title-vcenter'
    //     centered
    //   >
    //     <Modal.Header closeButton className='Model'>
    //       <Modal.Title id='contained-modal-title-vcenter'>
    //         Add Address
    //       </Modal.Title>
    //     </Modal.Header>
    //     <Modal.Body>
    //       <div>
    //         <div>
    //           <Form
    //             noValidate
    //             validated={validated}
    //             onSubmit={handleSubmit}
    //             className='d-flex flex-column gap-3 '
    //           >
    //             <div className='shadow-sm p-3 d-flex flex-column gap-2'>
    //               <div className='d-flex justify-content-between align-content-center'>
    //                 <h6
    //                   className='mx-1 pe-2 font-bold
    //             '
    //                 >
    //                   {" "}
    //                   Name &nbsp;
    //                 </h6>
    //                 <Form.Group
    //                   md='4'
    //                   className='border border-dark rounded w-75'
    //                   controlId='validationCustom01'
    //                 >
    //                   <Form.Control
    //                     required
    //                     type='text'
    //                     name='name'
    //                     placeholder='Name'
    //                   />
    //                   <Form.Control.Feedback className='text-success'></Form.Control.Feedback>
    //                 </Form.Group>
    //               </div>
    //               <div className='d-flex justify-content-between align-content-center'>
    //                 <h6
    //                   className='mx-1 pe-2 font-bold
    //             '
    //                 >
    //                   {" "}
    //                   Phone &nbsp;
    //                 </h6>
    //                 <Form.Group
    //                   md='4'
    //                   className='border border-dark rounded w-75'
    //                   controlId='validationCustom01'
    //                 >
    //                   <Form.Control
    //                     required
    //                     type='Number'
    //                     name='phoneNumber'
    //                     placeholder='Phone Number'
    //                   />
    //                   <Form.Control.Feedback></Form.Control.Feedback>
    //                 </Form.Group>
    //               </div>
    //             </div>
    //             <div className='shadow-sm p-3 d-flex flex-column gap-2'>
    //               <div className='d-flex justify-content-around align-content-center'>
    //                 <h6
    //                   className='mx-1 pe-2 font-bold
    //             '
    //                 >
    //                   {" "}
    //                   Region &nbsp;
    //                 </h6>
    //                 <select
    //                   onChange={(e) => setReigionID(e.target.value)}
    //                   name='region'
    //                   class='form-select w-75 border-dark'
    //                   aria-label='Default select example'
    //                 >
    //                   {reigion?.map((i) => (
    //                     <option value={i.id}>{i?.regionName}</option>
    //                   ))}
    //                 </select>
    //               </div>


    //               <div className='d-flex justify-content-around align-content-center'>
    //                 <h6
    //                   className='mx-1 pe-2 font-bold'
    //                 >
    //                   {" "}
    //                   Thana
    //                 </h6>
    //                 <select
    //                   name='city'
    //                   class='form-select w-75 border-dark'
    //                   aria-label='Default select example'
    //                 >
    //                   {city.length > 0
    //                     ? city?.map((i) => (
    //                       <option value={i.id}>{i?.cityName}</option>
    //                     ))
    //                     : null}
    //                 </select>
    //               </div>
    //              {/* <div className='d-flex justify-content-between align-content-center'>
    //                 <h6
    //                   className='mx-1 pe-2 font-bold
    //             '
    //                 >
    //                   Address
    //                 </h6>
    //                 <Form.Group
    //                   md='4'
    //                   className='border border-dark rounded w-75'
    //                   controlId='validationCustom01'
    //                 >
    //                   <Form.Control
    //                     required
    //                     type='text'
    //                     name='address'
    //                     placeholder='House no / Building / street / area'
    //                   />
    //                   <Form.Control.Feedback></Form.Control.Feedback>
    //                 </Form.Group>
    //               </div>  */}



    //               <PlacesAutocomplete
    //                 searchOptions={searchOptions}
    //                 value={userAddress}
    //                 onChange={setUserAddress}
    //                 onSelect={handleSelect}
    //               >
    //                 {({
    //                   getInputProps,
    //                   suggestions,
    //                   getSuggestionItemProps,
    //                   loading,
    //                 }) => (
    //                   <div style={{border:'2px solid gray', padding:'3px', borderRadius:'5px',boxShadow:'2px 2px 3px gray'}}>
    //                     <input
    //                     required
    //                       {...getInputProps({
    //                         placeholder: "Search Places ...",
    //                         className: "location-search-input ",
    //                       })}
    //                     />
    //                     <div className='autocomplete-dropdown-container'>
    //                       {loading && <div>Loading...</div>}
    //                       {suggestions.map((suggestion) => {
    //                         const className = suggestion.active
    //                           ? "suggestion-item--active"
    //                           : "suggestion-item";
    //                         // inline style for demonstration purpose
    //                         const style = suggestion.active
    //                           ? {
    //                             backgroundColor: "#fafafa",
    //                             cursor: "pointer",
    //                           }
    //                           : {
    //                             backgroundColor: "#ffffff",
    //                             cursor: "pointer",
    //                           };
    //                         return (
    //                           <div
    //                             {...getSuggestionItemProps(suggestion, {
    //                               className,
    //                               style,
    //                             })}
    //                           >
    //                             <span>{suggestion.description}</span>
    //                           </div>
    //                         );
    //                       })}
    //                     </div>
    //                   </div>
    //                 )}
    //               </PlacesAutocomplete>
    //               <div>

    //                 <GoogleMap
    //                   mapContainerStyle={{ height: "200px", width: "100%" }}

    //                   center={coordinates}
    //                   zoom={18}

    //                 >
    //                   <Marker
    //                     position={coordinates}
    //                     draggable
    //                     onDragEnd={handleDrag}
    //                   />
    //                 </GoogleMap>

    //               </div>
    //               {/* <div>
    //                 <h6>Address Label</h6>
    //                 <div class='radio-toolbar d-flex'>
    //                   <div className='mx-2'>
    //                     <input
    //                       type='radio'
    //                       id='office'
    //                       name='addressType'
    //                       value='office'
    //                       checked
    //                     />
    //                     <label for='office'>Office</label>
    //                   </div>
    //                   <div className='mx-2'>
    //                     <input
    //                       type='radio'
    //                       id='home'
    //                       name='addressType'
    //                       value='home'
    //                     />
    //                     <label for='home'>Home</label>
    //                   </div>
    //                 </div>
    //               </div> */}

    //               <div className='d-flex justify-content-between align-content-center'>
    //                 <h6
    //                   className='mx-1  font-bold
    //             '
    //                 >
    //                  Additional Instructions
    //                 </h6>
    //                 <Form.Group
    //                   md='4'
    //                   className='border border-dark rounded w-75'
    //                   controlId='validationCustom01'
    //                 >
    //                   <Form.Control
    //                     required
    //                     type='text'
    //                     name='addressNote'
    //                     placeholder='Note/Instructions'
    //                   />
    //                   <Form.Control.Feedback></Form.Control.Feedback>
    //                 </Form.Group>
    //               </div>
    //               <div className='d-flex'>
    //                 <div className='toggle'>
    //                   <label class='switch'>
    //                     <input
    //                       type='checkbox'
    //                       name='defaultaddress'
    //                       defaultChecked
    //                     />
    //                     <span class='slider'></span>
    //                   </label>
    //                 </div>
    //                 <div>
    //                   <h6>Default Address</h6>
    //                 </div>
    //               </div>
    //             </div>{" "}
    //             <button className='btn btn-primary' type='submit'>
    //               Save
    //             </button>
    //           </Form>
    //         </div>
    //       </div>
    //     </Modal.Body>
    //     <Modal.Footer>
    //       {/* <Button onClick={props.onHide}>Close</Button> */}
    //     </Modal.Footer>
    //   </Modal>
    // </>
  );
};

export default ModalCheckOut;
