import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DairySkeleton = () => {
  return (
    <div className="row mt-2">
      {Array.from({ length: 4 }).map((_, index) => (
        <div
          key={index}
          style={{ height: "600px" }}
          className="col-xl-3 col-lg-3 col-md-4 col-sm-1 "
        >
          <div className="h-100 blog-slider ">
            <div className="blog-card h-100 shadow p-3 mb-5 bg-body rounded">
              <div className="blog-media">
                <Skeleton height={200} />
              </div>
              <div className="blog-content p-1" style={{ height: "280px" }}>
                <div className="blog-meta d-flex align-items-center mt-3 mb-2">
                  <Skeleton width={100} />
                </div>
                <h4 className="blog-title">
                  <Skeleton width={`80%`} />
                </h4>
                <div className="blog-desc">
                  <Skeleton count={3} />
                </div>
                <div className="d-flex justify-content-between text-primary">
                  <Skeleton width={80} />
                  <Skeleton width={60} />
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default DairySkeleton;
