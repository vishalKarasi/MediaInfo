// Loading component
import React from "react";

const Loading = () => {
  const loadingContainerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const loadingSpinnerStyle = {
    width: "50px",
    height: "50px",
    border: "5px solid #ccc",
    borderTopColor: "#000",
    borderRadius: "50%",
    animation: "spin 1s infinite linear",
  };

  return (
    <div style={loadingContainerStyle}>
      <div style={loadingSpinnerStyle}></div>
    </div>
  );
};

export default Loading;
