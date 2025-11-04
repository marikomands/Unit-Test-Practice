import React from "react";
import { useLocation } from "react-router-dom";

export const SaveErrorWithoutUseLocation = () => {
  const location = useLocation();
  const message = location.state?.message;
  return (
    <div>
      <h2 style={{ color: "green" }}> Failed...</h2>
      {message && <p>{message}</p>}
    </div>
  );
};
