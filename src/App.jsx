import React, { useState, useEffect } from "react";
import TodoList from "./components/TodoList";
import Modal from "./components/Modal";
import Error from "./components/Error";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchTodos = async () => {
      setLoading(true);
      try {
        const response = await fetch("http://localhost:3000/todos");
        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }
        const data = await response.json();
        setTodos(data.todos);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, []);

  const handleAddTodo = async (title) => {
    try {
      const response = await fetch("http://localhost:3000/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ title }),
      });
      if (!response.ok) {
        throw new Error("Failed to add todo");
      }
      const data = await response.json();
      setTodos([...todos, data.newTodo]);
      setShowModal(false);
    } catch (error) {
      setError(error.message);
    }
  };

  const handleDeleteTodo = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/todos/${id}`, {
        method: "DELETE",
      });
      if (!response.ok) {
        throw new Error("Failed to delete todo");
      }
      setTodos(todos.filter((todo) => todo.id !== id));
    } catch (error) {
      setError(error.message);
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="app">
      <header className="header">
        <h1>My To-Do List</h1>
      </header>
      {loading && <p>Loading...</p>}
      {error && <Error message={error} />}
      <TodoList todos={todos} onDelete={handleDeleteTodo} />
      {showModal && (
        <Modal onSubmit={handleAddTodo} onClose={closeModal}>
          <button className="close-modal-button" onClick={closeModal}>
            Close
          </button>
        </Modal>
      )}
      <button className="add-task-button" onClick={openModal}>
        Add Task
      </button>
    </div>
  );
};

export default App;
