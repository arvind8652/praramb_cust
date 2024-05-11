import { useRecoilState } from "recoil";
import {
  attendance,
  chat,
  customerDetail,
  customerSingleData,
  customers,
  loginDetail,
  notificationSingleData,
  notifications,
  summary,
} from "../atoms";
import { atomNameConst } from "../../utities/constants";

const useSelector = () => {
  const [notificationsVal, setNotificationsVal] = useRecoilState(notifications);
  const [notificationSingleDataVal, setNotificationSingleDataVal] =
    useRecoilState(notificationSingleData);
  const [customersVal, setCustomersVal] = useRecoilState(customers);
  const [customerSingleDataVal, setCustomerSingleDataVal] =
    useRecoilState(customerSingleData);
  const [summaryVal, setSummaryVal] = useRecoilState(summary);
  const [loginDetailVal, setLoginDetailVal] = useRecoilState(loginDetail);
  const [attendanceVal, setAttendanceVal] = useRecoilState(attendance);
  const [customerDetailVal, setCustomerDetailVal] =
    useRecoilState(customerDetail);
  const [chatVal, setChatVal] = useRecoilState(chat);

  const getRecoilVal = (atomName) => {
    switch (atomName) {
      case atomNameConst.NOTIFICATIONS:
        return notificationsVal;
      case atomNameConst.NOTIFICATIONSINGLEDATA:
        return notificationSingleDataVal;
      case atomNameConst.CUSTOMERS:
        return customersVal;
      case atomNameConst.CUSTOMERSINGLEDATA:
        return customerSingleDataVal;
      case atomNameConst.SUMMARY:
        return summaryVal;
      case atomNameConst.LOGINDETAIL:
        return loginDetailVal;
      case atomNameConst.ATTENDANCE:
        return attendanceVal;
      case atomNameConst.CUSTOMERDETAIL:
        return customerDetailVal;
      case atomNameConst.CHAT:
        return chatVal;
      default:
        throw new Error(`Unknown atom name:${atomName}`);
    }
  };

  const setRecoilVal = (atomName, data) => {
    switch (atomName) {
      case atomNameConst.NOTIFICATIONS:
        setNotificationsVal(data);
        break;
      case atomNameConst.NOTIFICATIONSINGLEDATA:
        setNotificationSingleDataVal(data);
        break;
      case atomNameConst.CUSTOMERS:
        setCustomersVal(data);
        break;
      case atomNameConst.CUSTOMERSINGLEDATA:
        setCustomerSingleDataVal(data);
        break;
      case atomNameConst.SUMMARY:
        setSummaryVal(data);
        break;
      case atomNameConst.LOGINDETAIL:
        setLoginDetailVal(data);
        break;
      case atomNameConst.ATTENDANCE:
        setAttendanceVal(data);
        break;
      case atomNameConst.CUSTOMERDETAIL:
        setCustomerDetailVal(data);
        break;
      case atomNameConst.CHAT:
        setChatVal(data);
        break;
      default:
        throw new Error(`Unknown atom name:${atomName}`);
    }
  };

  return { getRecoilVal, setRecoilVal };
};

export default useSelector;
