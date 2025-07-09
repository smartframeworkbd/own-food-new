import React from 'react';
import Slider from 'react-slick';
import FoodTypeCard from '../FoodTypeCard/FoodTypeCard';
import './FoodTypeParent.css'
const foodTypes = [
  'Instant Food', 'Healthy Food', 'Vegan Food', 'Fast Food',
  'Desserts', 'Snacks', 'Drinks', 'Grill',
  // 'BBQ', 'Soups', 'Burgers', 'Pasta',
];
const NextArrow = (props) => {
  const { onClick } = props;
  return <div className="slick-next d-flex align-items-center justify-content-center" onClick={onClick}>→</div>;
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return <div className="slick-prev d-flex align-items-center justify-content-center" onClick={onClick}>←</div>;
};

const FoodTypeParent = () => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrow:false,
    slidesToShow: 8,
    slidesToScroll: 2,
      nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 6 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3, dots: true, },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2, dots: true },
      },
    ],
  };

  return (

    <div className="food-type-slider-container" style={{ padding: '20px',marginTop:"150px" }}>
      <Slider {...settings}>
        {foodTypes.map((type, index) => (
 
            <FoodTypeCard label={type} />
     
        ))}
      </Slider>
    </div>
    // <div className="food-slider-container" style={{ padding: '20px' }}>
    //   <div className='row gap-3'>

    //      {foodTypes.map((type, index) => (
 
    //         <FoodTypeCard label={type} />
     
    //     ))}
    //   </div>
      // {/* <Slider {...settings}>
       
      // </Slider> */}
    // </div>
  );
};

export default FoodTypeParent;
