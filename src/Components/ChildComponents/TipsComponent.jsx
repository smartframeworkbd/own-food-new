import React, { useEffect, useState } from 'react'
import { BaseURL } from '../../Helper/config';
import Tips from '../Tips/Tips';
import axios from 'axios';

const TipsComponent = ({ data }) => {
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
  return (
    <div>
        <Tips cards={cards} title={data?.sectionTitle1}/>
    </div>
  )
}

export default TipsComponent