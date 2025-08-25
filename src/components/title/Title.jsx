import * as React from "react";

function Title({ title, color = "text-white" }) {
  return (
    <h1 className={`text-2xl font-bold  text-center my-4 ${color}`}>{title}</h1>
  );
}

export default Title;
