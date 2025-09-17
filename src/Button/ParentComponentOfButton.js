import React, { useState } from "react";
import Button from "./Button";

const ParentComponent = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const [label, setLabel] = useState("Click me");

  const handleClick = () => {
    console.log("Button was clicked!");
    setIsDisabled((prev) => !prev); // true → false → true と切り替える
    setLabel((prev) => (prev === "Click me" ? "Clicked" : "Click me")); // ラベルも切り替える
  };
  const handleReset = () => {
    console.log("Reset button was clicked!");
    setIsDisabled(false);
    setLabel("Click me");
  };

  return (
    <div>
      <h1>Welcome</h1>
      <Button label={label} onClick={handleClick} disabled={isDisabled} />
      <Button label="Reset" onClick={handleReset} disabled={false} />
    </div>
  );
};

export default ParentComponent;
