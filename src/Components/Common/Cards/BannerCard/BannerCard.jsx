import React from "react";
import SliderProvider from "../../Slider/SliderProvider";

const BannerCard = ({ data }) => {
  const ImgCard = ({ data }) => {
    return (
      <img
        key={data.id}
        src={data.image}
        alt={data.alt}
      />
    );
  };
  const settings = {
    infinite: true,
    speed: 100,
    autoplay: true,
    autoplaySpeed: 100,
    slidesToShow: 4,
  };
  return (
    <div
      style={{
        backgroundColor: data.backgroundColor,
      }}
      className="banner-containercst"
    >
      {/* Left Side Content */}
      <div className="banner-lefty">
        <h3>{data.offer}</h3>
        <h1>
          {data.bigTitle}
        </h1>
        <h4>
          {data.smallTitle}
        </h4>
        <p>
          {data.description}
        </p>
        <a
          href={data.buttonLink}
          // style={{
          //   backgroundColor: "#ffffff",
          //   color: data.backgroundColor,
          //   textDecoration: "none",
          // }}
        >
          {data.buttonText}
        </a>
      </div>

      {/* Right Side Images */}
      <div className="banner-righty">
        <SliderProvider
          key="slider"
          sliderSettings={settings}
          food={data.products}
          cardComponent={ImgCard}
        />
        {/* {data.products.map((item) => (
          <img
            key={item.id}
            src={item.image}
            alt={item.alt}
            style={{
              width: "120px",
              height: "120px",
              objectFit: "cover",
              borderRadius: "10px",
              boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
            }}
          />
        ))} */}
      </div>
    </div>
  );
};

export default BannerCard;
