import React, { useEffect, useState } from 'react';
import './Tips.css';
import useIsMobile from '../../customHooks/useIsMobile';
import { BaseURL } from '../../Helper/config';
import axios from 'axios';

const Tips = ({ data }) => {
  const isMobile = useIsMobile();
  const [cards, setCards] = useState([]);

  useEffect(() => {
    const postBody = data?.sectionCategories1?.map((x) => x.value) || [];
    if (postBody?.length === 0) return;

    axios
      .post(`${BaseURL}/get-how-do-we-do-home-page`, { _id: postBody })
      .then((res) => {
        const fetchedCards = res.data?.data?.map((item, index) => ({
          id: index + 1,
          title: item.title || "Untitled",
          image: item.beforeImage?.[0]?.large?.imageUrl || "", // fallback image logic
          hasPlayButton: false
          
          // !!item.videoURL.length>0,
        })) || [];
        setCards(fetchedCards);
      })
      .catch((err) => console.error("Failed to fetch kitchen data:", err));
  }, [data]);

  const getCardWidth = (id) => {
    const widths = {
      1: '100%', 2: '100%', 3: '100%', 4: '100%', 5: '476px',
      6: '100%', 7: '100%', 8: '100%',
    };
    return widths[id] || '100%';
  };

  const getCardHeight = (id) => {
    const heights = {
      1: '239px', 2: '174px', 3: '159px', 4: '254px', 5: '418px',
      6: '281px', 7: '281px', 8: '281px'
    };
    const responsiveHeights = {
      1: '77px', 2: '56px', 3: '50px', 4: '82px', 5: '141px',
      6: '90px', 7: '90px', 8: '90px'
    };
    return isMobile ? responsiveHeights[id] : heights[id] || '200px';
  };

  const renderCard = (card) => (
    <div
      className="tip-card"
      key={card.id}
      style={{
        overflow: "hidden",
        height: getCardHeight(card.id),
        width: getCardWidth(card.id),
      }}
    >
      <div className="card-image-wrapper">
        <img src={card.image} alt={card.title} className="card-image" />
        {card.hasPlayButton && <div className="play-button">▶</div>}
      </div>
      <p className="card-title">{card.title}</p>
    </div>
  );

  return (
    <div className="Tips tips-tricks-containerx">
      <div className="section-header">
        <h2 className="section-title">{data?.sectionTitle1}</h2>
        <div className="see-more-container">
          <span className="see-more-text">See More</span>
          <button className="nav-button prev"><span>‹</span></button>
          <button className="nav-button next"><span>›</span></button>
        </div>
      </div>

      <div className="cards-gridx row g-2">
        {/* Column 1: Two cards */}
        <div className='col-3'>
          <div className="row gap-2">
            {cards[0] && <div className="col-12">{renderCard(cards[0])}</div>}
            {cards[1] && <div className="col-12">{renderCard(cards[1])}</div>}
          </div>
        </div>

        {/* Column 2: Two cards */}
        <div className='col-4'>
          <div className="row gap-2">
            {cards[2] && <div className="col-12">{renderCard(cards[2])}</div>}
            {cards[3] && <div className="col-12">{renderCard(cards[3])}</div>}
          </div>
        </div>

        {/* Column 3: One card */}
        <div className='col-5'>
          <div className="row">
            {cards[4] && <div className="col-12">{renderCard(cards[4])}</div>}
          </div>
        </div>

        {/* Bottom Row: Three cards */}
        <div className='col-12'>
          <div className="row g-2">
            {cards[5] && <div className="col-3">{renderCard(cards[5])}</div>}
            {cards[6] && <div className="col-4">{renderCard(cards[6])}</div>}
            {cards[7] && <div className="col-5">{renderCard(cards[7])}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Tips;
