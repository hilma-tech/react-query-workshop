import { useQuery } from "@tanstack/react-query";
import axios from "axios";

import { TodoCard } from "./TodoCard";
import { Todo } from "../common/types/todo.interface";

export function Todos() {
  const {
    data: todos,
    isPending,
    isError,
  } = useQuery({
    queryKey: ["todos"],
    async queryFn() {
      const { data } = await axios.get<Todo[]>("/api/todos");
      return data;
    },
  });

  if (isPending) return <p className="loading">Loading...</p>;

  if (isError) return <p className="error">An error occurred. Please refresh and try again.</p>;

  return (
    <div className="todo-container">
      {todos?.map((todo, index) => (
        <TodoCard todo={todo} index={index} key={todo.id} />
      ))}
    </div>
  );
}
