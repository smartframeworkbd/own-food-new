import React, { useState } from "react";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { Row, Col, Card, Accordion, Button } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import { BaseURL } from "../../Helper/config";
import axios from "axios";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { FaRegStar } from "react-icons/fa";
import { CKEditor } from "@ckeditor/ckeditor5-react";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";
import Swal from "sweetalert2";

//import bannerImg from "./single-banner.jpg";
const bannerImg = "/Assets/Img/single-banner.jpg";
const bannerImg2 = "/Assets/Img/banner_image_smart.png";

const userID = JSON.parse(localStorage.getItem("UserDetails"))?._id;
// import { CKEditor } from "@ckeditor/ckeditor5-react";
const WishOrder = () => {
  const { state } = useLocation();
  const [item, setItem] = useState(null);
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const QueryIDSeller = searchParams.get("sellerId");
  useEffect(() => {
    const stateItem = state;
    setItem(stateItem[0]);
  }, []);

  const [dropDatePart, setDropDatePart] = useState({
    day: "",
    month: "",
    year: "",
  });


  const [data, setData] = useState({
    // Slug: "",
    // price: "",
    // quantity: "",
    // discountprice: "",
    // foodDiscountPercentage: "",
    // startdate: "",
    // enddate: "",
    // portionsize: "",
    // minimumquantity: "",

    //newly made
    name: "",
    foodVideoURL: "",
    reason: "",
    quantity: "0",
    customerDesireDeliveryDate: "",
    customerDesireDeliveryTime: "",
    suggestedIngredients: "",
    additionalInfo: "",
  });
  const [disable, setdisable] = useState(true);
  const [currentFruit, setCurrentFruit] = useState("option");
  const [currentPortion, setCurrentPortion] = useState();
  const [catID, setCatID] = useState([]);

  const [cat, setcat] = useState();
  const [portionId, setPortionId] = useState([]);
  const [subcat, setSubCat] = useState([]);
  const [FSubcat, setFcat] = useState();
  const [selectedImage, setSelectedImage] = useState([]);
  const handleImageDeleteFood = (index) => {
    const updatedImages = [...selectedImage];
    updatedImages.splice(index, 1);

    setSelectedImage(updatedImages);
  };
  const handleChange = (e) => {
    const newContact = { ...data };
    newContact[e.target.name] = e.target.value;

    // newContact.name !== "" &&
    //   newContact.foodVideoURL !== "" &&
    //   newContact.customerDesireDeliveryDate !== "" &&
    //   newContact.customerDesireDeliveryTime !== "" &&
    // newContact.Slug !== "" &&
    // newContact.quantity !== "" &&
    // newContact.price !== "" &&
    // newContact.discountprice !== "" &&
    // newContact.foodDiscountPercentage !== "" &&
    // newContact.startdate !== "" &&
    // newContact.enddate !== "" &&
    // newContact.portionsize !== "" &&
    // newContact.minimumquantity !== ""
    //   ? setdisable(false)
    //   : setdisable(true);
    setData(newContact);
  };

  const changeFruit = (newFruit) => {
    setCurrentFruit(newFruit);
  };
  const [taq, setAdditionalTaq] = useState([]);

  useEffect(() => {
    axios
      .get(`${BaseURL}/get-additionaltags`)
      .then((res) => {
        setAdditionalTaq(res.data.data);
      })
      .catch((Err) => {
      });
  }, []);

  const getCat = (e) => {
    axios
      .get(`${BaseURL}/get-category`)
      .then((res) => setCatID(res.data.data))
      .catch((err) => {
      });
  };

  const getPortion = (e) => {
    axios
      .get(`${BaseURL}/get-portionSizeUnit`)
      .then((res) => setPortionId(res.data.data))
      .catch((err) => {
      });
  };

  const getSubcat = (e) => {
    axios
      .get(`${BaseURL}/get-sub-category-by-single-category/${cat}`)
      .then((res) => setSubCat(res.data.data[0]?.subcategoryData))
      .catch((err) => {
      });
  };

  const Fcat = (newcat) => {
    setcat(newcat);
  };
  const Fsubcat = (newcat) => {
    setFcat(newcat);
  };

  const [Portion, setPortion] = useState();
  const FPortion = (p) => {
    setPortion(p);
  };
  const changePortion = (newPortion) => {
    setCurrentPortion(newPortion);
  };

  const Seller = JSON.parse(localStorage.getItem("UserDetails"));

  const [Tag, setTag] = useState([]);

  const handleCheck = (e) => {
    if (e.target.checked) {
      setTag((oldArray) => [...oldArray, e.target.value]);
    } else {
      removeCities(e);
    }
  };
  const removeCities = (e) => {
    setTag([...Tag.filter((Tag) => Tag !== e.target.value)]);
  };

  let currentYear = new Date().getFullYear();
  let years = [currentYear, currentYear + 1];
  const submit = () => {
    let customerDesireDate = `${dropDatePart.day}-${dropDatePart.month}-${dropDatePart.year}`;
    let subdata = {
      foodName: data.name,
      foodVideoURL: data.foodVideoURL,
      // customerDesireDeliveryDate: data.customerDesireDeliveryDate,
      // customerDesireDeliveryTime: data.customerDesireDeliveryTime,
      sellerID: QueryIDSeller,
      customerID: userID,
      foodType: "WISH",
      reason: data.reason,
      foodQty: data.quantity,

      customerDesireDeliveryTime: data.customerDesireDeliveryTime,
      customerDesireDeliveryDate: customerDesireDate,
      additionalInfo: data.additionalInfo,
      suggestedIngredients: data.suggestedIngredients,
      // foodSlug: data.Slug,
      // foodAdditionalInfo: data.quantity,
      // foodPrice: data.price,
      // foodLabel: "WISH",
      // subCategoryID: FSubcat,
      // categoryID: cat,
      // sellerID: Seller?.sellerIDInfo[0]._id,
      // foodDiscountPrice: data.discountprice,
      // foodDiscountPercentage: data.foodDiscountPercentage,
      // foodDiscountStartDate: data.startdate,
      // foodDiscountEndDate: data.enddate,
      // foodPortionSize: data.portionsize,
      // foodAdditionalTags: [Tag],
    };
    const formData = new FormData();

    formData.append("folder", "WishFood/" + Seller?.userFullName);

    // var newSelectedImages = selectedImage;
    for (var i = 0; i < selectedImage.length; i++) {
      formData.append("cover", selectedImage[i]);
    }

    fetch(`${BaseURL}/imguploads`, {
      method: "POST",
      body: formData,
    })
      .then((data) => data.json())
      .then(async (response) => {
        // subdata.blogImage = response?.images[0];
        subdata.foodImage = response?.images;
        if (response.status === "Success") {
          await axios
            .post(`${BaseURL}/create-food`, subdata)
            .then((res) => {
              if(res.data.status=="Success")
              {
                Swal.fire({
                  icon: "success",
                  title: "Wish Food created successfully!!!",
                  showConfirmButton: false,
                  timer: 1500,
                });
              }

              // navigate("/");
            })
            .catch((err) => {
            });
        }
      });
  };

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);
    setSelectedImage([...selectedImage, ...fileList]);
  };


  return (
    <>
      {/* <Header /> */}
      <br></br>
      <div className=' container d-flex createFood mb-4 '>
        <div className='col-12 writeYourReview'>
          <div
            className='card'
            style={{ boxShadow: "2px 2px 2px 2px #1B6DC1" }}
          >
            <div className='card-header'>
              <img
                className='bannerImg'
                src={bannerImg2}
                alt=''

                //className="mt-2"
              />
              <h2 className='title card-title text-center myFilterBtn'>
                {" "}
                Wish Order
              </h2>
            </div>
            <div className='card-body'>
              {/* <div>
             <h5> {item?.kitchenName}</h5>
              <p>Restrictions: </p>
              <ul>
                {item?.myRestrictions.map((restriction) => {
                  return <li> {restriction}</li>;
                })}
              </ul>
             </div> */}

              <div>
                {/* <h5>
                  Seller Kacci Kitchen has cooking restrictions. No alchohol at
                  all, No pork at all.
                </h5> */}
              </div>
              <div className='basic-form '>
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className='Col-12 row gap-3'>
                    <div className=' form-group mb-3 col-12 col-xl-6 col-lg-6 col-md-6 row'>
                      <div className='col-12 mb-2'>
                        <label>Select date when you want to have?</label>
                      </div>
                      <div className='col-12'>
                        {/* <input
                          type="date"
                          className="form-control input-default "
                          placeholder="Food Discount Percentage"
                          label="customerDesireDeliveryDate:"
                          name="customerDesireDeliveryDate"
                          defaultValue={data.customerDesireDeliveryDate}
                          onChange={handleChange}
                        /> */}
                        <div className='select-date input-default '>
                          <select
                            id='select-day'
                            className='border border-1'
                            style={{ marginRight: "10px" }}
                            onChange={(e) => {
                              setDropDatePart((prev) => {
                                return { ...prev, day: e.target.value };
                              });
                            }}
                          >
                            {[...Array(31).keys()].map((day) => (
                              <option key={day + 1} value={day + 1}>
                                {day + 1}
                              </option>
                            ))}
                          </select>
                          <select
                            className='border border-1'
                            id='select-month'
                            style={{ marginRight: "10px" }}
                            onChange={(e) => {
                              setDropDatePart((prev) => {
                                return { ...prev, month: e.target.value };
                              });
                            }}
                          >
                            <option value='1'>January</option>
                            <option value='2'>February</option>
                            <option value='3'>March</option>
                            <option value='4'>April</option>
                            <option value='5'>May</option>
                            <option value='6'>June</option>
                            <option value='7'>July</option>
                            <option value='8'>August</option>
                            <option value='9'>September</option>
                            <option value='10'>October</option>
                            <option value='11'>November</option>
                            <option value='12'>December</option>
                          </select>
                          <select
                            id='select-year'
                            className='border border-1'
                            onChange={(e) => {
                              setDropDatePart((prev) => {
                                return { ...prev, year: e.target.value };
                              });
                            }}
                          >
                            {/* {[...Array(10).keys()].map((year) => (
                              <option key={year + 2024} value={year + 2024}>
                                {year + 2024}
                              </option>
                            ))} */}
                            {years.map((year, index) => {
                              return (
                                <option key={index} value={year}>
                                  {year}
                                </option>
                              );
                            })}
                          </select>
                        </div>
                      </div>
                    </div>
                    <div className='col-12 col-xl-6 col-lg-6 col-md-6 form-group mb-3 row'>
                      <div className='col-12 mb-2'>
                        <label>Select time when you want to have?</label>
                      </div>
                      <div className='col-12'>
                        <input
                          type='time'
                          className='form-control input-default '
                          placeholder='Food Discount Percentage'
                          label='customerDesireDeliveryTime:'
                          name='customerDesireDeliveryTime'
                          defaultValue={data.customerDesireDeliveryTime}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    className='Col-12 row gap-3 mb-3 mt-3 border border-1'
                    style={{
                      paddingLeft: "5px",
                      paddingRight: "5px",
                    }}
                  >
                    <div className='col-12 mt-3'>
                      <Button className='restriction mt-2'>
                        {" "}
                        {item?.kitchenName} Restrictions
                      </Button>
                    </div>
                    <div className='col-12 mb-3'>
                      <ul className='row p-2'>
                        {item?.myRestrictions.map((data) => {
                          return (
                            <div className='col-12 col-xl-3 col-lg-3 col-md-3 gap-2 text-center mb-2 mt-2'>
                              <li className='restrictionList'>{data}</li>
                            </div>
                          );
                        })}
                        <div className='col-3 gap-2 text-center '>
                          <li className='restrictionList'>restrictions</li>
                        </div>
                        <div className='col-3 gap-2 text-center '>
                          <li className='restrictionList'>restrictions</li>
                        </div>
                        <div className='col-3 gap-2 text-center '>
                          <li className='restrictionList'>restrictions</li>
                        </div>
                        <div className='col-3 gap-2 text-center mt-2'>
                          <li className='restrictionList'>restrictions</li>
                        </div>
                      </ul>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='form-group mb-3 row col-12 col-xl-12 col-lg-12 col-md-12'>
                      <div className='col-12 col-xl-12 col-lg-12 col-md-12 mb-2'>
                        <label>Dish Name*</label>
                      </div>
                      <div className='col-12'>
                        <input
                          type='text'
                          className='form-control input-default '
                          placeholder='suggest a dish name'
                          label='Name:'
                          name='name'
                          defaultValue={data.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    {/* <div className="form-group mb-3 row col-12 col-xl-6 col-lg-6 col-md-6">
                      <div className="mb-2">
                        <label>Event/Occasion</label>
                      </div>
                      <div className="mb-2">
                        <select
                          className="form-control input-default"
                          name="reason"
                          id="reason"
                          onChange={handleChange}
                        >
                          <option defaultValue="">Select a reason</option>

                          <option value="Personal">Personal</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Graduation">Graduation</option>
                          <option value="GetTogether">GetTogether</option>
                        </select>
                        <input
                          className="form-control input-default"
                          name="reason"
                          id="reason"
                          type="text"
                          placeholder="Description of your event/ocasion name"
                          onChange={handleChange}

                        />
                      </div>
                    </div> */}
                  </div>

                  <div className='form-group mb-3 row'>
                    <div className='mb-2'>
                      <label>Food Photos*</label>
                    </div>
                    <div className='col-12'>
                      <input
                        name='readyFoodImage'
                        type='file'
                        id='input-file-upload'
                        onChange={handleFileChange}
                        multiple
                      />
                      <label id='label-file-upload' htmlFor='input-file-upload'>
                        <div>
                          <p>Drag and drop your file here or</p>
                          <span className='upload-button'>Upload a file</span>
                        </div>
                      </label>
                    </div>
                    <div
                      className='col-12 row'
                      style={{
                        marginTop: "20px",
                        marginLeft: "2px",
                      }}
                    >
                      {selectedImage?.map((item, index) => {
                        return (
                          <>
                            <div className='mb-2 mt-2 col-6 col-xl-2 col-lg-3 col-md-3'>
                              <img
                                className='image-box img-fluid'
                                alt='Diary Image'
                                width={"150px"}
                                height={"112.5px"}
                                src={URL.createObjectURL(item)}
                              />
                              <span
                                style={{
                                  position: "relative",
                                  top: "-27px",
                                  // left: "-45px",
                                  marginLeft: "-42px",
                                }}
                              >
                                <div
                                  className='btn btn-danger shadow btn-xs sharp'
                                  onClick={() => handleImageDeleteFood(index)}
                                >
                                  <i className='fa fa-trash'></i>
                                </div>
                              </span>
                            </div>
                          </>
                        );
                      })}
                    </div>
                    {/* <input
                      type="file"
                      className="form-control input-default "
                      placeholder="Enter photos"
                      label="Name:"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                    /> */}
                  </div>

                  <div className='Col-12 row gap-3'>
                    <div className=' form-group mb-3 col-12 col-xl-6 col-lg-6 col-md-6 row'>
                      <div className='col-12 mb-2'>
                        <label>Video Link</label>
                      </div>
                      <div className='col-12'>
                        <input
                          type='text'
                          className='form-control input-default '
                          placeholder='Enter video link'
                          label='Food Video:'
                          name='foodVideoURL'
                          defaultValue={data.foodVideoURL}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className='col-12 col-xl-6 col-lg-6 col-md-6 form-group mb-3 row'>
                      <div className='col-12 mb-2'>
                        <label>How many quantities (Minimum 2)</label>
                      </div>
                      <div className='col-12'>
                        <input
                          type='number'
                          className='form-control input-default '
                          placeholder='Enter food quantity'
                          label='quantity:'
                          name='quantity'
                          max='2'
                          min='1'
                          defaultValue={data.quantity}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='row'>
                    <div className='form-group mb-3 col-12 col-xl-6 col-lg-6 col-md-6 row'>
                      {/* <div className="col-12">
                        <label> Suggest Ingredients (optional)</label>
                      </div> */}
                      <div className='col-12'>
                        <label className='mb-2'>
                          {" "}
                          Suggest Ingredients (optional)
                        </label>
                        {/* <textarea
                          className="d-block"
                          id="w3review"
                          name="w3review"
                          rows="4"
                          cols="50"
                          style={{
                            padding: "2%",
                            width: "100%",
                            height: "150px",
                            padding: "12px 20px",
                            boxSizing: "border-box",
                            border: "2px solid #ccc",
                            borderRadius: "4px",
                            backgroundColor: "#f8f8f8",
                            fontSize: "16px",
                            resize: "none",
                          }}
                        ></textarea> */}
                        <CKEditor
                          editor={ClassicEditor}
                          config={{
                            removePlugins: [
                              "EasyImage",
                              "ImageUpload",
                              "MediaEmbed",
                            ],
                          }}
                          // data={
                          //   (recipeFormData &&
                          //     recipeFormData.recipeDescription) ||
                          //   ""
                          // }
                          // onChange={(event, editor) => {
                          //   const data = editor.getData();
                          //   setRecipeFormData((prev) => {
                          //     return { ...prev, recipeDescription: data };
                          //   });
                          // }}

                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setData((prev) => {
                              return { ...prev, suggestedIngredients: data };
                            });
                          }}
                        />
                      </div>
                    </div>

                    <div className='form-group col-12 col-xl-6 col-lg-6 col-md-6 mb-3'>
                      {/* <div className="col-12">
                        <label className="d-block mb-2">
                          Additional Info (optional)
                        </label>
                      </div> */}
                      <div className='inputInner col-12'>
                        <label className='d-block mb-2'>
                          Additional Info (optional)
                        </label>
                        {/* <textarea
                          className="d-block"
                          id="w3review"
                          name="w3review"
                          rows="4"
                          cols="50"
                          style={{
                            width: "100%",
                            height: "150px",
                            padding: "12px 20px",
                            boxSizing: "border-box",
                            border: "2px solid #ccc",
                            borderRadius: "4px",
                            backgroundColor: "#f8f8f8",
                            fontSize: "16px",
                            resize: "none",
                          }}
                        ></textarea> */}
                        <CKEditor
                          editor={ClassicEditor}
                          config={{
                            removePlugins: [
                              "EasyImage",
                              "ImageUpload",
                              "MediaEmbed",
                            ],
                          }}
                          // data={
                          //   (recipeFormData &&
                          //     recipeFormData.recipeDescription) ||
                          //   ""
                          // }
                          // onChange={(event, editor) => {
                          //   const data = editor.getData();
                          //   setRecipeFormData((prev) => {
                          //     return { ...prev, recipeDescription: data };
                          //   });
                          // }}
                          onChange={(event, editor) => {
                            const data = editor.getData();
                            setData((prev) => {
                              return { ...prev, additionalInfo: data };
                            });
                          }}
                          style={{ height: "100%" }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* <div>
                    <h3>Additonal Tag</h3>
                    <div
                      className="d-flex "
                      style={{ display: "inline-block" }}
                    >
                      {taq.map((item, index) => {
                        return (
                          <span key={index}>
                            {item.status === true ? (
                              <span className="form-check custom-checkbox mb-3 ms-3 checkbox-info">
                                <input
                                  onChange={(e) => {
                                    handleCheck(e);
                                  }}
                                  type="checkbox"
                                  value={item.tagName}
                                  className="form-check-input"
                                  id="customCheckBox2"
                                  required
                                />

                                <label
                                  className="form-check-label"
                                  htmlFor="customCheckBox2"
                                >
                                  {item.tagName}
                                </label>
                              </span>
                            ) : (
                              ""
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div> */}
                  {/* <div className="form-group mb-3">
                    <label>How many meal portion ?</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="How many meal portion"
                      label="portion"
                      name="portion"
                      value={data.portion}
                      onChange={handleChange}
                    />
                  </div> */}

                  {/* <div
                    className=' justify-content-center mt-3 mb-5'
                    style={{ marginLeft: "30%" }}
                  >
                    {selectedImage && (
                      <div>
                        {selectedImage.map((item, index) => {
                          return (
                            <img
                              alt='not found'
                              width={"80px"}
                              src={URL.createObjectURL(item)}
                            />
                          );
                        })}
                        <br />
                        <Button
                          style={{ marginLeft: 25 }}
                          onClick={() => setSelectedImage(null)}
                        >
                          Remove
                        </Button>
                      </div>
                    )}

                    <br />
                    <br />

                    <form id='form-file-upload'>
                      <input
                        type='file'
                        id='input-file-upload'
                        multiple
                        onChange={handleFileChange}
                        // onChange={(event) => {
                        //   setSelectedImage(Array.from(event.target.files));
                        // }}
                      />
                      <label id='label-file-upload' htmlFor='input-file-upload'>
                        <div>
                          <p>Drag and drop your file here or</p>
                          <button className='upload-button'>
                            Upload a file
                          </button>
                        </div>
                      </label>
                    </form>
                  </div> */}

                  <Button
                    className='wish-submit mb-4 mt-3'
                    onClick={() => {
                      submit();
                    }}
                  >
                    {" "}
                    Submit Order
                  </Button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <div className="ProductsDetails">
        <div className="writeYourReview">
          <Row>
            <Col>
              <div className="writeYourReview__inner">
                <div className="reviewIcon d-flex gap-1 align-content-center">
                  <div className="reviewText">
                    <span>(0.0)</span>
                  </div>
                </div>
                <div className="reviewInputData">
                  <Row>
                    <Col xs={12} lg={4}>
                      <div className="inputInner">
                        <label htmlFor="name" className="d-block">
                          Name:
                        </label>
                        <input type="text" className="d-block" />
                      </div>
                    </Col>
                    <Col xs={12} lg={4}>
                      <div className="inputInner">
                        <label htmlFor="name" className="d-block">
                          Email:
                        </label>
                        <input type="email" className="d-block" />
                      </div>
                    </Col>
                    <Col xs={12} lg={4}>
                      <div className="inputInner">
                        <label htmlFor="name" className="d-block">
                          Phone Number:
                        </label>
                        <input type="text" className="d-block" />
                      </div>
                    </Col>
                  </Row>
                  <Row>
                    <Col xs={12}>
                      <div className="inputInner mt-4">
                        <label htmlFor="name" className="d-block">
                          Message:
                        </label>
                        <textarea
                          id="txtid"
                          name="txtname"
                          rows="4"
                          cols="50"
                          maxlength="200"
                          className="d-block"
                        ></textarea>
                      </div>
                      <div className="submit">
                        <button>Submit</button>
                      </div>
                    </Col>
                  </Row>
                </div>
              </div>
            </Col>
          </Row>
        </div>
      </div> */}
      {/* <Footer /> */}
    </>
  );
};
export default WishOrder;
