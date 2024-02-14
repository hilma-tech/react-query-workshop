import axios from "axios";
import { TodoCard } from "./TodoCard";
import { Todo } from "../common/types/todo.interface";
import { useEffect, useState } from "react";
import { AddTodo } from "./AddTodo";

export function Todos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  useEffect(() => {
    fetchTodo();
  }, []);

  async function fetchTodo() {
    const { data } = await axios.get<Todo[]>("/api/todos");
    setTodos(data);
  }

  return (
    <>
    <div className="todo-container">
      {todos.map((todo, index) => (
        <TodoCard todo={todo} setTodos={setTodos} index={index} key={todo.id} />
      ))}
    </div>
    <AddTodo setTodos={setTodos} />
    </>
  );
}
