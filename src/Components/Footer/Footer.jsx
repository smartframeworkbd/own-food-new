import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./Footer.css";
import logo from '../../assets/ownfoodfooter.png'
import playstore from '../../assets/playstore.png'
import appstore from '../../assets/appstore.png'
import { FacebookIcon, InstagramIcon, TwitterIcon, YoutubeIcon } from "lucide-react";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <footer className="footer">
      <Container>
        <Row className="footer-top">
          <Col md={12}>
            <div className="d-flex justify-content-between">
              <img style={{ height: "91px", width: '121px' }} src={logo} alt="Ownfood Logo" className="logo" />


              <div className="social-icons">
                <FacebookIcon />
                <YoutubeIcon />
                <TwitterIcon />
                <InstagramIcon />
              </div>
            </div>


          </Col>
          <Col md={12} className="logo-text">
            <p className="tagline">
              Order food from the best recipe and shops with Ownfood Bangladesh
            </p>
            <p className="description">
              Bangladesh’s leading food delivery app with over 5000+ restaurants along with amazing deals and services. Discover a world of culinary delights and flavorful experiences with Ownfood, your ultimate food destination. We specialize and offer four different services which include – super-fast delivery, on-time food pick-up, delightful dine-in experience, and last but not least, flowers will be delivered to your doorstep on special occasions for your loved ones.
            </p>
          </Col>


        </Row>
        <div className="horizontal-divider">
          <hr />
        </div>
        <Row className="footer-links">
          <Col md={2} sm={6}>
            <ul>
              <li> <Link to={'/about-us'}> About us</Link></li>
              <li><Link to={'/contact-us'}>Contact us</Link></li>
                            <li> <Link to={'/about-us'}> How Ownfood works</Link></li>
              <li><Link to={'/contact-us'}>Help & Support</Link></li>

            
            </ul>
          </Col>
          <Col md={2} sm={6}>
            <ul>
              {/* <li>Join us</li> */}

              <li><a to={'https://dashboard.ownfood.com/become-seller'}>Become a seller</a></li>
              <li><a to={'https://dashboard.ownfood.com/become-rider'}>Become a Rider</a></li>
            </ul>
          </Col>
          <Col md={3} sm={6}>
            <ul>
              <li>Terms & conditions</li>
              <li>Privacy policy</li>
              <li>Rider Privacy policy</li>
              <li>Partner Privacy policy</li>
              <li>Security policy</li>
            </ul>
          </Col>
          <Col md={5} sm={6}>
            <div className="address">
              {/* <h5>Address</h5>
              <p>
                Software Technology Part, Bangkok Market, 14 Agrabad Access Road, Chattogram, Bangladesh
              </p> */}
              <div className="store-buttons">
                <img src={playstore} alt="Google Play" />
                <img src={appstore} alt="App Store" />
              </div>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={12} className="footer-bottom">
            <p>© Copyright 2025 Ownfood. All rights reserved.</p>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
