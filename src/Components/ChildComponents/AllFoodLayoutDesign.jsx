import axios from "axios";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { BaseURL } from "../../Helper/config";
import SliderProvider from "../Common/Slider/SliderProvider";
import FoodPresentationWithSeller from "../Common/Cards/FoodPresentationWithSeller/FoodPresentationWithSeller";
import FoodPresentationWithSellerFlat from "../Common/Cards/FoodPresentationWithSeller/FoodPresentationWithSellerFlat";

const AllFoodLayoutDesign = ({ data }) => {
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

    const settings = {
        infinite: true,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 4,
    };


    return (
        <div className="AllFoodLayoutDesign">
       
            <div className="sf_text-theme container ">
                {
                    sectionTitle1 && <span style={{ fontFamily: 'var(--style-font)', color: '#1b6dc1', fontSize: '28px', fontWeight: '700' }}>{sectionTitle1}</span>
                }
            </div>


            {
                foodItems?.length > 0 && <div 
                // style={{ marginLeft: "60px", }}
                >
                    {
                        <SliderProvider
                            key="slider"
                            sliderSettings={settings}
                            food={foodItems}
                            cardComponent={
                                sectionCardColor === "WHITE"
                                    ? FoodPresentationWithSellerFlat
                                    : sectionCardColor === "MULTICOLOR"
                                        ? FoodPresentationWithSeller
                                        : FoodPresentationWithSeller
                                // sectionCardColor == "WHITE" &&
                                // FoodPresentationWithSellerFlat
                                // sectionCardColor=="MULTICOLOR" && 
                                // FoodPresentationWithSeller

                            }
                        />
                    }
                </div>
            }
        </div>
    )
}

export default AllFoodLayoutDesign