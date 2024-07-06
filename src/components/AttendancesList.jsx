import React, { useEffect, useState } from "react";
import { get } from "../utities/apiServices";
import { CUSTOMER_VIEW, atomNameConst } from "../utities/constants";
import useSelector from "../store/selector";
import { getDate, getDay, getTime } from "../utities/commonFun";
import Attendance from "./forms/Attendance";
import CustDataTable from "./commonComp/CustDataTable";

const AttendancesList = (props) => {
  const [attendanceModalShow, setAttendanceModalShow] = useState(false);
  const { setModalFor, setShowModal } = props;
  const { getRecoilVal, setRecoilVal } = useSelector();
  // useEffect(() => {
  //   const custId = getRecoilVal(atomNameConst.CUSTOMERDETAIL)?.user?._id;
  //   const getCustomersList = async () => {
  //     const val = await get(`attendance/${custId}`);
  //     setRecoilVal(atomNameConst.ATTENDANCE, val?.data);
  //   };
  //   custId && !attendanceModalShow && getCustomersList();
  // }, [attendanceModalShow]);

  const columns = () => {
    return [
      {
        dataField: "id",
        text: "#",
        sort: true,
        columnStyle: { maxWidth: "10px !important" },
      },
      { dataField: "date", text: "Date", sort: true },
      { dataField: "day", text: "Day", sort: true },
      { dataField: "timing", text: "Timing" },
    ];
  };

  const data = () => {
    const dataArr = getRecoilVal(atomNameConst.ATTENDANCE)?.map(
      (val, index) => {
        return {
          id: index + 1,
          date: getDate(val?.in_time),
          day: getDay(val?.in_time),
          timing: `${getTime(val?.in_time)} - ${getTime(val?.out_time)}`,
        };
      }
    );
    return dataArr;
  };

  return (
    <div className="card  shadow p-3 mb-5 bg-white rounded">
      <div className="card-header d-flex justify-content-between">
        <h4 className="my-auto">Attendance Detail</h4>
        {/* <button className="btn btn-primary btn-sm" onClick={props.onClick}> */}
        <button
          className="btn btn-primary btn-sm"
          onClick={() => {
            setAttendanceModalShow(true);
          }}
        >
          Mark Attendance
        </button>
      </div>
      <div className="card-body">
        <CustDataTable columns={columns} data={data} />
      </div>
      <Attendance
        show={attendanceModalShow}
        setAttendanceModalShow={setAttendanceModalShow}
      />
    </div>
  );
};

export default AttendancesList;
