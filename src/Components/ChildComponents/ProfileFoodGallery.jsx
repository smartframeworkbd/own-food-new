import React from "react";
import { Col, Container, Row } from "react-bootstrap";

const ProfileFoodGallery = () => {
  const data = [
    {
      foodName: "Tandoori Chicken",
      userName: "Maira Sola",
      bgColor: "Fuchsia",
      link: "/",
      bgImg: "/Assets/Img/blog/01.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit1.png",
      price: "40",
    },
    {
      foodName: "Horseradish Relish",
      userName: "Danielle A. Willey",
      bgColor: "Purple",
      link: "/",
      bgImg: "/Assets/Img/blog/02.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit2.png",
      price: "60",
    },
    {
      foodName: "Guava Jelly",
      userName: "Gerald R. Danner",
      bgColor: "Pink",
      link: "/",
      bgImg: "/Assets/Img/blog/03.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit3.png",
      price: "46",
    },
    {
      foodName: "Mango Chutney",
      userName: "Linda S. Turner",
      bgColor: "Emerald",
      link: "/",
      bgImg: "/Assets/Img/blog/04.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit4.png",
      price: "30",
    },
    {
      foodName: "Pickapeppa Sauce",
      userName: "Alfredo L. Escalante",
      bgColor: "Fuchsia",
      link: "/",
      bgImg: "/Assets/Img/blog/05.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit5.png",
      price: "80",
    },
    {
      foodName: "Ginger Jam",
      userName: "Luis K. Stephens",
      bgColor: "Purple",
      link: "/",
      bgImg: "/Assets/Img/blog/06.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit6.png",
      price: "43",
    },
    {
      foodName: "Smoked Sprats",
      userName: "Bernice F. Jackson",
      bgColor: "Pink",
      link: "/",
      bgImg: "/Assets/Img/blog/07.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit7.png",
      price: "70",
    },
    {
      foodName: "Pancit Luglug",
      userName: "Noelia R. Hall",
      bgColor: "Emerald",
      link: "/",
      bgImg: "/Assets/Img/blog/08.jpg",
      profileImg: "/Assets/Img/profileKitchenImg/profile-kit8.png",
      price: "55",
    },
  ];
  return (
    <section className='ProfileFoodGallery'>
      <Container>
        <Row>
          <Col xs={12}>
            <div class='title-area text-center pb-3'>
              <span class='sub-title'></span>
              <h2 class='sec-title'>
                <span className='sf_init_title'> All </span>{" "}
                <span class=' sf_text-theme'>Food </span>
              </h2>
            </div>
          </Col>
        </Row>
        <Row>
          {data.map((item, index) => (
            <Col xs={3} className='mb-4' key={index}>
              <div className={`inner__body ${item.bgColor}`}>
                <div className='img__file'>
                  <img className='img-fluid' src={item.bgImg} alt='' />
                  <div className='overlay__img'>
                    <img className='img-fluid' src={item.profileImg} alt='' />
                  </div>
                </div>
                <div className='text__file'>
                  <h2>{item.foodName}</h2>
                  <p className='name'>{item.userName}</p>
                  <div className='d-flex justify-content-between align-items-center'>
                    <p className='intro'>Follow</p>
                    <p className='price'>${item.price}</p>
                  </div>
                </div>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default ProfileFoodGallery;
