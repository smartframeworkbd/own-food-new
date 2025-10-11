import React, { useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";
import labels from "../../translationData/footer.json";

const ContactUs = () => {
  const { currentLanguage } = useContext(LanguageContext);

  return (
    <section className="contactUsSection py-5">
      <div className="container">
        <h2 className="text-center text-primary mb-5">
          {getTranslation("contat", currentLanguage, labels)}
        </h2>
        <div className="row text-center">
          {/* Corporate Office */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
              <div className="icon-wrapper bg-light rounded-circle d-flex justify-content-center align-items-center mb-3">
                <i className="fas fa-building text-danger fs-3"></i>
              </div>
              <h5 className="fw-bold">{getTranslation("office", currentLanguage, labels)}</h5>
              <p className="text-muted">
                {getTranslation("officeAddress", currentLanguage, labels)}
              </p>
            </div>
          </div>
          {/* Hotline */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
              <div className="icon-wrapper bg-light rounded-circle d-flex justify-content-center align-items-center mb-3">
                <i className="fas fa-phone-alt text-danger fs-3"></i>
              </div>
              <h5 className="fw-bold">{getTranslation("hotlinee", currentLanguage, labels)}</h5>
              <p className="text-muted">{getTranslation("HotlineNum", currentLanguage, labels)}</p>
            </div>
          </div>
          {/* Email */}
          <div className="col-md-4">
            <div className="d-flex flex-column align-items-center">
              <div className="icon-wrapper bg-light rounded-circle d-flex justify-content-center align-items-center mb-3">
                <i className="fas fa-envelope text-danger fs-3"></i>
              </div>
              <h5 className="fw-bold">{getTranslation("hotlineemail", currentLanguage, labels)}</h5>
              <p className="text-muted">{getTranslation("HotlineEmail", currentLanguage, labels)}</p>
              {/* <p className="text-muted">{getTranslation("HotlineEmail2", currentLanguage, labels)}</p> */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
