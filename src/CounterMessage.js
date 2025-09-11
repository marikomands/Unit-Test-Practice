import React, { useState } from "react";

const CounterMessage = () => {
  const [count, setCount] = useState(0);

  const handleClick = () => {
    setCount((prev) => prev + 1);
  };

  const getMessage = () => {
    if (count >= 5) return "High count!";
    if (count >= 1) return "Keep going!";
    return "Start clicking!";
  };

  return (
    <div>
      <p>Count: {count}</p>
      <p>{getMessage()}</p>
      <button onClick={handleClick}>Increment</button>
    </div>
  );
};

export default CounterMessage;
