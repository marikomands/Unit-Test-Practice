import React from "react";
import { useLocation } from "react-router-dom";

export const SaveSuccess = () => {
  const location = useLocation();
  const message = location.state?.message;
  console.log("location", location.state);
  return (
    <div>
      <h2 style={{ color: "green" }}> Success!</h2>
      {message && <p>{message}</p>}
    </div>
  );
};
