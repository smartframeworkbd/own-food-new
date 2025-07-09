import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { Link, Navigate, useNavigate } from "react-router-dom";

const FoodNameCategory = ({ data }) => {
  const navigate = useNavigate();
  const categorybutton = (item) => {
    navigate(`/Category/${item._id}`);
  };
  return (
    <Container className="FoodNameCategory">
      <Row className="gap-4 ">
        <Col className=" shadow-lg">
          <Row className="">
            <Col className="bg p-2 text-white text-center">
              <h2>
                <span className="sf_init_title">
                  {" "}
                  {data.sectionTitle1.split(" ").slice(0, -1).join(" ")}{" "}
                </span>{" "}
                <span class="sf_text-theme">
                  {" "}
                  {data.sectionTitle1.split(" ").pop()}
                </span>
              </h2>
            </Col>

            <Row className="rowFix">
              {data?.sectionCategories1.map((item, index) => (
                <Col xl={2} lg={4} md={4} xs={6} key={index}>
                  {/* <Link to={'/Category/64db179cb36b5845f9014c5f'}> */}
                  <div className="item">
                    <Button
                      className={`item${
                        Math.floor(Math.random() * 10) + 1
                      } p-4`}
                      onClick={() => {
                        categorybutton(item);
                      }}
                    >
                      {item.label}
                    </Button>
                  </div>

                  {/* </Link> */}
                </Col>
              ))}
            </Row>
          </Row>
        </Col>
      </Row>
    </Container>
  );
};

export default FoodNameCategory;
