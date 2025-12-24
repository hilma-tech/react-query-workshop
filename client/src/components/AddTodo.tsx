import { useRef } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

import { Todo } from "../common/types/todo.interface";

export function AddTodo() {
  const bodyRef = useRef<HTMLInputElement | null>(null);

  const queryClient = useQueryClient();

  /**
   * This mutation is using the "optimistic" approach for mutating and updating the state.
   * @see https://tanstack.com/query/latest/docs/framework/react/guides/optimistic-updates
   *
   * Example for the "simple" (pessimistic) approach, see the `TodoCard` component.
   */
  const mutation = useMutation({
    mutationKey: ["add-todo"],
    async mutationFn(body: string) {
      await axios.post("/api/todos", { newTodo: body });
    },
    async onMutate(body) {
      await queryClient.cancelQueries({ queryKey: ["todos"] });

      const previousTodos = queryClient.getQueryData(["todos"]);

      queryClient.setQueryData(["todos"], (prev: Todo[]) => [
        ...prev,
        { body, id: -1, completed: false, deleted: null },
      ]);

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
    <form
      className="add-todo"
      onSubmit={async (e) => {
        e.preventDefault();

        await mutation.mutateAsync(bodyRef.current!.value);
        bodyRef.current!.value = "";
      }}
    >
      <h2>New TODO</h2>

      <div className="body-container">
        <label htmlFor="body" className="body-label">
          TODO content:
        </label>
        <input id="body" name="body" className="body-input" required ref={bodyRef} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
