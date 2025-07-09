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
const CreateFood = () => {
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
      {/* <Header /> */}
      <div className="container d-flex createFood">
        <div className="col-12">
          <div className="card">
            <div className="card-header">
              <h4 className="card-title"> Wish Food Order</h4>
            </div>
            <div className="card-body">
              <h5> {item?.kitchenName}</h5>
              <p>Restrictions: </p>
              <ul>
                {item?.myRestrictions.map((restriction) => {
                  return <li> {restriction}</li>;
                })}
              </ul>

              <div className="basic-form">
                <form onSubmit={(e) => e.preventDefault()}>
                  <div className="form-group mb-3">
                    <p></p>
                  </div>
                  <div className="form-group mb-3">
                    <label>Suggested Dish Name</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Desire Dish Name"
                      label="Name:"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Reasons</label>
                    <select
                      className="form-control input-default"
                      name="reason"
                      id="reason"
                    >
                      <option value="Personal">Personal</option>
                      <option value="Wedding">Wedding</option>
                      <option value="Graduation">Graduation</option>
                      <option value="GetTogether">GetTogether</option>
                    </select>
                  </div>
                  <div className="form-group mb-3">
                    <label>Desired Dish Name</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Desire Dish Name"
                      label="Name:"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Photos</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Desire Dish Name"
                      label="Name:"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label>Video Link</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Desire Dish Name"
                      label="Name:"
                      name="name"
                      value={data.name}
                      onChange={handleChange}
                    />
                  </div>
                  <div className="form-group mb-3">
                    <label> Suggested Ingredients (optional)</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Suggested ingrediants (optional)"
                      label="Slug:"
                      name="Slug"
                      value={data.Slug}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Additional Info (optional)</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Additional Info on desire dish"
                      label="quantity:"
                      name="quantity"
                      value={data.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>How many quantities</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Additional Info on desire dish"
                      label="quantity:"
                      name="quantity"
                      value={data.quantity}
                      onChange={handleChange}
                    />
                  </div>

                  <div className="form-group mb-3">
                    <label>Per person portion Size: </label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Additional Info on desire dish"
                      label="quantity:"
                      name="quantity"
                      value={data.quantity}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
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
                  </div>
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

                  <div className="Col-12 d-flex gap-3">
                    <div className=" form-group mb-3">
                      <label>Select Date when you want to have</label>
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
                    <div className="  form-group mb-3">
                      <label>Time</label>
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

                  {/* <div className="form-group mb-3">
                    <label>Food Minimum Order Quantity</label>
                    <input
                      type="text"
                      className="form-control input-default "
                      placeholder="Food Minimum Order Quantity"
                      label="minimumquantity:"
                      name="minimumquantity"
                      value={data.minimumquantity}
                      onChange={handleChange}
                    />
                  </div> */}
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Button
        className="mb-4 mt-3"
        style={{ marginLeft: 65 }}
        onClick={() => {
          submit();
        }}
      >
        {" "}
        Save
      </Button>
      {/* <Footer /> */}
    </>
  );
};
export default CreateFood;
