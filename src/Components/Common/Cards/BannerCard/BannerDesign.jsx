import React from "react";

const BannerDesign = ({ data }) => {
  return (
    <div className="banner-card-designs">
      <img
        src={data?.url}
        alt={data?.alt||""}
        className="w-100"
      />
    </div>
  );
};

export default BannerDesign;
