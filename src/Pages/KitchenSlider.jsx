import React, { useEffect } from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import Fab from "@mui/material/Fab";
import { Container, Row } from "react-bootstrap";
import Slider from "react-slick";
import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// Card Data
function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={className}
      style={{ ...style, display: "block" }}
      onClick={onClick}
    />
  );
}
// export const data = [
//   {
//     text: "Barger",
//     image: "/Assets/Img/barger.png",
//   },
//   {
//     text: "Biriyani",
//     image: "/Assets/Img/biriyani.png",
//   },
//   {
//     text: "Chaowmin",
//     image: "/Assets/Img/chaowmin.png",
//   },
//   {
//     text: "Nachos",
//     image: "/Assets/Img/nachos.png",
//   },
//   {
//     text: "Pizza",
//     image: "/Assets/Img/pizza.png",
//   },
//   {
//     text: "Roll Chicken",
//     image: "/Assets/Img/roll_chicken.png",
//   },
//   {
//     text: "Roll Chicken",
//     image: "/Assets/Img/roll_chicken.png",
//   },
//   {
//     text: "Roll Chicken",
//     image: "/Assets/Img/roll_chicken.png",
//   },
//   {
//     text: "Roll Chicken",
//     image: "/Assets/Img/roll_chicken.png",
//   },
//   {
//     text: "Roll Chicken",
//     image: "/Assets/Img/roll_chicken.png",
//   },

//   {
//     text: "Roll Chicken",
//     image: "/Assets/Img/roll_chicken.png",
//   },
// ];

const KitchenSlider = ({ data }) => {
  //   const ref = React.useRef(StackedCarousel);
  //   useEffect(() => {
  //     setInterval(stuff, 200000);
  //   }, []);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
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
  //   function stuff() {
  //     ref.current?.goNext();
  //   }

  return (
    <Container className="card card-carrier ">
      <div className="section-heading">
        <div class="title-area text-center">
          <span class="sub-title"></span>
          {/* <h2 class='sec-title'>
            <span className='sf_init_title'> Food </span>{" "}
            <span class=' sf_text-theme'>Category</span>
          </h2> */}
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <Slider {...settings}>
          {data.map((item, index) => {
            // Detect screen width for responsive styles
            const isSmallDevice = window.innerWidth <= 768; // Adjust breakpoint as needed
            const imageStyles = isSmallDevice
              ? {
                height: "300px", // Smaller height for small devices
                width: "400px",  // Smaller width for small devices
                paddingTop: "5px",
                paddingBottom: "5px",
              }
              : {
                height: "510px", // Default height
                width: "580px",  // Default width
                paddingTop: "10px",
                paddingBottom: "5px",
              };

            return (
              <div
                key={index}
                className="kitchenDiv"
                style={{
                  outline: "none",
                  width: "389px",
                  border: "15px solid #1B6DC1",
                  borderRadius: "15px",
                }}
              >
                <img
                  src={item?.large?.imageUrl}
                  loading="lazy"
                  className="img-fluid"
                  alt="blog"
                  style={imageStyles} // Apply responsive styles
                />
              </div>
            );
          })}
        </Slider>
      </div>

    </Container>
  );
};

export default KitchenSlider;
