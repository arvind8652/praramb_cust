import React from "react";
import { Form } from "react-bootstrap";

const CustInputField = (props) => {
  const { label, placeholder, type, name, error } = props;
  return (
    <Form.Group className="card p-2 shadow-sm bg-white rounded">
      {label && <Form.Label>{label}</Form.Label>}
      <Form.Control
        className="bg-light"
        type={type}
        placeholder={placeholder || label}
        name={name}
        {...props}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustInputField;
