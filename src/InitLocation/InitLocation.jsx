import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { fetchLocation, setCoordinates } from "../Redux/State-slice/Location";
// import { fetchLocation, setCoordinates } from "../Redux/State-slice/Location";

const InitLocation = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const storedCoordinates = JSON.parse(localStorage.getItem("location"));
   
    const Location = {
      lat: storedCoordinates?.latitude,
      lon: storedCoordinates?.longitude,
    };
    if (storedCoordinates) {
      dispatch(setCoordinates(Location));
    } else {
      dispatch(fetchLocation());
    }
  }, [dispatch]);

  return null;
};

export default InitLocation;
