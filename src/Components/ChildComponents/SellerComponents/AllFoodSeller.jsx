import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useOutletContext, useParams, useSearchParams } from "react-router-dom";
import { GetFoodBySellerAPI, GetSellerAPI } from "../../../API/SellerAPI";
import { GetRecipeByUserAPI } from "../../../API/RecipeAPI";
import { getFoodDiaryByUserAPI } from "../../../API/FoodDiaryAPI";
import FoodPresentationCard from "../../Common/Cards/FoodPresentation/FoodPresentationCard";
import RecipeCard from "../../Common/Cards/RecipeCard/RecipeCard";
import DiaryCard from "../../Common/Cards/DiaryCard/DiaryCard";
import SliderProvider from "../../Common/Slider/SliderProvider";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css"; // Import the skeleton CSS
import NearestSeller from "./NearestSeller";
import Slider from "react-slick";

const AllFoodSeller = () => {
  const { userId } = useOutletContext();
  const [loading, setLoading] = useState(true);
  let { id } = useParams();
  const [searchParams] = useSearchParams();
  const userId1 = searchParams.get("userId");

  useEffect(() => {
    GetSellerAPI(id);
  }, [id]);

  const sellerData = useSelector((state) => state.seller.getSellerInfo);
  const userIdbySeller = sellerData[0]?.userData[0]?._id;
  const foodList = useSelector((state) => state.seller.getSellerFoodData);



  let coordinates = {
    lat: sellerData[0]?.pointLocation?.coordinates[1] || 0,
    lon: sellerData[0]?.pointLocation?.coordinates[0] || 0
  }

  useEffect(() => {
    setLoading(true);
    const UserId = userIdbySeller || userId1 || userId;
    setTimeout(() => {
      if (UserId !== undefined) {
        GetFoodBySellerAPI(id);
        GetRecipeByUserAPI(UserId);
        getFoodDiaryByUserAPI(UserId);
      }

      //       coordinates={
      //         lat:sellerData?.pointLocation?.coordinates[1]||0,
      //         lon:sellerData?.pointLocation?.coordinates[0]||0
      //       }
      setLoading(false);
    }, 3000);
  }, [id, userId, userId1, userIdbySeller]);

  const recipeList = useSelector((state) => state.recipe.getAllRecipeByUserData);
  const diaryList = useSelector((state) => state.foodDiary.getAllFoodDiaryByUserData);

  const settings = {
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 4,
    responsive: [
     
      {
        breakpoint: 1300,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: false,
          dots: false,
        },
      },
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 2,
          infinite: true,
          dots: false,
        },
      },
      {
        breakpoint: 900,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: false,
          centerMode:true,
          dots: false,
        },
      },

     
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
          infinite: false
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: false
        },
      },
    ],
  };
  // const settings1 = {
  //   infinite: true,
  //   speed: 500,
  //   autoplay: true,
  //   autoplaySpeed: 5000,
  //   slidesToShow: 4,
  //   slidesToScroll:4
  // };
  
  const ar = [1, 2]
  return (
    <div>
      {/* Skeleton loader for foodList */}
      {loading ? (
        <Skeleton count={5} height={200} />
      ) : (
        foodList &&
        foodList.map((item) => (
          <SliderProvider
            key={item._id || item.categoryName}
            food={item?.items}
            sliderSettings={settings}
            title={item?._id?.foodType || item?.categoryName}
          />
        ))
      )}

    

      {/* Skeleton loader for recipes */}
      <div>
        <h1>{recipeList?.length>0 ? "All Recipe": ""}</h1>
        <div className="row all-recipe-container">
          {loading
            ? Array(4)
              .fill(0)
              .map((_, index) => <Skeleton key={index} height={300} width={200} />)
            : recipeList?.map((item, index) => (
              <RecipeCard key={index} data={item} index={index} />
            ))}
        </div>
      </div>

      {/* Skeleton loader for food diary */}
      <div>
        {!loading && diaryList?.length > 0 && <h1 className="text-center text-md-start">All Diary</h1>}

        <div className="row">
          {loading
            ? Array(4)
              .fill(0)
              .map((_, index) => <Skeleton key={index} height={200} width={300} />)
            : diaryList?.map((item, index) => (
              <DiaryCard key={index} data={item} index={index} />
            ))}
        </div>
      </div>



      {/* all nearest seller */}
      <div>
        <NearestSeller coordinates={coordinates} />
      </div>

    </div>
  );
};

export default AllFoodSeller;
