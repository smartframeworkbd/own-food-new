import React from 'react'
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

const Kitchen = () => {
  return (
    <div>
    

        <KitchenProfile/>
        <Tips/>
        <KitchenDiscountCarousel/>
        <Reviews/>
        <FoodSection/>
          {/* <FeaturedItems/>
        <OfferItems/> */}

      
     <KitchenRecipeParents/>
        <Tips/>
   

        <GoogleMap/>
    </div>
  )
}

export default Kitchen