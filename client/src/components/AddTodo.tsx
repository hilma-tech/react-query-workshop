import axios from "axios";
import { Dispatch, SetStateAction, useRef } from "react";
import { Todo } from "../common/types/todo.interface";

interface AddTodoProps {
  setTodos: Dispatch<SetStateAction<Todo[]>>;
}

export function AddTodo({ setTodos }: AddTodoProps) {
  const bodyRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    debugger;
    e.preventDefault();
    try {
      const newTodo = bodyRef.current!.value;
      const { data: newId } = await axios.post<number>("/api/todos", {
        newTodo,
      });

      setTodos((prev) => [
        ...prev,
        { body: newTodo, id: newId, completed: false, deleted: null },
      ]);
      bodyRef.current!.value = "";
    } catch (err) {
      alert("אירעה שגיאה...");
    }
  };

  return (
    <form className="add-todo" onSubmit={handleAddTodo}>
      <h2>New TODO</h2>

      <div className="body-container">
        <label htmlFor="body" className="body-label">
          TODO content:
        </label>
        <input
          id="body"
          name="body"
          className="body-input"
          required
          ref={bodyRef}
        />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
