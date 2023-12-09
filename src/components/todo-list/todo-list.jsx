import React, { useState } from 'react';
import { getTodos, setTodosInLocalStorage } from '../../utils';
import { TodoForm } from '../todo-form/todo-form';
import { Todo } from '../todo/todo';
import { v4 as uuidv4 } from "uuid";
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '@mui/material/Alert';

export const TodoList = () => {
    const [todos, setTodos] = useState(getTodos);
    const [open, setOpen] = useState(false);

    const isCompleted = () => {
        return todos.length !== 0 && todos.every(todo => todo.completed)
    }

    const isEmpty = () => {
        return !todos || todos.length === 0;
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

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
            {
                isCompleted() && <Alert severity="success">List is completed</Alert>
            }
            <Button style={{ marginTop: "8px", marginBottom: "8px" }} variant="contained" startIcon={<AddBoxIcon />} onClick={handleOpen}>Add</Button>

            <TodoForm open={open} onChange={handleAddTodo} onClose={handleClose} />
            {
                todos && todos.map(todo => <Todo key={todo.id} todo={todo} onChangeTodo={handleChangeTodo} onDeleteTodo={handleDeleteTodo} />)
            }
            {
                isEmpty() && <Alert severity="info">No items in the list</Alert>
            }
        </>
    )
}