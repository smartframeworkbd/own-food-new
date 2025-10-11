import React, { useContext } from "react";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";
import labels from "../../translationData/footer.json";

const AboutUs = () => {
  const { currentLanguage } = useContext(LanguageContext);

  // Get the entire about-us-content object
  const aboutContent = getTranslation("about-us-content", currentLanguage, labels);

  return (
    <section className="aboutUsSection py-5 d-flex align-items-center">
      <div className="container">
        <div className="text-start">

          <h2 className="mb-4 text-primary">{currentLanguage === "en" ? "Who We Are" : "আমরা কে"}</h2>
          <p className="text-muted">{aboutContent.whoWeAre}</p>

          <h3 className="mt-4">{currentLanguage === "en" ? "Why Buy Homemade Food" : "কেন ঘরের তৈরি খাবার কিনবেন"}</h3>
          <ul>
            {aboutContent.whyBuyHomemadeFood.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-4">{currentLanguage === "en" ? "Why Sell Through OwnFood" : "কেন OwnFood দিয়ে বিক্রি করবেন"}</h3>
          <ul>
            {aboutContent.whySellThroughOwnFood.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <h3 className="mt-4">{currentLanguage === "en" ? "How You Can Earn" : "কিভাবে উপার্জন করবেন"}</h3>
          <ul>
            {aboutContent.howYouCanEarn.map((item, index) => (
              <li key={index}>{item}</li>
            ))}
          </ul>

          <hr className="my-4" />
        </div>
      </div>
    </section>
  );
};

export default AboutUs;
