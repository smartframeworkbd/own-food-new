import moment from "moment";
import React, { useContext } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import getTranslation from "../../Helper/getTranslationUtility";
import { LanguageContext } from "../../Context/LanguageContext";
import labels from "../../translationData/menu.json";
const RecipeFeature = ({ recipeData }) => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  const getImageUrl = (item) => {
    // if (!item || !item.foodImage || item.foodImage.length === 0) {
    //   return dummyImages[Math.floor(Math.random() * 3)];
    // }
    const imageUrl = item?.recipeReadyFoodImage && item.recipeReadyFoodImage[0].extraLarge.imageUrl
    if (imageUrl) {
      // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
      const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                          '?width=650&height=450&quality=100';
      
                          
      return newImageUrl;  
      
    }
    return ''
  };
  return (
    <div className="RecipeFeature mt-3 mt-lg-5">
      <Container>
        <div className="inner-bg">
          <Row>
            <Col>
              <div>
                <div className="titleIntro">
                  <h5 className="text-white">{getTranslation(
                              "fetauredRecipes",
                              currentLanguage,
                              labels
                            )}</h5>
                </div>
              </div>
            </Col>
          </Row>
          <Row>
            <Col lg={7}>
              <div className="leftSide">
                <div className="wrapper">
                  <div className="img-file">

                   
                    <img
                      src={
                        getImageUrl(recipeData[0])
                        // recipeData[0]?.recipeReadyFoodImage &&
                        // recipeData[0]?.recipeReadyfoodImage[0]?.extraLarge?.imageUrl
                      }
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </Col>
            <Col lg={5}>
              <div className="rightSide">
                <div className="wrapper">
                  <div className="inner">
                    <div className="recipe-title">
                      <Link to={`/SingleRecipeFood/${recipeData[0]?._id}`}>
                        <h2>{recipeData[0]?.recipeName}</h2>
                      </Link>
                      {/* <div
                        className="text-file"
                        dangerouslySetInnerHTML={{
                          __html: recipeData[0]?.recipeDescription,
                        }}
                      ></div> */}
                    </div>
                    <div className="SingleRecipeFood">
                      <div className="wrapper-right">
                        <div className="preparation">
                          <div className="items d-flex align-items-center justify-content-between">
                            <p className="text-light fs-6">{getTranslation(
                              "prepTime",
                              currentLanguage,
                              labels
                            )} : </p>

                            <h6 className="text-white">{recipeData[0]?.preparationTime}</h6>
                          </div>

                          <div className="items d-flex align-items-center justify-content-between">
                            <p className="text-light fs-6">{getTranslation(
                              "cookTime",
                              currentLanguage,
                              labels
                            )} : </p>

                            <h6 className="text-white">{recipeData[0]?.cookingTime}</h6>
                          </div>
                          <div className="items d-flex align-items-center justify-content-between">
                            <p className="text-light fs-6">{getTranslation(
                              "servess",
                              currentLanguage,
                              labels
                            )} : </p>

                            <h6 className="text-white">{recipeData[0]?.serves}</h6>
                          </div>

                          <div className="profile-info-block">
                            <div className="d-flex gap-3 align-items-center">
                              <div className="img-file">
                                <img
                                  src={
                                    recipeData.length > 0 &&
                                    recipeData[0]?.seller &&
                                    recipeData[0]?.seller[0]
                                      ?.sellerProfilePhoto[0]?.small?.imageUrl
                                  }
                                  alt=""
                                />
                              </div>
                              <div className="text-file">
                                <div className="info">
                                  <p>
                                    <strong className="text-light">By</strong>{" "}
                                    {recipeData[0] &&
                                      recipeData[0]?.user &&
                                      recipeData[0]?.user[0]?.userFullName}
                                  </p>

                                  <p className="text-warning">
                                    <Link
                                      to={`/SellerProfile/${recipeData[0]?.user[0]?._id}`}
                                    >
                                      {recipeData[0]?.seller &&
                                        recipeData[0]?.seller[0]?.kitchenName}
                                    </Link>
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <div className="mt-4">
                            <small className="text-light">
                              <span className="fw-bold">{"Posted: "}</span>{" "}
                              {` ${moment(recipeData[0]?.createdDate).format(
                                "MMM Do YY"
                              )}`}
                            </small>
                          </div>
                        </div>
                      </div>
                    </div>
                    {/* <div className="profile-info">
                      <div className="d-flex gap-3 align-items-center">
                        <div className="img-file">
                          <img
                            src={
                              recipeData[0]?.seller[0]?.sellerProfilePhoto[0]
                                .small?.imageUrl.length !== 0
                                ? recipeData[0]?.seller[0]
                                    ?.sellerProfilePhoto[0].small?.imageUrl
                                : "/Assets/Img/Recipe/Logo.png"
                            }
                            alt=""
                          />
                        </div>
                        <div className="text-file">
                          <div className="info">
                            <p className="chefName">
                              <strong>By</strong>{" "}
                              <Link
                                to={`/SellerProfile/${recipeData[0]?.seller[0]?._id}`}
                              >
                                {recipeData[0]?.user[0]?.userFullName}
                              </Link>
                            </p>
                            <p>
                              From {`${recipeData[0]?.seller[0]?.kitchenName}`}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div> */}
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </Container>

      <div className="allRecipeCatItem">
        <Container>
          <Row>
            {recipeData
              .filter((item, index) => item.status === true)
              .slice(1, 9)
              .map((item, index) => (
                <Col xl={3} lg={4} md={12} sm={12} xs={12} key={index}>
                  <div className="single-recipe-cat-items">
                    <div className="imgFile">
                      <img
                        className="img-fluid"
                        // src="https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/creamy_mushroom_pasta_41818_16x9.jpg"
                        src={

                          getImageUrl(item)
                          // item?.recipeReadyFoodImage &&
                          // item?.recipeReadyfoodImage[0]?.extraLarge?.imageUrl
                        }
                        alt=""
                      />
                    </div>
                    <div className="textFile">
                      <Link to={`/SingleRecipeFood/${item._id}`}>
                        <h3>{item?.recipeName}</h3>
                      </Link>
                      <p>{item?.user[0]?.userFullName}</p>

                      <Link
                        to={`/SellerProfile/${recipeData[0]?.seller[0]?._id}`}
                      >
                        <p className="mt-1">
                          <strong>From:</strong>{" "}
                          {`${item?.seller[0]?.kitchenName}`}
                        </p>
                      </Link>
                      <div className="img-overlay">
                        <img
                          // src="https://ichef.bbci.co.uk/food/ic/food_1x1_72/chefs/rupy_aujla_1x1.jpg"
                          src={
                            item?.seller[0]?.sellerProfilePhoto[0].small
                              ?.imageUrl.length !== 0
                              ? item?.seller[0]?.sellerProfilePhoto[0].small
                                  ?.imageUrl
                              : "/Assets/Img/Recipe/Logo.png"
                          }
                          alt=""
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
  );
};

export default RecipeFeature;
