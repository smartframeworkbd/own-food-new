import React from 'react';
import Slider from 'react-slick';
import FoodTypeCard from '../FoodTypeCard/FoodTypeCard';
import {
  Utensils,
  ShoppingBag,
  CookingPot,
  UtensilsCrossed,
  BookOpen,
  Home,
  ChefHat,
  Lightbulb
} from 'lucide-react';
import './FoodTypeParent.css';

const foodTypes = [
  {
    title: 'Instant Food',
    icon: Utensils,
  },
  {
    title: 'Pre-Order',
    icon: ShoppingBag,
  },
  {
    title: 'Cook & Sell',
    icon: CookingPot,
  },
  {
    title: 'Catering',
    icon: UtensilsCrossed, // <-- fixed here
  },
  {
    title: 'Recipe',
    icon: BookOpen,
  },
  {
    title: 'Kitchen',
    icon: Home,
  },
  {
    title: 'Chefs',
    icon: ChefHat,
  },
  {
    title: 'Tips & Trick',
    icon: Lightbulb,
  },
];

const NextArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-next d-flex align-items-center justify-content-center" onClick={onClick}>
      →
    </div>
  );
};

const PrevArrow = (props) => {
  const { onClick } = props;
  return (
    <div className="slick-prev d-flex align-items-center justify-content-center" onClick={onClick}>
      ←
    </div>
  );
};

const FoodTypeParent = ({ onTypeClick }) => {
  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    arrow: false,
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
        settings: { slidesToShow: 3, dots: true },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2, dots: true },
      },
    ],
  };

  return (
    <div className="food-type-slider-container" style={{ padding: '20px', marginTop: '150px' }}>
      <Slider {...settings}>
        {foodTypes.map((type, index) => (
          <div key={index} onClick={() => onTypeClick(type.title)} style={{ cursor: 'pointer' }}>
            <FoodTypeCard label={type.title} icon={<type.icon size={32} color="#fff" />} />
          </div>))}
      </Slider>
    </div>
  );
};

export default FoodTypeParent;
