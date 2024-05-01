import { useState } from "react";
import Modal from "react-bootstrap/Modal";
import { post } from "../../utities/apiServices";
import CustQRScanner from "../commonComp/CustQRScanner";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utities/constants";

const Attendance = (props) => {
  const { getRecoilVal, setRecoilVal } = useSelector();
  const {
    show,
    title = "Attendance",
    defaultCloseBtn = true,
    size = "md",
    setAttendanceModalShow,
  } = props;
  const [errorResp, setErrorResp] = useState(null);
  const attendanceApi = async (data) => {
    setErrorResp(null);
    const reqData = {
      custId: getRecoilVal(atomNameConst.CUSTOMERDETAIL)?.user?._id,
      deviceData: data,
    };
    try {
      const res = await post(`attendance/add`, reqData);
      onHide();
      if (res.status === 200) {
        const result = res.json();
      }
    } catch (error) {
      if (typeof error === "object") {
        let errorMsg = await error.json();
        setErrorResp(errorMsg?.data);
      }
    }
  };

  const handleScannedResult = (data) => {
    attendanceApi(data);
  };

  const onHide = () => {
    setAttendanceModalShow(false);
  };

  return (
    <Modal
      show={show}
      onHide={onHide}
      size={size}
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
    >
      <Modal.Header closeButton={defaultCloseBtn}>
        <Modal.Title id="contained-modal-title-vcenter">{title}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <CustQRScanner
          modalClosed={show}
          handleScannedResult={handleScannedResult}
          errorResp={errorResp}
          setErrorResp={setErrorResp}
        />
      </Modal.Body>
    </Modal>
  );
};

export default Attendance;
