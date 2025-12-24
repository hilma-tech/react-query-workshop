import { clsx } from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "../common/types/todo.interface";

export interface TodoCardProps {
  todo: Todo;
  index: number;
}

export function TodoCard(props: TodoCardProps) {
  const disabled = props.todo.id <= 0;

  const queryClient = useQueryClient();

  // The following mutations are using the "simple" (pessimistic) approach
  // for mutating and updating the state.
  // Example for the optimistic approach, see the `AddTodo` component.

  const completed = useMutation({
    mutationKey: ["todo-completed", props.todo.id],
    async mutationFn(isChecked: boolean) {
      await axios.put(`/api/todos/${props.todo.id}`, {
        completed: isChecked,
      });
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError(err: unknown) {
      console.error(err);
      alert("אירעה שגיאה...");
    },
  });

  const deleted = useMutation({
    mutationKey: ["todo-deleted", props.todo.id],
    async mutationFn() {
      await axios.delete(`/api/todos/${props.todo.id}`);
    },
    onSuccess() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
    onError(err: unknown) {
      console.error(err);
      alert("אירעה שגיאה...");
    },
  });

  return (
    <div className={clsx("todo-card", disabled && "disabled")}>
      <input
        type="checkbox"
        className="todo-completed"
        checked={props.todo.completed}
        onChange={(e) => {
          completed.mutate(e.currentTarget.checked);
        }}
        disabled={disabled}
      />

      <p className={clsx("todo-text", props.todo.completed && "completed")}>{props.todo.body}</p>

      <button onClick={() => deleted.mutate()}>Delete</button>
    </div>
  );
}
