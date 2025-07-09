import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const OrderFoodCatSkeleton = () => {
  const skeletonItems = [1, 2, 3, 4]; // Number of skeleton items to show

  return (
    <section className="OrderFoodCat">
      <Container>
        <Row className="g-2">
          <Col xl={8} lg={8} md={12} sm={12}>
            <div className="shadow__inner p-2">
              <header className="py-2 header_text">
                <div>
                  <Skeleton width={200} height={24} />
                  <Skeleton width={150} height={20} />
                </div>
              </header>

              <div className="card-body show-hide-content">
                <div className="row g-2">
                  <div className="col-md-12">
                    <Skeleton height={300} />
                    <Skeleton height={150} />
                  </div>
                </div>
              </div>
            </div>
          </Col>

          <Col xl={4} lg={4} md={12} sm={12}>
            <div className="shadow__inner p-2">
              <header className="py-2">
                <div className="header_text">
                  <Skeleton width={200} height={24} />
                  <Skeleton width={150} height={20} />
                </div>
              </header>
              <div className="card-body searchform show-hide-content">
                <Row className="g-1">
                  {skeletonItems.map((_, index) => (
                    <Col key={index} className="col-6">
                      <div className="sf_product-card shadow">
                        <div className="sf_product-media w-100">
                          <div className="sf_product-label">
                            <Skeleton width={50} height={20} />
                          </div>
                          <button className="sf_product-wish wish">
                            <Skeleton width={30} height={30} circle />
                          </button>
                          <Skeleton height={150} />
                          <div className="sf_product-widget">
                            <Skeleton width={30} height={30} circle />
                          </div>
                        </div>
                        <div className="sf_product-content">
                          <Skeleton width={100} height={20} />
                          <Skeleton width={80} height={20} />
                          <Skeleton width={120} height={20} />
                          <Skeleton width={100} height={20} />
                        </div>
                      </div>
                    </Col>
                  ))}
                  <Col className="col-12 mt-3">
                    <Skeleton width={100} height={20} />
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default OrderFoodCatSkeleton;
