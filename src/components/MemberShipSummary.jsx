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
  useEffect(() => {
    const getMeberShipDetail = async () => {
      const val = await get("customers/summary");
      setRecoilVal(atomNameConst.SUMMARY, val?.data?.[0]);

      // setData(val?.data);
    };
    getMeberShipDetail();
  }, []);

  return (
    <>
      <div className="row text-center">
        <div className="col">
          <CustCard
            icon={faPerson}
            text="Current Status"
            data={"Medium"}
            style={{ color: "#63E6BE" }}
          />
        </div>
        <div className="col">
          <CustCard
            icon={faClockRotateLeft}
            data={"31/12/2024"}
            text="Last Date"
          />
        </div>
        <div className="col">
          <CustCard
            icon={faClipboardUser}
            data={"31 / 365"}
            text="Attendance"
          />
        </div>
      </div>
    </>
  );
};

export default MemberShipSummary;
