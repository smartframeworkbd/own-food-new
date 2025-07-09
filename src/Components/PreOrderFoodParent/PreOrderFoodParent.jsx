import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "./PreOrderFoodParent.css";
import FoodCardPreorder from "../FoodCardPreorder/FoodCardPreorder";
import axios from "axios";
import { useSelector } from "react-redux";
import { BaseURL } from "../../Helper/config";
import FoodCard from "../FoodCard/FoodCard";
// import FoodCard from "../FoodCard/FoodCard";

const PreOrderFoodParent = ({data}) => {
  console.log(data)
  const sliderRef = React.useRef();
    const [foodItems, setFoodItems] = useState([]);
      const [loading, setLoading] = useState(false);
      const { coordinate, error } = useSelector((state) => state.location);
  
  
      const { sectionCategories1, sectionFoodTypeCategories1, sectionTitle1, sectionCardColor } = data;
  
      const getFood = async () => {
          if (!coordinate || !coordinate.lat || !coordinate.lon) {
              console.error("Coordinates are missing or invalid.");
              return; // Prevent calling the API if coordinates are missing or invalid
          }
  
          setLoading(true);
  
          const payload = {
              categoryID: [
                  ...sectionCategories1.map((cat) => cat.value),
              ],
              foodType: [
                  ...sectionFoodTypeCategories1.map((type) => type.value),
              ],
          };
  // console.log(payload)
          try {
              const res = await axios.post(
                  BaseURL + `/filter?lat=${coordinate.lat}&lon=${coordinate.lon}`,
                  payload
              );
              setFoodItems(res?.data?.data);
          } catch (err) {
              console.error("Error fetching food data:", err);
          } finally {
              setLoading(false);
          }
      };
  
      useEffect(() => {
         
          if (coordinate && coordinate.lat !== null && coordinate.lon !== null) {
              getFood();
          }
      }, [coordinate, data]); 

  // const foodData = [
  //   {
  //     title: "Hot Pizza",
  //     description: "Tasty and crispy pizza",
  //     buttonText: "Order Now",
  //     image: "/images/pizza.png",
  //     bgColor: "#FFF4E3",
  //     btnClass: "btn-warning"
  //   },
  //   {
  //     title: "Burger Combo",
  //     description: "Delicious and juicy burger",
  //     buttonText: "Get Deal",
  //     image: "/images/burger.png",
  //     bgColor: "#E3F7FF",
  //     btnClass: "btn-info"
  //   },
  //   {
  //     title: "Cheese Burst",
  //     description: "Extra cheesy delight",
  //     buttonText: "Try Now",
  //     image: "/images/cheese.png",
  //     bgColor: "#FDEDED",
  //     btnClass: "btn-danger"
  //   },
  //   {
  //     title: "Veg Delight",
  //     description: "Healthy and tasty",
  //     buttonText: "Order Now",
  //     image: "/images/veg.png",
  //     bgColor: "#E5FFE5",
  //     btnClass: "btn-success"
  //   },
  //   {
  //     title: "Fries Pack",
  //     description: "Crispy golden fries",
  //     buttonText: "Get It",
  //     image: "/images/fries.png",
  //     bgColor: "#FFFBEA",
  //     btnClass: "btn-warning"
  //   }
  // ];

  const settings = {
    dots: false,
    infinite: foodItems.length > 5,
    slidesToShow: 4.2,
    slidesToScroll: 1,
    arrows: false,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1.3,
        },
      },
    ],
  };

  return (
    <div className=" offer-foods-wrapper py-3">
         <div className="row mb-3">
        {/* Title & Dropdown (Row 1) */}
        <div className="col-12 d-flex justify-content-between align-items-center mb-2">
          <h4 className="fw-bold m-0">Offer Foods</h4>
          <select className="form-select food-type-dropdown w-auto">
            <option>Food Type</option>
          </select>
        </div>

        {/* Tabs & See More/Nav (Row 2) */}
        <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-2">
          {/* Tabs */}
          <div className="d-flex tab-buttons">
            <div className="border rounded">
              <button className="tab-btn active">Offer</button>
              <button className="tab-btn">Latest</button>
              <button className="tab-btn">Top</button>
            </div>
          </div>

          {/* See More + Nav Buttons */}
          <div className="d-flex align-items-center gap-2 ms-auto">
            <a href="#" className="see-more-link">See More</a>
            <button className="nav-btn" onClick={() => sliderRef.current.slickPrev()}>{'<'}</button>
            <button className="nav-btn" onClick={() => sliderRef.current.slickNext()}>{'>'}</button>
          </div>
        </div>
      </div>
{
  console.log(foodItems)
}
      <Slider {...settings} ref={sliderRef} className="custom-slider">
        {foodItems.map((food, index) => (
          <div className="slider-item" key={index}>
            {
             console.log(food.foodType) 
            }
            {
              food.foodType=="PREORDER" &&  <FoodCardPreorder {...food} />
            }
            {
              food.foodType=="INSTANT" && <FoodCard
              {...food}
              />
            }
           
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default PreOrderFoodParent;
