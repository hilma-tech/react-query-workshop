import { clsx } from "clsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { produce } from "immer";
import axios from "axios";
import { Todo } from "../common/types/todo.interface";

export interface TodoCardProps {
  todo: Todo;
  index: number;
}

export function TodoCard(props: TodoCardProps) {
  const disabled = props.todo.id <= 0;

  const queryClient = useQueryClient();

  const completed = useMutation({
    mutationKey: ["todo-completed", props.todo.id],
    async mutationFn(isChecked: boolean) {
      await axios.put(`/api/todos/${props.todo.id}`, {
        completed: isChecked,
      });
    },
    async onMutate(isChecked) {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(
        ["todos"],
        produce((draft: Todo[]) => {
          draft[props.index].completed = isChecked;
        }),
      );

      return { previousTodos };
    },
    onError(err, _, context) {
      console.error(err);
      queryClient.setQueryData(["todos"], context?.previousTodos);
      alert("אירעה שגיאה...");
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const deleted = useMutation({
    mutationKey: ["todo-deleted", props.todo.id],
    async mutationFn() {
      await axios.delete(`/api/todos/${props.todo.id}`);
    },
    async onMutate() {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(
        ["todos"],
        produce((draft: Todo[]) => {
          draft.splice(props.index);
        }),
      );

      return { previousTodos };
    },
    onError(err, _, context) {
      console.error(err);
      queryClient.setQueryData(["todos"], context?.previousTodos);
      alert("אירעה שגיאה...");
    },
    onSettled() {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
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

      <p
        className={clsx("todo-text", props.todo.completed && "completed")}
      >
        {props.todo.body}
      </p>

      <button onClick={() => deleted.mutate()}>Delete</button>
    </div>
  );
}
