import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustTextAreaField from "../commonComp/CustTextAreaField";
import * as formik from "formik";
import {
  notificationFormInitialData,
  notificationFormSchema,
} from "../../utities/utilities";
import { get, post, put } from "../../utities/apiServices";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utities/constants";

const NotificationForm = (props) => {
  const { setShowModal, formType } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();
  const notificationDataForEdit = getRecoilVal(
    atomNameConst.NOTIFICATIONSINGLEDATA
  );

  const handlePostApiForNotification = async (data) => {
    try {
      // const resp = await post("notifications/add", data);
      const resp =
        formType === "edit"
          ? await put(
              `notifications/edit/${notificationDataForEdit?._id}`,
              data
            )
          : await post("notifications/add", data);
      const val = await get("notifications");
      setRecoilVal(atomNameConst.NOTIFICATIONS, val?.data);
      setShowModal(false);
      return true;
    } catch (error) {
      console.log("error-------", error.message);
      return false;
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   await handlePostApiForNotification();
  //   setNotificationForm(initialData);
  // };

  return (
    <Formik
      validationSchema={notificationFormSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await handlePostApiForNotification(values);
        response ? setSubmitting(true) : setSubmitting(false);

        // setTimeout(() => {
        //   handlePostApiForNotification(values);
        //   alert(JSON.stringify(values, null, 2));
        //   // setSubmitting(false);
        //   setSubmitting(true);
        // }, 400);
      }}
      initialValues={
        formType === "edit"
          ? notificationDataForEdit
          : notificationFormInitialData
      }
    >
      {({ handleSubmit, handleChange, values, touched, errors }) => (
        <Form noValidate onSubmit={handleSubmit}>
          <Row>
            <Col md="6" className="mb-3">
              <CustInputField
                label={"Title"}
                type={"text"}
                name={"title"}
                onChange={handleChange}
                value={values?.title}
                error={errors.title}
                isValid={touched.title && !errors.title}
                isInvalid={!!errors.title}
              />
            </Col>
            <Col md="6" className="mb-3">
              <CustInputField
                label={"Type"}
                type={"text"}
                name={"type"}
                onChange={handleChange}
                value={values?.type}
                error={errors.type}
                isValid={touched.type && !errors.type}
                isInvalid={!!errors.type}
              />
            </Col>
            <Col md="12" className="mb-3">
              <CustTextAreaField
                label={"Description"}
                name={"description"}
                onChange={handleChange}
                value={values?.description}
                error={errors.description}
                isValid={touched.description && !errors.description}
                isInvalid={!!errors.description}
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

export default NotificationForm;
