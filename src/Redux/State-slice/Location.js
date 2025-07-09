import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import Swal from "sweetalert2";

// Async thunk to fetch coordinates
export const fetchLocation = createAsyncThunk(
  "location/fetchLocation",
  async (_, { dispatch }) => {
    try {
      const position = await new Promise((resolve, reject) => {
        navigator.geolocation.getCurrentPosition(resolve, reject);
      });

      const { latitude, longitude } = position.coords;
      
      // Fetch the address based on the fetched coordinates
      const result = await dispatch(fetchAddress({ lat: latitude, lon: longitude }));
      
      // Return the result, which includes both the coordinates and address details
      return result.payload;
    } catch (error) {
      Swal.fire({
        icon: 'warning',
        title: "Enable Your Location",
        html: 'On your browser:<br>' +
              '1. To the left of the address bar, click the Padlock icon <b>Site Settings</b>.<br>' +
              '2. Under <b>Permissions</b>, find <b>Location</b> and change it to <b>Allow</b>.',
      });
      throw error;
    }
  }
);

// Async thunk to fetch address based on coordinates
export const fetchAddress = createAsyncThunk(
  "location/fetchAddress",
  async ({ lat, lon }) => {
    const apiKey = "AIzaSyC8OF1nF6le5FMM6MPRGNX5qf9EN1-jpz8"; // Replace with your API key
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lon}&key=${apiKey}`;

    try {
      const response = await axios.get(apiUrl);

      // const validResult = response.data.results.find(result => !result.formatted_address.match(/^[A-Z0-9]+\+.*$/));
      if (response.data.results.length > 0) {
        const address = response.data.results[0].formatted_address;
        const { address_components } = response.data.results[0];
        const area = address_components.find((component) =>
          component.types.includes("sublocality")
        )?.long_name || "";
        const city = address_components.find((component) =>
          component.types.includes("locality")
        )?.long_name || "";
        const state = address_components.find((component) =>
          component.types.includes("administrative_area_level_1")
        )?.long_name || "";
        const country = address_components.find((component) =>
          component.types.includes("country")
        )?.long_name || "";

        return {
          lat,
          lon,
          address,
          area,
          city,
          state,
          country,
        };
      } 
      // if (validResult) {
      //   const address = validResult.formatted_address;
      //   const { address_components } = validResult;
      //   const area = address_components.find((component) =>
      //     component.types.includes("sublocality")
      //   )?.long_name || "";
      //   const city = address_components.find((component) =>
      //     component.types.includes("locality")
      //   )?.long_name || "";
      //   const state = address_components.find((component) =>
      //     component.types.includes("administrative_area_level_1")
      //   )?.long_name || "";
      //   const country = address_components.find((component) =>
      //     component.types.includes("country")
      //   )?.long_name || "";
    
      //   return {
      //     lat,
      //     lon,
      //     address,
      //     area,
      //     city,
      //     state,
      //     country,
      //   }
      // }
      
      else {
        throw new Error("No address found.");
      }
    } catch (error) {
      console.error("Error fetching address:", error);
      throw error;
    }
  }
);

const previousLocation = (() => {
  try {
    const storedData = localStorage.getItem("location");
    return storedData ? JSON.parse(storedData) : null;
  } catch (error) {
    console.error("Invalid JSON in localStorage for 'location':", error);
    return null;
  }
})();

const initialState = {
  coordinate: previousLocation ? { lat: previousLocation.lat, lon: previousLocation.lon } : null,
  address: previousLocation ? previousLocation : null,
  status: "idle",
  error: null,
};

const LocationSlice = createSlice({
  name: "location",
  initialState,
  reducers: {
    setCoordinates(state, action) {
      const { lat, lon } = action.payload;
      state.coordinate = { lat, lon };
      
      if (state.address) {
        state.address.lat = lat;
        state.address.lon = lon;
      }

      localStorage.setItem("coordinates", JSON.stringify(action.payload));
      localStorage.setItem("location", JSON.stringify({ ...state.address, lat, lon }));
    },
    setAddress(state, action) {
      state.address = action.payload;
      state.coordinate = { lat: action.payload.lat, lon: action.payload.lon };

      localStorage.setItem("location", JSON.stringify(action.payload));
      localStorage.setItem("coordinates", JSON.stringify({ lat: action.payload.lat, lon: action.payload.lon }));
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchLocation.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchLocation.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coordinate = { lat: action.payload.lat, lon: action.payload.lon };
        state.address = action.payload;

        // Update both 'coordinates' and 'location' in local storage
        localStorage.setItem("coordinates", JSON.stringify({ lat: action.payload.lat, lon: action.payload.lon }));
        localStorage.setItem("location", JSON.stringify(action.payload));

        state.error = null;
      })
      .addCase(fetchLocation.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.coordinate = { lat: action.payload.lat, lon: action.payload.lon };
        state.address = action.payload;

        localStorage.setItem("location", JSON.stringify(action.payload));
        localStorage.setItem("coordinates", JSON.stringify({ lat: action.payload.lat, lon: action.payload.lon }));

        state.error = null;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export const { setCoordinates, setAddress } = LocationSlice.actions;

export default LocationSlice.reducer;


// const LocationSlice = createSlice({
//   name: "location",
//   initialState,
//   reducers: {
//     setCoordinates(state, action) {
//       if (action.payload) {
//         // Make sure the value is stringified correctly
//         localStorage.setItem("location", JSON.stringify(action.payload));
//       }
//       state.coordinate = action.payload;
//     },
//   },
//   extraReducers: (builder) => {
//     builder
//       .addCase(fetchLocation.pending, (state) => {
//         state.status = "loading";
//       })
//       .addCase(fetchLocation.fulfilled, (state, action) => {
//         state.status = "succeeded";
        
//         if (action.payload) {
          
//           // Store coordinates correctly as JSON
//           localStorage.setItem("location", JSON.stringify(action.payload));
//         }

//         state.coordinate = action.payload;
//         state.error = null;
//       })
//       .addCase(fetchLocation.rejected, (state, action) => {
//         state.status = "failed";
//         state.error = action.error.message;
//       });
//   },
// });

// export default LocationSlice.reducer;
// export const { setCoordinates } = LocationSlice.actions;
