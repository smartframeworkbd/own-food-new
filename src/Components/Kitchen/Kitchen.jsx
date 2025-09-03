import React, { useRef, useState } from 'react'
import KitchenProfile from './KitchenProfile/KitchenProfile'
import Tips from '../Tips/Tips'
import KitchenDiscountCarousel from './KitchenDiscountCarousel/KitchenDiscountCarousel'
import Reviews from './Review/Review'
import SellerProfileFoodCard from './SellerProfileFoodCard/SellerProfileFoodCard'
import RecipeParent from '../RecipeParent/RecipeParent'
import FeaturedItems from './FeaturedItems/FeaturedItems'
import OfferItems from './OfferItems/OfferItems'
import GoogleMap from './Map/Map'
import FoodSection from './FoodSection/FoodSection'
import KitchenRecipeParents from './KitchenRecipeParents/KitchenRecipeParents'
import SellerTipsComponent from './SellerTipsComponent/SellerTipsComponent'
import SellerTipsShowCaseComponent from './SellerTipsShowCaseComponent/SellerTipsShowCaseComponent'
import NearestKitchenSeller from './NearestKitchenSeller/NearestKitchenSeller'

const Kitchen = () => {
  const [isKitchenOpen, setIsKitchenOpen] = useState(false);
const recipeRef = useRef(null);
  const reviewRef = useRef(null);
  const foodRef = useRef(null);
  const tipsRef = useRef(null);
  const showcaseRef = useRef(null);

    const onTypeClick = (type) => {

      // console.log(type);
      
    if (type === 'Kitchen') window.scrollTo({ top: 0, behavior: 'smooth' });
    if (type === 'Recipe' && recipeRef.current) recipeRef.current.scrollIntoView({ behavior: 'smooth' });
    if (type === 'Food' && foodRef.current) foodRef.current.scrollIntoView({ behavior: 'smooth' });
        if (type === 'Offer' && foodRef.current) foodRef.current.scrollIntoView({ behavior: 'smooth' });

    if (type === 'Tips & Tricks' && tipsRef.current) tipsRef.current.scrollIntoView({ behavior: 'smooth' });
    if (type === 'Review' && reviewRef.current) reviewRef.current.scrollIntoView({ behavior: 'smooth' });
    if (type === 'Showcase' && showcaseRef.current) showcaseRef.current.scrollIntoView({ behavior: 'smooth' });
 
 
  };
    
  return (
   <div>
      <KitchenProfile onTypeClick={onTypeClick} setIsKitchenOpen={setIsKitchenOpen}/>
      <div ref={showcaseRef}><SellerTipsComponent /></div>
      <KitchenDiscountCarousel />
      <div ref={reviewRef}><Reviews /></div>
      <div ref={foodRef}><FoodSection isKitchenOpen={isKitchenOpen} /></div>

      {/* <FeaturedItems />
      <OfferItems /> */}

      <div ref={recipeRef}><KitchenRecipeParents /></div>

      <div ref={tipsRef}><SellerTipsShowCaseComponent /></div>

      <NearestKitchenSeller />
      <GoogleMap />
    </div>
  )
}

export default Kitchen