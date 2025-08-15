import * as React from "react";
function InputWithLabelAndButton({ id, type, value, onInputChange, children, onBtnClick, btnName }) {
  return (
    <>
      <label htmlFor={id}>{children}</label>
      &nbsp;
      <input id={id} type={type} value={value} onChange={onInputChange} />
      <button htmlFor={id} onClick={onBtnClick}>{btnName}</button>
    </>
  );
}

export default InputWithLabelAndButton;
