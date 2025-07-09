import React from "react";
import { useLocation } from "react-router-dom";

const ExperimentalFood = () => {
  const location = useLocation();
  const item = location.state;
  const { photo } = item[0];
  let a = [1, 2, 3];
  return (
    <div className=' shadow-sm'>
      <h5>Experiment Food</h5>
      <div className='row gx-0'>
        {photo.map((i) => (
          <div className='col-4'>
            <img
              style={{
                border: "3px solid white",
                width: "100%",
                height: "250px",
              }}
              src={i?.medium?.imageUrl}
              className='img-fluid'
              alt=''
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ExperimentalFood;
