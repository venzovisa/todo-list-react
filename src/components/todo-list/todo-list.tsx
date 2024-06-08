import React, { useState } from 'react';
import { setTodosInLocalStorage } from '../../utils';
import { TodoForm } from '../todo-form/todo-form';
import { Todo } from '../todo/todo';
import { v4 as uuidv4 } from "uuid";
import { Button } from '@mui/material';
import AddBoxIcon from '@mui/icons-material/AddBox';
import Alert from '@mui/material/Alert';
import { TodoType } from '../../models/todos';
import { AppDispatch, RootState } from '../../state/store';
import { useDispatch, useSelector } from "react-redux";
import { add, remove, change } from '../../state/todos/todosSlice';

export const TodoList = () => {
    const todosStore = useSelector((state: RootState) => state.todos.value);
    const dispatch = useDispatch<AppDispatch>();
    //const [todos, setTodos] = useState<TodoType[]>(getTodos);
    const [open, setOpen] = useState(false);

    const isCompleted = () => {
        return todosStore.length !== 0 && todosStore.every(todo => todo.completed)
    }

    const isEmpty = () => {
        return !todosStore || todosStore.length === 0;
    }

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const createNewTodo = (todo: { title: string, description: string, deadline: string }) => {
        const { title, description, deadline } = todo;

        return {
            id: uuidv4(),
            title,
            description,
            deadline,
            completed: false,
            disabled: false
        }
    }

    const handleAddTodo = ({ title, description, deadline }) => {
        const newTodo = createNewTodo({ title, description, deadline });
        const newTodos = [
            ...todosStore,
            newTodo
        ];
        //setTodos(newTodos);
        setTodosInLocalStorage(newTodos);
        dispatch(add(newTodo));
    }

    const handleChangeTodo = (todo: TodoType) => {
        const newTodos = todosStore.map(t => t.id === todo.id ? ({ ...t, ...todo }) : t)
        //setTodos(newTodos);
        setTodosInLocalStorage(newTodos);
        dispatch(change(todo));
    }

    const handleDeleteTodo = (todoId: string) => {
        if (!todoId) return;
        const newTodos = todosStore.filter(t => t.id !== todoId);
        //setTodos(newTodos);
        setTodosInLocalStorage(newTodos);
        dispatch(remove(todoId));
    }

    return (
        <>
            {
                isCompleted() && <Alert severity="success">List is completed</Alert>
            }
            <Button style={{ marginTop: "8px", marginBottom: "8px" }} variant="contained" startIcon={<AddBoxIcon />} onClick={handleOpen}>Add</Button>

            <TodoForm open={open} onChange={handleAddTodo} onClose={handleClose} todo={null} />
            {
                todosStore && todosStore.map(todo => <Todo key={todo.id} todo={todo} onChangeTodo={handleChangeTodo} onDeleteTodo={handleDeleteTodo} />)
            }
            {
                isEmpty() && <Alert severity="info">No items in the list</Alert>
            }
        </>
    )
}