import { Link } from "react-router-dom";
import "./SellerCard.css";
const SellerCard = ({ data }) => {

  return (
    <div className="sellerCard">
      <Link className="d-flex justify-content-center" to={`/SellerProfile/${data?._id}`} key={1}>
        <div
          className="brand-wrap slick-slide slick-cloned mt-3"
          data-slick-index="-5"
          aria-hidden="true"
          tabIndex="-1"
        >
          <div className="brand-media">
            <img
              src={
                data?.kitchenImages?.[0]?.medium?.imageUrl ||
                "/Assets/Img/user.png"
              }
              alt="kitchen"
              onError={(e) => {
                e.target.onerror = null; // Prevent infinite loop in case the fallback image fails
                e.target.src = "/Assets/Img/user.png";
              }}
            />
            <div className="brand-overlay"></div>
          </div>

          <div className="brand-meta">
            <h4 className="sf_title_color_brand">
              {data.kitchenName?.length > 10
                ? `${data.kitchenName.slice(0, 10)}...`
                : data.kitchenName}
            </h4>
            <p className="text-dark">
              Distance:{" "}
              {data?.distance > 0 ? (data.distance / 1000).toFixed(2) : "0"} km{" "}
            </p>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SellerCard;
