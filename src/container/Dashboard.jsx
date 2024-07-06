import React, { useCallback, useEffect, useState } from "react";
import NotificationsList from "../components/NotificationsList";
import AttendancesList from "../components/AttendancesList";
import CustModal from "../components/commonComp/CustModal";
import {
  ATTENDANCE,
  CHAT,
  LOGIN_FORM,
  NOTIFICATION_VIEW,
  atomNameConst,
} from "../utities/constants";
import Chat from "../components/forms/Chat";
import MemberShipSummary from "../components/MemberShipSummary";
import NotificationView from "../components/forms/NotificationView";
import useSelector from "../store/selector";
import LoginForm from "../components/forms/LoginForm";
import Header from "../components/Header";
import Attendance from "../components/forms/Attendance";
import { get } from "../utities/apiServices";

const Dashboard = () => {
  console.log("cehck function call on dashboard");
  const { setRecoilVal, getRecoilVal } = useSelector();
  const [showModal, setShowModal] = useState(false);
  const [modalFor, setModalFor] = useState("");
  let apicallCount = 0;

  const getAllData = async () => {
    apicallCount = 1;
    let customerId = getRecoilVal(atomNameConst.CUSTOMERDETAIL)?.user?._id;
    (async () => {
      const val = await get("notifications");
      setRecoilVal(atomNameConst.NOTIFICATIONS, val?.data);
    })();
    (async () => {
      const val = await get(`attendance/${customerId}`);
      setRecoilVal(atomNameConst.ATTENDANCE, val?.data);
    })();
    (async () => {
      const val = await get("customerDetail/summary/" + customerId);
      console.log("check dataa---------", val);
      setRecoilVal(atomNameConst.SUMMARY, val?.data);
    })();
  };

  useEffect(() => {
    console.log("check the databashboard");
    if (!getRecoilVal(atomNameConst?.CUSTOMERDETAIL)) {
      setShowModal(true);
      setModalFor(LOGIN_FORM);
    } else {
      console.log("ceh k the dalmckl-------");
      apicallCount === 0 && getAllData();
    }
    return () => {
      setModalFor("");
      setShowModal(false);
    };
  }, []);

  const LoadParticularComp = () => {
    switch (modalFor) {
      case LOGIN_FORM:
        return <LoginForm setShowModal={setShowModal} />;
      case NOTIFICATION_VIEW:
        return (
          <NotificationView
            setShowModal={setShowModal}
            setModalFor={setModalFor}
            formType="view"
          />
        );
      case ATTENDANCE:
        return <Attendance setShowModal={setShowModal} />;

      case CHAT:
        return <Chat setShowModal={setShowModal} />;
      default:
        return <div>We are facing some issue</div>;
    }
  };

  const loadParticularTitle = () => {
    switch (modalFor) {
      case LOGIN_FORM:
        return "Login Form";
      case NOTIFICATION_VIEW:
        return "Notification View";
      case ATTENDANCE:
        return "Attendance";
      case CHAT:
        return "Message to Admin";
      default:
        break;
    }
  };

  return (
    <>
      <Header setShowModal={setShowModal} setModalFor={setModalFor} />
      <div className="container  p-3">
        <MemberShipSummary />
        <div className="row">
          <div className="col-12 col-md-8">
            <AttendancesList
              setShowModal={setShowModal}
              setModalFor={setModalFor}
              onClick={() => {
                setShowModal(true);
                setModalFor(ATTENDANCE);
              }}
            />
          </div>
          <div className="col-12 col-md-4">
            <NotificationsList
              setShowModal={setShowModal}
              setModalFor={setModalFor}
              onHide={() => {
                setShowModal(false);
              }}
              onClick={() => {
                setShowModal(true);
                setModalFor(CHAT);
              }}
            />
          </div>
        </div>
        <CustModal
          show={showModal}
          onHide={() => {
            setShowModal(false);
            setRecoilVal(atomNameConst.NOTIFICATIONSINGLEDATA, null);
          }}
          children={<LoadParticularComp />}
          modalFor={modalFor}
          title={loadParticularTitle()}
          size={modalFor === ATTENDANCE ? "md" : "lg"}
          defaultCloseBtn={modalFor === LOGIN_FORM ? false : true}
        />
      </div>
    </>
  );
};

export default Dashboard;
