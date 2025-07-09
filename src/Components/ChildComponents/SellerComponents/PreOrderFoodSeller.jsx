import React, { useEffect, useState } from "react";
import { GetFoodBySellerAPI } from "../../../API/SellerAPI";
import { useSelector } from "react-redux";
import FoodPresentationCard from "../../Common/Cards/FoodPresentation/FoodPresentationCard";
import { useParams } from "react-router-dom";
import { FOOD_TYPE } from "../../../Helper/Food_TYPE";
import SkeletonLoader from "../../../skelton/SkeletonLoader";

const PreOrderFoodSeller = () => {
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
  return (
    <div className="row">
      {foodList &&
        foodList
          .filter((category) => category?._id?.foodType === FOOD_TYPE.preorder)
          .map((category) => (
            category.items.map((item, index) => (
              <FoodPresentationCard key={item._id} data={item} index={index} />
            ))
          ))}
    </div>
  );
};

export default PreOrderFoodSeller;
