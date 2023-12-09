import React, { useState } from 'react';
import { Button, TextField } from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import "./todo-form.css";

export const TodoForm = ({ open, onClose, onChange, todo }) => {
    const [title, setTitle] = useState(todo?.title || '');
    const [description, setDescription] = useState(todo?.description || '');
    const [deadline, setDeadline] = useState(todo?.deadline || '');

    const handleChange = () => {
        if (todo) {
            onChange({ id: todo.id, title, description, deadline });
        } else {
            onChange({ title, description, deadline });
        }
        setTitle('');
        setDescription('');
        setDeadline('');
    }

    const handleClose = () => {
        onClose();
        setTitle('');
        setDescription('');
        setDeadline('');
    }

    return (
        <>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Add todo</DialogTitle>
                <DialogContent className="form-content">
                    <TextField margin="normal" size="small" required id="title" label="Title" variant="outlined" value={title} onChange={e => setTitle(e.target.value)} />
                    <TextField margin="normal" size="small" required id="description" label="Description" variant="outlined" value={description} onChange={e => setDescription(e.target.value)} />
                    <TextField margin="normal" size="small" required id="deadline" variant="outlined" type="date" value={deadline} onChange={e => setDeadline(e.target.value)} />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={() => {
                        handleClose();
                        handleChange();
                    }}>Submit</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}