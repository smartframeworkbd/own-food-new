import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Slider from "react-slick";
import FoodPresentationCard from "../Cards/FoodPresentation/FoodPresentationCard";
import { Container } from "react-bootstrap";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import { BaseURL } from "../../../Helper/config";

const SliderProvider = ({
  sliderSettings,
  cardComponent: CardComponent,
  title,
  food,
}) => {
  // const [food, setFood] = useState([]);
  // const getFood = async () => {
  //   const data = await axios.get(`${BaseURL}/get-food`);

  // };
  // useEffect(() => {
  //   getFood();
  // }, []);

  // const defaultSettings = {
  //   infinite: true,
  //   speed: 500,
  //   autoplaySpeed: 5000,
  //   nextArrow: <FaArrowRight />,
  //   prevArrow: <FaArrowLeft />,
  //   slidesToScroll: 1,
  //   slidesToShow:4,
  //   responsive: [
  //     {
  //       breakpoint: 1300,
  //       settings: {
  //         slidesToShow: Math.min(food.length, 4), 
  //         slidesToScroll: 2,
  //         infinite: false,
  //         // infinite: food.length > 4, 
  //       },
  //     },
  //     {
  //       breakpoint: 1024,
  //       settings: {
  //         slidesToShow: Math.min(food.length, 3), 
  //         slidesToScroll: 2,
  //         // infinite: food.length > 3,
  //         infinite: false,
  //       },
  //     },
  //     {
  //       breakpoint: 768,
  //       settings: {
  //         slidesToShow: Math.min(food.length, 2), 
  //         slidesToScroll: 1,
  //         infinite: food.length > 2,
  //       },
  //     },
  //     {
  //       breakpoint: 480,
  //       settings: {
  //         slidesToShow: 1,
  //         slidesToScroll: 1,
  //         centerMode: food.length === 1,// Center align single slide
  //         infinite: false,
  //       },
  //     },
  //   ],
  // };


  // let customizeSettings = { ...defaultSettings };
  // if (food.length === 1) {
  //   customizeSettings = {
  //     ...customizeSettings,
  //     slidesToShow: 1,
  //     infinite: false,
  //     centerMode: true,
  //   }; 
  // } else if (food.length === 2) {
  //   customizeSettings = {
  //     ...customizeSettings,
  //     slidesToShow: 2,
  //     infinite: false,
  //   };
  // }

 
  // const finalSettings = { ...customizeSettings, ...sliderSettings };
  const settings = {
    infinite: true,
    speed: 500,
    autoplaySpeed: 5000,
    // rows:1,
    // slidesToShow: 4,
    nextArrow: <FaArrowRight />,
    prevArrow: <FaArrowLeft />,
    slidesToScroll: 1,
    responsive: [

      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
        
          dots: false,
        },
      },


      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        
          infinite: false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
         
          infinite: false
        },
      },
    ],
  };
  let customizeSetting = { ...settings };
  if (!!food && food.length < 5) {
    customizeSetting = {
      ...customizeSetting,
      slidesToShow: food.length,
      responsive: [

        {
          breakpoint: 1300,
          settings: {
            slidesToShow: food.length / 2,
            slidesToScroll: 3,
            infinite: false,
            dots: false,
          },
        },
        {
          breakpoint: 480,
          settings: {
            slidesToShow: 1,
            slidesToScroll: 1,
           
            infinite: false
          },
        },
      ]
    };
  }

  const combinationSettings = { ...settings, ...sliderSettings };
  const finalSettings = { ...combinationSettings, ...customizeSetting };


  return (
    <Container className="InstantFood home-index-slider slider-arrow centered-slider">
      <div className="section-heading">
        {title && (
          <div className="headerText text-left">
            <h2>
              <span className="sf_init_title">{title}</span>
              <span className="sf_text-theme"> Foods</span>
            </h2>
          </div>
        )}
      </div>
      <Slider {...finalSettings}>
        {food.map((item, index) => (
          <CardComponent data={item} index={index} width={98} key={index} />
        ))}
      </Slider>
    </Container>

    //   <Container
    //     className='InstantFood home-index-slider slider-arrow
    // '
    //   >
    //     <div className='row  '>
    //       <div className='col'>
    //         <div className='section-heading'>
    //           <div className='headerText d-flex justify-content-start'>
    //             {
    //               title &&     <div className='text-left '>
    //               <h2>
    //                 <span className='sf_init_title'>{title}</span>
    //                 <span className='sf_text-theme'> Foods</span>
    //               </h2>
    //             </div>
    //             }

    //           </div>
    //         </div>
    //       </div>
    //     </div>
    //     <div>
    //       <div className='row'>
    //         <Slider className='row' {...finalSettings}>
    //           {food &&
    //             food.map((item, index) => (
    //               <CardComponent data={item} index={index} width={98} />
    //             ))}
    //         </Slider>
    //       </div>
    //     </div>


    //   </Container>
  );
};

SliderProvider.defaultProps = {
  cardComponent: FoodPresentationCard,
};

export default SliderProvider;
