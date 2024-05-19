import React, { useEffect, useState } from "react";
import CustOverLay from "./commonComp/CustOverlay";
import { get } from "../utities/apiServices";
import useSelector from "../store/selector";
import { NOTIFICATION_VIEW, atomNameConst } from "../utities/constants";

const NotificatonsList = (props) => {
  const { setModalFor, setShowModal } = props;
  const { getRecoilVal, setRecoilVal } = useSelector();
  // const [data, setData] = useState([]);

  const [newMsgCount, setNewMsgCount] = useState(0);

  const getMessages = async (customerId) => {
    try {
      const resp = await get(`chat/getMessages/${customerId}`);
      setNewMsgCount(resp.data.filter((val) => !val?.messageRead)?.length);
      console.log("check the value=========", newMsgCount);
      setRecoilVal(atomNameConst?.CHAT, resp?.data);
    } catch (error) {}
  };
  useEffect(() => {
    let customerId = getRecoilVal(atomNameConst.CUSTOMERDETAIL)?.user?._id;
    const getNotificationsList = async () => {
      const val = await get("notifications");
      setRecoilVal(atomNameConst.NOTIFICATIONS, val?.data);
      // setData(val?.data);
    };

    customerId && getNotificationsList();
    customerId && getMessages(customerId);
  }, []);

  const handleClick = (clickEvent, data) => {
    switch (clickEvent) {
      case "view":
        {
          setModalFor(NOTIFICATION_VIEW);
          setShowModal(true);
          setRecoilVal(atomNameConst.NOTIFICATIONSINGLEDATA, data);
        }
        break;
      default:
        break;
    }
  };
  return (
    <div className="card  shadow p-3 mb-5 bg-white rounded">
      <div
        style={{ position: "relative" }}
        className="card-header d-flex justify-content-between"
      >
        <h4 className="my-auto">Notification</h4>
        <button className="btn btn-primary btn-sm" onClick={props.onClick}>
          Message to Admin
        </button>
        <p
          style={{
            position: "absolute",
            right: "10px",
            padding: "0 4px 0 4px",
            top: "-5px",
            background: "lightGreen",
            borderRadius: "10px",
            display: newMsgCount < 1 && "none",
          }}
        >
          {newMsgCount}
        </p>
      </div>
      <ul className="list-group list-group-flush">
        {getRecoilVal(atomNameConst.NOTIFICATIONS)?.map((val) => {
          return (
            <li
              key={val._id}
              className="list-group-item list-group-item-action d-flex justify-content-between"
            >
              {val.title}
              <CustOverLay handleClick={handleClick} data={val} />
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default NotificatonsList;
