import React, { useState, useEffect } from "react";
import {
  Container,
  Row,
  Col,
  Button,
  Card,
  Collapse,
  ProgressBar,
} from "react-bootstrap";
import { FaBoxOpen, FaCheckCircle } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import { IoIosArrowDown } from "react-icons/io";
import axios from "axios";

const EnhancedSuccessPage = () => {
  const [searchParams] = useSearchParams();
  const paymentMethod = searchParams.get("paySystemName");
  const status = searchParams.get("status");
  const transactionID = searchParams.get("transactionID");
  const [showOrderDetails, setShowOrderDetails] = useState(false);
  const [showDeliveryProgress, setShowDeliveryProgress] = useState(false);
  const [orderData, setOrderData] = useState(null); // State for API data
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state





  const toggleOrderDetails = () => {
    setShowOrderDetails((prevState) => !prevState);
  };

  const toggleDeliveryProgress = () => {
    setShowDeliveryProgress((prevState) => !prevState);
  };

  // Fetch order details from API
  useEffect(() => {
    const fetchOrderDetails = async () => {
      // if (!transactionID) return; 
      const API_URL = `https://api.ownfood.com.bd/api/v1/orders-by-transaction-id/${transactionID}`;
      try {
        const response = await axios.get(API_URL);
        setOrderData(response.data?.data[0]);

        setLoading(false);
      } catch (err) {
        setError("Failed to fetch order details.");
        setLoading(false);
      }
    };
    fetchOrderDetails();
  }, [transactionID]);

  const renderCardContent = () => {

    if (status === "cancel") {
      return (
        <>
          <FaBoxOpen className="text-danger display-1 mb-4" />
          <Card.Title className="h3 fw-bold">Order Cancelled!</Card.Title>
          <Card.Text className="text-muted">
            Your order was not placed successfully. Please try again or contact
            our support team for assistance.
          </Card.Text>
        </>
      );
    }

    if (paymentMethod === "cashOnDelivery") {
      return (
        <>
          <FaBoxOpen className="text-primary display-1 mb-4" />
          <Card.Title className="h3 fw-bold">Order Placed Successfully!</Card.Title>
          <Card.Text className="text-muted">
            Thank You Very Much . Waiting For Approved By Kitchen.
            You can
            track your order or continue shopping!
          </Card.Text>
        </>
      );
    }

    return (
      <>
        <FaCheckCircle className="text-success display-1 mb-4" />
        <Card.Title className="h3 fw-bold">Payment Successful!</Card.Title>
        <Card.Text className="text-muted">
          Your payment was successful. Thank you for your purchase.Please Waiting For Approved By Kitchen. Track your
          order or continue shopping for more great items!
        </Card.Text>
      </>
    );
  };

  if (loading) return <p>Loading order details...</p>;
  if (error) return <p className="text-danger">{error}</p>;

  return (
    <Container
      className="d-flex flex-column align-items-center justify-content-center py-5"
      style={{ minHeight: "100vh", backgroundColor: "#f8f9fa", marginTop: "115px" }}
    >
      <Card
        className="text-center shadow border-0"
        style={{ maxWidth: "500px", borderRadius: "10px" }}
      >
        <Card.Body>

         
          {renderCardContent()}

          {/* Delivery Progress Section */}
          {/* <div className="mt-4">
            <Card
              className="p-3 shadow-sm"
              style={{ borderRadius: "10px", cursor: "pointer" }}
              onClick={toggleDeliveryProgress}
            >
              <h5 className="fw-bold">Estimated Time of Delivery</h5>
              <h4 className="fw-bold">18:00 - 18:10</h4>
              <ProgressBar now={30} variant="danger" className="my-3" />
              <p className="mb-0">waiting for accept kitchen  
                
              <span className="mb-1">{orderData?.orderItems[0]?.sellerInfo && orderData?.orderItems[0]?.sellerInfo[0]?.kitchenName}</span>

                your order !</p>
            </Card>
            {showDeliveryProgress && (
              <p className="text-success mt-3">Your food is arriving soon! 🚚</p>
            )}
          </div> */}

          {/* Order Details Dropdown */}
          {
            paymentMethod != "cashOnDelivery" && <div className="text-start mt-4">
              <hr />
              <div
                className="d-flex align-items-center justify-content-between"
                onClick={toggleOrderDetails}
                style={{ cursor: "pointer" }}
              >
                <div className="d-flex align-items-center">
                  <img
                    src="/Assets/Img/voucher.png"
                    alt="Voucher Icon"
                    width="20px"
                    height="20px"
                  />
                  <Button
                    variant="link"
                    className="text-decoration-none text-primary fw-bold m-0"
                  >
                    {showOrderDetails ? "Hide Order Details" : "View Order Details"}
                  </Button>
                </div>
                <IoIosArrowDown
                  style={{
                    color: "#1B6DC1",
                    fontSize: "23px",
                    fontWeight: "bolder",
                    transform: showOrderDetails
                      ? "rotate(180deg)"
                      : "rotate(0deg)",
                    transition: "transform 0.3s ease",
                  }}
                />
              </div>

              <Collapse in={showOrderDetails}>
                <div>
                  <hr />
                  <h5 className="fw-bold">Order Details</h5>
                  <p className="mb-1">{orderData?.orderItems[0]?.sellerInfo && orderData?.orderItems[0]?.sellerInfo[0]?.kitchenName}</p>
                  <p className="mb-3 text-muted">
                    Order Number:{" "}
                    <span className="text-primary">{orderData?.orderNumber}</span>
                  </p>
                  <ul className="list-unstyled">
                    {orderData?.orderItems?.map((item, index) => (
                      <li key={index} className="d-flex justify-content-between">
                        <span>{item.foodQty}x {item.foodName}</span>
                        <span>Tk{item.foodPrice}</span>
                      </li>
                    ))}
                  </ul>
                  <hr />
                  <ul className="list-unstyled">
                    {/* <li className="d-flex justify-content-between fw-bold">
                    <span>Subtotal</span>
                    <span>Tk{orderData?.orderItems[0]?.foodSalePrice}</span>
                  </li> */}
                    <li className="d-flex justify-content-between">
                      <span>Delivery Fee</span>
                      <span>Tk {orderData?.deliveryCharge}</span>
                    </li>

                    <li className="d-flex justify-content-between">
                      <span>Platform Fee</span>
                      <span>Tk {orderData?.platFormFee || 0}</span>
                    </li>

                    {
                      orderData?.paySystemName == "payNow" && <li className="d-flex justify-content-between text-danger">
                        <span>Discount</span>
                        <span>Tk {orderData?.payNowOffer || 0}</span>
                      </li>

                    }

                  </ul>
                  <hr />
                  <ul className="list-unstyled">
                    <li className="d-flex justify-content-between fw-bold">
                      <span>Total (Incl. tax)</span>
                      <span>Tk {orderData?.payableAmount}</span>
                    </li>
                  </ul>
                </div>
              </Collapse>
            </div>
          }

        </Card.Body>
      </Card>

      <Row className="mt-4 text-center">
        <Col>
          <Button
            variant="outline-primary"
            className="me-3 px-4 py-2"
            href="https://dashboard.ownfood.com.bd/"
            style={{ borderRadius: "30px" }}
          >
            Track Order
          </Button>
          <Button
            variant="primary"
            className="px-4 py-2"
            href="/"
            style={{ borderRadius: "30px" }}
          >
            Continue Shopping
          </Button>
        </Col>
      </Row>

      <Row className="mt-4 text-center">
        <Col>
          <p className="text-muted">
            Need assistance?{" "}
            <a
              href="/"
              className="text-decoration-none fw-semibold text-primary"
            >
              Contact our support team.
            </a>
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default EnhancedSuccessPage;




// import React from 'react';
// import { Container, Row, Col, Button, Card } from 'react-bootstrap';
// import { FaBoxOpen, FaCheckCircle } from 'react-icons/fa';
// import { useLocation, useSearchParams } from 'react-router-dom';

// const EnhancedSuccessPage = () => {
//   const [searchParams] = useSearchParams();
//   const paymentMethod = searchParams.get('paySystemName');
//   const status = searchParams.get('status');

//   const renderCardContent = () => {
//     if (status === "cancel") {
//       return (
//         <>
//           <FaBoxOpen className="text-danger display-1 mb-4" />
//           <Card.Title className="h3 fw-bold">Order Cancelled!</Card.Title>
//           <Card.Text className="text-muted">
//             Your order was not placed successfully. Please try again or contact our support team for assistance.
//           </Card.Text>
//         </>
//       );
//     }

//     if (paymentMethod === "cashOnDelivery") {
//       return (
//         <>
//           <FaBoxOpen className="text-primary display-1 mb-4" />
//           <Card.Title className="h3 fw-bold">Order Placed Successfully!</Card.Title>
//           <Card.Text className="text-muted">
//             Thank you for your order. Your items will be delivered soon. You can track your order or continue shopping!
//           </Card.Text>
//         </>
//       );
//     }

//     return (
//       <>
//         <FaCheckCircle className="text-success display-1 mb-4" />
//         <Card.Title className="h3 fw-bold">Payment Successful!</Card.Title>
//         <Card.Text className="text-muted">
//           Your payment was successful. Thank you for your purchase. Track your order or continue shopping for more great items!
//         </Card.Text>
//       </>
//     );
//   };

//   return (
//     <Container className="d-flex flex-column align-items-center justify-content-center py-5" style={{ minHeight: '100vh', backgroundColor: '#f8f9fa', marginTop: '55px' }}>
//       <Card className="text-center shadow border-0" style={{ maxWidth: '500px', borderRadius: '10px' }}>
//         <Card.Body>
//           {renderCardContent()}
//         </Card.Body>
//       </Card>

//       <Row className="mt-4 text-center">
//         <Col>
//           <Button variant="outline-primary" className="me-3 px-4 py-2" href="https://dashboard.ownfood.com.bd/" style={{ borderRadius: '30px' }}>
//             Track Order
//           </Button>
//           <Button variant="primary" className="px-4 py-2" href="/" style={{ borderRadius: '30px' }}>
//             Continue Shopping
//           </Button>
//         </Col>
//       </Row>

//       <Row className="mt-4 text-center">
//         <Col>
//           <p className="text-muted">
//             Need assistance?{' '}
//             <a href="/" className="text-decoration-none fw-semibold text-primary">
//               Contact our support team.
//             </a>
//           </p>
//         </Col>
//       </Row>
//     </Container>
//   );
// };

// export default EnhancedSuccessPage;
