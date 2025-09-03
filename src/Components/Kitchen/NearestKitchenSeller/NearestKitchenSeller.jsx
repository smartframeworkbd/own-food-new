import React, { useEffect, useRef, useState } from "react";
import "./NearestKitchenSeller.css";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import kitchenLogo from "../../../assets/kitchnTitle.png";
import ChefTitleLogo from "../../../assets/chef.png";

import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { GetNearestSellerAPI } from "../../../API/SellerAPI";

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

const toCamelCase = (str) =>
  str
    ?.toLowerCase()
    .replace(/(^\w|\s\w)/g, (match) => match.toUpperCase())
    .trim();

const NearestKitchenSeller = ({ data }) => {
  const dispatch = useDispatch();
  const sliderRef = useRef(null);
  const mobileSliderRef = useRef(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [mobileSlide, setMobileSlide] = useState(0);
  const [sliderData, setSliderData] = useState([]);

  const sellerInfo = useSelector((state) => state.seller.getSellerInfo);
  const nearestSellers = useSelector((state) => state.seller.getNearestSellerData);

  // Fetch nearest sellers
  useEffect(() => {
    const coordinates = {
      lat: sellerInfo[0]?.pointLocation?.coordinates[1] || 0,
      lon: sellerInfo[0]?.pointLocation?.coordinates[0] || 0,
    };

    const fetchSellers = async () => {
      if (!coordinates.lat || !coordinates.lon) {
        console.error("Coordinates are missing or invalid");
        return;
      }

      const success = await GetNearestSellerAPI(coordinates);
      if (!success) {
        console.error("Failed to fetch nearest sellers.");
      }
    };

    fetchSellers();
  }, [sellerInfo]);

  // Initially show 10 items
  useEffect(() => {
    if (nearestSellers && nearestSellers.length > 0) {
      setSliderData(nearestSellers.slice(0, 10));
    }
  }, [nearestSellers]);

  const kitchenChunks = chunkArrayWithPadding(nearestSellers, 7);
  const mobileChunks = chunkArrayWithPadding(nearestSellers, 5);

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

    // const isChef = data?.sectionCardColor === "Chef";
// console.log("Kitchen Data:", kitchen);

    const imageSrc =  kitchen?.kitchenImages?.[0]?.extraLarge?.imageUrl 
    
    
    // isChef
    //   ? kitchen?.userData?.userProfilePhoto?.[0]?.extraLarge?.imageUrl
    //   : kitchen?.sellerProfilePhoto?.[0]?.extraLarge?.imageUrl ||
    //     kitchen.kitchenImage ||
    //     kitchen.kitchenPhoto ||
    //     kitchen.logo ||
    //     kitchen.image;

    const title = toCamelCase( kitchen?.kitchenName);
    const subtitle = 
       `Distance: ${ kitchen?.distance > 0 ? (kitchen.distance / 1000).toFixed(2) : "0"|| 0} km`;

    const linkKitchen = kitchen?._id;

    return (
      <Link to={`/SellerProfile/${linkKitchen}`}>
        <div className="nearest-kitchen-card text-center d-flex gap-3 p-3">
          <div className="kitchen-icon-circle mb-2">
            <img src={imageSrc||ChefTitleLogo } alt={title} className="kitchen-img" />
          </div>
          <div>
            <div className="kitchen-name">
              {title.length > 15 ? title.slice(0, 13) + "…" : title}
            </div>
            <div className="food-count">
              {subtitle.length > 15 ? subtitle.slice(0, 17) : subtitle}
            </div>
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
            <img
              src={data?.sectionCardColor === "Chef" ? ChefTitleLogo : kitchenLogo}
              alt="kitchen icon"
              className="kitchen-icon"
            />
          </div>
          <h2 className="section-title mb-4">{data?.sectionTitle1 || "Nearest Kitchens"}</h2>

          <Slider ref={sliderRef} {...desktopSettings}>
            {kitchenChunks.map((chunk, slideIdx) => (
              <div key={slideIdx}>
                <div className="row justify-content-center">
                  {chunk.map((kitchen, idx) => (
                    <div
                      key={idx}
                      className="col-10 col-sm-6 col-md-4 col-lg-3 col-xlg-3 mb-4 d-flex justify-content-center"
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
          <h2 className="section-title mb-4">{data?.sectionTitle1 || "Nearest Kitchens"}</h2>

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
            <button
              className="pagination-btn"
              onClick={() => mobileSliderRef.current?.slickPrev()}
            >
              &#8249;
            </button>
            <span className="page-number">
              {mobileSlide + 1} / {mobileChunks.length}
            </span>
            <button
              className="pagination-btn"
              onClick={() => mobileSliderRef.current?.slickNext()}
            >
              &#8250;
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default NearestKitchenSeller;
