import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { GetFoodBySellerAPI } from "../../../API/SellerAPI";
import FoodPresentationCard from "../../Common/Cards/FoodPresentation/FoodPresentationCard";
import { useParams } from "react-router-dom";
import { FOOD_TYPE } from "../../../Helper/Food_TYPE";
import SkeletonLoader from "../../../skelton/SkeletonLoader";
 // Adjust the import path as needed

const CateringFoodSeller = () => {
  let { id } = useParams();
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchData = async () => {
      await GetFoodBySellerAPI(id);
      setLoading(false);
    };
    fetchData();
  }, [id]);

  const foodList = useSelector((state) => state.seller.getSellerFoodData);

  if (loading) {
    return (
      <div className="row">
        <SkeletonLoader count={4} height={200} width={300} />
      </div>
    );
  }

  const cateringFoods = foodList?.filter((i) => i._id?.foodType === FOOD_TYPE.catering);

  return (
    <div className="row">
      {cateringFoods?.length <= 0 ? (
        <h1>No food found</h1>
      ) : (
        cateringFoods.map((item, index) => (
          <FoodPresentationCard key={index} data={item} index={index} />
        ))
      )}
    </div>
  );
};

export default CateringFoodSeller;
