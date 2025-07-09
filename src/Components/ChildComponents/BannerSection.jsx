import React from "react";
// import SliderProvider from "../../Slider/SliderProvider";
// import BannerCard from "../BannerCard/BannerCard";
import SliderProvider from "../Common/Slider/SliderProvider";
import BannerCard from "../Common/Cards/BannerCard/BannerCard";
import BannerCardImage from "../Common/Cards/BannerCard/BannerCardImage";
import BannerDesign from "../Common/Cards/BannerCard/BannerDesign";

const BannerSection = ({data}) => {
  
  // JSON Data
  // const data = [
  //   {
  //     backgroundColor: "#1B6DC1",
  //     offer: "FLAT 20% OFF",
  //     bigTitle: "Exclusive Deal on Electronics",
  //     smallTitle: "Hurry Up!",
  //     description: "Don't miss out on this amazing offer. Limited time only!",
  //     buttonText: "Add to Cart",
  //     buttonLink: "/",
  //     products: [
  //       {
  //         id: 1,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 1",
  //       },
  //       {
  //         id: 2,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 2",
  //       },
  //       {
  //         id: 3,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 3",
  //       },
  //       {
  //         id: 4,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 3",
  //       },
  //       {
  //         id: 5,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 3",
  //       },
  //       {
  //         id: 6,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 3",
  //       },
  //       {
  //         id: 7,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 3",
  //       },
  //       {
  //         id: 8,
  //         image:
  //           "https://images.unsplash.com/photo-1460306855393-0410f61241c7?q=80&w=2073&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  //         alt: "Product 3",
  //       },
  //     ],
  //   },
  // ];

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
    <div>
      <SliderProvider
        key="slider"
        sliderSettings={settings}
        food={data?.bannerImage}
        cardComponent={BannerDesign}
      />
    </div>
  );
};

export default BannerSection;
