import React, { useEffect } from 'react'
import image1 from '../../assets/promo1.png'
import image2 from '../../assets/promo2.png'
import image3 from '../../assets/promo3.png'
import PromoCard from '../PromoCard/PromoCard'
import Slider from 'react-slick'
import './PromoCardParent.css'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { getBannersAPI } from '../../API/BannersAPI'
import { useSelector } from 'react-redux'

const PromoCardParent = () => {
  const data = [
  {
    title: '0Tk Delivery Fee + up to 50%',
    buttonText: 'Try free for 4 weeks',
    image: image1,
    bgColor: '#ffd400',
  },
  {
    title: 'Free Coffee on First Order!',
    buttonText: 'Claim Now',
    image: image2,
    bgColor: '#ff5722',
  },
  {
    title: 'Buy 1 Get 1 Free Pizza!',
    buttonText: 'Grab Offer',
    image: image3,
    bgColor: '#4caf50',
  },

];


  useEffect(() => {
    getBannersAPI().then((res) => {
      if (res === true) {
      }
    });
  }, []);

  let BannerList = useSelector((state) => state.banner.allBannerList);
  const NextArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow custom-arrow slick-next d-flex justify-content-center align-items-center" onClick={onClick}>

     <ArrowRight />
    </div>;
  };

  const PrevArrow = (props) => {
    const { onClick } = props;
    return <div className="slick-arrow custom-arrow slick-prev d-flex justify-content-center align-items-center" onClick={onClick}>

     <ArrowLeft />
    </div>;
  };


const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 1,
  nextArrow: <NextArrow />,
  prevArrow: <PrevArrow />,
  responsive: [
    {
      breakpoint: 1024, // tablets
      settings: {
        slidesToShow: 2,
      },
    },
    {
      breakpoint: 768, // phones
      settings: {
        slidesToShow: 1,
      },
    },
  ],
}
  return (
       <div className="container my-4 promo-card-parent">
      <Slider {...settings}>
        {BannerList.length > 0 &&
                BannerList?.map((item, index) => (
          <PromoCard key={index} data={item} />
        ))}
      </Slider>
    </div>
  )
}

export default PromoCardParent