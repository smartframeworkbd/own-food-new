import React, { useEffect, useState } from "react";
import CardSlider from "../ChildComponents/CardSlider";
import Header from "../Common/Header";
import CountryBaseFoodCategories from "../ChildComponents/CountryBaseFoodCategories";

import OrderFoodCat from "../ChildComponents/OrderFoodCat";

import FoodCatGallery from "../ChildComponents/FoodCatGallery";

import BrowseByKitchen from "../ChildComponents/BrowseByKitchen";
import FoodNameCategory from "../ChildComponents/FoodNameCategory";

import Dairy from "../ChildComponents/Dairy";

import Circle_2 from "../ChildComponents/Circle_2";
import HowWeDo from "../ChildComponents/HowWeDo";

import LandingCard from "../Common/Cards/LandingCard/LandingCard";

import Receipebook_layoutTwo from "../ChildComponents/Receipebook_layoutTwo";

import { getHomePageSections } from "../../API/HomePageSectionAPI";
import { useSelector } from "react-redux";
import HomePageStyleOne from "../ChildComponents/HomePageStyleOne";
import HomePageStyleTwo from "../ChildComponents/HomePageStyleTwo";
import Geocode from "react-geocode";

import SellerProfileSkeleton from "../../skelton/SellerProfileSkeleton";
// import DynamicBanner from "../Common/Cards/DynamicBanner/DynamicBanner";
import BannerSection from "../ChildComponents/BannerSection";
import AllFoodLayoutDesign from "../ChildComponents/AllFoodLayoutDesign";

const HomeComponent = () => {
  Geocode.setApiKey("AIzaSyBjvJT7cdaNGnUXmizPLS9qlBNqySmgQRI");
  Geocode.setLanguage("en");
  Geocode.setRegion("BD");
  Geocode.setLocationType("ROOFTOP");

  useEffect(() => {
    getHomePageSections();
  }, []);

  let HomePageList = useSelector((state) => state.homePage.homePageList);
 

  return (
    <section>
      {/* <Header /> */}
      <div className='Space__For__Header'></div>

      <CountryBaseFoodCategories />
      <CardSlider />
      {/* <CountryBaseFoodCategories /> */}
      {/* <EarnMoney /> */}
      {/* {/* <Recipe_Gallery data={HomePageList} />
      {/* <OpenAccountInfo />
      <Circle /> */}

      {/* <DynamicBanner/> */}
      {/* <LandingCard /> */}
      {/* <BannerSection/> */}


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

          //problem
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

          //problem
          if (item.sectionStyle === "Style9") {
            return <FoodNameCategory key={index} data={item} />;
          }

          if (item.sectionStyle === "Style10") {
            return <Dairy key={index} data={item} />;
          }

          if (item.sectionStyle === "Style11") {
            return <Receipebook_layoutTwo key={index} data={item} />;
          }

          
          if (item.sectionStyle === "Style12") {
            return <AllFoodLayoutDesign key={index} data={item} />;
          }

          if (item.sectionStyle === "Style13") {
            return <BannerSection key={index} data={item} />;
          }

          return <></>;
        })}
      </>
      {/* <BrowseByKitchen /> */}
      {/* <Receipebook_layoutTwo /> */}
      {/* <InstantFood title={"Instant"} /> */}
      {/* <BrowseByKitchen />
      <FoodNameCategory />
      <CenterSlider />
      <ProfileFoodGallery />
      <Dairy />
       */}
      {/* <FoodCatGallery />;
      <Receipebook_layoutTwo /> */}
      {/* <EarnMoney /> */}
      {/* <Map /> */}
      {/* <Footer /> */}
      {/* <GoogleMap /> */}
      {/* <SellerProfileSkeleton/> */}
    </section>
  );
};

export default HomeComponent;
