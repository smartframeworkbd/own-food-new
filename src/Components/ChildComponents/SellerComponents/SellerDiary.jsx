import React, { useEffect } from "react";
import { getFoodDiaryByUserAPI } from "../../../API/FoodDiaryAPI";
import { useSelector } from "react-redux";
import DiaryCard from "../../Common/Cards/DiaryCard/DiaryCard";
import { getUserDetails } from "../../../Helper/SessionHelper";
import { useSearchParams } from "react-router-dom";

export default function SellerDiary() {
  const [searchParams] = useSearchParams();
  const userId = searchParams.get('userId');
  useEffect(() => {
    getFoodDiaryByUserAPI(userId);
  }, []);
  const diaryList = useSelector(
    (state) => state.foodDiary.getAllFoodDiaryByUserData
  );
  return (
    <div className='row'>
      {diaryList.map((item, index) => (
        <DiaryCard data={item}  index={index} />
      ))}
    </div>
  );
}
