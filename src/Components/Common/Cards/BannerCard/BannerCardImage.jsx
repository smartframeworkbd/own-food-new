import React from "react";
import SliderProvider from "../../Slider/SliderProvider";
import BannerDesign from "./BannerDesign";

const banners = [
  {
    id: 1,
    src: "https://dashboard.ownfood.com.bd/static/media/ownfood-banner-1.de23e5dbf7997300db76.jpeg",
    alt: "Banner 1",
  },
  {
    id: 2,
    src: "https://dashboard.ownfood.com.bd/static/media/ownfood-banner-2.4cf6de9730d81b27f347.png",
    alt: "Banner 2",
  },
  {
    id: 3,
    src: "https://dashboard.ownfood.com.bd/static/media/ownfood-banner-3.28ff5c0b42015083f107.jpg",
    alt: "Banner 3",
  },
  {
    id: 4,
    src: "https://dashboard.ownfood.com.bd/static/media/ownfood-banner-3.28ff5c0b42015083f107.jpg",
    alt: "Banner 3",
  },
  {
    id: 4,
    src: "https://dashboard.ownfood.com.bd/static/media/ownfood-banner-3.28ff5c0b42015083f107.jpg",
    alt: "Banner 3",
  },


];



const BannerSlider = () => {
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  return (
    <div className="BannerCardImages">
      <SliderProvider
      key="slider"
        sliderSettings={settings}
        food={banners}
        cardComponent={BannerDesign}
      />
    </div>
  );
};

export default BannerSlider;
