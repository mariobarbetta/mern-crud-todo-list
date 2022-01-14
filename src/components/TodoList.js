import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { deleteTodo, getTodos, updateTodo, createTodo } from "../api";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faMinusCircle } from "@fortawesome/free-solid-svg-icons";
import TodoForm from "./TodoForm";
import { showAddTodo } from "../panel-slide";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([
    { text: "", isComplete: false, hideTools: true },
  ]);

  const pencil = <FontAwesomeIcon icon={faPencilAlt} />;
  const deleteButton = <FontAwesomeIcon icon={faMinusCircle} />;

  useEffect(() => {
    const fetchItems = async () => {
      const todos = await getTodos();
      setTodoItems(todos);
      console.log(todos);
      console.log(todos[0].hideTools);
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

  const showOptions = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].hideTools = false;
    setTodoItems(newTodoItems);
  };

  const hideOptions = (index) => {
    const newTodoItems = [...todoItems];
    newTodoItems[index].hideTools = true;
    setTodoItems(newTodoItems);
  };

  const handleAddPanelSlide = () => {
    showAddTodo();
  };

  const onSubmit = async (data) => {
    if (data.text) {
      const newTodo = { ...data, isComplete: false, hideTools: true };
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
      <div className="container">
        <div className="circle">
          <h1>Todo</h1>
        </div>
        <div className="the-word-list">List</div>
        <table id="table">
          <tbody id="tBody">
            {todoItems.map((todo, index) => (
              <tr
                key={todo._id}
                index={index}
                onMouseEnter={() => showOptions(index)}
                onMouseLeave={() => hideOptions(index)}
              >
                <td>
                  <input
                    className={
                      todo.hideTools || todo.hideTools === undefined
                        ? "checkbox hide"
                        : ""
                    }
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
                  <Link
                    className={
                      todo.hideTools || todo.hideTools === undefined
                        ? "pencil hide"
                        : "pencil"
                    }
                    to={`/edit/${todo._id}`}
                  >
                    {pencil}
                  </Link>
                </td>
                <td>
                  <span
                    className={
                      todo.hideTools || todo.hideTools === undefined
                        ? "delete-button hide"
                        : "delete-button"
                    }
                    onClick={() => handleDelete(todo)}
                  >
                    {deleteButton}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="plus-add-btn">
          <span onClick={() => handleAddPanelSlide()}>+</span>
        </div>
        <div className="add-todo-container">
          <h2>Add a todo</h2>
          <TodoForm onSubmit={onSubmit} />
        </div>
      </div>
    </div>
  );
};

export default TodoList;
