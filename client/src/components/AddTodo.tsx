import axios from "axios";
import { useRef } from "react";

export function AddTodo() {
  const bodyRef = useRef<HTMLInputElement | null>(null);

  const handleAddTodo = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      await axios.post("/api/todos", bodyRef.current!.value);
      bodyRef.current!.value = "";
      // TODO add the new one to the list
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
        <input id="body" name="body" className="body-input" required ref={bodyRef} />
      </div>

      <button type="submit">Submit</button>
    </form>
  );
}
