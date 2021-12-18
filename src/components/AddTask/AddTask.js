import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";

function AddTask() {
    const history = useHistory();
    const dispatch = useDispatch();

    // local state for add task form
    let [newName, setNewName] = useState('');
    let [newDescription, setNewDescription] = useState('');
    // TODO add functionality to add difficulty
    let [newDifficulty, setNewDifficulty] = useState(1);
    
    // POST task
    const addTask = (event) => {
        event.preventDefault();
        console.log({name: newName, description: newDescription, difficulty: newDifficulty});
        dispatch({
            type: 'ADD_TASK',
            payload: {name: newName, description: newDescription, difficulty: newDifficulty}
        });
    }

    return (
        <>
            <form onSubmit={addTask}>
                <TextField label="Name" variant="outlined" value={newName}
                    onChange={(event) => setNewName(event.target.value)} />
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    variant="outlined"
                    value={newDescription}
                    onChange={(event) => setNewDescription(event.target.value)}
                />
                <Button variant="text" type="submit">Save</Button>
                <Button variant="text" onClick={() => history.push('/tasks')}>Cancel</Button>
            </form>
        </>
    );
}

export default AddTask;