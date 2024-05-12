import React, { useEffect } from "react";
import { Button, Col, Row } from "react-bootstrap";
import Form from "react-bootstrap/Form";
import CustInputField from "../commonComp/CustInputField";
import CustTextAreaField from "../commonComp/CustTextAreaField";
import * as formik from "formik";
import { chatInitialData, chatSchema } from "../../utities/utilities";
import { get, post, put } from "../../utities/apiServices";
import useSelector from "../../store/selector";
import { atomNameConst } from "../../utities/constants";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { getTime } from "../../utities/commonFun";

const Chat = (props) => {
  const { setShowModal, formType } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();
  const customerDetail = getRecoilVal(atomNameConst.CUSTOMERDETAIL);
  const messageDetail = getRecoilVal(atomNameConst.CHAT);

  const handlePostApiForChat = async (data) => {
    const reqData = {
      senderId: customerDetail?.user?._id,
      receiverId: "admin",
      message: data?.chat,
    };
    const completeMsgList = [...messageDetail];
    try {
      const resp = await post("chat/add", reqData);
      // const resp =
      //   formType === "edit"
      //     ? await put(
      //         `notifications/edit/${notificationDataForEdit?._id}`,
      //         data
      //       )
      //     : await post("notifications/add", data);
      completeMsgList.push(reqData);
      setRecoilVal(atomNameConst.CHAT, completeMsgList);

      console.log("check data-----", reqData);
      return true;
    } catch (error) {
      console.log("error-------", error.message);
      return false;
    }
  };

  const MessageContainer = ({ data }) => {
    return (
      <>
        <p
          style={{
            backgroundColor: "lightgray",
            display: "inline-block",
            borderRadius: "4px",
            padding: "0px 5px 0px 5px",
          }}
        >
          <p style={{ marginBottom: "1px" }}>
            {data?.message}
            <sub style={{ marginLeft: "5px" }}>
              {getTime(data?.createdAt, "chat")}
            </sub>
          </p>
        </p>
      </>
    );
  };

  const SendMessages = ({ data }) => (
    <div style={{ textAlign: "right" }}>
      <MessageContainer data={data} />
    </div>
  );
  const ReceivedMessages = ({ data }) => (
    <div style={{ textAlign: "left" }}>
      <MessageContainer data={data} />
    </div>
  );
  return (
    <Formik
      validationSchema={chatSchema}
      onSubmit={async (values, { setSubmitting }) => {
        const response = await handlePostApiForChat(values);
        response ? setSubmitting(true) : setSubmitting(false);
      }}
      initialValues={chatInitialData}
    >
      {({ handleSubmit, handleChange, values }) => (
        <Form
          noValidate
          onSubmit={handleSubmit}
          style={{ padding: "0 15px 0 15px" }}
        >
          <Row>
            {messageDetail &&
              messageDetail?.map((data) => {
                if (data?.receiverId === "admin") {
                  return <SendMessages data={data} />;
                } else {
                  return <ReceivedMessages data={data} />;
                }
              })}
          </Row>
          <hr />
          <Row>
            <Col md={11} sm={11} xs={11}>
              <CustInputField
                type={"text"}
                name={"chat"}
                onChange={handleChange}
                value={values?.chat}
              />
            </Col>
            <Col
              md={1}
              sm={1}
              xs={1}
              style={{
                backgroundColor: values?.chat ? "greenyellow" : "grey",
                borderRadius: "50%",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: values?.chat ? "pointer" : "not-allowed",
              }}
              onClick={handleSubmit}
            >
              <FontAwesomeIcon icon={faPaperPlane} size="1x" />
            </Col>
          </Row>
        </Form>
      )}
    </Formik>
  );
};

export default Chat;
