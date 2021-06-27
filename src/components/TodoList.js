import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencilAlt, faMinusCircle } from "@fortawesome/free-solid-svg-icons";

const TodoList = () => {
  const [todoItems, setTodoItems] = useState([{ text: "", isComplete: false }]);
  const pencil = <FontAwesomeIcon icon={faPencilAlt} />;
  const deleteButton = <FontAwesomeIcon icon={faMinusCircle} />;

  useEffect(() => {
    setTodoItems([
      {
        text: "Item 1",
        isComplete: false,
        id: 0,
      },
      {
        text: "Item 2",
        isComplete: false,
        id: 1,
      },
    ]);
  }, []);
  return (
    <div>
      <h1>Todo List</h1>
      <div className="list-container">
        <table>
          <tbody>
            {todoItems.map((todo, index) => (
              <tr key={todo.id} index={index}>
                <td>
                  <input
                    className="checkbox"
                    type="checkbox"
                    checked={todo.isComplete}
                    // onChange={() => handleCheck(todo, index)}
                  />
                </td>
                <td className="text-cell">{todo.text}</td>
                <td>
                  <Link className="pencil" to={`/edit/${todo._id}`}>
                    {pencil}
                  </Link>
                </td>
                <td>
                  <span
                    className="delete-button"
                    // onClick={() => handleDelete(todo)}
                  >
                    {deleteButton}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TodoList;
