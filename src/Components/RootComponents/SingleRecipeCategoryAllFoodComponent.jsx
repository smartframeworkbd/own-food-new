import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import AllRecipeCategory from "../ChildComponents/AllRecipeCategory";
import Footer from "../Common/Footer";
import Header from "../Common/Header";
import {
  GetAllRecipe,
  GetRecipeBySingleCategoryAPI,
} from "../../API/RecipeAPI";
import { useSelector } from "react-redux";

const SingleRecipeCategoryAllFoodComponent = () => {
  const { id } = useParams();
  useEffect(() => {
    GetRecipeBySingleCategoryAPI(id);
  }, [id]);
  const AllRecipeByCategory = useSelector(
    (state) => state.recipe.getAllRecipeByCategoryData
  );
  return (
    <>
      {/* <Header /> */}
      <div className='Space__For__Header'></div>
      <AllRecipeCategory recipeData={AllRecipeByCategory} />

      {/* Recipe Category All Items */}
      <div className='RecipeFeature p-0'>
        <div className='allRecipeCatItem'>
          <Container>
            <Row>
              <Col>
                <h2 className='header-intro'>View All Single Recipe Items.</h2>
              </Col>
            </Row>
            <Row>
              {AllRecipeByCategory.map((item, index) => (
                <Col xs={12} lg={3} sm={12} key={index}>
                  <div className='single-recipe-cat-items '>
                    <div className='imgFile'>
                      {
                        // && item?.categoryImage.length
                        item && item.recipeReadyFoodImage.length > 0 ? (
                          <img
                            className='img-fluid'
                            src={

                              (() => {
                                const imageUrl = item?.recipeReadyFoodImage[0]?.extraLarge?.imageUrl
                                if (imageUrl) {
                                  // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                  const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                      '?width=335&height=255&quality=100';
                                  
                                  return newImageUrl;
                                }
                                
                                return '';
                              })()         
                              // item?.recipeReadyFoodImage[0]?.extraLarge?.imageUrl
                            }
                            loading='lazy'
                            alt=''
                          />
                        ) : (
                          // <img
                          //   className='img-fluid'
                          //   src={item?.categoryImage[0]?.medium?.imageUrl}
                          //   alt=''
                          // />
                          <img
                            className='img-fluid'
                            src='/Assets/Img/Logo.png'
                            alt=''
                          />
                        )
                      }
                    </div>
                    <div className='textFile'>
                      <Link to={`/SingleRecipeFood/${item?._id}`}>
                        <h3>{item?.recipeName}</h3>
                      </Link>
                      <p>By {item?.user[0]?.userFullName}</p>
                      <p className='mt-1'>
                        {`From ${item?.seller[0]?.kitchenName}`}
                      </p>
                      <div className='img-overlay'>
                        <img
                          src={
                            item?.seller &&
                            item?.seller.length >= 0 &&
                            item?.seller[0]?.sellerProfilePhoto &&
                            item?.seller[0]?.sellerProfilePhoto[0]?.small
                              ?.imageUrl
                          }
                          alt=''
                        />
                      </div>
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

export default SingleRecipeCategoryAllFoodComponent;
