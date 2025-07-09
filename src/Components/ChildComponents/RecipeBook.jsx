import React from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import { Link } from "react-router-dom";
const RecipeBook = () => {
  return (
    <Container className=' RecipeBook d-flex justify-content-center '>
      <div className='top__gallery'>
        <Row>
          <Col lg={6} className='rightSide'>
            <div className='rightSide_inner'>
              <div className='d-flex '>
                <div className='rightBar '>
                  <div className='imgFile mb-2'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_4.jpeg"}
                      alt=''
                    />
                  </div>
                  <div className='imgFile  mb-2'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_2.jpeg"}
                      alt=''
                    />
                  </div>
                  <div className='imgFile  mb-2'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_3.jpeg"}
                      alt=''
                    />
                  </div>
                  <div className='imgFile  '>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_4.jpeg"}
                      alt=''
                    />
                  </div>
                </div>
                <div className='leftBar ps-2'>
                  <div className='big_imgFile'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_1.jpeg"}
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col lg={6} className='rightSide'>
            <div className='rightSide_inner'>
              <div className='d-flex '>
                <div className='leftBar pe-2'>
                  <div className='big_imgFile'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_1.jpeg"}
                      alt=''
                    />
                  </div>
                </div>
                <div className='rightBar '>
                  <div className='imgFile mb-2'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_2.jpeg"}
                      alt=''
                    />
                  </div>
                  <div className='imgFile  mb-2'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_3.jpeg"}
                      alt=''
                    />
                  </div>
                  <div className='imgFile  mb-2'>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_4.jpeg"}
                      alt=''
                    />
                  </div>
                  <div className='imgFile  '>
                    <img
                      className='img-fluid'
                      src={"/Assets/Img/RecipeBook/RecipeBook_2.jpeg"}
                      alt=''
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    </Container>
  );
};

export default RecipeBook;
