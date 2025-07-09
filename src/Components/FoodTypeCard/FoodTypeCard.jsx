import { ChefHat } from 'lucide-react'
import React from 'react'
import './FoodTypeCard.css'

const FoodTypeCard = () => {
  return (
    <div className="food-type-card col">
      <div className="icon-circle">
        <ChefHat className="icon" />
      </div>
      <div className="card-label">Instant Food</div>
    </div>
  )
}

export default FoodTypeCard
