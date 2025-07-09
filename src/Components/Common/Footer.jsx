import React, { useContext } from "react";
import { Container } from "react-bootstrap";
import {
  FaFacebookF,
  FaInstagram,
  FaLinkedinIn,
  FaTwitter,
} from "react-icons/fa";
import { useState } from "react";

import getTranslation from "../../Helper/getTranslationUtility";
import labels from "../../translationData/footer.json";
import { LanguageContext } from "../../Context/LanguageContext";
import { DashBoardLink } from "../../Helper/config";

const Footer = () => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  // Function to change the language
  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <footer className="Footer footer-part ">
      <Container>
        <div className="row py-5">
          <div className="col-sm-12 col-xl-3 footer-logo-section">
            <div className="footer-widget">
              <a className="footer-logo" href="#">
                <img
                  src="/Assets/Img/Logo_footer.png"
                  className="img-fluid"
                  alt="logo"
                />
              </a>
              <p className="footer-desc ">
                {/* Adipisci asperiores ipsum ipsa repellat consequatur repudiandae
                quisquam assumenda dolor perspiciatis sit ipsum dolor amet. */}
              </p>
              <div className="social-box">
                <ul className=" d-flex gap-2 mt-3 justify-content-center ps-0 footer-social ">
                  <li>
                    <a href="#">
                      <FaFacebookF />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaTwitter />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaLinkedinIn />
                    </a>
                  </li>
                  <li>
                    <a href="#">
                      <FaInstagram />
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <div className="col-sm-12 col-xl-2 mbCenter" id="footer-info">
            <div className="footer-widget footer-text-section">
              <h3 className="footer-title font-weight-bold">
                {/* {labels.information.bn} */}
                {getTranslation("information", currentLanguage, labels)}
              </h3>
              <div className="footer-links">
                <ul>
                  <li>
                    <a href="/about-us">
                      {/* {labels.information.about.bn} */}
                      {getTranslation(
                        "information.about",
                        currentLanguage,
                        labels
                      )}
                    </a>
                  </li>
                  <li>
                    <a href="/contact-us">
                      {/* {labels.information.contact.bn} */}
                      {getTranslation(
                        "information.contact",
                        currentLanguage,
                        labels
                      )}
                    </a>
                  </li>
                  <li>
                    <a href="/terms">
                      {/* {labels.information.terms.bn} */}
                      {getTranslation(
                        "information.terms",
                        currentLanguage,
                        labels
                      )}
                    </a>
                  </li>

                  {/* <li>
                    <a href='#'>{labels.information.privacyPolicy.bn}</a>
                  </li>
                  <li>
                    <a href='#'>{labels.information.wishlist.bn}</a>
                  </li>
                  <li>
                    <a href='#'>{labels.information.portfolio.bn}</a>
                  </li>
                 
                  <li>
                    <a href='#'>{labels.information.frequently.bn}</a>
                  </li> */}
                </ul>
              </div>
            </div>
          </div>

          {/* <div className='col-sm-6 col-xl-2 mbCenter'>
            <div className='footer-widget'>
              <h3 className='footer-title  font-weight-bold'>{labels.categories.bn}</h3>
              <div className='footer-links'>
                <div className='row '>
                  <div className='col-sm-12 col-md-6'>
                    <ul>
                      <li>
                        <a href='#'>{labels.categories.popularKitchen.bn}</a>
                      </li>
                      <li>
                        <a href='#'>{labels.categories.instantFood.bn}</a>
                      </li>
                      <li>
                        <a href='#'>{labels.categories.preOrderFood.bn}</a>
                      </li>
                      <li>
                        <a href='#'>{labels.categories.wishOrder.bn}</a>
                      </li>
                      <li>
                        <a href='#'>{labels.categories.cateringFood.bn}</a>
                      </li>

                      <li>
                        <a href='#'>{labels.categories.allCategories.bn}</a>
                      </li>
                    </ul>
                  </div>

                </div>
              </div>
            </div>
          </div> */}

          <div className="col-sm-6 col-xl-2 mbCenter" id="footer-info">
            <div className="footer-widget footer-text-section">
              <h3 className="footer-title  font-weight-bold">
                {/* {labels.links.bn} */}
                {getTranslation("links", currentLanguage, labels)}
              </h3>
              <div className="footer-links">
                <div className="row ">
                  <div className="col-sm-12 col-md-12">
                    <ul>
                      <li>
                        <a href="/earn-money">
                          {/* {labels.links.findState.bn} */}
                          {getTranslation(
                            "links.earnMoney",
                            currentLanguage,
                            labels
                          )}
                        </a>
                      </li>
                      <li>
                        {/* <a href='#'>{labels.links.location.bn}</a> */}
                        <a href={`${DashBoardLink}/become-seller`}>
                          {/* {labels.links.location.bn} */}
                          {getTranslation(
                            "links.becomeaseller",
                            currentLanguage,
                            labels
                          )}
                        </a>
                      </li>
                      {/* <li>
                        <a href='#'>{labels.links.affiliates.bn}</a>
                      </li> */}
                      <li>
                        {/* <a href='#'>{labels.links.contact.bn}</a> */}
                        <a href={`${DashBoardLink}/become-rider`}>
                          {/* {labels.links.location.bn} */}
                          {getTranslation(
                            "links.becomearider",
                            currentLanguage,
                            labels
                          )}
                        </a>
                      </li>
                      {/* <li>
                        <a href='#'>{labels.links.career.bn}</a>
                      </li>
                      <li>
                        <a href='#'>{labels.links.faq.bn}</a>
                      </li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-sm-6 col-xl-3">
            <div className="footer-widget footer-address-section">
              <h3 className="footer-title ms-0 dnd-app-title" id="location">
                {/* {labels.downloadAPP.bn} */}
                {getTranslation(
                  "address.addressTitle",
                  currentLanguage,
                  labels
                )}
              </h3>
              <p className="footer-desc" id="location-text">
                {getTranslation("address.line1", currentLanguage, labels)}
                <br />
                {getTranslation("address.line2", currentLanguage, labels)}
                {/* <br /> */}
                {getTranslation("address.line3", currentLanguage, labels)}
              </p>
              <div className="row mt-3 appBTN">
                <div className="col-5 gap-1 cash">
                  <a href="#">
                    <img
                      src="/Assets/Img/google-store.png"
                      className="img-fluid"
                      alt="google"
                    />
                  </a>
                </div>
                <div className="col-5 gap-1 cash">
                  <a href="#">
                    <img
                      src="/Assets/Img/app-store.png"
                      className="img-fluid"
                      alt="app"
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Container>
      <hr className="bottomhr" />
      <div className="row footer_bottom">
        <div className="col-12">
          <div className="">
            <div className="d-flex justify-content-between align-items-center">
              <div className="d-flex align-items-center">
                <p className="footer-copytext">
                  © All Copyrights Reserved by <a href="#">OwnFood</a>
                </p>
              </div>
              <div className="footer-card d-flex gap-1">
                <a href="#">
                  <img
                    src="/Assets/Img/payment/jpg/01.jpg"
                    className="img-fluid rounded footer__pay__img"
                    alt="payment"
                  />
                </a>
                <a href="#">
                  <img
                    src="/Assets/Img/payment/jpg/02.jpg"
                    className="img-fluid rounded footer__pay__img"
                    alt="payment"
                  />
                </a>
                <a href="#">
                  <img
                    src="/Assets/Img/payment/jpg/03.jpg"
                    className="img-fluid rounded footer__pay__img"
                    alt="payment"
                  />
                </a>
                <a href="#">
                  <img
                    src="/Assets/Img/payment/jpg/04.jpg"
                    className="img-fluid rounded footer__pay__img"
                    alt="payment"
                  />
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;

/* <div className='col-sm-12 col-md-5'>
<ul>
<li>
  <a href='#'>Find us in State</a>
</li>
<li>
  <a href='#'>Location</a>
</li>
<li>
  <a href='#'>Affiliates</a>
</li>
<li>
  <a href='#'>Contact</a>
</li>
<li>
  <a href='#'>Career</a>
</li>
<li>
  <a href='#'>Faq</a>
</li>
</ul>
</div> */
