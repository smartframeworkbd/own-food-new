import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import axios from 'axios';
import Tips from '../../Tips/Tips';
import { BaseURL } from '../../../Helper/config';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';

const getYoutubeThumbnail = (url) => {
  const match = url.match(
    /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|embed|shorts|watch)\??v?=?)|youtu\.be\/)([A-Za-z0-9_-]{11})/
  );
  return match ? `https://img.youtube.com/vi/${match[1]}/hqdefault.jpg` : '';
};

const SellerTipsShowCaseComponent = () => {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const sellerData = useSelector((state) => state.seller.getSellerInfo);
  const sellerId = sellerData?.[0]?.userData[0]._id || '';
console.log("Seller ID:", sellerId);
  useEffect(() => {
    const fetchTips = async () => {
      if (!sellerId) return;

      try {
        const res = await axios.get(`${BaseURL}/get-how-do-we-do-by-user/${sellerId}`);
        const data = res.data?.data[0]?.HowDoWeDoData || [];


        // console.log("Fetched Tips Data:", data);
        const formattedCards = data.map((item, index) => ({
          id: index + 1,
          title: item.title || "Untitled",
          image:  item.videoURL.length>0?getYoutubeThumbnail(item.videoURL): item?.afterImage[0]?.extraLarge?.imageUrl
            ,
          hasPlayButton: item.videoURL.length>0,
        }));

        setCards(formattedCards);
      } catch (err) {
        setError("Failed to load seller tips.");
      } finally {
        setLoading(false);
      }
    };

    fetchTips();
  }, [sellerId]);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-10 text-gray-600">
        <AiOutlineLoading3Quarters className="animate-spin text-3xl mr-2" />
        Loading seller tips...
      </div>
    );
  }

  // if (error) {
  //   return <div className="text-red-600 text-center py-6">{error}</div>;
  // }

  // if (cards.length === 0) {
  //   return <div className="text-center text-gray-500 py-6">No tips available yet.</div>;
  // }

 if(cards.length>0) return (
    <div>
      <Tips title="Seller Tips" cards={cards} />
    </div>
  );
};

export default SellerTipsShowCaseComponent;
