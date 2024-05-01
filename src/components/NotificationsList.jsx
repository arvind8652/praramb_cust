import React, { useEffect } from "react";
import CustOverLay from "./commonComp/CustOverlay";
import { get } from "../utities/apiServices";
import useSelector from "../store/selector";
import { NOTIFICATION_VIEW, atomNameConst } from "../utities/constants";

const NotificatonsList = (props) => {
  const { setModalFor, setShowModal } = props;
  const { getRecoilVal, setRecoilVal } = useSelector();
  // const [data, setData] = useState([]);
  useEffect(() => {
    let customerId = getRecoilVal(atomNameConst.CUSTOMERDETAIL)?.user?._id;
    const getNotificationsList = async () => {
      const val = await get("notifications");
      setRecoilVal(atomNameConst.NOTIFICATIONS, val?.data);
      // setData(val?.data);
    };
    customerId && getNotificationsList();
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
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-auto">Notification</h4>
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
