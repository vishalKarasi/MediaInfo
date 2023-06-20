// Error component
import React from "react";

const Error = ({ error }) => {
  const errorContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
    color: "red",
    fontSize: "24px",
  };

  return <div style={errorContainerStyle}>{error}</div>;
};

export default Error;
