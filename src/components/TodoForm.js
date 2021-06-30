import React from "react";
import { useForm } from "react-hook-form";

const TodoForm = ({ todo, onSubmit }) => {
  const { register, handleSubmit, reset } = useForm({
    defaultValues: { text: todo ? todo.text : "" },
  });

  const submitHandler = handleSubmit((data) => {
    onSubmit(data);
    reset();
  });

  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <span className="plus-add-btn" onClick={submitHandler}>
          +
        </span>

        <input
          {...register("text")}
          type="text"
          name="text"
          id="text"
          placeholder=" enter new todo"
        />
      </div>
    </form>
  );
};

export default TodoForm;
