import {
  faClose,
  faEllipsisVertical,
  faEye,
  faIndianRupee,
  faPencil,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState, useRef, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Overlay from "react-bootstrap/Overlay";

const CustOverLay = (props) => {
  const { handleClick, data } = props;
  const [show, setShow] = useState(false);
  const target = useRef(null);

  const btnClicked = (eventName) => {
    handleClick(eventName, data);
    setShow(false);
  };
  return (
    <>
      <FontAwesomeIcon
        icon={faEllipsisVertical}
        ref={target}
        onClick={() => setShow(!show)}
        style={{ cursor: "pointer" }}
      />
      <Overlay target={target.current} rootClose show={show} placement="left">
        {({
          placement: _placement,
          arrowProps: _arrowProps,
          show: _show,
          popper: _popper,
          hasDoneInitialMeasure: _hasDoneInitialMeasure,
          ...props
        }) => (
          <div
            {...props}
            style={{
              zIndex: 1,
              position: "absolute",
              //   backgroundColor: "rgba(255, 100, 100, 0.85)",
              padding: "2px 10px",
              //   color: "white",
              borderRadius: 3,
              ...props.style,
            }}
          >
            <div className="card  shadow p-3 mb-5 bg-white rounded">
              <ul
                className="list-group list-group-flush"
                style={{ cursor: "pointer" }}
              >
                <li
                  className="list-group-item list-group-item-action"
                  onClick={() => btnClicked("view")}
                >
                  <FontAwesomeIcon icon={faEye} size="sm" /> View
                </li>
                {/*<li
                  className="list-group-item list-group-item-action"
                  onClick={() => btnClicked("edit")}
                >
                  <FontAwesomeIcon icon={faPencil} size="sm" /> Edit
                </li>
                <li
                  className="list-group-item list-group-item-action"
                  onClick={() => btnClicked("delete")}
                >
                  <FontAwesomeIcon icon={faTrash} size="sm" /> Delete
                </li>*/}
              </ul>
            </div>
          </div>
        )}
      </Overlay>
    </>
  );
};

export default CustOverLay;
