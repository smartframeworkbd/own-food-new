import axios from "axios";
import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { BaseURL } from "../../Helper/config";
import CenterSlider from "./CenterSlider";
import { Button } from "react-bootstrap";
import FoodsDairy from "./FoodsDairy";
import Dairy from "./Dairy";
import Map from "./Map";

const SellerProfile = () => {
  let params = useParams();
  const [seller, setSeller] = useState([]);
  useEffect(() => {
    axios
      .get(BaseURL + "/get-single-public-become-seller/" + params.id)
      .then((res) => {
        setSeller(res.data.data?.[0]);
      });
  }, []);

  let totalSub = 0;
  for (let i = 0; i < seller?.foodReview?.length; i++) {
    totalSub = totalSub + seller?.foodReview?.[i].reviewStar;
  }

  let rate = totalSub / seller?.foodReview?.length;

  return (
    <div>
      <main className='SellerProfile body-content'>
        <div className='ms-content-wrapper'>
          <div className='ms-profile-overview'>
            <div>
              <CenterSlider />
              <div
                className='ms-profile-cover'
                // style={{ backgroundImage: 'url("/Assets/Img/b1.jpg")' }}
              >
                <img
                  className='ms-profile-img'
                  src={seller?.sellerProfilePhoto}
                  alt='people'
                />
                <div className='ms-profile-user-info d-flex justify-content-between'>
                  <div>
                    <h4 className='ms-profile-username text-dark'>
                      {seller?.kitchenName}
                    </h4>
                    <h2 className='ms-profile-role text-dark'>
                      {seller?.sellerNationality}
                    </h2>
                  </div>
                  <div>
                    <Link to={"/createfood"} state={{ seller: seller }}>
                      <Button className='me-2'>Wish Food</Button>
                    </Link>
                    <Link to={"/createfood"} state={{ seller: seller }}>
                      {" "}
                      <Button>Catering Food</Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>

            <div className='tab-content'>
              <div className='tab-pane' id='tab1'></div>
              <div className='tab-pane' id='tab2'></div>
              <div className='tab-pane' id='tab3'></div>
            </div>
          </div>

          <div className='row'>
            <div className='col-xl-9 col-md-12'>
              <div className='row'>
                <div className='col-12'>
                  <div className='ms-panel ms-panel-fh'>
                    <div className='ms-panel-body'>
                      <h5 className=' '>Skill</h5>
                      <h5 className=''>Restrictions</h5>
                      {/* <hr />
                      <p>{seller?.aboutSeller}</p> */}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className='col-xl-3 col-md-12'>
              <div className='ms-panel ms-panel-fh'>
                <div className='ms-panel-body'>
                  <ul className='ms-profile-stat'>
                    <li>
                      <div>
                        <p>Review: 4.5</p>
                        <div>Total Food : 100</div>
                      </div>
                    </li>
                  </ul>

                  {/* <img src={"/Assets/Img/offer.png"} className='img-fluid' /> */}
                </div>
              </div>
            </div>

            <div className='col-xl-2 col-md-12'>
              <div className='asidebar  bg-white shadow-lg'>
                <Link to={`/SellerProfile/${params.id}`}> All Prodct</Link>
                <Link to={"/ba"}>Chickn</Link>
                <Link to={"/allprduct"}>Burger</Link>
                <Link to={"/allprouct"}>Burger</Link>
                <Link to={"/allprodct"}>Burger</Link>
                <Link to={"/allprodut"}>Burger</Link>
                <Link to={"/allproduc"}>Burger</Link>
              </div>
            </div>
            <div className='col-xl-10 col-md-12'>
              <div className='row'>
                <div className='ms-panel pt-3'>
                  <div className=' ms-panel-fh'>
                    <div className='ms-panel-body'>
                      <h5>Pick a delivery date</h5>
                      <hr />
                      <div className='row gap-1 mt-3'>
                        <div className='col-1 border pick-date'>
                          <div
                            className='d-flex flex-column
                           text-center'
                          >
                            <span className='fw-bold pick-day'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>

                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                        <div className='col-1 border'>
                          <div className='d-flex flex-column text-center'>
                            <span className='fw-bold'>SUN</span>
                            <span>Jan 26</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className='col-lg-12'>
                  <Outlet />
                </div>
              </div>

              <Dairy />
              <Map />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default SellerProfile;
