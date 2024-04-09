import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustSelectField from "../commonComp/CustSelectField";
import CustTextAreaField from "../commonComp/CustTextAreaField";
import * as formik from "formik";
import {
  customerFormInitialData,
  customerFormSchema,
} from "../../utities/utilities";
import {
  GENDER_OPTION,
  ROLE_OPTION,
  STATUS_OPTION,
  atomNameConst,
} from "../../utities/constants";
import useSelector from "../../store/selector";
import { get, post, put } from "../../utities/apiServices";

const CustomerForm = (props) => {
  const { setShowModal, formType } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();
  const customerDataForEdit = getRecoilVal(atomNameConst.CUSTOMERSINGLEDATA);

  const handlePostApiForCustomer = async (data) => {
    try {
      const resp =
        formType === "edit"
          ? await put(`customers/edit/${customerDataForEdit?._id}`, data)
          : await post("customers/add", data);
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
    <Formik
      validationSchema={customerFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await handlePostApiForCustomer(values);
        response ? setSubmitting(true) : setSubmitting(false);
      }}
      initialValues={
        formType === "edit" ? customerDataForEdit : customerFormInitialData
      }
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"First Name"}
                type={"text"}
                name={"firstName"}
                onChange={handleChange}
                value={values?.firstName}
                error={errors.firstName}
                isValid={touched.firstName && !errors.firstName}
                isInvalid={!!errors.firstName}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"Last Name"}
                type={"text"}
                name={"lastName"}
                onChange={handleChange}
                value={values?.lastName}
                error={errors.lastName}
                isValid={touched.lastName && !errors.lastName}
                isInvalid={!!errors.lastName}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"DOB"}
                type={"date"}
                name={"dob"}
                onChange={handleChange}
                value={values?.dob}
                error={errors.dob}
                isValid={touched.dob && !errors.dob}
                isInvalid={!!errors.dob}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"Mobile No"}
                type={"text"}
                name={"mobileNo"}
                onChange={handleChange}
                value={values?.mobileNo}
                error={errors.mobileNo}
                isValid={touched.mobileNo && !errors.mobileNo}
                isInvalid={!!errors.mobileNo}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"Email"}
                type={"email"}
                name={"email"}
                onChange={handleChange}
                value={values?.email}
                error={errors.email}
                isValid={touched.email && !errors.email}
                isInvalid={!!errors.email}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustSelectField
                option={ROLE_OPTION}
                label={"Role"}
                name={"role"}
                onChange={handleChange}
                value={values?.role}
                error={errors.role}
                isValid={touched.role && !errors.role}
                isInvalid={!!errors.role}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"Start Date"}
                type={"date"}
                name={"startDate"}
                onChange={handleChange}
                value={values?.startDate}
                error={errors.startDate}
                isValid={touched.startDate && !errors.startDate}
                isInvalid={!!errors.startDate}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"End Date"}
                type={"date"}
                name={"endDate"}
                onChange={handleChange}
                value={values?.endDate}
                error={errors.endDate}
                isValid={touched.endDate && !errors.endDate}
                isInvalid={!!errors.endDate}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustSelectField
                option={STATUS_OPTION}
                name={"status"}
                label={"Status"}
                onChange={handleChange}
                value={values?.status}
                error={errors.status}
                isValid={touched.status && !errors.status}
                isInvalid={!!errors.status}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustInputField
                label={"Amount"}
                type={"text"}
                name={"amount"}
                onChange={handleChange}
                value={values?.amount}
                error={errors.amount}
                isValid={touched.amount && !errors.amount}
                isInvalid={!!errors.amount}
              />
            </Col>
            <Col md="4" className="mb-3">
              <CustSelectField
                option={GENDER_OPTION}
                label={"Gender"}
                name={"gender"}
                onChange={handleChange}
                value={values?.gender}
                error={errors.gender}
                isValid={touched.gender && !errors.gender}
                isInvalid={!!errors.gender}
              />
            </Col>

            <Col md="12" className="mb-3">
              <CustTextAreaField
                label={"Comment"}
                name={"comment"}
                onChange={handleChange}
                value={values?.comment}
                error={errors.comment}
                isValid={touched.comment && !errors.comment}
                isInvalid={!!errors.comment}
              />
            </Col>
            <hr />
            <Col md="12" className=" d-flex justify-content-center">
              <Button type="submit" variant="primary">
                Submit
              </Button>
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default CustomerForm;
