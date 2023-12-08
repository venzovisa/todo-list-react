import { Switch, Checkbox, Button } from '@mui/material';
import React from 'react';
import "./todo.css";
import DeleteIcon from '@mui/icons-material/Delete';

export const Todo = ({ todo: { title, description, deadline, completed, disabled }, id, onChangeTodo, onDeleteTodo }) => {
    return (
        <div className="todo" key={id}>
            <div className="deadline">{deadline}</div>
            <div className="title">
                {title}
            </div>
            <div className="actions">
                <Checkbox checked={completed} disabled={disabled} onChange={() => onChangeTodo({ completed: !completed })} />
                <Switch disabled={disabled} checked={!disabled} onChange={() => onChangeTodo({ disabled: true })} />
                <Button variant="contained" startIcon={<DeleteIcon />} onClick={() => onDeleteTodo(id)}>Delete</Button>

            </div>
            <div className="description">{description}</div>
        </div>
    )
}