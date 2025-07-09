import React from 'react'
import FoodPresentationCard from '../Common/Cards/FoodPresentation/FoodPresentationCard'
import SliderProvider from '../Common/Slider/SliderProvider'

const RelatedFood = ({data}) => {
  return (
    <div>

        {/* <div className='container'>
            {
               
                    <SliderProvider
                     
                      food={data}
                  
                      title={"RELATED"}
                      />
           
            }
        </div>

        <div className='row p-5'>
        {
            data?.map((item,index)=><FoodPresentationCard data={item} index={index}/>)
        }
        </div> */}

   

    </div>
  )
}

export default RelatedFood