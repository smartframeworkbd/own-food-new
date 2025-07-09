import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { FaCalendarAlt, FaUserAlt } from "react-icons/fa";
import { Link } from "react-router-dom";

const FoodsDairy = () => {
  return (
    <div className='singleDairy'>
      <Container>
        <Row>
          <Col xs={9}>
            <div className='leftWrapper'>
              <div>
                <div className='imgFile'>
                  <img
                    src='https://img.freepik.com/free-photo/top-view-pakistani-meal-arrangement_23-2148825100.jpg?w=996&t=st=1681198915~exp=1681199515~hmac=5c2ad2c30e157759cb68b7ceb70a5462df7d636d068c81f0ace7389fbaf15d08'
                    alt=''
                  />
                </div>
                <div className='admin'>
                  <div className='inner'>
                    <FaUserAlt /> Admin
                  </div>
                  <div className='inner'>
                    <FaCalendarAlt /> Tuesday, April 11, 2023
                  </div>
                </div>
              </div>
              <br />
              <div>
                <h2>
                  Lorem ipsum, dolor sit amet consectetur adipisicing elit.
                  Autem, exercitationem.
                </h2>
              </div>
              <div className='inner-text'>
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  facere quia aperiam sapiente eveniet quibusdam at magnam modi,
                  porro, impedit in commodi, ex alias optio nostrum vitae enim
                  voluptatum illum? Aspernatur a expedita quas, facilis libero
                  quod quo qui inventore, quia corporis consequuntur voluptatum
                  fugiat et iste maiores dolores possimus.
                </p>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  facere quia aperiam sapiente eveniet quibusdam at magnam modi,
                  porro, impedit in commodi, ex alias optio nostrum vitae enim
                  voluptatum illum? Aspernatur a expedita quas, facilis libero
                  quod quo qui inventore, quia corporis consequuntur voluptatum
                  fugiat et iste maiores dolores possimus.
                </p>
                <br />
                <p>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Id
                  facere quia aperiam sapiente eveniet quibusdam at magnam modi,
                  porro, impedit in commodi, ex alias optio nostrum vitae enim
                  voluptatum illum? Aspernatur a expedita quas, facilis libero
                  quod quo qui inventore, quia corporis consequuntur voluptatum
                  fugiat et iste maiores dolores possimus.
                </p>
              </div>
            </div>
          </Col>
          <Col xs={3}>
            <div className='rightWrapper'>
              <div className='searchBar'>
                <input type='text' />
                <button>Search</button>
              </div>
              <div className='recent-post'>
                {[...Array(4)].map((item, index) => (
                  <div className='items' key={index}>
                    <div className='img-file'>
                      <img
                        src='https://img.freepik.com/free-photo/baked-chicken-wings-asian-style-tomatoes-sauce-plate_2829-10657.jpg?w=996&t=st=1681201135~exp=1681201735~hmac=539014364312b0f678f0f0508b6172aee001185bc10e635a96e31f0a3600d179'
                        alt=''
                      />
                    </div>
                    <div className='text-file'>
                      <Link to={"/"}>
                        <h2>
                          Lorem ipsum, dolor sit amet consectetur adipisicing
                          elit.
                        </h2>
                      </Link>

                      <div className='date'>
                        <FaCalendarAlt /> April 11, 2023
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default FoodsDairy;
