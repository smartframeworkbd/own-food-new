import { ChefHat } from 'lucide-react'
import React from 'react'
import './FoodTypeCard.css'

const FoodTypeCard = ({ label, icon }) => {
  return (
    <div className="food-type-card col">
      <div className="icon-circle">
        {
          icon
        }
        {/* <ChefHat className="icon" /> */}
      </div>
      <div className="card-label">{label}</div>
    </div>
  )
}

export default FoodTypeCard
