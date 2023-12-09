import React, { useState } from 'react';
import { Switch, Checkbox, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Chip from '@mui/material/Chip';
import "./todo.css";
import dayjs from 'dayjs';
import { TodoForm } from '../todo-form/todo-form';

export const Todo = ({ todo: { id, title, description, deadline, completed, disabled }, onChangeTodo, onDeleteTodo }) => {
    const [open, setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
    }

    const isExpired = () => {
        return dayjs().isAfter(dayjs(deadline))
    }

    return (
        <div className="todo" key={id}>
            <div className="deadline">
                {deadline}
                {isExpired() && <Chip style={{ marginLeft: "4px" }} size="small" label="Expired" variant="outlined" />}</div>
            <div className="title">{title}</div>
            <div className="actions">
                <Checkbox checked={completed} disabled={disabled || isExpired()} onChange={() => onChangeTodo({ id, completed: !completed })} />
                <Switch disabled={disabled || isExpired()} checked={!disabled} onChange={() => onChangeTodo({ id, disabled: true })} />
                <Button disabled={disabled || isExpired()} variant="contained" startIcon={<DeleteIcon />} onClick={() => onDeleteTodo(id)}>Delete</Button>
                <Button disabled={disabled || isExpired()} style={{ marginLeft: "4px" }} variant="contained" startIcon={<EditIcon />} onClick={handleOpen}>Edit</Button>
                <TodoForm open={open} onChange={onChangeTodo} onClose={handleClose} todo={{ id, title, description, deadline }} />
            </div>
            <div className="description">{description}</div>
        </div>
    )
}