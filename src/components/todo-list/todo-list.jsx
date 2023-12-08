import React, { useState } from 'react';
import { getTodos, setTodosInLocalStorage } from '../../utils';
import { TodoForm } from '../todo-form/todo-form';
import { Todo } from '../todo/todo';
import { v4 as uuidv4 } from "uuid";

export const TodoList = () => {
    const [todos, setTodos] = useState(getTodos);

    const handleAddTodo = ({ title, description, deadline }) => {
        const newTodos = [
            ...todos,
            {
                id: uuidv4(),
                title,
                description,
                deadline,
                completed: false,
                disabled: false
            }
        ];
        setTodos(newTodos);
        setTodosInLocalStorage(newTodos);
    }

    const handleChangeTodo = (todo) => {
        const newTodos = todos.map(t => {
            if (t.id === todo.id) {
                return { ...t, ...todo };
            } else {
                return t;
            }
        })
        setTodos(newTodos);
        setTodosInLocalStorage(newTodos);
    }

    const handleDeleteTodo = (todoId) => {
        const newTodos = todos.filter(t => t.id !== todoId);
        setTodos(newTodos);
        setTodosInLocalStorage(newTodos);
    }

    return (
        <>
            <h1>TodoList</h1>
            <TodoForm onAddTodo={handleAddTodo} />
            {
                todos && todos.map(todo => <Todo key={todo.id} id={todo.id} todo={todo} onChangeTodo={handleChangeTodo} onDeleteTodo={handleDeleteTodo} />)
            }

        </>
    )
}