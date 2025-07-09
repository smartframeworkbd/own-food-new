import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { SiGooglemaps } from "react-icons/si";
import { MdOutlineArrowDropDown } from "react-icons/md";
import { fetchLocation, fetchAddress, setCoordinates } from "../../../Redux/State-slice/Location";
import ReuseableModel from "../../Modal/ReuseableModel";
import MapSearch from "../../../Helper/MapSearch";
import AnotherSearchLocation from "../AnotherSearchLocation";
import { geocodeByAddress, getLatLng } from "react-places-autocomplete";
// import { IsMobile } from "../../../Helper/FormHelper";
import useIsMobile from "../../../customHooks/useIsMobile";

const ShowLocation = ({ setUserAddress, userAddress }) => {
  const dispatch = useDispatch();
  const { coordinate, address, status, error } = useSelector((state) => state.location);

  const [show, setShow] = useState(false);
  const [findAddress, setFindAddress] = useState(false);

  useEffect(() => {
    if (coordinate) {
      dispatch(fetchAddress(coordinate));
    }
  }, [dispatch]);

  useEffect(() => {
    const storedLocation = JSON.parse(localStorage.getItem("location"));
    if (storedLocation) {
      // dispatch(setCoordinates({ lat: storedLocation.latitude, lon: storedLocation.longitude }));
      setUserAddress(storedLocation.address);
    }
  }, [address]);

  const handleSelect = async (value) => {
    setFindAddress(true);
    setUserAddress(value);
    // localStorage.setItem("address", value);

    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);

    dispatch(fetchAddress({ lat: latLng.lat, lon: latLng.lng }))
  };

  const handleClose = () => setShow(false);
  const isMobile = useIsMobile();
  return (
    <>
      <div className="d-flex w-100 justify-content-center text-white py-2 px-2" style={{ background: "#1B6DC1" }}>
        {userAddress ? (
          <div className="d-flex gap-1" onClick={() => setShow(true)}>
            <SiGooglemaps size={20} />

            {isMobile ? `${userAddress.slice(0, 30)}...` : userAddress}


            <MdOutlineArrowDropDown size={20} />
          </div>
        ) : (
          <AnotherSearchLocation userAddress={userAddress} setUserAddress={setUserAddress} handleSelect={handleSelect} />
        )}
      </div>
      <ReuseableModel show={show} handleClose={handleClose} title={"আপনার ডেলিভারি ঠিকানা পয়েন্ট করুন"}>
        <MapSearch coordinate={coordinate} userAddress={userAddress} handleSelect={handleSelect} setUserAddress={setUserAddress} />
      </ReuseableModel>
    </>
  );
};

export default ShowLocation;
