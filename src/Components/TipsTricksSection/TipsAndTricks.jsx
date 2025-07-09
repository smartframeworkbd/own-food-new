import React from 'react';
import './TipsAndTricks.css';
import image1 from '../../assets/tips1.png';
import image2 from '../../assets/tips2.png';
import image3 from '../../assets/tips3.png';
import image4 from '../../assets/tips1.png';
import image5 from '../../assets/tips5.png';
import image6 from '../../assets/tips6.png';
import image7 from '../../assets/tips7.png';
import image8 from '../../assets/tips8.png';

const TipsTricksComponent = () => {
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

  return (
    <div className="tips-tricks-container">
      <div className="section-header">
        <h2 className="section-title">Tips & Tricks</h2>
        <div className="see-more-container">
          <span className="see-more-text">See More</span>
          <button className="nav-button prev">
            <span>‹</span>
          </button>
          <button className="nav-button next">
            <span>›</span>
          </button>
        </div>
      </div>

      <div className="cards-grid ">
        {cardData.map((card) => (
          <div
            key={card.id}
            className={`food-card ${card.id === 3 ? 'double-row' : ''}`}
          >
            <img src={card.image} alt={card.title} className="card-image" />
            <div className="card-overlay">
              {card.hasPlayButton && (
                <button className="play-button-center">
                  <div className="play-icon"></div>
                </button>
              )}
              <div className="card-bottom">
                <h3 className="card-title">{card.title}</h3>
                <div className="card-controls">
                  <div className="card-icon">
                    <span style={{ fontSize: '12px' }}>📷</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TipsTricksComponent;
