import React from "react";
import { Form } from "react-bootstrap";

const CustSelectField = (props) => {
  const { option, label, placeholder, type, name, error } = props;
  return (
    <Form.Group className="card p-2 shadow-sm bg-white rounded">
      <Form.Label>{label}</Form.Label>
      <Form.Select {...props} className="bg-light">
        {option?.map((data) => {
          return (
            <option key={data.value} value={data.value}>
              {data.label}
            </option>
          );
        })}
      </Form.Select>

      <Form.Control.Feedback type="invalid">{error}</Form.Control.Feedback>
    </Form.Group>
  );
};

export default CustSelectField;
