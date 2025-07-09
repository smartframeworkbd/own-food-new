import React, { useContext, useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaCheckSquare, FaHotjar, FaVideo } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GetSingleRecipe } from "../../API/RecipeAPI";
import labels from "../../translationData/menu.json";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import moment from "moment";

const SingleRecipeFood = () => {
  const recipe = useSelector((state) => state.recipe.getSingleRecipe);
  const { id } = useParams();
  useEffect(() => {
    GetSingleRecipe(id);
  }, [id]);
  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState(false);
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <div className='SingleRecipeFood mt-5'>
      <Container>
        <Row>
          <Col lg={8}>
            <div className='wrapper-left'>
              <div className='title'>
                <h2>{recipe[0]?.recipeName}</h2>
              </div>
              <div className='img-file'>
                {recipe && (
                  <img
                    className='img-fluid'
                    src={
                      
                      // recipe[0]?.recipeReadyFoodImage[0]?.large?.imageUrl
                    
                      (() => {
                        const imageUrl = recipe[0]?.recipeReadyFoodImage[0]?.extraLarge?.imageUrl
                        if (imageUrl) {
                          // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                          const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                              '?width=890&height=430&quality=100';
                          
                          return newImageUrl;
                        }
                        
                        return '';
                      })() 
                    }
                    alt=''
                  />
                )}
                <div className='bg-primary video-recipe'>
                  <button className='btn btn-primary' onClick={handleShow}>
                    {getTranslation(
                      "watchVide",
                      currentLanguage,
                      labels
                    )}
                  </button>
                </div>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Body className='recipe-video-dialog'>
                    <iframe
                      width='460'
                      height='415'
                      src='https://www.youtube.com/embed/qVUQzQp4IRk?si=xBabyH1wjZXqy4P9'
                      title='YouTube video player'
                      frameborder='0'
                      allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share'
                      allowfullscreen
                    ></iframe>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className='wrapper-right'>
              <div className='preparation'>
                <div className='items d-flex align-items-center justify-content-between'>
                  <p> {getTranslation(
                    "prepTime",
                    currentLanguage,
                    labels
                  )}</p>

                  <h5>{recipe[0]?.preparationTime}</h5>
                </div>

                <div className='items d-flex align-items-center justify-content-between'>
                  <p>{getTranslation(
                    "cookTime",
                    currentLanguage,
                    labels
                  )}</p>

                  <h5>{recipe[0]?.cookingTime}</h5>
                </div>
                <div className='items d-flex align-items-center justify-content-between'>
                  <p>{getTranslation(
                    "servess",
                    currentLanguage,
                    labels
                  )}</p>

                  <h5>{recipe[0]?.serves}</h5>
                </div>

                <div className='profile-info-block'>
                  <div className='d-flex gap-3 align-items-center'>
                    <div className='img-file'>
                      <img
                        src={
                          recipe.length > 0 &&
                          recipe[0]?.seller &&
                          recipe[0]?.seller[0]?.sellerProfilePhoto[0]?.small
                            ?.imageUrl
                        }
                        alt=''
                      />
                    </div>
                    <div className='text-file'>
                      <div className='info'>
                        <p>
                          <strong className='text-light'>By</strong>{" "}
                          <a href='/' className='text-warning'>
                            {recipe[0] &&
                              recipe[0]?.user &&
                              recipe[0]?.user[0]?.userFullName}
                          </a>
                        </p>
                        <p className='text-light'>
                          {recipe[0]?.seller &&
                            recipe[0]?.seller[0]?.kitchenName}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='mt-5'>
                  <small className='text-light'>
                    <span className='fw-bold'>{"Posted: "}</span>{" "}
                    {` ${moment(recipe[0]?.createdDate).format("MMM Do YY")}`}
                  </small>
                </div>
              </div>
              {/* <div className='profile-info'>
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
                        <strong>By</strong> <Link to={"/"}>Dr Rupy Aujla</Link>
                      </p>
                      <p>From Thrifty Cooking in the Doctor’s Kitchen</p>
                    </div>
                  </div>
                </div>
              </div> */}
            </div>
          </Col>
        </Row>
        <br />

        <Row>
          <Col lg={12} sm={12} xs={12}>
            <div className='card protein-details'>
              <div className='card-body'>
                <h4 className='text-center'>{getTranslation(
                  "ProtienDetails",
                  currentLanguage,
                  labels
                )}</h4>

                <hr className='customhr' />
                <p> {recipe[0]?.proteinDetails}</p>
              </div>
            </div>
          </Col>
          {/* <Col lg={4}></Col> */}
        </Row>
        <br />
        <Row>
          <Col xs={6}>
            {/* <div
              className="protin"
              dangerouslySetInnerHTML={{ __html: recipe[0]?.recipeDescription }}
            /> */}
            {/* <p>

              </p>

            </div> */}
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <div className='ingredientsBody row p-2'>
              <div className='ingredients card protein-details col-6'>
                <h2>{getTranslation(
                  "inngredients",
                  currentLanguage,
                  labels
                )}</h2>
                <div>
                  <ul>
                    {recipe[0] &&
                      recipe[0]?.ingredients.map((item, index) => (
                        <li key={index}>
                          <FaCheckSquare />
                          <span>{`${item?.Qty} ${item?.qtyUnit} ${item?.ingredientsName}`}</span>
                        </li>
                      ))}
                  </ul>
                </div>
              </div>
              <div className='ingredients card protein-details col'>
                <h2>{getTranslation(
                  "shoppingLisst",
                  currentLanguage,
                  labels
                )}</h2>
                <div>
                  <ul>
                    <li>
                      <FaCheckSquare />
                      <span
                        dangerouslySetInnerHTML={{
                          __html: recipe[0] && recipe[0]?.shoppingList,
                        }}
                      />
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr style={{ marginTop: "50px" }} />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={7} xs={12} sm={12}>
            <div className='method'>
              <h4>{getTranslation(
                "methodes",
                currentLanguage,
                labels
              )}</h4>
              <ul>
                {recipe &&
                  recipe[0]?.recipeSteps?.length > 0 &&
                  recipe[0]?.recipeSteps.map((item, index) => (
                    <li key={index}>
                      
                      <div className='inner'>
                        <div className='textFile'>
                          <p>{item?.stepName}</p>
                        </div>
                        <div className='imgFile'>
                          {isOpen && (
                            <Lightbox
                              mainSrc={item.Photo[0].large.imageUrl}
                              onCloseRequest={() => {
                                setIsOpen(false);
                              }}
                            />
                          )}
                          <img
                            className='img-fluid'
                            onClick={() => {
                              setIsOpen(true);
                            }}
                            src={
                              // item?.Photo[0]?.medium?.imageUrl
                              (() => {
                                const imageUrl =     
                                item?.Photo[0]?.[0]?.extraLarge
                                  ?.imageUrl|| item?.Photo[0]?.extraLarge
                                  ?.imageUrl

                                if (imageUrl) {
                                  // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                                  const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                                      '?width=335&height=255&quality=100';
                                  
                                  return newImageUrl;
                                }
                                
                                return '';
                              })() 
                            }
                            alt=''
                          />
                        </div>
                      </div>
                    </li>
                  ))}
              </ul>
            </div>
          </Col>
          <Col xs={12} lg={5} sm={12} className='recipeTips'>
            <div className='textBody'>
              <h2>
                <FaHotjar />
                <span>{getTranslation(
                  "recipeeTips",
                  currentLanguage,
                  labels
                )}</span>
              </h2>
              <div className='text'>
                <p>{recipe[0] && recipe[0]?.recipeTips}</p>
                <br />
              </div>
            </div>
          </Col>
        </Row>
        <br />
      </Container>
    </div>
  );
};

export default SingleRecipeFood;
