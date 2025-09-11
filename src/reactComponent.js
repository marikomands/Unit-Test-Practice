import React from "react";
import { useState } from "react";

export default function WelcomeMessage() {
  const [message, setMessage] = useState("Welcome, guest!");
  return (
    <div>
      <p>{message}</p>
      <button onClick={() => setMessage("Welcome back!")}>Log in</button>{" "}
    </div>
  );
}
