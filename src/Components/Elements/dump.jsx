import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeFeature = ({ recipeData }) => {
  return (
    <div className="RecipeFeature">
      {recipeData &&
        recipeData
          .filter((item, index) => item.status === true)
          .map((item, index) => {
            if (index === 0) {
              return (
                <Container key={index} className="col-12">
                  <div className="inner-bg">
                    <Row>
                      <Col>
                        <div>
                          <div className="titleIntro">
                            <h3>Featured Recipes</h3>
                          </div>
                        </div>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg={8}>
                        <div className="leftSide">
                          <div className="wrapper">
                            <div className="img-file">
                              <img
                                src={
                                  item.recipeReadyFoodImage &&
                                  item?.recipeReadyfoodImage[0]?.extraLarge
                                    ?.imageUrl
                                }
                                alt=""
                              />
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col lg={4} md={12}>
                        <div className="rightSide">
                          <div className="wrapper">
                            <div className="inner">
                              <div className="recipe-title">
                                <Link to={`/SingleRecipeFood/${item._id}`}>
                                  <h2>{item.recipeName}</h2>
                                </Link>
                                <div
                                  className="text-file"
                                  dangerouslySetInnerHTML={{
                                    __html: item.recipeDescription,
                                  }}
                                />
                              </div>
                              <div className="profile-info">
                                <div className="d-flex gap-3 align-items-center">
                                  <div className="img-file">
                                    <img
                                      src={
                                        item?.seller[0]?.sellerProfilePhoto[0]
                                          .small?.imageUrl.length !== 0
                                          ? item?.seller[0]
                                              ?.sellerProfilePhoto[0].small
                                              ?.imageUrl
                                          : "/Assets/Img/Recipe/Logo.png"
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="text-file">
                                    <div className="info">
                                      <p className="chefName">
                                        <strong>By</strong>{" "}
                                        <Link to={"/"}>
                                          {item?.user[0]?.userFullName}
                                        </Link>
                                      </p>
                                      <p>
                                        {`From ${item?.seller[0]?.kitchenName}`}
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </Container>
              );
            } else {
              return (
                <div className="col-xl-3 col-lg-4 col-md-12">
                  <div className="allRecipeCatItem">
                    <Container key={index}>
                      <div className="single-recipe-cat-items">
                        <div className="imgFile">
                          <img
                            className="img-fluid"
                            src={
                              item.recipeReadyFoodImage &&
                              item.recipeReadyfoodImage[0]?.extraLarge?.imageUrl
                            }
                            alt=""
                          />
                        </div>
                        <div className="textFile">
                          <Link to={`/SingleRecipeFood/${item._id}`}>
                            <h3>{item.recipeName}</h3>
                          </Link>
                          <p> {item?.user[0]?.userFullName}</p>
                          <p className="mt-1">
                            <strong>From:</strong>{" "}
                            {`${item?.seller[0]?.kitchenName}`}
                          </p>
                          <div className="img-overlay">
                            <img
                              src={
                                item.seller[0] &&
                                item?.seller[0]?.sellerProfilePhoto[0]?.small
                                  ?.imageUrl
                              }
                              alt=""
                            />
                          </div>
                        </div>
                      </div>
                    </Container>
                  </div>
                </div>
              );
            }
          })}
    </div>
  );
};

export default RecipeFeature;
