import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CustCard = (props) => {
  const { icon, data, text, cardColor = "white" } = props;
  return (
    <div
      className={`card text-center p-3 mb-5 rounded`}
      style={{
        backgroundColor: cardColor,
      }}
    >
      <div className="card-body p-0">
        <h6
          className="card-text text-uppercase font-weight-bold"
          style={{ fontWeight: 700 }}
        >
          {text}
        </h6>
        <hr />
        <h5 className="card-title d-flex justify-content-around align-items-end">
          {icon && <FontAwesomeIcon icon={icon} size="3x" {...props} />}
          {/* {data && <h3>{data}</h3>} */}
          {data && <p style={{ fontSize: "1.5rem" }}>{data}</p>}
        </h5>
      </div>
    </div>
  );
};

export default CustCard;
