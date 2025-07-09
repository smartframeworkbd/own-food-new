import React, { useState } from "react";
import { Navbar, Container, Button, Badge, Form } from "react-bootstrap";
import { ShoppingCart, Menu, Search } from "lucide-react";
import "./MobileHeader.css";
import logo from "../../assets/horizontalOwnfood.png"
import ShowLocation from "../Common/ShowLocation/ShowLocation";
const MobileHeader = () => {
  const [userAddress,setUserAddress]=useState("")
  return (
    <div className="mobile-header-container shadow-sm sticky top-0 ">
      <ShowLocation setUserAddress={setUserAddress} userAddress={userAddress}/>
    <Navbar bg="white" className="mobile-header ">
      <Container className="justify-content-between align-items-center">
        <div className="d-flex align-items-center gap-2">
          <div>
            <Menu size={24} />
          </div>
          <div>
            <img src={logo} alt="logo" className="horizontal-logo" />
          </div>
        </div>
  
        <div className="d-flex align-items-center gap-3">
          <span className="login-text">Login</span>
          <div className="position-relative cart-icon-wrapper">
            <ShoppingCart size={22} />
            <Badge bg="primary" className="cart-badge">0</Badge>
          </div>
          <Button variant="outline-primary" size="sm" className="join-btn">Join</Button>
        </div>
      </Container>
    </Navbar>
  
    {/* Full-width Search Bar */}
    <div className=" px-3 py-2 bg-white">
  <Form className="position-relative w-100">
    <Search size={18} className="position-absolute top-50 start-0 translate-middle-y ms-3 text-muted" />
    <Form.Control 
      type="text" 
      placeholder="Search for food, kitchen, or location..." 
      className="ps-5 py-2 rounded-pill border border-primary"
    />
  </Form>
</div>
  </div>
  
  );
};

export default MobileHeader;
