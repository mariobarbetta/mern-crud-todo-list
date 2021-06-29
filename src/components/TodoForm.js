import React from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

const TodoForm = ({ todo, onSubmit }) => {
  const { register, handleSubmit } = useForm({
    defaultValues: { text: todo ? todo.text : "" },
  });

  const history = useHistory();

  const submitHandler = handleSubmit((data) => {
    onSubmit(data);
    history.push("/");
  });

  return (
    <form onSubmit={submitHandler}>
      <div className="form-container">
        <span className="plus-add-btn" onClick={submitHandler}>
          +
        </span>

        <input
          {...register}
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
