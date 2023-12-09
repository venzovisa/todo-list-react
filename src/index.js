import React from 'react';
import { createRoot } from 'react-dom/client';
import { TodoList } from './components/todo-list/todo-list';
import "./index.css";

const App = () => {
  return (
    <main>
      <h1>Todo List React</h1>
      <TodoList/>
    </main>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);