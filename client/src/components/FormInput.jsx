import React, { memo, useState } from "react";

function FormInput(props) {
  const { label, icon, errorMessage, pattern, ...input } = props;
  const [error, setError] = useState(false);

  return (
    <div className="inputBox">
      <div className="inputField">
        <input
          className="input"
          {...input}
          pattern={pattern}
          onFocus={() => setError(true)}
          onBlur={() => setError(false)}
          autoComplete="off"
          required
        />
        {label && <label className="inputLabel">{label}</label>}
        {icon && <div className="icon">{icon}</div>}
      </div>

      {error && <p className="inputError">{errorMessage}</p>}
    </div>
  );
}

export default memo(FormInput);
