import React from "react";
import { Card, Row, Col, Image } from "react-bootstrap";
import { Link } from "react-router-dom"; 
import "./RecipeCard.css";
import image1 from '../../assets/recipe1.png';
import image2 from '../../assets/recipe2.png';
import image3 from '../../assets/recipe3.png';
import image4 from '../../assets/recipe4.png';
import image5 from '../../assets/recipe5.png';

export default function RecipeCard(item) {
  return (
    <Link to={`/SingleRecipeFood/${item._id}`} className="text-decoration-none text-dark"> {/* ✅ Link wrapper */}
      <Card className="recipe-card shadow-sm rounded-4 overflow-hidden">
        <div className="main-img-wrapper">
          <Card.Img
            variant="top"
            src={(() => {
              const imageUrl = item?.recipeReadyFoodImage?.[0]?.extraLarge?.imageUrl;
              if (imageUrl) {
                return imageUrl.replace(
                  'http://assets.ownfood.com/uploads',
                  'https://assets.ownfood.com/uploads'
                ) + '?width=397&height=220&quality=100';
              }
              return image1;
            })()}
            className="main-img"
          />
        </div>

        <Card.Body className="p-0 mt-1">
          <Row className="thumb-row gx-0">
            {[0, 1, 2, 3].map((i) => {
              const thumb = item?.recipeSteps?.[i];
              const imageUrl = thumb?.Photo?.[0]?.extraLarge?.imageUrl;
              const finalUrl = imageUrl
                ? imageUrl.replace(
                    'http://assets.ownfood.com/uploads',
                    'https://assets.ownfood.com/uploads'
                  ) + '?width=85&height=85&quality=100'
                : image1;

              return (
                <Col xs={3} key={i}>
                  <Image src={finalUrl} className="thumb-img" />
                </Col>
              );
            })}
          </Row>

          <div className="p-3">
            <Link to={`/SingleRecipeFood/${item._id}`}>            <Card.Title className="title mb-1">{item?.recipeName}</Card.Title>
</Link>
            <Card.Text className="author mb-0 d-flex align-items-center gap-2">
              <Image
                src={item?.sellerID?.userProfilePhoto?.[0]?.small?.imageUrl}
                roundedCircle
                width={24}
                height={24}
              />
              <small className="text-muted">
                By {item?.sellerID?.userFullName || "author"}
              </small>
            </Card.Text>
          </div>
        </Card.Body>
      </Card>
    </Link>
  );
}
