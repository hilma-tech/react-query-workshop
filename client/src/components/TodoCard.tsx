import { clsx } from "clsx";
import axios from "axios";
import { Todo } from "../common/types/todo.interface";
import { Dispatch, SetStateAction } from "react";

export interface TodoCardProps {
  todo: Todo;
  setTodos: Dispatch<SetStateAction<Todo[]>>;
  index: number;
}

export function TodoCard(props: TodoCardProps) {
  const disabled = props.todo.id <= 0;

  async function checkTodo(isChecked: boolean) {
    await axios.put(`/api/todos/${props.todo.id}`, {
      completed: isChecked,
    });

    props.setTodos((prev) => {
      const newTodo = [...prev];
      newTodo.splice(props.index, 1, {
        ...prev[props.index],
        completed: isChecked,
      });
      return newTodo;
    });
  }

  async function deleteTodo() {
    await axios.delete(`/api/todos/${props.todo.id}`);

    props.setTodos((prev) => {
      const newTodo = [...prev];
      newTodo.splice(props.index);
      return newTodo;
    });
  }

  function handleTodoClick(event: React.ChangeEvent<HTMLInputElement>) {
    checkTodo(event.currentTarget.checked);
  }

  return (
    <div className={clsx("todo-card", disabled && "disabled")}>
      <input
        type="checkbox"
        className="todo-completed"
        checked={props.todo.completed}
        onChange={handleTodoClick}
        disabled={disabled}
      />

      <p className={clsx("todo-text", props.todo.completed && "completed")}>
        {props.todo.body}
      </p>

      <button onClick={deleteTodo}>Delete</button>
    </div>
  );
}
