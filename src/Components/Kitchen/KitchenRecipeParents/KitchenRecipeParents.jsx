import React, { useEffect, useState } from 'react'
import Slider from 'react-slick';
import RecipeCard from '../../RecipeCard/RecipeCard';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { GetSellerAPI } from '../../../API/SellerAPI';
import axios from 'axios';
import { BaseURL } from '../../../Helper/config';

const KitchenRecipeParents = () => {
    let { id } = useParams();
    const [recipeData, setRecipeData] = useState([])
    const sliderRef = React.useRef();
    const settings = {
        dots: false,
        infinite: recipeData.length > 4,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        arrows: false,
        responsive: [
            {
                breakpoint: 1200,
                settings: {
                    slidesToShow: 2.5,
                },
            },
            {
                breakpoint: 992,
                settings: {
                    slidesToShow: 2,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1.5,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    slidesToShow: 1,
                },
            },
        ],
    };

    const sellerData = useSelector((state) => state.seller.getSellerInfo);

    const fetchRecipeData = async (id) => {
        const response = await axios.get(
            `${BaseURL}/get-recipe-by-single-seller/${id}/5`
        );
        console.log(response, "recipe")
        if (response.data.status === "Success") {
            setRecipeData(response?.data?.data);
        }
    }
    useEffect(() => {
      
        const fetchData = async () => {
            try {
                await GetSellerAPI(id); 
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [id]);

    useEffect(() => {
        if (!sellerData[0]?.sellerID) return;
        fetchRecipeData(sellerData[0].sellerID);
    }, [sellerData])

    return (
        <div className="recipe-slider-wrapper py-3">
            <div className="row mb-3">
                {/* Title & Dropdown (Row 1) */}
                {/* <div className="col-12 d-flex justify-content-between align-items-center mb-2">
                    <h4 className="fw-bold m-0">Offer Foods</h4>
                    <select className="form-select food-type-dropdown w-auto">
                        <option>Food Type</option>
                    </select>
                </div> */}

                {/* Tabs & See More/Nav (Row 2) */}
                <div className="col-12 d-flex justify-content-between align-items-center flex-wrap gap-2">
                    {/* Tabs */}
                    {/* <div className="d-flex tab-buttons">
                        <div className="border rounded">
                            <button className="tab-btn active">Offer</button>
                            <button className="tab-btn">Latest</button>
                            <button className="tab-btn">Top</button>
                        </div>
                    </div> */}

                    {/* See More + Nav Buttons */}
                    {/* <div className="d-flex align-items-center gap-2 ms-auto">
                        <a href="#" className="see-more-link">See More</a>
                        <button className="nav-btn" onClick={() => sliderRef.current.slickPrev()}>{'<'}</button>
                        <button className="nav-btn" onClick={() => sliderRef.current.slickNext()}>{'>'}</button>
                    </div> */}
                </div>
            </div>

            <Slider {...settings} ref={sliderRef} className="custom-slider">
                {recipeData.map((item, index) => (
                    <div className="slider-item" key={index}>
                        <RecipeCard {...item} />
                    </div>
                ))}
            </Slider>
        </div>
    )
}

export default KitchenRecipeParents