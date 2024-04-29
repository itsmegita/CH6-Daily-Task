import React, { useState } from "react";

const Modal = ({ onSubmit, onClose }) => {
  const [title, setTitle] = useState("");

  const handleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleSubmit = () => {
    onSubmit(title);
    setTitle("");
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <input type="text" value={title} onChange={handleChange} />
        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default Modal;
