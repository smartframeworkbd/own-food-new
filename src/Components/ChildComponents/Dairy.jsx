import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { FaCalendarAlt, FaComments } from "react-icons/fa";
import Moment from "react-moment";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getAllFoodDiaryAPI } from "../../API/FoodDiaryAPI";
import Slider from "react-slick";
import DairySkeleton from "../../skelton/DairySkeleton";
// import DairySkeleton from "./DairySkeleton";

const Dairy = ({ data }) => {
  const [loading, setLoading] = useState(true);

  var settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  useEffect(() => {
    getAllFoodDiaryAPI().finally(() => setLoading(false));
  }, []);

  let allFoodDiaryList = useSelector(
    (state) => state.foodDiary.allFoodDiaryList
  );

  return (
    <section className="Dairy section blog-part">
      <Container>
        <div className="row">
          <div className="col-12">
            <div className="headerText">
              <div>
                <h2>
                  <span className="sf_init_title">Food</span>{" "}
                  <span className="sf_text-theme">Diary</span>
                </h2>
              </div>
            </div>
          </div>
        </div>
        {loading ? (
          <DairySkeleton/>
        ) : (
          <div className="row mt-2">
            <Slider {...settings}>
              {allFoodDiaryList?.slice(0, 4).map((item) => (
                <div
                  style={{ height: "600px" }}
                  className="col-xl-3 col-lg-3 col-md-4 col-sm-1"
                  key={item.id}
                >
                  <div className="h-100 blog-slider">
                    <div className="blog-card h-100 shadow p-3 mb-5 bg-body rounded">
                      <div className="blog-media">
                        <a className="blog-img" href="#" tabIndex="-1">
                          <img
                            src={item?.blogImage[0]?.medium?.imageUrl}
                            loading="lazy"
                            className="img-fluid"
                            alt="blog"
                          />
                        </a>
                      </div>
                      <div
                        className="blog-content p-1"
                        style={{ height: "280px" }}
                      >
                        <div className="blog-meta d-flex align-items-center mt-3 mb-2">
                          <FaCalendarAlt className="text-primary" />
                          <span className="ms-2 ">
                            <Moment format="YYYY/MM/DD">
                              {item?.createdDate}
                            </Moment>
                          </span>
                        </div>
                        <h4 className="blog-title">
                          <a href="" tabIndex="-1">
                            {item?.blogTitle?.length < 25
                              ? item.blogTitle
                              : `${item?.blogTitle.slice(0, 24)}..`}
                          </a>
                        </h4>
                        <div
                          className="blog-desc"
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.blogDesc?.length > 100
                                ? `${item?.blogDesc.substring(0, 150)}...`
                                : item?.blogDesc,
                          }}
                        />
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
                              <span className="text-decoration-none">
                                0 Comments
                              </span>
                            </li>
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </Slider>
          </div>
        )}
      </Container>
      {/* <div className="row">
        <div className="col-lg-12 text-center">
          <div className="d-flex justify-content-center mt-5">
            <Link to={"/"}>
              <div className="custom__btn">
                <button>View All Diary</button>
              </div>
            </Link>
          </div>
        </div>
      </div> */}
    </section>
  );
};

export default Dairy;
