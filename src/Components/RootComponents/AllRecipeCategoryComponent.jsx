import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import AllRecipeCategory from "../ChildComponents/AllRecipeCategory";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import { GetAllRecipe, GetRecipeCategory } from "../../API/RecipeAPI";
import { useSelector } from "react-redux";
import { useState } from "react";
import { BaseURL } from "../../Helper/config";
import labels from "../../translationData/menu.json";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";
const AllRecipeCategoryComponent = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const [featureRecipe, setFeatureRecipe] = useState([]);

  useEffect(() => {
    GetRecipeCategory(true, 100);

    fetch(`${BaseURL}/get-recipe`)
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "Success") {
          setFeatureRecipe(data.data);
        }
        // setFeatureRecipe(data.data)
      });
  }, []);

  const GetAllRecipeCategoryData = useSelector(
    (state) => state.recipe.getAllRecipeCategoryData
  );

  return (
    <>
      {/* <Header /> */}
      <div className="Space__For__Header"></div>
      <AllRecipeCategory recipeData={featureRecipe} />

      {/* Recipe Category All Items */}
      <div className="RecipeFeature p-0 mt-5">
        <div className="allRecipeCatItem">
          <Container>
            <Row>
              <Col xs={8}>
                <h6 style={{fontSize : "23px"}} className="header-intro">{getTranslation(
                              "allRecipe",
                              currentLanguage,
                              labels
                            )}</h6>
                {/* <p className="des">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Aliquid debitis sequi soluta repellendus totam harum dolorem
                  laudantium dignissimos placeat explicabo!
                </p> */}
              </Col>
            </Row>
            <Row>
              {GetAllRecipeCategoryData.map((item, index) => (
                <Col xl={3} lg={4} md={12} sm={12} xs={12} key={index}>
                  <div className="single-recipe-cat-items">
                    <div className="imgFile">
                      {
                        // && item?.categoryImage.length
                        item && item.categoryImage.length > 0 ? (
                          <img
                            className="img-fluid"
                            src={
                              (() => {
                                const imageUrl = item.categoryImage[0]
                                if (imageUrl) {
                                  // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                  const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                      '?width=335&height=255&quality=100';
                                  
                                  return newImageUrl;
                                }
                                
                                return '';
                              })()         
                              // item.categoryImage[0]
                            
                            }
                            loading="lazy"
                            alt=""
                          />
                        ) : (
                          // <img
                          //   className='img-fluid'
                          //   src={item?.categoryImage[0]?.medium?.imageUrl}
                          //   alt=''
                          // />
                          <img
                            className="img-fluid"
                            src="/Assets/Img/Logo.png"
                            alt=""
                          />
                        )
                      }
                    </div>
                    <div className="textFile">
                      <Link to={`/SingleRecipeCategoryAllFood/${item?._id}`}>
                        <h3>{item?.categoryName}</h3>
                      </Link>
                      <p>{item?.recipeCount} recipes</p>
                      {/* <span>DISH</span> */}
                    </div>
                  </div>
                </Col>
              ))}
            </Row>
          </Container>
        </div>
      </div>

      {/* <Footer /> */}
    </>
  );
};

export default AllRecipeCategoryComponent;
