import React, { useRef, useState } from 'react';
import Slider from 'react-slick';
import './NearestKitchen.css';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

import kitchen1 from '../../assets/kitchen1.png';
import kitchen2 from '../../assets/kitchen2.png';
import kitchen3 from '../../assets/kitchen3.png';
import kitchenLogo from '../../assets/kitchnTitle.png';

const kitchens = [
  { name: "Salma's kitchen", foodCount: 53, icon: kitchen1 },
  { name: 'Rumana kitchen', foodCount: 53, icon: kitchen2 },
  { name: 'Dream Foods', foodCount: 53, icon: kitchen3 },
  { name: 'Cook Off', foodCount: 53, icon: kitchen1 },
  { name: 'Khan kitchen', foodCount: 53, icon: kitchen2 },
  { name: 'Nishu Food', foodCount: 53, icon: kitchen2 },
  { name: 'Sajib kitchen', foodCount: 53, icon: kitchen3 },
  { name: 'Mira Kitchen', foodCount: 53, icon: kitchen1 },
  { name: 'Tasty Hub', foodCount: 53, icon: kitchen2 },
  { name: 'Mira Kitchen', foodCount: 53, icon: kitchen1 },
  { name: 'Tasty Hub', foodCount: 53, icon: kitchen2 },
  { name: 'Mira Kitchen', foodCount: 53, icon: kitchen1 },
  { name: 'Tasty Hub', foodCount: 53, icon: kitchen2 },
  { name: 'Mira Kitchen', foodCount: 53, icon: kitchen1 },
  { name: 'Tasty Hub', foodCount: 53, icon: kitchen2 },
  { name: 'Mira Kitchen', foodCount: 53, icon: kitchen1 },
  { name: 'Tasty Hub', foodCount: 53, icon: kitchen2 },
  { name: 'Mira Kitchen', foodCount: 53, icon: kitchen1 },
];

const chunkArrayWithPadding = (arr, size) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null); // pad to keep 7
    }
    chunked.push(chunk);
  }
  return chunked;
};

const NearestKitchen = () => {
  const kitchenChunks = chunkArrayWithPadding(kitchens, 7);
  const mobileKitchenChunks = chunkArrayWithPadding(kitchens, 3);

  const sliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);

  const desktopSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setCurrentSlide(index),
  };

  const mobileSettings = {
    dots: false,
    infinite: true,
    speed: 400,
    arrows: false,
    slidesToShow: 1,
    slidesToScroll: 1,
    afterChange: (index) => setMobileSlide(index),
  };

  return (
    <>
      {/* ✅ Desktop View (Slider with 7 cards per slide) */}
      <section className="nearest-kitchen-section text-center py-5 d-none d-lg-block">
        <div className="container">
          <div className="icon-wrapper mb-3">
            <img src={kitchenLogo} alt="kitchen icon" className="kitchen-icon" />
          </div>
          <h2 className="section-title mb-4">Nearest Kitchen</h2>

          <Slider ref={sliderRef} {...desktopSettings}>
            {kitchenChunks.map((chunk, slideIdx) => (
              <div key={slideIdx}>
                <div className="row justify-content-center">
                  {chunk.map((kitchen, idx) => (
                    <div
                      key={idx}
                      className="col-10 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                    >
                      {kitchen ? (
                        <div className="nearest-kitchen-card text-center d-flex gap-3 p-3">
                          <div className="kitchen-icon-circle mb-2">
                            <img src={kitchen.icon} alt={kitchen.name} className="kitchen-img" />
                          </div>
                          <div>
                            <div className="kitchen-name">{kitchen.name}</div>
                            <div className="food-count">ACTIVE FOOD: {kitchen.foodCount}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="nearest-kitchen-card p-3" style={{ visibility: 'hidden' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>

          {/* Custom Pagination */}
          <div className="pagination-controls mt-4 d-flex justify-content-center align-items-center gap-3">
            <button className="pagination-btn" onClick={() => sliderRef.current.slickPrev()}>
              &#8249;
            </button>
            <span className="page-number">
              {currentSlide + 1} / {kitchenChunks.length}
            </span>
            <button className="pagination-btn" onClick={() => sliderRef.current.slickNext()}>
              &#8250;
            </button>
          </div>
        </div>
      </section>

      {/* ✅ Mobile View (1 card per slide) */}
      <section className="nearest-kitchen-mobile-section text-center py-5 d-block d-lg-none">
        <div className="">
          <h2 className="section-title mb-4">Nearest Kitchen</h2>

          <Slider ref={mobileSliderRef} {...mobileSettings}>

            {/* {
              console.log(mobileKitchenChunks.length)
} */}
            {mobileKitchenChunks.map((chunk, slideIdx) => (
              <div key={slideIdx}>
                <div className="row justify-content-center g-5 card-container">
                  {chunk.map((kitchen, idx) => (
                    <div
                      key={idx}
                      className="col-4 mb-4 ms-3  d-flex justify-content-center"
                    >
                      {kitchen ? (
                        <div className="nearest-kitchen-card text-center d-flex gap-3 p-3">
                          <div className="kitchen-icon-circle mb-2">
                            <img src={kitchen.icon} alt={kitchen.name} className="kitchen-img" />
                          </div>
                          <div>
                            <div className="kitchen-name">{kitchen.name}</div>
                            <div className="food-count">ACTIVE FOOD: {kitchen.foodCount}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="nearest-kitchen-card p-3" style={{ visibility: 'hidden' }} />
                      )}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>


       
          <div className="pagination-controls mt-4 d-flex justify-content-center align-items-center gap-3">
            <button className="pagination-btn" onClick={() => mobileSliderRef.current.slickPrev()}>
              &#8249;
            </button>
            <span className="page-number">
              {mobileSlide + 1} / {kitchens.length}
            </span>
            <button className="pagination-btn" onClick={() => mobileSliderRef.current.slickNext()}>
              &#8250;
            </button>
          </div>
        </div>
      </section>


    </>
  );
};

export default NearestKitchen;
