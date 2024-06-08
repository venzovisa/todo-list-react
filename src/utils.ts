import { TodoType } from "./models/todos";

export const getTodos = (): TodoType[] => {
  const todos = window.localStorage.getItem("todos");

  if (todos) {
    return Array.from(JSON.parse(todos));
  }

  return [];
};

export const setTodosInLocalStorage = (todos: TodoType[]): void =>
  window.localStorage.setItem("todos", JSON.stringify(todos));
