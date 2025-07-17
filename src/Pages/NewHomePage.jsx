
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
import { useEffect, useRef, useState } from 'react';
import { getHomePageSections } from '../API/HomePageSectionAPI';
import { useSelector } from 'react-redux';
import LazyWrapper from '../Components/Common/LazyWrapper/LazyWrapper';
const NewHomePage = () => {
  const [isMobile, setIsMobile] = useState(false);
  const kitchenRef = useRef(null);
  const recipeRef = useRef(null);
  const preOrderRef = useRef(null);
  const tipsRef = useRef(null);
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
  const onTypeClick = (type) => {
    const sectionMap = {
      'Kitchen': kitchenRef,
      'Recipe': recipeRef,
      'Pre-Order': preOrderRef,
      'Tips & Trick': tipsRef,
    };

    sectionMap[type]?.current?.scrollIntoView({ behavior: 'smooth' });
  };
  let HomePageList = useSelector((state) => state.homePage.homePageList);
  return (
    <>
      {/* {isMobile ? <MobileHeader /> : <NavigationBar  />} */}

      {/* <FoodTypeCard/> */}
      <FoodTypeParent onTypeClick={onTypeClick} />
      <CategoryParent />
      <PromoCardParent />
      <PartnerPromoSection />
      <>
        {HomePageList.map((item, index) => {





          if (item.sectionStyle === "Style6") {
            return <div ref={kitchenRef} key={index}>            <LazyWrapper><KitchenParent key={index} data={item} /></LazyWrapper>
            </div>



          }




          if (item.sectionStyle === "Style11") {
            return<div ref={recipeRef}> <LazyWrapper ><RecipeParent key={index} data={item} /></LazyWrapper></div>

          }


          if (item.sectionStyle === "Style12") {
            return<div ref={preOrderRef}><LazyWrapper><PreOrderFoodParent key={index} data={item} /></LazyWrapper></div> 






          }

          if (item.sectionStyle === "Style14") {
            return <LazyWrapper><NearestKitchen key={index} data={item} /></LazyWrapper>


          }


          if (item.sectionStyle === "Style15") {
            return <div ref={tipsRef}> <LazyWrapper><Tips key={index} data={item} /></LazyWrapper></div>

          }


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