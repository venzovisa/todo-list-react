import React from 'react';
import { createRoot } from 'react-dom/client';
import { TodoList } from './components/todo-list/todo-list';
import "./index.css";
import { store } from './state/store';
import { Provider } from "react-redux";

const App = () => {
  return (
    <Provider store={store}>
    <main>
      <h1>Todo List React</h1>
      <TodoList/>
    </main>

    </Provider>
  )
}

const root = createRoot(document.getElementById('root'));
root.render(<App />);