import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { TodoCard } from "./TodoCard";
import { Todo } from "../common/types/todo.interface";

export function Todos() {
  const query = useQuery({
    queryKey: ["todos"],
    async queryFn() {
      const { data } = await axios.get<Todo[]>("/api/todos");
      return data;
    },
  });

  if (query.isPending) return <div className="loading">Loading...</div>;

  if (query.isError)
    return (
      <div className="error">
        An error occurred. Please refresh and try again.
      </div>
    );

  return (
    <div className="todo-container">
      {query.data.map((todo, index) => (
        <TodoCard todo={todo} index={index} key={todo.id} />
      ))}
    </div>
  );
}
