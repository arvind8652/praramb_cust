import React from "react";

const CustAlert = (props) => {
  const { data, statusMsg } = props;
  const [show, setShow] = useState(false);
  return (
    <Alert
      variant={statusMsg === "error" ? "danger" : "success"}
      onClose={() => setShow(false)}
      dismissible
    >
      <Alert.Heading>
        {statusMsg === "error"
          ? "Ooh we got an error!!!"
          : "Congratulation... "}
      </Alert.Heading>
      <p>{data}</p>
    </Alert>
  );
};

export default CustAlert;
