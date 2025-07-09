import React, { useEffect, useState } from "react";
import { Button, Col, Form, InputGroup, Modal, Row } from "react-bootstrap";
import { BaseURL } from "../../Helper/config";
import axios from "axios";
import { getToken } from "../../Helper/SessionHelper";
import { toast } from "react-hot-toast";
import { GoogleMap, Marker,LoadScript } from "@react-google-maps/api";
import { useRef } from "react";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

const ModalCheckOutEdit = (props) => {
  const { onHide,item,onUpdate  } = props;
 
  const [country, setCountry] = useState([]);
  const [countryID, setCountryID] = useState("6505745d7efd849768bce05e");
  const [regionID, setReigionID] = useState("6505745d7efd849768bce05e");
  const [validated, setValidated] = useState(false);
  const [reigion, setReigion] = useState([]);
  const [city, setCity] = useState([]);
  const [userAddress, setUserAddress] = useState(null);
  const [coordinates,setCoordinates] =useState({
    lat:null,
    lng:null
  })
 
  
  const UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  let Token = getToken();
  const reload=()=>window.location.reload();
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

  useEffect(() => {
    const getOldCity = async (value) => {
      try {
        const res = await fetch(`${BaseURL}/get-thana-by-region/${value}`);
        if (!res.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await res.json();
        if (data) {
          setCity(data?.data);
        }
      } catch (error) {
        console.error('Failed to fetch city data:', error);
      }
    };

    if (item?.regionNumericId) {
      getOldCity(item.regionNumericId);
    }
  }, [item?.regionNumericId]);

  //goggle map intrigate

  const handleSelect = async(value)=>{
    const result = await geocodeByAddress(value)
    const ll=await getLatLng(result[0])
    setCoordinates({
      lat:ll.lat,
      lng:ll.lng
    })
    setUserAddress(value)

  }




  const handleSave = () => {
    const form = document.getElementById('editAddressForm');
    // if (form.checkValidity() === false) {
    //   form.classList.add('was-validated');
    //   return;
    // }
    // event.preventDefault();
    // const form = event.target;
    const country = countryID;
    const name = form.name.value;
    const phoneNumber = form.phoneNumber.value;
    const city = form.city.value;
    const region = form.region.value;
    const addressType = form.addressType.value;
    const addressText = userAddress;
    const address = form.address.value;
    const addressNote = form.addressNote.value;
    const defauladdressType = form.defaultaddress.checked;

    if (getToken()) {
      axios
        .post(
          BaseURL + "/update-address-book/" + item?._id,
          {
            cityNumericId: city,
            Name: name,
            phoneNumber: phoneNumber,
            regionNumericId: region,
            countryID: country,
            customerID: UserDetails?._id,
            // createdBy: "63e4bd183291fd211a3ad53e",
            address: address,
            addressText: userAddress,
            addressNote: addressNote,
            addressType: addressType,
            // shippingDefault: true,
            default: defauladdressType,
            coordinate:coordinates
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
            toast.success("Delivery address updated successfully!", {
              position: "bottom-center",
            });
            onUpdate({
              _id: item._id,
              Name: name,
              phoneNumber: phoneNumber,
              regionNumericId: region,
              countryID: country,
              cityNumericId: city,
              address: address,
              addressText: userAddress,
              addressNote: addressNote,
              addressType: addressType,
              default: defauladdressType,
              coordinate: coordinates
            });
            onHide(true);
            // localStorage.removeItem("checkOut");
            // reload()
          }
          else{
            toast.error("Give All Data"

            )
          }
        });
    }
    // Order(name, phoneNumber, country, city, region);
    // }

    setValidated(true);
  };
  const searchOptions = {
    componentRestrictions: { country: ['BD'] },

  }
  const handleDrag=(event)=>{
    setCoordinates({
      lat:event.latLng.lat(),
      lng:event.latLng.lng()
    })

  }
  return (
    <>
      <Modal
        {...props}
        size='md'
        aria-labelledby='contained-modal-title-vcenter'
        centered
      >
        <Modal.Header closeButton className='Model'>
          <Modal.Title id='contained-modal-title-vcenter'>Edit  Address</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div>
            <div>
              <Form
                noValidate
                validated={validated}
                // onSubmit={handleSubmit}
                id="editAddressForm" className='d-flex flex-column gap-3 '
              >
                <div className='shadow-sm p-3 d-flex flex-column gap-2'>
                  <div className='d-flex justify-content-between align-content-center'>
                    <h6
                      className='mx-1 pe-2 font-bold
                '
                    >
                      {" "}
                      Name &nbsp;
                    </h6>
                    <Form.Group
                      md='4'
                      className='border border-dark rounded w-75'
                      controlId='validationCustom01'
                    >
                      <Form.Control
                        required
                        type='text'
                        name='name'
                        placeholder='Name'
                        defaultValue={item?.Name}
                      />
                      <Form.Control.Feedback className='text-success'></Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className='d-flex justify-content-between align-content-center'>
                    <h6
                      className='mx-1 pe-2 font-bold
                '
                    >
                      {" "}
                      Phone &nbsp;
                    </h6>
                    <Form.Group
                      md='4'
                      className='border border-dark rounded w-75'
                      controlId='validationCustom01'
                    >
                      <Form.Control
                        required
                        type='text'
                        name='phoneNumber'
                        placeholder='Phone Number'
                        defaultValue={item?.phoneNumber}
                      />
                      <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                  </div>
                </div>
                <div className='shadow-sm p-3 d-flex flex-column gap-2'>
                  {/* <div className='d-flex justify-content-around align-content-center'>
                    <h6
                      className='mx-1 pe-2 font-bold
                '
                    >
                      {" "}
                      Country &nbsp;
                    </h6>
                    <select
                      onChange={(e) => setCountryID(e.target.value)}
                      name='country'
                      class='form-select border-dark  w-75'
                      aria-label='Default select example'
                      defaultValue={item?.countryID}
                    >
                      {country?.map((i) => (
                        <option value={i._id}>{i?.countryName}</option>
                      ))}
                    </select>
                  </div> */}
                  <div className='d-flex justify-content-around align-content-center'>
                    <h6
                      className='mx-1 pe-2 font-bold
                '
                    >
                      {" "}
                      Region &nbsp;
                    </h6>
                    <select
                      onChange={(e) => setReigionID(e.target.value)}
                      name='region'
                      class='form-select w-75 border-dark'
                      aria-label='Default select example'
                      defaultValue={item?.regionNumericId}
                    >
                      {reigion?.map((i) => (
                        <option value={i.id}>{i?.regionName}</option>
                      ))}
                    </select>
                  </div>

                  <div className='d-flex justify-justify-content-between align-content-center'>
                    <h6
                      className='mx-1 pe-2 font-bold me-1
                '
                    >
                      {" "}
                      City
                    </h6>
                    &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp;
                    <select
                      class='form-select  w-75 border-dark'
                      name='city'
                      aria-label='Default select  example'
                      defaultValue={item?.cityNumericId}
                    >
                      {city.length > 0
                        ? city?.map((i) => (
                            <option value={i.id}>{i?.cityName}</option>
                          ))
                        : null}
                    </select>
                  </div>
                  <div className='d-flex justify-content-between align-content-center'>
                    <h6
                      className='mx-1 pe-2 font-bold
                '
                    >
                      Address
                    </h6>
                    <Form.Group
                      md='4'
                      className='border border-dark rounded w-75'
                      controlId='validationCustom01'
                    >
                      <Form.Control
                        required
                        type='text'
                        name='address'
                        defaultValue={item?.address}
                        placeholder='House no / Building / street / area'
                      />
                      <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <div className='d-flex justify-content-between align-content-center'>
                    <h6
                      className='mx-1 pe-2 font-bold
                '
                    >
                      Instructions
                    </h6>
                    <Form.Group
                      md='4'
                      className='border border-dark rounded w-75'
                      controlId='validationCustom01'
                    >
                      <Form.Control
                        required
                        type='text'
                        name='addressNote'
                        defaultValue={item?.addressNote}
                        placeholder='Note/Instructions'
                      />
                      <Form.Control.Feedback></Form.Control.Feedback>
                    </Form.Group>
                  </div>
                  <PlacesAutocomplete

                  searchOptions={searchOptions }
       
        
        onChange={setUserAddress}
        onSelect={handleSelect}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>
            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />
            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map(suggestion => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
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
                  <div>
                  {/* <LoadScript googleMapsApiKey="AIzaSyBjvJT7cdaNGnUXmizPLS9qlBNqySmgQRI" onLoad={handleScriptLoad}> */}

                    <GoogleMap
                      mapContainerStyle={{ height: "200px", width: "100%" }}

                      //onDragEnd={handleDrag}
                      center={coordinates} // Centered at the coordinates of Dhaka, Bangladesh
                      zoom={18}
                      //onLoad={handleMapLoad}
                    >
                      <Marker position={coordinates} draggable onDragEnd={handleDrag}/>
                    </GoogleMap>
                  {/* //  </LoadScript> */}
                  </div>
                  <div>
                    <h6>Address Label</h6>
                    <div class='radio-toolbar d-flex'>
                      <div className='mx-2'>
                        <input
                          type='radio'
                          id='office'
                          name='addressType'
                          value='office'
                          checked
                        />
                        <label for='office'>Office</label>
                      </div>
                      <div className='mx-2'>
                        <input
                          type='radio'
                          id='home'
                          name='addressType'
                          value='home'
                        />
                        <label for='home'>Home</label>
                      </div>
                    </div>
                  </div>
                  <div className='d-flex'>
                    <div className='toggle'>
                      <label class='switch'>
                        <input
                          type='checkbox'
                          name='defaultaddress'
                          defaultChecked
                        />
                        <span class='slider'></span>
                      </label>
                    </div>
                    <div>
                      <h6>Default  Address</h6>
                    </div>
                  </div>
                </div>

                <button className='btn btn-primary' type='button' onClick={handleSave}>
                  Update
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
  );
};

export default ModalCheckOutEdit;
