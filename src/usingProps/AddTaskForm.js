import React, { useState } from "react";
//   test if onAdd(text) is called with some input
const AddTaskForm = ({ onAdd }) => {
  const [text, setText] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (text.trim() === "") {
      setError("Task cannot be empty");
      return;
    }
    onAdd(text);
    setText("");
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        placeholder="Enter task"
        value={text}
        onChange={(e) => setText(e.target.value)}
      />
      <button type="submit">Add</button>
      {error && <p role="alert">{error}</p>}
    </form>
  );
};
export default AddTaskForm;
