import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";

const RecipeFeature = () => {
  return (
    <div className='RecipeFeature'>
      <Container>
        <Row>
          <Col>
            <div>
              <div className='titleIntro'>
                <h3>Recipes</h3>
                <p>Our Feature All Recipes</p>
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col lg={8}>
            <div className='leftSide'>
              <div className='wrapper'>
                <div className='img-file'>
                  <img
                    src='https://ichef.bbci.co.uk/food/ic/food_16x9_832/recipes/one-pan_mushroom_and_04696_16x9.jpg'
                    alt=''
                  />
                </div>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className='rightSide'>
              <div className='wrapper'>
                <div>
                  <div>
                    <div className='preparation'>
                      <p>Preparation Time</p>
                      <h6>Less than 30 mins</h6>
                    </div>
                    <div className='preparation mt-2'>
                      <p>Cooking Time</p>
                      <h6>30 mins to 1 hour</h6>
                    </div>
                    <div className='preparation mt-2'>
                      <p>Serves</p>
                      <h6>Serves 4</h6>
                    </div>
                    <div className='preparation mt-2'>
                      <p>Dietary</p>
                      <span className='badge-btn'>Yes</span>
                    </div>
                  </div>
                  <div className='profile-info'>
                    <div className='d-flex gap-3 align-items-center'>
                      <div className='img-file'>
                        <img
                          src='https://ichef.bbci.co.uk/food/ic/food_1x1_72/chefs/rupy_aujla_1x1.jpg'
                          alt=''
                        />
                      </div>
                      <div className='text-file'>
                        <div className='info'>
                          <p>
                            <strong>By</strong>{" "}
                            <Link to={"/"}>Dr Rupy Aujla</Link>
                          </p>
                          <p>From Thrifty Cooking in the Doctor’s Kitchen</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
        <br />
        <hr />
      </Container>

      <div className='allRecipeCatItem'>
        <Container>
          <Row>
            {[...Array(4)].map((item, index) => (
              <Col xs={3} key={index}>
                <div className='single-recipe-cat-items'>
                  <div className='imgFile'>
                    <img
                      className='img-fluid'
                      src='https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/creamy_mushroom_pasta_41818_16x9.jpg'
                      alt=''
                    />
                  </div>
                  <div className='textFile'>
                    <Link to={"/"}>
                      <h3>Veggie mulligatawny soup</h3>
                    </Link>
                    <p>By Alex Johan</p>
                    <p className='pe-4'>
                      <strong>From:</strong> Thrifty Cooking in the Doctor’s
                      Kitchen
                    </p>
                    <div className='img-overlay'>
                      <img
                        src='https://ichef.bbci.co.uk/food/ic/food_1x1_72/chefs/rupy_aujla_1x1.jpg'
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

      {/* Recipe Category All Items */}
      <div className='allRecipeCatItem'>
        <Container>
          <Row>
            <Col>
              <h2 className='header-intro'>All-time favorite dishes</h2>
            </Col>
          </Row>
          <Row>
            {[...Array(16)].map((item, index) => (
              <Col xs={3} key={index}>
                <div className='single-recipe-cat-items'>
                  <div className='imgFile'>
                    <img
                      className='img-fluid'
                      src='https://ichef.bbci.co.uk/food/ic/food_16x9_448/recipes/creamy_mushroom_pasta_41818_16x9.jpg'
                      alt=''
                    />
                  </div>
                  <div className='textFile'>
                    <Link to={"/"}>
                      <h3>Apple crumble</h3>
                    </Link>
                    <p>14 recipes</p>
                    <span>DISH</span>
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
