import React from "react";
import "./Button.css";

function ButtonSeries({ className, text, onClick }) {
  return (
    <button className={className} onClick={onClick}>
      {text}
    </button>
  );
}

export default ButtonSeries;
