import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { BaseURL } from '../../../../Helper/config';
import SliderProvider from '../../Slider/SliderProvider';
import SellerCard from '../SellerCard/SellerCard';
import FoodPresentationCard from '../FoodPresentation/FoodPresentationCard';


const LandingCard = ({coordinates}) => {

    const dispatch = useDispatch();
    const [categoryData, setCategoryData] = useState([]);
    const [catId, setCatId] = useState();

    useEffect(() => {
         axios.get(BaseURL + "/get-food").then((res) => {
          setCategoryData(res.data.data);
          setCatId(res.data.data);
        });
    
      }, []);


  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
  };

    return (
        <div style={{marginLeft:"60px",}}>
        {categoryData && categoryData.length > 0 ? (
        <SliderProvider
          key="slider"
          sliderSettings={settings}
          food={categoryData}
        />
      ) : (
        <p>No Food found nearby.</p>
      )}
      </div>
    );
};

export default LandingCard;