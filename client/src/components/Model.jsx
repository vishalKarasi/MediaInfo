import React from "react";

function Model({ type, message }) {
  return type === "error" ? (
    <div className="error">{message}</div>
  ) : (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  );
}

export default Model;
