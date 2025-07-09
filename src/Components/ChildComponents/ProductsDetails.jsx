import React, { useContext, useState } from "react";
import { Col, Container, Row, Table } from "react-bootstrap";
import {
  FaFacebookF,
  FaHeart,
  FaLinkedinIn,
  FaPlayCircle,
  FaRegStar,
  FaStar,
  FaTwitter,
} from "react-icons/fa";
import ImageGallery from "react-image-gallery";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Tab, Tabs, TabList, TabPanel } from "react-tabs";
import Stack from "react-bootstrap/Stack";
import { useEffect } from "react";
import axios from "axios";
import { BaseURL } from "../../Helper/config";
import { useDispatch } from "react-redux";
import { toast } from "react-toastify";
import labels from "../../translationData/currency.json";
import { addItem } from "../../Redux/State-slice/CartSlice";
import { LanguageContext } from "../../Context/LanguageContext";
import getTranslation from "../../Helper/getTranslationUtility";
import labelsTwo from "../../translationData/menu.json";
const ProductsDetails = ({ setProductCategoryId, setProductType }) => {
  const { currentLanguage, setCurrentLanguage } = useContext(LanguageContext);
  const [image, setImage] = useState([]);
  let [foodData, setFoodData] = useState([]);
  let params = useParams();
  const getSingleFood = async () => {
    await axios.get(BaseURL + "/get-single-food/" + params.id).then((res) => {
      if (res.data.status === "Success") {
        setFoodData(res.data.data[0].Rows);
        setImage(res.data.data[0].Rows.foodImage);
        setProductCategoryId(res.data.data[0].Rows[0].categoryID);
      }
    });
  };
  useEffect(() => {
    getSingleFood();
  }, [params.id]);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cardHandle = (item) => {
    dispatch(addItem(item));
    toast.success("Food add successful!", {
      position: "bottom-center",
    });
    navigate(`/SellerProfile/${item?.sellerID}`);
  };

  return (
    <div className="ProductsDetails">
      <section class="inner-section">
        <div class="container product_details">
          <div class="row">
            <div class="col-lg-6 leftSide">
              <div className="image_slider">
                {foodData?.[0]?.foodImage?.[0]?.extraLarge?.imageUrl ===
                  undefined ? (
                  <></>
                ) : (
                  <ImageGallery
                    items={foodData?.[0]?.foodImage?.map((image) => ({
                      original: (() => {
                        const imageUrl =  image?.extraLarge?.imageUrl 

                        if (imageUrl) {
                          // Replace 'uploads' with 'api/v1/get-image' and add width, height, and quality query parameters
                          const newImageUrl = imageUrl.replace('http://assets.ownfood.com/uploads', 'https://assets.ownfood.com/uploads') +
                                              '?width=355&height=205&quality=100';
                          
                          return newImageUrl;
                        }
                        
                        return '';
                      })()|| "",
                      thumbnail: image?.extraLarge?.imageUrl || "",
                    }))}
                    showNav={false}
                    showPlayButton={false}
                    showFullscreenButton={false}
                  />
                )}
              </div>
            </div>
            <div class="col-lg-6 rightSide mt-3 ">
              <div class="details-content space-y-4 p-4 border rounded shadow-sm bg-white h-100">
                <h3 class="details-name">{foodData[0]?.foodName}</h3>

                <h6>Type: {foodData[0]?.foodType}</h6>
                <div class="details-meta mt-3">
                  <h6>
                    {getTranslation("quuantity", currentLanguage, labelsTwo)} :{" "}
                    {foodData[0]?.foodQty}
                  </h6>
                  {/* <p>
                    BRAND:
                    <a href='#' className='ps-2'>
                      radhuni
                    </a>
                  </p> */}
                </div>
                <div class="details-rating">
                  <span>
                    <FaStar />
                  </span>
                  <span>
                    <FaStar />
                  </span>
                  <span>
                    <FaStar />
                  </span>
                  <span>
                    <FaStar />
                  </span>
                  <span>
                    <FaStar />
                  </span>
                  <Link href="#" className="ps-2">
                    (3 reviews)
                  </Link>
                </div>
                <div className="details-price text-left">
                  <h2 className="text-blue">
                    <span style={{ fontSize: "28px" }}>
                      {labels.country === "Bangladesh"
                        ? labels.currency.bdt.symbol
                        : labels.currency.usa.symbol}
                    </span>
                    {foodData[0]?.foodSalePrice}
                  </h2>
                  {foodData[0]?.foodSalePrice !== foodData[0]?.foodPrice && (
                    <span>
                      <del className="text-danger">
                        <span className="">
                          {labels.country === "Bangladesh"
                            ? labels.currency.bdt.symbol
                            : labels.currency.usa.symbol}
                          {foodData[0]?.foodPrice}
                        </span>
                      </del>
                    </span>
                  )}
                  {/* <h2>
                  <span>
                    {labels.country === "Bangladesh"
                      ? labels.currency.bdt.symbol
                      : labels.currency.usa.symbol}
                    {foodData[0]?.foodSalePrice}
                  </span>
                </h2> */}
                </div>
                <div className="food-discount-section">
                  {(!!foodData[0]?.foodDiscountPrice ||
                    !!foodData[0]?.foodDiscountPercentage) && (
                      <>
                        {!!foodData[0]?.foodDiscountPrice &&
                          foodData[0]?.foodPrice !==
                          foodData[0]?.foodSalePrice && (
                            <div className="food-discount">
                              <span>{foodData[0]?.foodDiscountPrice}TK OFF</span>
                            </div>
                          )}
                        {!!foodData[0]?.foodDiscountPercentage &&
                          foodData[0]?.foodPrice !==
                          foodData[0]?.foodSalePrice && (
                            <div className="food-discount">
                              <span>
                                {foodData[0]?.foodDiscountPercentage}% OFF
                              </span>
                            </div>
                          )}
                      </>
                    )}
                </div>

                <p class="details-desc">{foodData[0]?.foodAdditionalInfo}</p>
                <div class="details-list-group">
                  <label
                    class="details-list-title"
                    style={{ fontSize: "15px" }}
                  >
                    {getTranslation("tagss", currentLanguage, labelsTwo)}:
                  </label>
                  <ul class="details-tag-list">
                    {foodData[0]?.foodAdditionalTags?.map((item, index) => (
                      <li key={index}>
                        <a href="#">{item}</a>
                      </li>
                    ))}
                  </ul>
                </div>
                {/* <div class='details-list-group'>
                <label class='details-list-title'>Share:</label>
                <ul class='details-share-list'>
                  <li>
                    <FaFacebookF />
                  </li>
                  <li>
                    <FaTwitter />
                  </li>
                  <li>
                    <FaLinkedinIn />
                  </li>
                </ul>
                <div class='details-action-group'>
                  <button class='add__wish'>
                    <span>
                      <FaHeart />
                    </span>
                    <span>Add To Favorite</span>
                  </button>
                </div>
              </div> */}

                <div className="mt-4 d-flex align-items-center">
                  {/* Seller Image */}
                  <div className="rounded-circle overflow-hidden shadow" style={{ width: "80px", height: "80px" }}>
                    {foodData[0]?.sellerInfo?.[0]?.sellerProfilePhoto?.[0]?.extraLarge?.imageUrl ? (
                      <img
                        src={foodData[0]?.sellerInfo[0]?.sellerProfilePhoto[0]?.extraLarge?.imageUrl}
                        alt="Seller"
                        className="w-100 h-100 object-fit-cover"
                      />
                    ) : (
                      <img
                        src="https://th.bing.com/th/id/OIP.Od4m4w455EEToOQDKESqvgHaFJ?rs=1&pid=ImgDetMain"
                        alt="Default Seller"
                        className="w-100 h-100 object-fit-cover"
                      />
                    )}
                  </div>

                  {/* Seller Info */}
                  <div className="ms-3">
                    {!!foodData[0]?.sellerInfo?.length && (
                      <Link to={`/SellerProfile/${foodData[0]?.sellerID}`} className="text-decoration-none">
                        <h2 className="fs-5 fw-bold text-dark mb-0">
                          By {foodData[0]?.sellerInfo[0]?.kitchenName || "Unknown Seller"}
                        </h2>
                      </Link>
                    )}
                  </div>
                </div>
                <div className="d-flexalign-items-center gap-3 mt-3">
                  <div class="details-add-group">
                    <button
                      class="product-add"
                      onClick={() => cardHandle(foodData[0])}
                      title="Add to Cart"
                    >
                      <i class="fas fa-shopping-basket"></i>
                      <span>
                        {getTranslation(
                          "addtoCart",
                          currentLanguage,
                          labelsTwo
                        )}
                      </span>
                    </button>
                  </div>

                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Container className="product_details__review">
          <Row>
            <Col lg={12}>
              <div className="inner__section">
                <Tabs>
                  <TabList>
                    <Tab style={{ fontSize: "22px" }}>
                      {getTranslation("descrption", currentLanguage, labelsTwo)}
                    </Tab>
                    <Tab>Specifications</Tab>
                    <Tab>Review(2)</Tab>
                  </TabList>
                  <hr />
                  <TabPanel>
                    <div className="description__body">
                      <Row>
                        <Col lg={6}>
                          <div>
                            <div
                              className="des__mjkl"
                              dangerouslySetInnerHTML={{
                                __html: foodData[0]?.foodDescription,
                              }}
                            ></div>
                            {/* <div className='list__data'>
                              <ul>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Klitr ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                                <li>Lorem ipsum dolor sit amet.</li>
                              </ul>
                            </div> 
                          </div>
                        </Col>
                        <Col lg={6}>
                          {/* <div className="img__file">
                            <div className="img__body">
                              <img
                                className="img-fluid"
                                src="/Assets/Img/blog/01.jpg"
                                alt=""
                              />
                              <span className="icon__section">
                                <FaPlayCircle />
                              </span>
                            </div>
                          </div> 
                        </Col>
                      </Row>
                    </div>
                  </TabPanel>
                  <TabPanel>
                    <div className='specifications__body'>
                      <Row>
                        <Col lg={12}>
                          <div className='inner__body'>
                            <Table striped bordered hover>
                              <thead>
                                <tr>
                                  <th>Product Code</th>
                                  <th>Weight</th>
                                  <th>Style</th>
                                </tr>
                              </thead>
                              <tbody>
                                <tr>
                                  <td>Mark</td>
                                  <td>Otto</td>
                                  <td>@mdo</td>
                                </tr>
                                <tr>
                                  <td>Jacob</td>
                                  <td>Thornton</td>
                                  <td>@fat</td>
                                </tr>
                                <tr>
                                  <td>Jacob</td>
                                  <td>Thornton</td>
                                  <td>@fat</td>
                                </tr>
                                <tr>
                                  <td>Jacob</td>
                                  <td>Thornton</td>
                                  <td>@fat</td>
                                </tr>
                              </tbody>
                            </Table>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </TabPanel>
                  <TabPanel>
                  <div className='review__body'>
                    <Row>
                      <Col lg={12}>
                        <div className='inner__body'>
                          <div className='reviewer'>
                            <div className='profile__user'>
                              <div className='imgFile'>
                                <img
                                  className='img-fluid'
                                  src='/Assets/Img/team/01.jpg'
                                  alt=''
                                />
                              </div>
                              <div className='textFile'>
                                <span className='name'>Alex Jhon</span>
                                <span className='date'>January 18, 2023</span>
                              </div>
                            </div>
                            <div className='reviewIcon'>
                              <span>
                                <FaStar />
                              </span>
                              <span>
                                <FaStar />
                              </span>
                              <span>
                                <FaStar />
                              </span>
                              <span>
                                <FaStar />
                              </span>
                              <span>
                                <FaStar />
                              </span>
                            </div>
                            <div className='review__user__text'>
                              <p>
                                Lorem ipsum dolor sit amet consectetur,
                                adipisicing elit. Voluptatibus blanditiis
                                corrupti vero deserunt enim voluptates assumenda
                                impedit facere nesciunt voluptate?
                              </p>
                            </div>
                            <div className='input__user__replay'>
                                <input type='text' />
                                <button>Reply</button>
                              </div>
                          </div>
                          <div className='adminReply ps-5'>
                              <div className='profile__user'>
                                <div className='imgFile'>
                                  <img
                                    className='img-fluid'
                                    src='/Assets/Img/team/01.jpg'
                                    alt=''
                                  />
                                </div>
                                <div className='textFile'>
                                  <p className='name'>Rohana Tailor</p>
                                  <p className='date'>
                                    <span className='author'>Author</span>
                                    January 18, 2023
                                  </p>
                                </div>
                              </div>
                              <div className='review__user__text'>
                                <p>
                                  Lorem ipsum dolor sit amet consectetur,
                                  adipisicing elit. Voluptatibus blanditiis
                                  corrupti vero deserunt enim voluptates
                                  assumenda impedit facere nesciunt voluptate?
                                </p>
                              </div>
                              <div className='input__user__replay'>
                                <input type='text' />
                                <button>Reply</button>
                              </div>
                            </div>
                        </div>
                      </Col>
                    </Row>
                  </div>
                </TabPanel>
                </Tabs>
              </div>
            </Col>
          </Row>
          <br />
          <br />
          <hr />
          <br />
          {/* Write Your Reviews 
          <div className='writeYourReview'>
          <Row>
            <Col>
              <div className='writeYourReview__inner'>
                <div className='header__text'>
                  <h2>Write Your Review</h2>
                </div>
                <div className='reviewIcon d-flex gap-1 align-content-center'>
                  <div className=' d-flex gap-1 '>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                    <span>
                      <FaRegStar />
                    </span>
                  </div>
                  <div className='reviewText'>
                    <span>(0.0)</span>
                  </div>
                </div>
                <div className='reviewInputData'>
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className='inputInner'>
                        <label htmlFor='name' className='d-block'>
                          Name:
                        </label>
                        <input type='text' className='d-block' />
                      </div>
                    </Col>
                    <Col xs={12} lg={4}>
                      <div className='inputInner'>
                        <label htmlFor='name' className='d-block'>
                          Email:
                        </label>
                        <input type='email' className='d-block' />
                      </div>
                    </Col>
                    <Col xs={12} lg={4}>
                      <div className='inputInner'>
                        <label htmlFor='name' className='d-block'>
                          Phone Number:
                        </label>
                        <input type='text' className='d-block' />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div className='inputInner mt-4'>
                        <label htmlFor='name' className='d-block'>
                          Message:
                        </label>
                        <textarea
                          id='txtid'
                          name='txtname'
                          rows='4'
                          cols='50'
                          maxlength='200'
                          className='d-block'
                        ></textarea>
                      </div>
                      <div className='submit'>
                        <button>Submit</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
        </Container> */}

<Container className="product_details__review">
  <Row>
    <Col lg={12}>
      <div className="inner__section">
        <Tabs>
          <TabList style={{ marginBottom: "10px" }}>
            <Tab style={{ fontSize: "22px" }}>
              {getTranslation("descrption", currentLanguage, labelsTwo)}
            </Tab>
          </TabList>
          <hr style={{ margin: "10px 0" }} />
          <TabPanel>
            <div className="description__body">
              <Row>
                <Col lg={6}>
                  <div>
                    <div
                      className="des__mjkl"
                      dangerouslySetInnerHTML={{
                        __html: foodData[0]?.foodDescription,
                      }}
                    ></div>
                  </div>
                </Col>
                <Col lg={6}></Col>
              </Row>
            </div>
          </TabPanel>
        </Tabs>
      </div>
    </Col>
  </Row>
</Container>

      </section>
    </div>
  );
};

export default ProductsDetails;
