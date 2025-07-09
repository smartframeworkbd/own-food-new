import React from "react";
import Tooltip from "rc-tooltip";
import { useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import { useState } from "react";
import { Link } from "react-router-dom";
const CircleSingle = ({ item, setShow }) => {
  let [seller, setSeller] = useState([]);
  let circleSellerPostBody = [];
  item?.circleSellerID?.map((x) => circleSellerPostBody.push(x.value));
  let [country, setCountry] = useState();
  let circleCountryPostBody = [];
  item?.circleCountryID?.map((x) => circleCountryPostBody.push(x.value));

  let [category, setCategory] = useState();
  let circleCategoryPostBody = [];
  item?.circleCategoryID?.map((x) => circleCategoryPostBody.push(x.value));

  const colorNames = [
    "#16A34A",
    "#9333EA",
    "#DB2777",
    "#EA580C",
    "#FF0000",
    "#0000FF",
    "#00008B",
    "#800080",
    "#FF00FF",
    "#808080",
    "#FFA500",
    "#FFA500",
    "#800000",
    "#008000",
    "#808002",
  ];
  const randomColor = () => {
    return colorNames[Math.floor(Math.random() * colorNames.length)];
  };

  useEffect(() => {
    // ================= get-seller-with-food-details ====================

    if (circleSellerPostBody.length > 0) {
      axios
        .post(BaseURL + "/get-seller-with-food-details", {
          _id: circleSellerPostBody,
        })
        .then((res) => {
          setSeller(res.data.data);
        });
    }

    //   ============ get-country-by-admin-selected ============

    if (circleCountryPostBody.length > 0) {
      axios
        .post(BaseURL + "/get-country-by-admin-selected", {
          _id: circleCountryPostBody,
        })
        .then((res) => {
          setCountry(res.data.data);
        });
    }

    //   ============ get-food-by-category ============
    if (circleCategoryPostBody.length > 0) {
      axios
        .get(
          BaseURL +
            "/get-food-by-category/" +
            item?.circleCategoryID[0]?.value +
            "/" +
            "0",
          {
            _id: circleCategoryPostBody,
          }
        )
        .then((res) => {
          setCategory(res.data.data);
        });
    }
  }, []);

  return (
    <div className=" d-flex align-items-center justify-content-center circleWidth">
      <div className="upper">
        {/* <div className='try'></div> */}

        <div className="main">
          {/* <div className='name'>Biryani</div> */}

          <div
            className="imguppertwo "
            style={{ backgroundColor: randomColor() }}
          >
            <span className="cat-type">{item?.circleType}</span>
          </div>

          <div className="imgupperone ">
            <i></i>
          </div>

          <div className="img0 " style={{ backgroundColor: "#e11d48" }}>
            <i class="fa-solid fa-plus fa-2xl plus  "></i>
          </div>

          {seller?.length !== undefined ? (
            <>
              {seller &&
                seller?.slice(0, 6).map((item, index) => (
                  <Link to={`/SellerProfile/${item?._id}`}>
                    <Tooltip
                      placement="top"
                      overlay={`${item.kitchenName}`}
                      key={index}
                    >
                      <img
                        className={`img${index + 1} img-fluid `}
                        alt=""
                        src={
                          (item?.sellerProfilePhoto[0]?.small?.imageUrl === undefined)? "/Assets/Img/Logo.png" : item?.sellerProfilePhoto[0]?.small?.imageUrl 
                        }
                        onClick={() => {
                          setShow(true);
                        }}
                      />
                    </Tooltip>
                  </Link>
                ))}
            </>
          ) : null}

          {country?.length !== undefined ? (
            <>
              {country?.slice(0, 6).map((item, index) => (
                <Tooltip placement="top" overlay={"Custom Text"} key={index}>
                  <img
                    className={`img${index + 1} img-fluid resIMG`}
                    alt=""
                    src={(item?.countryFlag === undefined)? "/Assets/Img/Logo.png": item?.countryFlag}
                    onClick={() => {
                      setShow(true);
                    }}
                  />
                </Tooltip>
              ))}
            </>
          ) : null}

          {category?.[0]?.data?.length !== undefined ? (
            <>
              {category?.[0]?.data?.slice(0, 6).map((item, index) => (
                <Link to={`/ProductsDetails/${item._id}`}>
                  <Tooltip placement="top" overlay={item.foodName} key={index}>
                    <img
                      className={`img${index + 1} img-fluid resIMG`}
                      alt=""
                      // src={item?.foodImage[0]?.extraLarge?.imageUrl}
                      src={
                        item?.foodImage[0]?.extraLarge?.imageUrl === undefined
                          ? "/Assets/Img/Logo.png"
                          : item?.foodImage[0]?.extraLarge?.imageUrl
                      }
                      onClick={() => {
                        setShow(true);
                      }}
                    />
                  </Tooltip>
                </Link>
              ))}
            </>
          ) : null}
        </div>
      </div>
    </div>
  );
};

export default CircleSingle;
