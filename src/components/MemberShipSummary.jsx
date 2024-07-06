import React, { useEffect, useState } from "react";
import { get } from "../utities/apiServices";
import CustCard from "./commonComp/CustCard";
import {
  faClipboardUser,
  faClockRotateLeft,
  faPerson,
} from "@fortawesome/free-solid-svg-icons";
import useSelector from "../store/selector";
import { atomNameConst } from "../utities/constants";

const MemberShipSummary = () => {
  const { getRecoilVal, setRecoilVal } = useSelector();
  const [data, setData] = useState({});
  const summary = getRecoilVal(atomNameConst?.SUMMARY);
  // useEffect(() => {
  //   const customerId = getRecoilVal(atomNameConst.CUSTOMERDETAIL)?.user?._id;
  //   const getMeberShipDetail = async () => {
  //     const val = await get("customerDetail/summary/" + customerId);

  //     // const val = await get("customers/summary");
  //     console.log("check dataa---------", val);
  //     setRecoilVal(atomNameConst.SUMMARY, val?.data);

  //     // setData(val?.data);
  //   };

  //   customerId && getMeberShipDetail();
  // }, []);

  let iconColor = "#63E6BE";
  let cardColor = "#A5D6A7";
  const currentStatus = () => {
    const maxCapacity = getRecoilVal(atomNameConst.CUSTOMERDETAIL)?.brandDetail
      ?.maxCapacity;
    const percentage = (summary?.totalActiveCustomer / maxCapacity) * 100;
    if (percentage > 75) {
      iconColor = "red";
      cardColor = "#F1BBBA";
      return "Dense Crowd";
    } else if (percentage > 50) {
      iconColor = "orange";
      cardColor = "#FFCC80";
      return "Moderate Crowd";
    } else {
      return "Sparse Crowd";
    }
  };

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <CustCard
            icon={faPerson}
            text="Current Status"
            data={currentStatus()}
            style={{ color: iconColor }}
            cardColor={cardColor}
          />
        </div>
        <div className="col">
          <CustCard
            icon={faClockRotateLeft}
            data={summary?.endDateVal}
            text="Last Date"
          />
        </div>
        <div className="col">
          <CustCard
            icon={faClipboardUser}
            data={summary?.attendanceVal}
            text="Attendance"
          />
        </div>
      </div>
    </>
  );
};

export default MemberShipSummary;
