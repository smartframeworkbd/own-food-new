import React, { useState } from "react";
import { Link } from "react-router-dom";
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
import bannerImg from "./single-banner.jpg";
// import { CKEditor } from "@ckeditor/ckeditor5-react";
const WishOrderMash = () => {
  const { state } = useLocation();
  const [item, setItem] = useState(null);

  useEffect(() => {
    const stateItem = state;
    setItem(stateItem[0]);
  }, []);

  const [data, setData] = useState({
    name: "",

    Slug: "",
    price: "",
    quantity: "",
    discountprice: "",
    foodDiscountPercentage: "",
    startdate: "",
    enddate: "",
    portionsize: "",
    minimumquantity: "",

    //newly made
    suggestedDishName: "",
    reasons: "",
    desiredDishName: "",
    photos: "",
    video: "",
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

  const handleChange = (e) => {
    const newContact = { ...data };
    newContact[e.target.name] = e.target.value;

    newContact.name !== "" &&
    newContact.Slug !== "" &&
    newContact.quantity !== "" &&
    newContact.price !== "" &&
    newContact.discountprice !== "" &&
    newContact.foodDiscountPercentage !== "" &&
    newContact.startdate !== "" &&
    newContact.enddate !== "" &&
    newContact.portionsize !== "" &&
    newContact.minimumquantity !== ""
      ? setdisable(false)
      : setdisable(true);
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
  const submit = () => {
    let fdata = {
      foodName: data.name,
      foodSlug: data.Slug,
      foodAdditionalInfo: data.quantity,
      foodPrice: data.price,
      foodLabel: "WISH",
      subCategoryID: FSubcat,
      categoryID: cat,
      sellerID: Seller?.sellerIDInfo[0]._id,
      foodDiscountPrice: data.discountprice,
      foodDiscountPercentage: data.foodDiscountPercentage,
      foodDiscountStartDate: data.startdate,
      foodDiscountEndDate: data.enddate,
      foodPortionSize: data.portionsize,
      foodAdditionalTags: [Tag],
    };
    axios
      .post(`${BaseURL}/create-food`, fdata)
      .then((res) => {
        if (res.data.status === "Success") {
          let orderdata = {
            customerID: Seller._id,
            OrderLabel: "WISH",
            sellerID: item.seller._id,
            orderItems: [
              {
                foodName: data.name,
                foodQty: data.portionsize,
                foodUnitPrice: "",
                foodTotalPrice: "",

                sellerID: Seller?.sellerIDInfo[0]._id,
              },
            ],
            orderDeliveryAddress: "",
            orderBillingAddress: "",
            orderNumber: "",
            orderNotes: "",
            orderTotalAmount: "1250",
          };
          axios.post(BaseURL + "/create-orders", orderdata).then((response) => {
            if (res.data.status === "Success") {
              toast.success("Wish Order  Created", {
                position: "bottom-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
              });
            }
          });
        }
        if (res.data.data.keyPattern.categorySlug === 1) {
          toast.error("Slug Should be unique", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }
      })
      .catch((err) => {
      });
  };

  const handleFileChange = (event) => {
    const fileList = Array.from(event.target.files);

    // set the state with the array of files
    setSelectedImage(fileList);
  };

  const handleSubmit = () => {
    // e.preventDefault();

    const formData = new FormData();

    formData.append("folder", "Food/" + Seller?.sellerIDInfo[0]._id); // folder name
    selectedImage.forEach((file) => {
      formData.append("cover[]", file);
    });

    // fetch(BaseURL + "imguploads", {
    //   method: "POST",
    //   body: formData,
    // })
    //   .then((response) => {
    //     if (response.status === 200) {
    //       submit();
    //     }
    //   })
    //   .catch((err) => {
    //   });
  };


  return (
    <>
      <Header />
      <br></br>
      <div className=" container d-flex createFood mb-4 ">
        <div className="col-12 writeYourReview">
          <div
            className="card"
            style={{ boxShadow: "2px 2px 2px 2px #1B6DC1" }}
          >
            <div className="card-header">
              <img
                src={bannerImg}
                alt=""
                style={{
                  width: "102%",
                  height: "300px",
                  borderRadius: "5px",
                  marginLeft: "-10px",
                  marginRight: "-10px",
                  marginBottom: "-10px",
                  marginTop: "-2px",
                }}
                //className="mt-2"
              />
              <h1
                className=" card-title text-center myFilterBtn"
                style={{
                  marginBottom: "-40px",
                  position: "relative",
                  top: "-168px",
                  zIndex: "1",
                }}
              >
                {" "}
                Wish Order
              </h1>
            </div>
            <div className="card-body">
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
              <div className="basic-form ">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="row">
                    <div className="form-group mb-3 row col-6">
                      <div className="col-12 mb-2">
                        <label>Dish Name*</label>
                      </div>
                      <div className="col-12">
                        <input
                          type="text"
                          className="form-control input-default "
                          placeholder="suggest a dish name"
                          label="Name:"
                          name="name"
                          value={data.name}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="form-group mb-3 row col-6">
                      <div className="mb-2">
                        <label>Reasons</label>
                      </div>
                      <div className="mb-2">
                        <select
                          className="form-control input-default"
                          name="reason"
                          id="reason"
                        >
                          <option defaultValue="">Select a reason</option>

                          <option value="Personal">Personal</option>
                          <option value="Wedding">Wedding</option>
                          <option value="Graduation">Graduation</option>
                          <option value="GetTogether">GetTogether</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group mb-3 row">
                    <div className="mb-2">
                      <label>Food Photos*</label>
                    </div>
                    <div className="col-12">
                      <input
                        name="readyFoodImage"
                        type="file"
                        id="input-file-upload"
                        //onChange={handleFileChange}
                      />
                      <label id="label-file-upload" htmlFor="input-file-upload">
                        <div>
                          <p>Drag and drop your file here or</p>
                          <span className="upload-button">Upload a file</span>
                        </div>
                      </label>
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
                  <div className="form-group mb-3 row">
                    <div className="col-12 mb-2">
                      <label>Video Link</label>
                    </div>
                    <div className="col-6">
                      <input
                        type="text"
                        className="form-control input-default "
                        placeholder="Enter video link"
                        label="Name:"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                      />
                    </div>
                  </div>
                  <div className="Col-12 row gap-3">
                    <div className=" form-group mb-3 col-6 row">
                      <div className="col-12 mb-2">
                        <label> Delivery Date</label>
                      </div>
                      <div className="col-12">
                        <input
                          type="date"
                          className="form-control input-default "
                          placeholder="Food Discount Percentage"
                          label="startdate:"
                          name="startdate"
                          value={data.startdate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                    <div className="col-6 form-group mb-3 row">
                      <div className="col-12 mb-2">
                        <label>Delivery Time</label>
                      </div>
                      <div className="col-12">
                        <input
                          type="time"
                          className="form-control input-default "
                          placeholder="Food Discount Percentage"
                          label="enddate:"
                          name="enddate"
                          value={data.enddate}
                          onChange={handleChange}
                        />
                      </div>
                    </div>
                  </div>
                  <div className="row">
                    <div className="form-group mb-3 col-6 row">
                      {/* <div className="col-12">
                        <label> Suggest Ingredients (optional)</label>
                      </div> */}
                      <div className="col-12">
                        <label className="mb-2">
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
                        />
                      </div>
                    </div>

                    <div className="form-group col-6 mb-3">
                      {/* <div className="col-12">
                        <label className="d-block mb-2">
                          Additional Info (optional)
                        </label>
                      </div> */}
                      <div className="inputInner col-12">
                        <label className="d-block mb-2">
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
                    className="wish-submit mb-4 mt-3"
                    onClick={() => {
                      submit();
                    }}
                  >
                    {" "}
                    Submit Wish order
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
export default WishOrderMash;
