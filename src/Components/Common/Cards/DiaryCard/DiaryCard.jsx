import React from "react";
import { FaCalendarAlt, FaComments } from "react-icons/fa";
import Moment from "react-moment";
import "./DiaryCard.css";
const DiaryCard = ({ data, index }) => {
  return (
    <div
      key={index}
      className="Diary-card col-xl-3 col-lg-6 col-md-6 col-sm-9 "
    >
      <div className="blog-slider ">
        <div className="blog-card  shadow p-3 mb-5 bg-body rounded">
          <div className="blog-media">
            <a className="blog-img" href="#" alt="a" tabIndex="-1">
              <img
                src={data?.blogImage && data?.blogImage[0]?.medium?.imageUrl}
                // className='img-fluid'
                alt="blog"
              />
            </a>
          </div>
          <div className="blog-content p-1">
            <div className="blog-meta d-flex align-items-center mt-3 mb-2">
              <FaCalendarAlt className="text-primary" />
              <span className="ms-2 ">
                <Moment format="YYYY/MM/DD">{data?.createdDate}</Moment>
              </span>
            </div>
            <h4 className="blog-title  ">
              <a href="" tabIndex="-1">
                {data?.blogTitle?.length < 20
                  ? data.blogTitle
                  : `${data?.blogTitle?.slice(0, 20)}..`}
              </a>
            </h4>
            <div
              className="blog-desc"
              dangerouslySetInnerHTML={{
                __html:
                  data?.blogDesc?.length > 100
                    ? `${data?.blogDesc.substring(11, 90)}...`
                    : data?.blogDesc,
              }}
            />
            <p></p>

            <div className="d-flex justify-content-between text-primary">
              <a
                className="blog-btn text-decoration-none"
                href="#"
                tabIndex="-1"
              >
                <span>read more</span>
                <i className="icofont-arrow-right"></i>
              </a>
              <a className="blog-btn text-decoration-none text-primary">
                <li>
                  <FaComments />
                  <span className="text-decoration-none">19 Comments</span>
                </li>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DiaryCard;
