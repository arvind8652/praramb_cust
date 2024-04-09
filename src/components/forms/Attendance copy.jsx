import React, { useState } from "react";
import CustQRScanner from "../commonComp/CustQRScanner";
import { post } from "../../utities/apiServices";

const Attendance = () => {
  const [errorResp, setErrorResp] = useState(null);
  const attendanceApi = async (data) => {
    setErrorResp(null);
    const reqData = {
      custId: getRecoilVal(atomNameConst.CUSTOMERDETAIL)?._id,
      deviceData: data,
    };
    try {
      const res = await post(`attendance/add`, reqData);
      if (res.status === 200) {
        const result = res.json();
      }
    } catch (error) {
      if (typeof error === "object") {
        let errorMsg = await error.json();
        setErrorResp(errorMsg?.data);
      }
    }
  };

  const handleScannedResult = (data) => {
    attendanceApi(data);
  };

  return (
    <div>
      <CustQRScanner
        handleScannedResult={handleScannedResult}
        errorResp={errorResp}
      />
    </div>
  );
};

export default Attendance;
