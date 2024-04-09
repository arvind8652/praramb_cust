import React from "react";
import useSelector from "../../store/selector";
import {
  CUSTOMER_DELETE,
  CUSTOMER_EDIT,
  atomNameConst,
} from "../../utities/constants";
import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil, faTrash } from "@fortawesome/free-solid-svg-icons";

const DataWithLabel = (props) => {
  const { label, data, colMd } = props;
  return (
    <Col md={colMd} className="mb-3">
      <div className="card p-2  bg-white rounded">
        <small className="text-muted">{label}</small>
        <p className="h6">{data}</p>
      </div>
    </Col>
  );
};

const CustomerView = (props) => {
  const { setModalFor, setShowModal } = props;
  const { getRecoilVal } = useSelector();
  const data = getRecoilVal(atomNameConst.CUSTOMERSINGLEDATA);

  const handleEditClick = () => {
    setModalFor(CUSTOMER_EDIT);
    setShowModal(true);
  };
  const handleDeleteClick = () => {
    setModalFor(CUSTOMER_DELETE);
    setShowModal(true);
  };

  return (
    <>
      <div className="d-flex justify-content-end m-0 p-0 pb-2">
        <FontAwesomeIcon
          onClick={handleEditClick}
          icon={faPencil}
          style={{ cursor: "pointer" }}
          title="edit"
        />
        <div className="vr mx-2"></div>
        <FontAwesomeIcon
          onClick={handleDeleteClick}
          icon={faTrash}
          style={{ cursor: "pointer" }}
          title="delete"
        />
      </div>
      <Row>
        <DataWithLabel label={"First Name"} data={data?.firstName} colMd="4" />
        <DataWithLabel label={"Last Name"} data={data?.lastName} colMd="4" />
        <DataWithLabel label={"DOB"} data={data?.dob} colMd="4" />
        <DataWithLabel label={"Mobile No"} data={data?.mobileNo} colMd="4" />
        <DataWithLabel label={"Email"} data={data?.email} colMd="4" />
        <DataWithLabel label={"Role"} data={data?.role} colMd="4" />
        <DataWithLabel label={"Start Date"} data={data?.startDate} colMd="4" />
        <DataWithLabel label={"End Date"} data={data?.endDate} colMd="4" />
        <DataWithLabel label={"Status"} data={data?.status} colMd="4" />
        <DataWithLabel label={"Amount"} data={data?.amount} colMd="4" />
        <DataWithLabel label={"Gender"} data={data?.gender} colMd="4" />
        <DataWithLabel label={"Comment"} data={data?.comment} colMd="12" />
      </Row>
    </>
  );
};

export default CustomerView;
