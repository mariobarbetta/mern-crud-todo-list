import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import TodoForm from "./TodoForm";

const EditTodo = () => {
  const [todo, setTodo] = useState();

  useEffect(() => {
    setTodo({
      text: "foo",
    });
  }, []);

  const onSubmit = (data) => {
    alert(JSON.stringify(data));
  };

  return todo ? (
    <div>
      <h2>Edit Todo Item</h2>
      <div className="container">
        <div>
          <TodoForm todo={todo} onSubmit={onSubmit} />
        </div>
      </div>
      <nav>
        <ul>
          <li>
            <Link to="/">Todo List</Link>
          </li>
        </ul>
      </nav>
    </div>
  ) : (
    <div>Loading...</div>
  );
};

export default EditTodo;
