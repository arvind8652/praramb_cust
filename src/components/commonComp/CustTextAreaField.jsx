import React from "react";
import { Form } from "react-bootstrap";

const CustTextAreaField = (props) => {
  const { label, placeholder, type, name, error } = props;
  return (
    <Form.Group className="card p-2 shadow-sm bg-white rounded">
      <Form.Label>{label}</Form.Label>
      <Form.Control
        className="bg-light"
        type={type}
        placeholder={placeholder || label}
        name={name}
        as="textarea"
        rows="3"
        {...props}
      />
      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustTextAreaField;
