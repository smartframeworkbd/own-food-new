import React, { useContext, } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";
import labels from "../../translationData/footer.json";

const AboutUs = () => {

  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
  };

  return (
    <section className="aboutUsSection py-5 d-flex align-items-center">
      <div className="container">
        <div className="text-start">

          <h2 className="mb-4 text-primary">{getTranslation("ourpurpos", currentLanguage, labels)}</h2>
          <p className="text-muted text-start">
            {getTranslation("about-us-content", currentLanguage, labels)}
          </p>
          <hr className="my-4" />

        </div>
      </div>
    </section>
  );
};

export default AboutUs;
