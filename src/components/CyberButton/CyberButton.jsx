import React from "react";
import "./CyberButton.css";

function CyberButton({ className, text, onClick }) {
  return (
    <div className={className} onClick={onClick} role="button">
      <div className="GlitchButtonWidth text-center GlitchButtonStyle">
        <span></span>
        <span></span>
        <span></span>
        <span></span>
        {text}
      </div>
    </div>
  );
}

export default CyberButton;
