import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const FoodCatGallerySkeleton = () => {
  return (
    <Container className="FoodCatGallery section">
      <Row className="g-3">
        {[1, 2, 3, 4].map((_, index) => (
          <Col key={index} xl={3} lg={6} md={6} sm={6}>
            <div className="card">
              <div className="card-header sf_top_card">
                <h3 className="mt-1 sf_top_name">
                  <Skeleton width={120} height={24} />
                </h3>
              </div>
              <div className="row mt-1 g-2 card_product">
                {[1, 2, 3, 4].map((_, idx) => (
                  <Col key={idx} md={6} className="card_navigate">
                    <div className="img_animation">
                      <Skeleton height={150} />
                    </div>
                    <p className="text-center" style={{ fontWeight: "bold" }}>
                      <Skeleton width={100} />
                    </p>
                  </Col>
                ))}
              </div>
              <div className="col-md-12">
                <Skeleton width={100} height={24} />
              </div>
            </div>
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default FoodCatGallerySkeleton;
