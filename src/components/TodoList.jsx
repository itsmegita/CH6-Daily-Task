import React from "react";

const TodoList = ({ todos, onDelete }) => {
  const handleDelete = (id) => {
    onDelete(id);
  };

  return (
    <ul>
      {todos.map((todo) => (
        <li key={todo.id} className="todo-item">
          <span>{todo.title}</span>
          <button
            className="delete-button"
            onClick={() => handleDelete(todo.id)}
          >
            Delete
          </button>
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
