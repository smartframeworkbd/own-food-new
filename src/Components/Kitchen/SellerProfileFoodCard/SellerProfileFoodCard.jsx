import React from "react";
import "./SellerProfileFoodCard.css";
import foodImage from "../../../assets/foodcard.png"; // Replace with your actual image path
import { Frown, Hand, Plus, Smile } from "lucide-react";
import logo from '../../../assets/ownfood.png';
const SellerProfileFoodCard = ({ food }) => {
  
   function calculateTimeRemaining(nowTime, expiryDate) {
        const now = new Date(nowTime);
        const expiry = new Date(expiryDate);

        let difference = expiry - now;

        const hours = Math.floor(difference / (1000 * 60 * 60));
        difference -= hours * (1000 * 60 * 60);
        const minutes = Math.floor(difference / (1000 * 60));
        difference -= minutes * (1000 * 60);
        const seconds = Math.floor(difference / 1000);

        return { hours, minutes, seconds };
    }

    let remainingTime = calculateTimeRemaining(
        food?.nowTime,
        food?.expiryDate
    );

    let formattedTime = `${remainingTime.hours}h ${remainingTime.minutes}m ${remainingTime.seconds}s`;
   
   
   
  return (
    <div className="card kitchen-profile-food-card shadow-sm">
      <div className="card-body row g-0">
        <div className="col-8 pe-1">
          <h5 className="fw-semibold mb-1 food-title small">{food?.foodName}</h5>

          <span className="food-type px-1 bg-primary rounded">

            {food?.foodType}
          </span>
          <p className="text-muted food-details-text  mb-2" dangerouslySetInnerHTML={

           {  __html: food?.foodDescription?.slice(0, 120)}
          }>
          
          </p>

          {
            food?.foodIsDiscountAny !== "NoDiscount" && <p className="offer-text mb-2 ">
              <span className="badge p-0  d-flex align-items-center  fw-semibold">
                <svg width="21" height="20" viewBox="0 0 21 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.6577 1.86914C10.1207 1.86862 9.58982 1.9837 9.10121 2.20658C8.6126 2.42946 8.1777 2.75491 7.82605 3.16081C7.29067 3.12258 6.75333 3.19999 6.2505 3.38777C5.74768 3.57556 5.29114 3.86933 4.91188 4.24914C4.53186 4.62846 4.2379 5.0851 4.04997 5.58807C3.86203 6.09105 3.78453 6.62857 3.82272 7.16414C3.41727 7.51589 3.09223 7.95073 2.86965 8.43917C2.64707 8.92761 2.53216 9.45821 2.53272 9.99498C2.53272 11.1258 3.03272 12.1391 3.82272 12.8258C3.78453 13.3614 3.86203 13.8989 4.04997 14.4019C4.2379 14.9049 4.53186 15.3615 4.91188 15.7408C5.29116 16.1209 5.7478 16.4149 6.25079 16.6028C6.75377 16.7907 7.2913 16.8682 7.82688 16.83C8.17852 17.2356 8.61332 17.5608 9.10177 17.7836C9.59022 18.0063 10.1209 18.1213 10.6577 18.1208C11.1946 18.1213 11.7252 18.0063 12.2137 17.7836C12.7021 17.5608 13.1369 17.2356 13.4886 16.83C14.024 16.8681 14.5614 16.7906 15.0642 16.6026C15.567 16.4147 16.0235 16.1208 16.4027 15.7408C16.7825 15.3615 17.0762 14.905 17.264 14.4022C17.4518 13.8993 17.5292 13.362 17.4911 12.8266C17.8969 12.475 18.2223 12.04 18.4452 11.5514C18.6681 11.0628 18.7832 10.532 18.7827 9.99498C18.7827 8.86414 18.2819 7.85081 17.4919 7.16414C17.5301 6.62857 17.4526 6.09105 17.2646 5.58807C17.0767 5.0851 16.7827 4.62846 16.4027 4.24914C16.0234 3.86907 15.5668 3.57508 15.0638 3.38715C14.5608 3.19921 14.0233 3.12173 13.4877 3.15998C13.1362 2.75444 12.7015 2.42927 12.2132 2.20655C11.7249 1.98382 11.1944 1.86875 10.6577 1.86914ZM13.5994 7.93581C13.7098 7.81733 13.7699 7.66063 13.767 7.49871C13.7642 7.33679 13.6986 7.1823 13.5841 7.06779C13.4696 6.95328 13.3151 6.88769 13.1532 6.88483C12.9912 6.88197 12.8345 6.94208 12.7161 7.05248L7.71605 12.0525C7.65464 12.1097 7.60539 12.1787 7.57123 12.2554C7.53707 12.332 7.51871 12.4148 7.51722 12.4987C7.51574 12.5826 7.53118 12.666 7.56261 12.7438C7.59405 12.8216 7.64084 12.8923 7.70019 12.9517C7.75953 13.011 7.83023 13.0578 7.90805 13.0892C7.98588 13.1207 8.06923 13.1361 8.15315 13.1346C8.23707 13.1332 8.31983 13.1148 8.3965 13.0806C8.47317 13.0465 8.54217 12.9972 8.59938 12.9358L13.5994 7.93581ZM8.78272 7.18164C8.53408 7.18164 8.29562 7.28042 8.1198 7.45623C7.94399 7.63205 7.84522 7.8705 7.84522 8.11914C7.84522 8.36778 7.94399 8.60624 8.1198 8.78205C8.29562 8.95787 8.53408 9.05664 8.78272 9.05664C9.03136 9.05664 9.26981 8.95787 9.44563 8.78205C9.62144 8.60624 9.72022 8.36778 9.72022 8.11914C9.72022 7.8705 9.62144 7.63205 9.44563 7.45623C9.26981 7.28042 9.03136 7.18164 8.78272 7.18164ZM12.5327 10.9316C12.2841 10.9316 12.0456 11.0304 11.8698 11.2062C11.694 11.382 11.5952 11.6205 11.5952 11.8691C11.5952 12.1178 11.694 12.3562 11.8698 12.5321C12.0456 12.7079 12.2841 12.8066 12.5327 12.8066C12.7814 12.8066 13.0198 12.7079 13.1956 12.5321C13.3714 12.3562 13.4702 12.1178 13.4702 11.8691C13.4702 11.6205 13.3714 11.382 13.1956 11.2062C13.0198 11.0304 12.7814 10.9316 12.5327 10.9316Z" fill="#1B6DC1" />
                </svg>
                {
                  food?.foodIsDiscountAny === "DiscountPrice"
                  && <span className="text-primary">{food?.foodDiscountPrice} Tk Off</span>

                }
                {
                  food?.foodIsDiscountAny === "DiscountPercentage"
                  && <span className="text-primary">{food?.foodDiscountPercentage} % Off</span>


                }

              </span>
            </p>
          }

          <div className="d-flex align-items-center gap-2">
            <h5 className="fw-bold text-dark mb-0"> ৳ {food?.foodSalePrice}</h5>
            {food?.foodPrice && food?.foodPrice !== food?.foodSalePrice && (
              <del className="text-muted">  ৳ {food?.foodPrice}</del>

            )}
            <span className="info-icon">?</span>
          </div>

{
                food?.foodType == "PREORDER" &&  <div className="text-muted food-active-time small mt-1">
       <strong> ⏰     Order Before: </strong>
            {
              food?.foodOrderBeforeTime
            }
    {/* ⏰ <strong>Available:</strong> {food.foodStartTime} - {food.foodEndTime} */}
  </div>
}

  {
                food?.foodType == "INSTANT" && <div className="text-muted food-active-time small mt-1">
       <strong> ⏰     Remaining : </strong>
            {
            formattedTime
            }
    {/* ⏰ <strong>Available:</strong> {food.foodStartTime} - {food.foodEndTime} */}
  </div>


            
         

            }
          
        </div>

        <div className="col-4 position-relative">
          <img
            src={food?.foodImage[0]?.medium?.imageUrl||logo}
            className="img-fluid food-image rounded"
            alt="food"
          />
          <div className="plus-icon">

            <Plus />
          </div>

          <div className="feedback-footer d-flex justify-content-between align-items-center pt-2 px-1">
            <div className="text-center text-danger small">
              <Hand size={16} />
              <div>9.5%</div>
            </div>
            <div className="text-center text-danger small">
              <Smile size={16} />
              <div>9.5%</div>
            </div>
            <div className="text-center text-danger small">
              <Frown size={16} />
              <div>47.6%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SellerProfileFoodCard;
