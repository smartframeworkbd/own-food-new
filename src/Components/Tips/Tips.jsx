import React from 'react';
import './Tips.css';
import image1 from '../../assets/tips1.png';
import image2 from '../../assets/tips2.png';
import image3 from '../../assets/tips3.png';
import image4 from '../../assets/tips1.png';
import image5 from '../../assets/tips5.png';
import image6 from '../../assets/tips6.png';
import image7 from '../../assets/tips7.png';
import image8 from '../../assets/tips8.png';
import useIsMobile from '../../customHooks/useIsMobile';

const Tips = () => {
  const isMobile = useIsMobile();

  const cardData = [
    { id: 1, title: "Food tile goes here", image: image1, size: "medium", hasPlayButton: false },
    { id: 2, title: "Food tile goes here", image: image2, size: "medium", hasPlayButton: false },
    { id: 3, title: "Food tile goes here", image: image3, size: "large", hasPlayButton: false },
    { id: 4, title: "Food tile goes here", image: image4, size: "medium", hasPlayButton: false },
    { id: 5, title: "Testy Burger", image: image5, size: "medium", hasPlayButton: true },
    { id: 6, title: "Food tile goes here", image: image6, size: "medium", hasPlayButton: false },
    { id: 7, title: "Food tile goes here", image: image7, size: "medium", hasPlayButton: false },
    { id: 8, title: "Food tile goes here", image: image8, size: "medium", hasPlayButton: true },
  ];
  const renderCard = (card) => (
    <div
      className="tip-card"
      key={card.id}
      style={{
        // width:"100%",
        // height:"100%"
        overflow: "hidden",
        height: getCardHeight(card.id),
        width: getCardWidth(card.id)
      }}
    >
      <div className="card-image-wrapper">
        <img src={card.image} alt={card.title} className="card-image" />
        {card.hasPlayButton && <div className="play-button">▶</div>}
      </div>
      <p className="card-title">{card.title}</p>
    </div>
  );

  // Helper functions for card dimensions
  const getCardWidth = (id) => {
    const widths = {

      1: '100%',
      2: '100%',
      3: '100%',
      4: '100%',
      5: '476px',

      6: '100%',
      7: '100%',
      8: '100%',


    };
    return widths[id] || '100%';
  };

  const getCardHeight = (id) => {
    const heights = {
      1: '239px',
      2: '174px',
      3: '159px',
      4: '254px',
      5: '418px',

      6: '281px',
      7: '281px',
      8: '281px'
    };
    const responsiveHeights = {
      1: '77px',
      2: '56px',
      3: '50px',
      4: '82px',
      5: '141px',

      6: '90px',
      7: '90px',
      8: '90px'
    }
    return isMobile
      ? responsiveHeights[id] : heights[id] || '200px';
  };

  return (
    <div className="Tips tips-tricks-containerx">
      <div className="section-header">
        <h2 className="section-title">Tips & Tricks</h2>
        <div className="see-more-container">
          <span className="see-more-text">See More</span>
          <button className="nav-button prev"><span>‹</span></button>
          <button className="nav-button next"><span>›</span></button>
        </div>
      </div>

      <div className="cards-gridx row g-2 ">
        {/* First col-4 block with 2 cards */}

        {/* col-3 */}
        <div className='col-3 col-md-3 col-lg-3 col-xl-3 col-xxl-3 '>
          <div className="row gap-2">
            <div className="col-12">
              {cardData[0] && renderCard(cardData[0])}
            </div>
            <div className="col-12">
              {cardData[1] && renderCard(cardData[1])}
            </div>
          </div>
        </div>

        {/* Second col-4 block with 2 cards */}
        {/* col-4 */}
        <div className='col-4 col-md-4 col-lg-4 col-xl-4 col-xxl-4  '>
          <div className="row gap-2">
            <div className="col-12">
              {cardData[2] && renderCard(cardData[2])}
            </div>
            <div className="col-12">
              {cardData[3] && renderCard(cardData[3])}
            </div>
          </div>
        </div>

        {/* Third col-4 block with 1 card */}
        {/* col-5 */}
        <div className=' gap-2 col-md-5 col-lg-5 col-xl-5 col-xxl-5 col-5 '>
          <div className="row">
            <div className="col-12">
              {cardData[4] && renderCard(cardData[4])}
            </div>
          </div>
        </div>

        {/* Bottom row with 3 cards */}
        <div className='col-12'>
          <div className="row g-2">
            {/* col-3 */}
            <div className="  col-md-3 col-lg-3 col-xl-3 col-xxl-3 col-3 ">
              {cardData[5] && renderCard(cardData[5])}
            </div>
            {/* col-3 */}
            <div className=" col-md-3 col-lg-3 col-xl-3 col-xxl-3  col-4">
              {cardData[6] && renderCard(cardData[6])}
            </div>
            {/* col-6 */} 
            <div className=" col-md-6 col-lg-6 col-xl-6 col-xxl-6  col-5">
              {cardData[7] && renderCard(cardData[7])}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
