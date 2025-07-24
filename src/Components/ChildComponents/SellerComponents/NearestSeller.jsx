import React, { useEffect, useState } from 'react';
import SliderProvider from '../../Common/Slider/SliderProvider';
import { GetNearestSellerAPI } from '../../../API/SellerAPI';
import { useDispatch, useSelector } from 'react-redux';
import SellerCard from '../../Common/Cards/SellerCard/SellerCard';

const NearestSeller = ({ coordinates }) => {
  const dispatch = useDispatch();
  const [sliderData, setSliderData] = useState([]);
  
  useEffect(() => {
    const fetchSellers = async () => {
      if (!coordinates?.lat || !coordinates?.lon) {
        console.error("Coordinates are missing or invalid");
        return;
      }

      const success = await GetNearestSellerAPI(coordinates);
      if (!success) {
        console.error("Failed to fetch nearest sellers.");
      }
    };

    fetchSellers();
  }, [coordinates]);

  // Selector to get the nearest seller data from the Redux store
  const sellerData = useSelector((state) => state.seller.getNearestSellerData);

  // Initially show 10 items
  useEffect(() => {
    if (sellerData && sellerData.length > 0) {
      setSliderData(sellerData.slice(0, 10));  
    }
  }, [sellerData]);

  // Settings for the slider
  const settings = {
    infinite: true,
    speed: 500,
    autoplay: false,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    beforeChange: (current, next) => {
      if (next === sliderData.length - 1) {
        // Load more sellers when the slider reaches the end
        setSliderData((prevData) => [
          ...prevData,
          ...sellerData.slice(prevData.length, prevData.length + 10),
        ]);
      }
    },
  };

  return (
    <div>
      <h2 className="text-center text-md-start">Nearest Sellers</h2>

      {sliderData && sliderData.length > 0 ? (
        <SliderProvider
          key="slider"
          sliderSettings={settings}
          food={sliderData}
          cardComponent={SellerCard}
        />
      ) : (
        <p>No sellers found nearby.</p>
      )}
    </div>
  );
};

export default NearestSeller;





// import React, { useEffect } from 'react';
// import SliderProvider from '../../Common/Slider/SliderProvider';
// import { GetNearestSellerAPI } from '../../../API/SellerAPI';
// import { useDispatch, useSelector } from 'react-redux';
// import SellerCard from '../../Common/Cards/SellerCard/SellerCard';

// const NearestSeller = ({ coordinates }) => {
//   const dispatch = useDispatch();

//   useEffect(() => {
//     const fetchSellers = async () => {
//       if (!coordinates?.lat || !coordinates?.lon) {
//         console.error("Coordinates are missing or invalid");
//         return;
//       }

//       const success = await GetNearestSellerAPI(coordinates);
//       if (!success) {
//         console.error("Failed to fetch nearest sellers.");
//       }
//     };

//     fetchSellers();
//   }, [coordinates]);

//   // Selector to get the nearest seller data from the Redux store
//   const sellerData = useSelector((state) => state.seller.getNearestSellerData);
//   const settings = {
//     infinite: true,
//     speed: 500,
//     autoplay: true,
//     autoplaySpeed: 5000,
//     slidesToShow: 4,
//   };
//   return (
//     <div>
//       <h2 className="text-center text-md-start">Nearest Sellers</h2>

//       {sellerData && sellerData.length > 0 ? (
//         <SliderProvider
//           key="slider"
//           sliderSettings={settings}
//           food={sellerData}
//         cardComponent={SellerCard} 
//         />
//       ) : (
//         <p>No sellers found nearby.</p>
//       )}
//     </div>
//   );
// };

// export default NearestSeller;
