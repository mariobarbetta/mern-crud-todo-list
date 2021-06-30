import React, { useEffect, useState } from "react";
import { useHistory, useRouteMatch } from "react-router-dom";
import { getTodo, updateTodo } from "../api";
import TodoForm from "./TodoForm";
import { Link } from "react-router-dom";

const EditTodo = () => {
  const match = useRouteMatch();
  const [todo, setTodo] = useState();
  const history = useHistory();

  useEffect(() => {
    const fetchTodo = async () => {
      const todo = await getTodo(match.params.id);
      setTodo(todo);
      console.log(todo);
    };
    fetchTodo();
  }, []);

  const onSubmit = async (data) => {
    await updateTodo(data, match.params.id);
    history.push("/");
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
