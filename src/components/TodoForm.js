import React from "react";
import { useForm } from "react-hook-form";
import { hideAddTodo } from "../panel-slide";

const TodoForm = ({ todo, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { text: todo ? todo.text : "" },
  });

  const submitHandler = handleSubmit((data) => {
    onSubmit(data);
    reset();
    hideAddTodo();
  });

  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <input
          {...register("text")}
          type="text"
          name="text"
          id="text"
          placeholder=" enter new todo"
          autoComplete="off"
        />

        <span className="add-todo-container__add-btn" onClick={submitHandler}>
          save
        </span>
      </div>
    </form>
  );
};

export default TodoForm;
