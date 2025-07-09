import React from "react";
import { useLocation } from "react-router-dom";

const AmazingDish = () => {
  const location = useLocation();
  const item = location.state;
  if(!item && item?.length<0){
    return <p>loading______</p>

  }
  const { photo } = item[0];
  return (
    <div className=' shadow-sm'>
      <p style={{fontSize:'20px'}}>Amazing  Food</p>
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

export default AmazingDish;
