export const getTodos = () => {
  const todos = window.localStorage.getItem("todos");

  if (todos) {
    return Array.from(JSON.parse(todos));
  }

  return [];
};

export const setTodosInLocalStorage = (todos) =>
  window.localStorage.setItem("todos", JSON.stringify(todos));
