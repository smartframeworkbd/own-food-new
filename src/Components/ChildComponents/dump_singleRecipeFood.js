import React, { useEffect } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Link, useParams } from "react-router-dom";
import { FaCheckSquare, FaHotjar, FaVideo } from "react-icons/fa";
import Lightbox from "react-image-lightbox";
import { useState } from "react";
import { useSelector } from "react-redux";
import { GetSingleRecipe } from "../../API/RecipeAPI";

import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const SingleRecipeFood = () => {
  const recipe = useSelector((state) => state.recipe.getSingleRecipe);
  const { id } = useParams();
  useEffect(() => {
    GetSingleRecipe(id);
  }, [id]);
  const [isOpen, setIsOpen] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div className="SingleRecipeFood">
      <Container>
        <Row>
          <Col lg={8}>
            <div className="wrapper-left">
              <div className="title">
                <h2>{recipe[0]?.recipeName}</h2>
              </div>
              <div className="img-file">
                {recipe && (
                  <img
                    className="img-fluid"
                    src={recipe[0]?.recipeReadyfoodImage[0]?.extraLarge?.imageUrl}
                    alt=""
                  />
                )}
                <div className="bg-primary video-recipe">
                  <button className="btn btn-primary" onClick={handleShow}>
                    Watch Video
                  </button>
                </div>

                <Modal show={show} onHide={handleClose}>
                  <Modal.Body className="recipe-video-dialog">
                    <iframe
                      width="460"
                      height="415"
                      src="https://www.youtube.com/embed/qVUQzQp4IRk?si=xBabyH1wjZXqy4P9"
                      title="YouTube video player"
                      frameborder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                      allowfullscreen
                    ></iframe>
                  </Modal.Body>
                </Modal>
              </div>
            </div>
          </Col>
          <Col lg={4}>
            <div className="wrapper-right">
              <div className="preparation">
                <div className="items d-flex align-items-center justify-content-between">
                  <p>Preparation time</p>

                  <h5>{recipe[0]?.preparationTime}</h5>
                </div>

                <div className="items d-flex align-items-center justify-content-between">
                  <p>Cooking time</p>

                  <h5>{recipe[0]?.cookingTime}</h5>
                </div>
                <div className="items d-flex align-items-center justify-content-between">
                  <p>Serves</p>

                  <h5>{recipe[0]?.serves}</h5>
                </div>

                <div className="profile-info-block">
                  <div className="d-flex gap-3 align-items-center">
                    <div className="img-file">
                      <img
                        src="https://ichef.bbci.co.uk/food/ic/food_1x1_72/chefs/rupy_aujla_1x1.jpg"
                        alt=""
                      />
                    </div>
                    <div className="text-file">
                      <div className="info">
                        <p>
                          <strong className="text-light">By</strong>{" "}
                          <a href="/" className="text-warning">
                            Dr Rupy Aujla
                          </a>
                        </p>
                        <p className="text-light">Dhaka Kitchen</p>
                      </div>
                    </div>
                  </div>
                </div>
                <small className="text-light">Posted Date 5/10/23</small>
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
          <Col lg={8} sm={12} xs={12}>
            <div className="card bg-light">
              <div className="card-body">
                <h4 className="text-center">Protein Details</h4>

                <hr />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolor
                  dolores corporis maiores nam! Facere, voluptate quasi iusto
                  dignissimos quos aut odio, blanditiis molestias, explicabo ad
                  ullam. Et optio eum est.
                </p>
              </div>
            </div>
          </Col>
          <Col lg={4}></Col>
        </Row>
        <br />
        <Row>
          <Col xs={6}>
            <div className="protin">
              <p>{recipe[0]?.recipeDescription}</p>
              <br />
              <p>{recipe[0]?.proteinDetails}</p>
            </div>
          </Col>
        </Row>
        <br />
        <Row>
          <Col>
            <div className="ingredientsBody">
              <div className="ingredients">
                <h2>Ingredients</h2>
                <div>
                  <ul>
                    <li>
                      <FaCheckSquare />
                      <span>2 tbsp olive oil</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>
                        400g/14oz sausages, ideally spicy sausages such as
                        Toulouse or Spanish-style pork
                      </span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>1 onion, thinly sliced</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>400g chopped tomatoes with herbs</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>160g/5¾oz Puy lentils</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>1 chicken or pork stock cube</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>75ml/2½fl oz oz red wine, or extra stock</span>
                    </li>
                  </ul>
                </div>
              </div>
              <div className="ingredients">
                <h2>Shopping List</h2>
                <div>
                  <ul>
                    <li>
                      <FaCheckSquare />
                      <span>2 tbsp olive oil</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>
                        400g/14oz sausages, ideally spicy sausages such as
                        Toulouse or Spanish-style pork
                      </span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>1 onion, thinly sliced</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>400g chopped tomatoes with herbs</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>160g/5¾oz Puy lentils</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>1 chicken or pork stock cube</span>
                    </li>
                    <li>
                      <FaCheckSquare />
                      <span>75ml/2½fl oz oz red wine, or extra stock</span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <hr />
          </Col>
        </Row>
        <br />
        <Row>
          <Col lg={7} xs={12} sm={12}>
            <div className="method">
              <h2>Method</h2>
              <ul>
                {recipe[0]?.recipeSteps.map((item, index) => (
                  <li key={index}>
                    <div className="inner">
                      <div className="textFile">
                        <p>{item.stepName}</p>
                      </div>
                      <div className="imgFile">
                        {isOpen && (
                          <Lightbox
                            mainSrc={item.Photo[0].large.imageUrl}
                            onCloseRequest={() => {
                              setIsOpen(false);
                            }}
                          />
                        )}
                        <img
                          className="img-fluid"
                          onClick={() => {
                            setIsOpen(true);
                          }}
                          src={item?.Photo[0]?.medium?.imageUrl}
                          alt=""
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </Col>
          <Col xs={12} lg={5} sm={12} className="recipeTips">
            <div className="textBody">
              <h2>
                <FaHotjar />
                <span>Recipe Tips</span>
              </h2>
              <div className="text">
                <p>
                  Add half a teaspoon of crushed chilli flakes or a bay leaf if
                  you have them in your spice collection.
                </p>
                <br />
                <p>
                  In March 2022 this recipe was costed at an average of £3.82
                  (using standard sausages) when checking prices at four UK
                  supermarkets. This recipe is designed to be made in
                  conjunction with a low-cost store-cupboard, for more details
                  click here to see how our budget recipes were costed.
                </p>
                <br />
                <p>
                  In March 2022 this recipe was costed at an average of £3.82
                  (using standard sausages) when checking prices at four UK
                  supermarkets. This recipe is designed to be made in
                  conjunction with a low-cost store-cupboard, for more details
                  click here to see how our budget recipes were costed.
                </p>
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
