import React, { useState } from "react";

const TodoForm = ({ onSubmit }) => {
  const [title, setTitle] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!title.trim()) return;
    onSubmit(title);
    setTitle("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter task..."
        value={title}
        onChange={(event) => setTitle(event.target.value)}
      />
      <button type="submit">Add Task</button>
    </form>
  );
};

export default TodoForm;
