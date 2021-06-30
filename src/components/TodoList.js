import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteTodo, getTodos, updateTodo, createTodo } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import TodoForm from "./TodoForm";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([{ text: "", isComplete: false }]);
  const pencil = <FontAwesomeIcon icon={faPencilAlt} />;
  const deleteButton = <FontAwesomeIcon icon={faMinusCircle} />;

  useEffect(() => {
    const fetchItems = async () => {
      const todos = await getTodos();
      setTodoItems(todos);
    };
    fetchItems();
  }, []);

  const handleDelete = async (todo) => {
    await deleteTodo(todo);
    const todos = await getTodos();
    setTodoItems(todos);
  };

  const handleCheck = async (todo, index) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].isComplete = !newTodoItems[index].isComplete;
    setTodoItems(newTodoItems);
    const id = todo._id;
    const newTodo = newTodoItems[index];
    await updateTodo(newTodo, id);
  };

  const onSubmit = async (data) => {
    if (data.text) {
      const newTodo = { ...data, isComplete: false };
      await createTodo(newTodo);
      const fetchItems = async () => {
        const todos = await getTodos();
        setTodoItems(todos);
      };
      fetchItems();
    }
  };

  return (
    <div>
      <h1>Todo List</h1>
      <div className="container">
        <table>
          <tbody>
            {todoItems.map((todo, index) => (
              <tr key={todo._id} index={index}>
                <td>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.isComplete}
                    onChange={() => handleCheck(todo, index)}
                  />
                </td>
                <td className="text-cell">
                  <span className={todo.isComplete ? "strike" : ""}>
                    {todo.text}
                  </span>
                </td>
                <td>
                  <Link className="pencil" to={`/edit/${todo._id}`}>
                    {pencil}
                  </Link>
                </td>
                <td>
                  <span
                    className="delete-button"
                    onClick={() => handleDelete(todo)}
                  >
                    {deleteButton}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div>
          <TodoForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
