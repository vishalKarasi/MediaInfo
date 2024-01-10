import React from "react";

function Model({ type, messaage }) {
  return type === "error" ? (
    <div className="error">{messaage}</div>
  ) : (
    <div className="loading">
      <div className="spinner"></div>
    </div>
  );
}

export default Model;
