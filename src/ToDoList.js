import React, { useState } from "react";

const TodoList = () => {
  const [tasks, setTasks] = useState([
    { id: 1, text: "Learn React", done: false },
    { id: 2, text: "Write unit tests", done: false },
    { id: 3, text: "Drink coffee", done: true },
  ]);

  const toggleDone = (id) => {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task
      )
    );
  };

  const doneCount = tasks.filter((t) => t.done).length;

  return (
    <div>
      <h2>My Tasks</h2>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <label
              style={{ textDecoration: task.done ? "line-through" : "none" }}
            >
              <input
                type="checkbox"
                checked={task.done}
                onChange={() => toggleDone(task.id)}
              />
              {task.text}
            </label>
          </li>
        ))}
      </ul>
      <p>
        {doneCount === tasks.length
          ? "All tasks completed! 🎉"
          : `${doneCount} of ${tasks.length} tasks done`}
      </p>
    </div>
  );
};

export default TodoList;
