import React, { memo, useCallback } from "react";

function Button(props) {
  const { label, icon, type, disabled, onClick, className } = props;
  const handleClick = useCallback(onClick, [onClick]);
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={handleClick}
      className={className}
    >
      {icon && <div className="btnIcon">{icon}</div>}
      {label && <div className="btnLabel">{label}</div>}
    </button>
  );
}

export default memo(Button);
