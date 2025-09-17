import React from "react";

const Button = ({ label, onClick, disabled }) => (
  <button onClick={onClick} disabled={disabled}>
    {label}
  </button>
);
export default Button;
