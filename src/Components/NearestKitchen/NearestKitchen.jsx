import React, { useEffect, useRef, useState } from "react";
import "./NearestKitchen.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import kitchenLogo from "../../assets/kitchnTitle.png";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import { Link } from "react-router-dom";

const chunkArrayWithPadding = (arr, size) => {
  const chunked = [];
  for (let i = 0; i < arr.length; i += size) {
    const chunk = arr.slice(i, i + size);
    while (chunk.length < size) {
      chunk.push(null);
    }
    chunked.push(chunk);
  }
  return chunked;
};

const NearestKitchen = ({ data }) => {
  const [kitchenData, setKitchenData] = useState([]);
  const sliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);
  useEffect(() => {
    const fetchKitchens = async () => {
      try {
        const ids = data?.sectionCategories1?.map((x) => x.value) || [];
        if (ids.length === 0) return;

        const res = await axios.post(`${BaseURL}/get-seller-with-food-details`, { _id: ids });
        setKitchenData(res.data.data || []);
      } catch (err) {
        console.error("Failed to load kitchens:", err);
      }
    };

    fetchKitchens();
  }, [data]);

  const kitchenChunks = chunkArrayWithPadding(kitchenData, 7); 
  const mobileChunks = chunkArrayWithPadding(kitchenData, 5); 

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

  const renderCard = (kitchen) => {
    if (!kitchen)
      return <div className="nearest-kitchen-card p-3" style={{ visibility: "hidden" }} />;

    const isChef = data?.sectionCardColor === "Chef";

    const imageSrc = isChef
      ? kitchen?.userData?.userProfilePhoto?.[0]?.extraLarge?.imageUrl
      : kitchen?.sellerProfilePhoto?.[0]?.extraLarge?.imageUrl ||
        kitchen.kitchenImage ||
        kitchen.kitchenPhoto ||
        kitchen.logo ||
        kitchen.image;

    const title = isChef ? kitchen?.userData?.userFullName : kitchen?.kitchenName;
    const subtitle = isChef ? kitchen?.kitchenName : `ACTIVE FOOD: ${kitchen?.foodCount || 0}`;
    
    // console.log(data)
    const linkKitchen=kitchen?._id
    return (
      <Link to={`/SellerProfile/${linkKitchen}`}>
        <div className="nearest-kitchen-card text-center d-flex gap-3 p-3">
        <div className="kitchen-icon-circle mb-2">
          <img src={imageSrc} alt={title} className="kitchen-img" />
        </div>
        <div>
          <div className="kitchen-name">{title.length>15?title.slice(0.15):title}</div>
          <div className="food-count">{subtitle}</div>
        </div>
      </div>
      </Link>
    
    );
  };

  return (
    <>
      {/* Desktop View */}
      <section className="nearest-kitchen-section text-center py-5 d-none d-lg-block">
        <div className="container">
          <div className="icon-wrapper mb-3">
            <img src={kitchenLogo} alt="kitchen icon" className="kitchen-icon" />
          </div>
          <h2 className="section-title mb-4">{data?.sectionTitle1}</h2>

          <Slider ref={sliderRef} {...desktopSettings}>
            {kitchenChunks.map((chunk, slideIdx) => (
              <div key={slideIdx}>
                <div className="row justify-content-center">
                  {chunk.map((kitchen, idx) => (
                    <div
                      key={idx}
                      className="col-10 col-sm-6 col-md-4 col-lg-3 mb-4 d-flex justify-content-center"
                    >
                      {renderCard(kitchen)}
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </Slider>

          <div className="pagination-controls mt-4 d-flex justify-content-center align-items-center gap-3">
            <button className="pagination-btn" onClick={() => sliderRef.current?.slickPrev()}>
              &#8249;
            </button>
            <span className="page-number">
              {currentSlide + 1} / {kitchenChunks.length}
            </span>
            <button className="pagination-btn" onClick={() => sliderRef.current?.slickNext()}>
              &#8250;
            </button>
          </div>
        </div>
      </section>

      {/* Mobile View */}
      <section className="nearest-kitchen-mobile-section text-center py-5 d-block d-lg-none">
        <div>
          <h2 className="section-title mb-4">{data?.sectionTitle1 || "Nearest Kitchen"}</h2>

          <Slider ref={mobileSliderRef} {...mobileSettings}>
            {mobileChunks.map((chunk, slideIdx) => {
              const row1 = chunk.slice(0, 2);
              const row2 = chunk.slice(2, 5);

              return (
                <div key={slideIdx}>
                  <div className="row justify-content-center mb-3">
                    {row1.map((kitchen, idx) => (
                      <div key={idx} className="col-6 d-flex justify-content-center">
                        {renderCard(kitchen)}
                      </div>
                    ))}
                  </div>

                  <div className="d-flex justify-content-center gap-2 overflow-hidden px-2">
                    {row2.map((kitchen, idx) => (
                      <div
                        key={idx}
                        className="mobile-slide-card-wrapper"
                        style={{
                          flex: "0 0 33.333%",
                          transform: idx === 1 ? "scale(1)" : "scale(0.9)",
                          opacity: kitchen ? 1 : 0,
                        }}
                      >
                        {renderCard(kitchen)}
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </Slider>

          <div className="pagination-controls mt-4 d-flex justify-content-center align-items-center gap-3">
            <button className="pagination-btn" onClick={() => mobileSliderRef.current?.slickPrev()}>
              &#8249;
            </button>
            <span className="page-number">
              {mobileSlide + 1} / {mobileChunks.length}
            </span>
            <button className="pagination-btn" onClick={() => mobileSliderRef.current?.slickNext()}>
              &#8250;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NearestKitchen;
