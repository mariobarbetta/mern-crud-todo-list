import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const EditTodo = () => {
  return (
    <div className="todo-form-container">
      <div>
        <h2>Edit Todo Item</h2>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Todo List</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default EditTodo;
