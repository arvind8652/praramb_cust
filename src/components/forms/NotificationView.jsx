import React from "react";
import useSelector from "../../store/selector";
import {
  NOTIFICATION_DELETE,
  NOTIFICATION_EDIT,
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

const NotificationView = (props) => {
  const { setModalFor, setShowModal } = props;
  const { getRecoilVal } = useSelector();
  const data = getRecoilVal(atomNameConst.NOTIFICATIONSINGLEDATA);

  const handleEditClick = () => {
    setModalFor(NOTIFICATION_EDIT);
    setShowModal(true);
  };
  const handleDeleteClick = () => {
    setModalFor(NOTIFICATION_DELETE);
    setShowModal(true);
  };

  return (
    <>
      {/*<div className="d-flex justify-content-end m-0 p-0 pb-2">
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
  </div>*/}
      <Row>
        <DataWithLabel label={"Title"} data={data?.title} colMd="6" />
        <DataWithLabel label={"Type"} data={data?.type} colMd="6" />
        <DataWithLabel
          label={"Description"}
          data={data?.description}
          colMd="12"
        />
      </Row>
    </>
  );
};

export default NotificationView;
