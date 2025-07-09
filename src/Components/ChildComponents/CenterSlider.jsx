import React, { useEffect } from "react";
import {
  StackedCarousel,
  ResponsiveContainer,
} from "react-stacked-center-carousel";
import Fab from "@mui/material/Fab";
import { Container, Row } from "react-bootstrap";

import { AiOutlineArrowLeft, AiOutlineArrowRight } from "react-icons/ai";

// Card Data

const Slide = React.memo(function (StackedCarouselSlideProps) {
  const { data, dataIndex, isCenterSlide, swipeTo, slideIndex } =
    StackedCarouselSlideProps;

  const coverImage = data[dataIndex].image;
  const text = data[dataIndex].text;

  return (
    <div className="card-card" draggable={false}>
      <div className={`cover fill ${isCenterSlide ? "off" : "on"}`}>
        <div
          className="card-overlay fill"
          onClick={() => {
            if (!isCenterSlide) swipeTo(slideIndex);
          }}
        />
      </div>
      <div className="center-img">
        <img src={coverImage} className="img-fluid" />
      </div>
      <div className="overlay__text">
        <div className="inner__body">
          <div>
            <h3>Butter Chicken</h3>
          </div>
        </div>
      </div>
    </div>
  );
});

export const data = [
  {
    text: "Barger",
    image: "/Assets/Img/barger.png",
  },
  {
    text: "Biriyani",
    image: "/Assets/Img/biriyani.png",
  },
  {
    text: "Chaowmin",
    image: "/Assets/Img/chaowmin.png",
  },
  {
    text: "Nachos",
    image: "/Assets/Img/nachos.png",
  },
  {
    text: "Pizza",
    image: "/Assets/Img/pizza.png",
  },
  {
    text: "Roll Chicken",
    image: "/Assets/Img/roll_chicken.png",
  },
  {
    text: "Roll Chicken",
    image: "/Assets/Img/roll_chicken.png",
  },
  {
    text: "Roll Chicken",
    image: "/Assets/Img/roll_chicken.png",
  },
  {
    text: "Roll Chicken",
    image: "/Assets/Img/roll_chicken.png",
  },
  {
    text: "Roll Chicken",
    image: "/Assets/Img/roll_chicken.png",
  },

  {
    text: "Roll Chicken",
    image: "/Assets/Img/roll_chicken.png",
  },
];

const CenterSlider = () => {
  const ref = React.useRef(StackedCarousel);
  useEffect(() => {
    setInterval(stuff, 200000);
  }, []);

  function stuff() {
    ref.current?.goNext();
  }

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
        <ResponsiveContainer
          carouselRef={ref}
          render={(width, carouselRef) => {
            let currentVisibleSlide = 5;
            if (width <= 1280) currentVisibleSlide = 5;
            if (width <= 720) currentVisibleSlide = 3;
            return (
              <StackedCarousel
                ref={carouselRef}
                slideComponent={Slide}
                slideWidth={350}
                carouselWidth={width}
                data={data}
                maxVisibleSlide={5}
                disableSwipe
                customScales={[1, 0.85, 0.7, 0.55]}
                transitionTime={450}
                currentVisibleSlide={currentVisibleSlide}
              />
            );
          }}
        />
        <button
          className="card-button testimonial-left-button"
          size="small"
          onClick={() => ref.current?.goBack()}
        >
          <AiOutlineArrowLeft />
        </button>
        <button
          className="card-button testimonial-right-button"
          size="small"
          onClick={() => ref.current?.goNext()}
        >
          <AiOutlineArrowRight />
        </button>
      </div>
    </Container>
  );
};

export default CenterSlider;
