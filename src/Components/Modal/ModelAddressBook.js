import React from "react";
import { useEffect } from "react";
import { Button, Col, Container, Form, Modal, Row } from "react-bootstrap";
import { BaseURL } from "../../Helper/config";
import { useState } from "react";

const ModelAddressBook = (props) => {
  let [addressBooks, setAddressBooks] = useState([]);
  const UserDetails = JSON.parse(localStorage.getItem("UserDetails"));
  useEffect(() => {
    const addressBook = async () => {
      const res = await fetch(
        `${BaseURL}/get-address-book-by-user/${UserDetails?._id}`
      );
      const data = await res.json();
      setAddressBooks(data.data);
    };

    addressBook();
  }, []);
  return (
    <Modal {...props} aria-labelledby='contained-modal-title-vcenter'>
      <Modal.Header closeButton>
        <Modal.Title id='contained-modal-title-vcenter'>
          Add your address
        </Modal.Title>
      </Modal.Header>
      <Modal.Body className='grid-example'>
        <Container>
          <Row>
            <Form>
                {/* <Col>  <input type='radio' /></Col> */}

              {addressBooks.length > 0 &&
                addressBooks.map((item) => (
                  <Col xs={12}>
                    <Form.Check.Input
                      type='radio'
                      className='text-danger'
                      isValid
                    />
                    <Form.Check.Label>
                      {" "}
                      <div>
                        <div
                          key={item?._id}
                          //   onClick={() => setDefaultAddress(item)}
                          className='p-inner'
                        >
                          <div>
                            <p>Deliver to: {item?.Name}</p>
                            <p>{`${item?.addressText},${item?.RegionData[0]?.regionName},${item?.CityData[0]?.cityName},${item?.CountryData[0]?.countryName}`}</p>
                            <p>{item?.phoneNumber}</p>
                          </div>
                          <div className='border border-success round p-1'>
                            <p>{item.addressType}</p>
                          </div>
                        </div>
                      </div>
                    </Form.Check.Label>
                  </Col>
                ))}
            </Form>
          </Row>
        </Container>
      </Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ModelAddressBook;
