import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { BaseURL } from "../../Helper/config";
import Slider from "react-slick";
const HowWeDo = () => {
  const [data, setData] = useState([]);
  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  useEffect(() => {
    axios.get(BaseURL + "/get-how-do-we-do").then((res) => {
      setData(res.data.data);
    });
  }, []);

  const datas = [
    {
      image_before: "/Assets/Img/howWeDo_1.jpeg",
      image_after: "/Assets/Img/howWeDo_2.jpeg",
    },
    {
      image_before: " /Assets/Img/howWeDo_3.jpeg",
      image_after: "/Assets/Img/howWeDo_4.jpeg",
    },
    {
      image_before: "/Assets/Img/howWeDo_5.jpeg",
      image_after: "/Assets/Img/howWeDo_6.jpeg",
    },
  ];

  return (
    <Container className="HowWeDo ">
      <div class="title-area text-center pb-2">
        <span class="sub-title"></span>
        <h2 class="sec-title">
          <span className="sf_init_title"> How We</span>{" "}
          <span class=" sf_text-theme"> Do It</span>
        </h2>
      </div>
      <Row className="container-fluid mt-2">
        <Slider {...settings}>
          {data.slice(0, 3).map((item, index) => (
            <Col lg={4} key={index}>
              <div className="card_details">
                <Card.Title className="d-flex justify-content-center mt-2 mb-2 card_title">
                  {item?.sectionTitle1}
                </Card.Title>
                <Card.Body className="Card">
                  <div className="before_class">
                    <img
                      src={item?.beforeImage[0]?.medium?.imageUrl}
                      alt=""
                      className="img-fluid card-image"
                    />
                    <div className="d-flex justify-content-center span-class-before">
                      <span className="before">
                        <p>Before</p>{" "}
                      </span>
                    </div>
                  </div>
                  <div className="after_class">
                    <img
                      src={item?.afterImage[0]?.medium?.imageUrl}
                      alt=""
                      className="img-fluid card-image"
                    />
                    <div className="span-class-after">
                      <span className="after ">
                        {" "}
                        <p>After</p>{" "}
                      </span>
                    </div>
                  </div>
                </Card.Body>
              </div>
            </Col>
          ))}
        </Slider>
      </Row>
    </Container>
  );
};

export default HowWeDo;
