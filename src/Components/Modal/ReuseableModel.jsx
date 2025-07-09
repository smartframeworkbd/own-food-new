import React, { useEffect, useState } from "react";
import { Button, Modal, Row } from "react-bootstrap";

const ReuseableModel = ({ handleClose, show, children, title }) => {
  return (
    <Modal size='lg' show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>{children}</Modal.Body>
      <Modal.Footer>
        <Button variant='secondary' onClick={handleClose}>
        বন্ধ
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReuseableModel;
