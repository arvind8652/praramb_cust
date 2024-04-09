import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import { deleted, get, put } from "../../utities/apiServices";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utities/constants";

const CustomerDelete = (props) => {
  const { setShowModal } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();
  const customerDataForDelete = getRecoilVal(atomNameConst.CUSTOMERSINGLEDATA);

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDeleteApiForCustomer = async () => {
    try {
      const resp = await deleted(
        `customers/delete/${customerDataForDelete?._id}`
      );
      const val = await get("customers");
      const summaryData = await get("customers/summary");
      setRecoilVal(atomNameConst.CUSTOMERS, val?.data);
      setRecoilVal(atomNameConst.SUMMARY, summaryData?.data?.[0]);
      setShowModal(false);
      return true;
    } catch (error) {
      console.log("error-------", error.message);
      return false;
    }
  };

  return (
    <Formik>
      {() => (
        <Form noValidate>
          <Row>
            <Col md="12" className="mb-3">
              Are you sure, to delete this customer whose id:
              <b>{`${customerDataForDelete?._id}`}</b> and Name:{" "}
              <b>{`${customerDataForDelete?.firstName} ${customerDataForDelete?.lastName}`}</b>
            </Col>
            <hr />
            <Col md="12" className=" d-flex justify-content-center">
              <Button
                className="mx-1"
                type="button"
                onClick={handleDeleteApiForCustomer}
                variant="danger"
              >
                Delete
              </Button>
              <Button type="button" onClick={handleCancel} variant="primary">
                Cancel
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerDelete;
