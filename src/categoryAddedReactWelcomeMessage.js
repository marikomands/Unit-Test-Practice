import React, { useState } from "react";
// import WelcomeMessage from "../src/reactComponent";

export default function WelcomeMessage() {
  const [message, setMessage] = useState("Welcome, guest!");
  const [category, setCategory] = useState("Guest");

  const handleLogin = (selectedCategory) => {
    if (selectedCategory === "Admin") {
      setMessage("Welcome back, admin!");
    } else if (selectedCategory === "Member") {
      setMessage("Welcome back, member!");
    } else {
      setMessage("Welcome back!");
    }
    setCategory(selectedCategory);
  };

  return (
    <div>
      <p>{message}</p>
      <p>User Category: {category}</p>

      <button onClick={() => handleLogin("Member")}>Log in as Member</button>
      <button onClick={() => handleLogin("Admin")}>Log in as Admin</button>
      <button onClick={() => handleLogin("Guest")}>Log in as Guest</button>
    </div>
  );
}
