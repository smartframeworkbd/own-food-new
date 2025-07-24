import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { FaPlay } from 'react-icons/fa';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Tips from '../../Tips/Tips';

const getYoutubeThumbnail = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed|shorts|watch)\??v?=?)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
};

const SellerTipsComponent = () => {
  const sellerData = useSelector((state) => state.seller.getSellerInfo);
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (sellerData.length > 0) {
      const mappedCards =
        sellerData[0]?.dishesMedia?.map((item, index) => {
          const isVideo = item.type === 'video';
          const imageUrl = isVideo
            ? getYoutubeThumbnail(item.videoUrl)
            : item.imageUrl;

          return {
            id: index + 1,
            title: item.title || 'Untitled',
            image: imageUrl || '',
            hasPlayButton: isVideo,
          };
        }) || [];

      setCards(mappedCards);
      setLoading(false);
    }
  }, [sellerData]);

  return (
    <div className="p-4">
  

      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {[...Array(3)].map((_, index) => (
            <Skeleton key={index} height={200} />
          ))}
        </div>
      ) : cards.length > 0 ? (
      <Tips title={"Show Case"} cards={cards} />
      ) : (
        <p className="text-gray-500">No tips available at the moment.</p>
      )}
    </div>
  );
};

export default SellerTipsComponent;
