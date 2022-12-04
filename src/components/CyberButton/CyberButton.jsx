import React from "react";
import "./CyberButton.css";

function CyberButton({ className, text, onClick }) {
  return (
    <div
      className={className}
      onClick={onClick}
      role="button"

    >
      <a href="#" className="GlitchButtonWidth text-center">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {text}
      </a>
    </div>
  );
}

export default CyberButton;
