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

const Chat = (props) => {
  const { setShowModal, formType } = props;
  const { Formik } = formik;
  const { setRecoilVal, getRecoilVal } = useSelector();
  const customerDetail = getRecoilVal(atomNameConst.CUSTOMERDETAIL);
  const messageDetail = getRecoilVal(atomNameConst.CHAT);

  const getMessages = async () => {
    try {
      const resp = await get(`chat/getMessages/${customerDetail?.user?._id}`);
      console.log("check the resp--------", resp);
      setRecoilVal(atomNameConst?.CHAT, resp?.data);
    } catch (error) {}
  };

  useEffect(() => {
    // getMessages();
    console.log("we are facing issue continuos calling");
  }, []);

  const handlePostApiForChat = async (data) => {
    const reqData = {
      senderId: customerDetail?.user?._id,
      receiverId: "admin",
      message: data?.chat,
    };
    try {
      const resp = await post("chat/add", reqData);
      // const resp =
      //   formType === "edit"
      //     ? await put(
      //         `notifications/edit/${notificationDataForEdit?._id}`,
      //         data
      //       )
      //     : await post("notifications/add", data);
      setRecoilVal(atomNameConst.CHAT, reqData);
      console.log("check data-----", reqData);
      return true;
    } catch (error) {
      console.log("error-------", error.message);
      return false;
    }
  };

  const SendMessages = ({ msg }) => (
    <div style={{ textAlign: "right" }}>{msg}</div>
  );
  const ReceivedMessages = ({ msg }) => (
    <div style={{ textAlign: "left", color: "grey" }}>{msg}</div>
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
            {messageDetail?.map((data) => {
              if (data?.senderId === customerDetail?.user?._id) {
                <ReceivedMessages msg={messageDetail?.message} />;
              } else {
                <SendMessages msg={messageDetail?.message} />;
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
