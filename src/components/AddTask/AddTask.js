import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { useEffect } from "react";

function AddTask() {
    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        })
    }, [])    

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
        history.push('/tasks');
        dispatch({
            type: 'ADD_TASK',
            payload: {name: newName, description: newDescription, difficulty: newDifficulty}
        });
    }

    return (
        <>
            <center>
                <h1 className="task-subtitle">Add a Task</h1>
                <form onSubmit={addTask} className="add-task-form">
                    <div>
                        <TextField label="Name" variant="filled" value={newName} id="name-input"
                            onChange={(event) => setNewName(event.target.value)} required/>
                    </div>
                    <div id="description-input">
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            variant="filled"
                            value={newDescription}
                            sx={{backgroundColor: '#7b7491'}}
                            onChange={(event) => setNewDescription(event.target.value)}
                        />
                    </div>
                    <div className="add-task-btn-container">
                        <button className="complete-btn" type="submit">Save</button>
                        <button  className="incomplete-btn" onClick={() => history.push('/tasks')}>Cancel</button>
                    </div>
                </form>
            </center>
        </>
    );
}

export default AddTask;