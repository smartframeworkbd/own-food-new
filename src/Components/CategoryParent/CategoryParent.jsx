import React, { useEffect } from 'react';
import Slider from 'react-slick';
import CategoryCard from '../CategoryCard/CategoryCard';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import img2 from '../../assets/image 2.png';
import img3 from '../../assets/image 3.png';
import img4 from '../../assets/image 4.png';
import img5 from '../../assets/image 5.png';
import img6 from '../../assets/image 6.png';
import img7 from '../../assets/image 7.png';
import { ArrowLeft, ArrowRight } from 'lucide-react'
import './CategoryParent.css'
import { useSelector } from 'react-redux';
import { GetAllCategoryAPI } from '../../API/CategoryAPI';
const CategoryParent = () => {
    useEffect(() => {
      GetAllCategoryAPI();
    }, []);
  
    let AllCategoryList = useSelector((state) => state.category.allCategoryList);
  
 console.log(AllCategoryList)
  const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow slick-next d-flex align-items-center justify-content-center" onClick={onClick}>

     <ArrowRight />
    </div>;
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow slick-prev d-flex align-items-center justify-content-center" onClick={onClick}>

     <ArrowLeft />
    </div>;
  };

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 6, 
    slidesToScroll: 1,
    arrows:true,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: { slidesToShow: 5 },
      },
      {
        breakpoint: 992,
        settings: { slidesToShow: 4 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 576,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  return (
    <div className="container my-4 category-parent">
      <Slider {...settings}>
        {AllCategoryList.map((item, index) => (
          <CategoryCard key={index} data={item} />
        ))}
      </Slider>
    </div>
  );
};

export default CategoryParent;
