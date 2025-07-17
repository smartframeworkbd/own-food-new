import React from 'react';
import { Card, Container, Row, Col } from 'react-bootstrap';
import './ChefCard.css';
import chefImage from '../../assets/chef.png'; // replace with actual image path
import { Link } from 'react-router-dom';

const ChefCard = ({data}) => {
  // console.log(data)
  return (

    <Link to={`/SellerProfile/${data?._id}`}>
        <Container className="my-3">
      <Row className="justify-content-center">
        <Col xs={10} sm={6} md={4} lg={3}>
          <Card className="chef-card">
            <Card.Img variant="top" src={data?.userData?.userProfilePhoto?.[0]?.extraLarge?.imageUrl||chefImage} className="chef-img" />
            <Card.Body className="chef-body">
              <Card.Title className="chef-name">{data?.userData?.userFullName}</Card.Title>
              <Card.Text className="chef-desc">
                Best of: Vort & Birany <br />
                Origine: {data?.userData?.address}
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
    </Link>
  
  );
};

export default ChefCard;
