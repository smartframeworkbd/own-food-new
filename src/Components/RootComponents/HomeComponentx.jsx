import React, { useEffect, useState } from "react";
import CardSlider from "../ChildComponents/CardSlider";
import Header from "../Common/Header";
import CountryBaseFoodCategories from "../ChildComponents/CountryBaseFoodCategories";
import EarnMoney from "../ChildComponents/EarnMoney";
import Recipe_Gallery from "../ChildComponents/Recipe_Gallery";
import Circle from "../ChildComponents/Circle";
import OrderFoodCat from "../ChildComponents/OrderFoodCat";
import OpenAccountInfo from "../ChildComponents/OpenAccountInfo";
import FoodCatGallery from "../ChildComponents/FoodCatGallery";
import InstantFood from "../ChildComponents/InstantFood";
import BrowseByKitchen from "../ChildComponents/BrowseByKitchen";
import FoodNameCategory from "../ChildComponents/FoodNameCategory";
import Map from "../ChildComponents/Map";
import Dairy from "../ChildComponents/Dairy";
import Footer from "../Common/Footer";
import Circle_2 from "../ChildComponents/Circle_2";
import HowWeDo from "../ChildComponents/HowWeDo";
import RecipeBook from "../ChildComponents/RecipeBook";
import Receipebook_layoutTwo from "../ChildComponents/Receipebook_layoutTwo";
import CenterSlider from "../ChildComponents/CenterSlider";
import ProfileFoodGallery from "../ChildComponents/ProfileFoodGallery";
import { getHomePageSections } from "../../API/HomePageSectionAPI";
import { useSelector } from "react-redux";
import HomePageStyleOne from "../ChildComponents/HomePageStyleOne";
import HomePageStyleTwo from "../ChildComponents/HomePageStyleTwo";
import Geocode from "react-geocode";
import axios from "axios";
import PlacesAutocomplete, {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from "react-places-autocomplete";
const HomeComponent = () => {
  const [latitude, setLatitude] = useState(null);
  const [longitude, setLongitude] = useState(null);
  const [userAddress, setUserAddress] = useState(null);
  const [changeUserAddress, setChangeUserAddress] = useState(null);

  const [findAddress, setFindAddress] = useState(false);

  const [location, setLocation] = useState(null);

  Geocode.setApiKey("AIzaSyBjvJT7cdaNGnUXmizPLS9qlBNqySmgQRI");
  Geocode.setLanguage("en");
  Geocode.setRegion("BD");
  Geocode.setLocationType("ROOFTOP");

  useEffect(() => {
    getHomePageSections();
    //Load Address data from LocalStorage
    const add = localStorage.getItem("address");
    if (add) {
      setUserAddress(add);
    }

    // Initial Call for getting Device location
    if (!add && findAddress === false) {
      fetchLocation();
    }

    // Load data from localStorage on component mount for locaton json
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

  const fetchLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setLatitude(position.coords.latitude);
          setLongitude(position.coords.longitude);
          localStorage.setItem("latitude", position.coords.latitude);
          localStorage.setItem("longitude", position.coords.longitude);

          //upload location in json format
          const newData = {
            latitude: `${latitude}`,
            longitude: `${longitude}`,
          };
          setLocation(newData);

          fetchAddress(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
        }
      );
    } else {
    }
  };

  const fetchAddress = (latitude, longitude) => {
    const apiKey = "AIzaSyBjvJT7cdaNGnUXmizPLS9qlBNqySmgQRI";
    const apiUrl = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${apiKey}`;

    axios
      .get(apiUrl)
      .then((response) => {
        if (response.data.results.length > 0) {
          //setAddress(response.data.results[0].formatted_address);
          const address = response.data.results[0].formatted_address;
          //const address = response?.results[0]?.formatted_address;

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
        }
      })
      .catch((error) => {
        console.error("Error fetching address:", error);
      });
  };

  let HomePageList = useSelector((state) => state.homePage.homePageList);
  // for (let i = 0; i < HomePageList.length; i++) {
  //   if (HomePageList[i]?.sectionStyle === "Style1") {
  //     var Style1 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style2") {
  //     var Style2 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style3") {
  //     var Style3 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style4") {
  //     var Style4 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style5") {
  //     var Style5 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style6") {
  //     var Style6 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style7") {
  //     var Style7 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style8") {
  //     var Style8 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style9") {
  //     var Style9 = true;
  //   }
  //   if (HomePageList[i]?.sectionStyle === "Style10") {
  //     var Style10 = true;
  //   }
  // }

  const searchOptions = {
    componentRestrictions: { country: ["BD"] },
  };
  const handleSelect = async (value) => {
    setFindAddress(true);
    const updateAddress = value;
    setChangeUserAddress(`${updateAddress}`);
    setUserAddress(`${updateAddress}`);
    localStorage.setItem("address", value);

    const result = await geocodeByAddress(value);
    const latLng = await getLatLng(result[0]);
    const lat = latLng.lat;
    const lng = latLng.lng;

    setLatitude(lat);
    setLongitude(lng);
    localStorage.setItem("latitude", lat);
    localStorage.setItem("longitude", lng);

    const { address_components } = result[0];
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

    const newData = {
      latitude: `${lat}`,
      longitude: `${lng}`,
      address: `${updateAddress}`,
      area: `${area}`,
      city: `${city}`,
      state: `${state}`,
      country: `${country}`,
    };
    setLocation(newData);
  };
  return (
    <section>
      <Header
        address={userAddress}
        changeUserAddress={changeUserAddress}
        setUserAddress={setChangeUserAddress}
        handleSelect={handleSelect}
        searchOptions={searchOptions}
      />
      <div className='Space__For__Header'></div>

      <CountryBaseFoodCategories />
      <CardSlider />
      {/* <CountryBaseFoodCategories /> */}
      <EarnMoney />
      {/* <Recipe_Gallery data={HomePageList} /> */}
      {/* <OpenAccountInfo /> */}
      {/* <Circle /> */}

      <>
        {HomePageList.map((item, index) => {
          if (item.sectionStyle === "Style1") {
            return <HomePageStyleOne key={index} data={item} />;
          }
          if (item.sectionStyle === "Style2") {
            return <HomePageStyleTwo key={index} data={item} />;
          }
          if (item.sectionStyle === "Style3") {
            return <Circle_2 key={index} data={item} />;
          }
          if (item.sectionStyle === "Style4") {
            return <OrderFoodCat key={index} data={item} />;
          }
          if (item.sectionStyle === "Style5") {
            return <FoodCatGallery key={index} data={item} />;
          }
          if (item.sectionStyle === "Style6") {
            return <BrowseByKitchen key={index} data={item} />;
          }

          if (item.sectionStyle === "Style7") {
            return <HowWeDo key={index} data={item} />;
          }
          if (item.sectionStyle === "Style9") {
            return <FoodNameCategory key={index} data={item} />;
          }
          if (item.sectionStyle === "Style10") {
            return <Dairy key={index} data={item} />;
          }
          if (item.sectionStyle === "Style11") {
            return <Receipebook_layoutTwo key={index} data={item} />;
          }

          return <></>;
        })}
      </>

      {/* <Receipebook_layoutTwo /> */}
      {/* <InstantFood title={"Instant"} /> */}
      {/* <BrowseByKitchen /> */}
      {/* <FoodNameCategory /> */}
      {/* <CenterSlider /> */}
      {/* <ProfileFoodGallery /> */}
      {/* <Dairy /> */}
      {/* <FoodCatGallery />;
      <Receipebook_layoutTwo /> */}
      <Map />
      <Footer />
    </section>
  );
};

export default HomeComponent;
