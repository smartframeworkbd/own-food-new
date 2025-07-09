import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Star } from "lucide-react";
import "./Review.css";

const reviews = Array(4).fill({
  title: "Delicious Food",
  text: `"I've been consistently impressed with the quality of service provided by this website. They have exceeded my expectations and delivered exceptional results. Highly recommended!"`,
  rating: 4
});

const Reviews = () => {
  return (
    <div className="reviews-section">
      <Container>
        <h3 className="text-center mb-4">Reviews</h3>
        <div className="filter-buttons text-center mb-4">
          <Button className="active-btn me-2 ">Recent</Button>
          <Button variant="outline-primary">Top</Button>
        </div>
        <Row className="reviews-row">
          {reviews.map((review, index) => (
            <Col key={index} sm={12} md={6} lg={3} className="mb-4 mt-4">
              <div className={`review-card ${index === 0 ? "active" : ""}`}>
                <div className="img-placeholder mb-2" />
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      fill={i < review.rating ? "#F58634" : "none"}
                      color="#F58634"
                      size={16}
                    />
                  ))}
                </div>
                <h5 className="title">{review.title}</h5>
                <p className="text">{review.text}</p>
                <div className="icons">
                  <div className="icon-box" />
                  <div className="icon-box" />
                  <div className="icon-box" />
                </div>
              </div>
            </Col>
          ))}
        </Row>
        <div className="pagination text-center mt-3">
          <Button variant="light" className="nav-btn">‹</Button>
          <span className="page-number">1/10</span>
          <Button variant="light" className="nav-btn">›</Button>
        </div>
      </Container>
    </div>
  );
};

export default Reviews;
