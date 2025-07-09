import { useEffect, useState } from "react";

const useLocation = () => {
  const [coordinates, setCoordinates] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const storedCoordinates = JSON.parse(localStorage.getItem("coordinates"));

    if (storedCoordinates) {
      setCoordinates(storedCoordinates);
    } else {
      const getLocation = async () => {
        try {
          const position = await new Promise((resolve, reject) => {
            navigator.geolocation.getCurrentPosition(resolve, reject);
          });
          const { latitude, longitude } = position.coords;
          const newCoordinates = { lat: latitude, lon: longitude };
          setCoordinates(newCoordinates);
          localStorage.setItem("coordinates", JSON.stringify(newCoordinates));
          setError(null);
        } catch (error) {
          setError(error.message);
        }
      };

      getLocation();
    }
  }, []);

  return { coordinates, error };
};

export default useLocation;
