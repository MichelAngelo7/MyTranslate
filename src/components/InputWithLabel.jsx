import * as React from "react";
function InputWithLabel({ id, type, value, onInputChange, children }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input id={id} type={type} value={value} onChange={onInputChange} />
    </>
  );
}

export default InputWithLabel;
