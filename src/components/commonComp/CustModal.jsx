import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

const CustModal = (props) => {
  const {
    show,
    onHide,
    title = "NO Title",
    children,
    modalFor,
    onHandleSubmit = () => {},
    defaultCloseBtn = true,
    size = "lg",
  } = props;

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
      <Modal.Body>{children}</Modal.Body>
      {/* <Modal.Footer>
        <Button type="submit" onClick={onHandleSubmit}>
          Submit
        </Button>
        <Button variant="warning" onClick={onHide}>
          Close
        </Button>
      </Modal.Footer> */}
    </Modal>
  );
};

export default CustModal;
