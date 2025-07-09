import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './ChefCard.css';
import chefImage from '../../assets/chef.png'; // replace with actual image path

const ChefCard = () => {
  return (
    <Container className="my-3">
      <Row className="justify-content-center">
        <Col xs={10} sm={6} md={4} lg={3}>
          <Card className="chef-card">
            <Card.Img variant="top" src={chefImage} className="chef-img" />
            <Card.Body className="chef-body">
              <Card.Title className="chef-name">Mr Maruf Hasan</Card.Title>
              <Card.Text className="chef-desc">
                Best of: Vort & Birany <br />
                Origine: Indian
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default ChefCard;
