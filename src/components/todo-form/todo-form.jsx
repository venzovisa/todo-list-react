import { Button, TextField } from '@mui/material';
import React, { useState } from 'react';

export const TodoForm = ({ onAddTodo }) => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [deadline, setDeadline] = useState('');

    const handleAddTodo = () => {
        setTitle('');
        onAddTodo({ title, description, deadline });
    }

    return (
        <>
            <TextField required id="title" label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} />
            <TextField required id="description" label="Description" variant="outlined" value={description} onChange={e => setDescription(e.target.value)} />
            <TextField required id="deadline" variant="outlined" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
            <Button variant="contained" onClick={handleAddTodo}>Submit</Button>
        </>
    )
}