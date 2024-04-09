import React from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import * as formik from "formik";
import { deleted, get, put } from "../../utities/apiServices";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utities/constants";

const NotificationDelete = (props) => {
  const { setShowModal } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();
  const notificationDataForDelete = getRecoilVal(
    atomNameConst.NOTIFICATIONSINGLEDATA
  );

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDeleteApiForNotification = async () => {
    try {
      const resp = await deleted(
        `notifications/delete/${notificationDataForDelete?._id}`
      );
      const val = await get("notifications");
      setRecoilVal(atomNameConst.NOTIFICATIONS, val?.data);
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
              Are you sure, to delete this notification whose id:
              <b>{`${notificationDataForDelete?._id}`}</b> and title:{" "}
              <b>{`${notificationDataForDelete?.title}`}</b>
            </Col>
            <hr />
            <Col md="12" className=" d-flex justify-content-center">
              <Button
                className="mx-1"
                type="button"
                onClick={handleDeleteApiForNotification}
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

export default NotificationDelete;
