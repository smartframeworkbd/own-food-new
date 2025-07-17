
import FoodTypeParent from '../Components/FoodTypeParent/FoodTypeParent';
import CateringFoodParent from '../Components/CateringFoodParent/CateringFoodParent';
import CategoryParent from '../Components/CategoryParent/CategoryParent';
import MobileHeader from '../Components/MobileHeader/MobileHeader';
import NavigationBar from '../Components/Header';
import PromoCardParent from '../Components/PromoCardParent/PromoCardParent';
import PartnerPromoSection from '../Components/PromoPartnerParent/PromoPartnerParent';
import OfferFoodParent from '../Components/OfferFoodParent/OfferFoodParent';
import PreOrderFoodParent from '../Components/PreOrderFoodParent/PreOrderFoodParent';
import RecipeParent from '../Components/RecipeParent/RecipeParent';
import KitchenParent from '../Components/KitchenParent/KitchenParent';
import ChefParent from '../Components/ChefParent/ChefParent';
import Tips from '../Components/Tips/Tips';
import TipsAndTricks from '../Components/TipsTricksSection/TipsAndTricks'
import NearestKitchen from '../Components/NearestKitchen/NearestKitchen';
import Footer from '../Components/Footer/Footer';
import { useEffect, useState } from 'react';
import { getHomePageSections } from '../API/HomePageSectionAPI';
import { useSelector } from 'react-redux';
import LazyWrapper from '../Components/Common/LazyWrapper/LazyWrapper';
const NewHomePage = () => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768); // Adjust breakpoint as needed
    };

    handleResize(); // Run initially
    window.addEventListener("resize", handleResize); // Update on resize

    return () => window.removeEventListener("resize", handleResize); // Cleanup
  }, []);

  useEffect(() => {
    getHomePageSections();
  }, []);

  let HomePageList = useSelector((state) => state.homePage.homePageList);
  return (
    <>
      {/* {isMobile ? <MobileHeader /> : <NavigationBar  />} */}

      {/* <FoodTypeCard/> */}
      <FoodTypeParent />
      <CategoryParent />
      <PromoCardParent />
      <PartnerPromoSection />
      <>
        {HomePageList.map((item, index) => {





          if (item.sectionStyle === "Style6") {
            return <LazyWrapper><KitchenParent key={index} data={item} /></LazyWrapper>

            // <BrowseByKitchen key={index} data={item} />;
          }

          //   if (item.sectionStyle === "Style7") {
          //     return <HowWeDo key={index} data={item} />;
          //   }

          //problem
          //   if (item.sectionStyle === "Style9") {
          //     return <FoodNameCategory key={index} data={item} />;
          //   }

          //   if (item.sectionStyle === "Style10") {
          //     return <Dairy key={index} data={item} />;
          //   }

          if (item.sectionStyle === "Style11") {
            return <LazyWrapper><RecipeParent key={index} data={item} /></LazyWrapper>
            //  <Receipebook_layoutTwo key={index} data={item} />;
          }


          if (item.sectionStyle === "Style12") {
            return <LazyWrapper><PreOrderFoodParent key={index} data={item} /></LazyWrapper>





            // <AllFoodLayoutDesign key={index} data={item} />;
          }
          // if (item.sectionStyle === "Style14" && item.sectionCardColor=="Kitchen") {
          //   return <LazyWrapper><NearestKitchen key={index} data={item} /></LazyWrapper>


          // }
           if (item.sectionStyle === "Style14" ) {
            return <LazyWrapper><NearestKitchen key={index} data={item} /></LazyWrapper>


          }


          if(item.sectionStyle==="Style15")
          {
        return <LazyWrapper><Tips key={index} data={item} /></LazyWrapper>

          }
          //   if (item.sectionStyle === "Style13") {
          //     return <BannerSection key={index} data={item} />;
          //   }

          return <></>;
        })}
      </>
      {/* <TipsAndTricks/> */}
      {/* <Tips /> */}
      {/* <OfferFoodParent/>
<PreOrderFoodParent/>
<RecipeParent/>
<KitchenParent/>
 
    <ChefParent/>
    <TipsAndTricks/>
    <Tips/>
    <NearestKitchen/>
   
    <CateringFoodParent/> */}

    </>
  )
}

export default NewHomePage