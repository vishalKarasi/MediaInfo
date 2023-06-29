import React, { memo, useCallback } from "react";

function Button({ button }) {
  const { label, icon, type, onClick, className } = button;
  const handleClick = useCallback(onClick, [onClick]);
  return (
    <button type={type} onClick={handleClick} className={className}>
      {icon && <div className="btnIcon">{icon}</div>}
      {label && <div className="btnLabel">{label}</div>}
    </button>
  );
}

export default memo(Button);
