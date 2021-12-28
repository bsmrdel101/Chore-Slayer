import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { Card, CardContent, CardActionArea, Typography, CardActions } from "@mui/material";
import { Grid } from "@mui/material";
import { useEffect } from "react";

function AddTask() {
    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        })
    }, [])    

    const history = useHistory();
    const dispatch = useDispatch();
    const taskHistory = useSelector((store) => store.taskHistoryReducer);

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

    const incompleteTask = (task) => {
        // Adds the task back to chore list
        dispatch({
            type: 'REVIVE_TASK',
            payload: task
        })
        // Removes the task from the history
        dispatch({
            type: 'DELETE_HISTORY',
            payload: task.id
        })
    }

    return (
        <>
            <center>
                <h1 className="task-subtitle">Add a Task</h1>
                <form onSubmit={addTask} className="add-task-form">
                    <div>
                        <TextField label="Name" variant="outlined" value={newName}
                            onChange={(event) => setNewName(event.target.value)} required/>
                    </div>
                    <div>
                        <TextField
                            label="Description"
                            multiline
                            rows={4}
                            variant="outlined"
                            value={newDescription}
                            onChange={(event) => setNewDescription(event.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <Button variant="text" type="submit">Save</Button>
                        <Button variant="text" onClick={() => history.push('/tasks')}>Cancel</Button>
                    </div>
                </form>
            </center>
            <hr/>
            <section className="task-history-list">
                <h1 className="task-subtitle">History</h1>
                {
                    taskHistory.length > 0 &&
                    taskHistory.map((task) => {
                        return (
                            <div key={task.id}>
                                <Card sx={{ maxWidth: 345 }} className="task-card">
                                    <CardActionArea>
                                        <CardContent>
                                        <Typography gutterBottom variant="h5" component="div">
                                        <Grid container spacing={2} columns={16}>
                                            <Grid item xs={8}>
                                                {task.name}
                                            </Grid>
                                            <Grid item xs={8}>
                                                {task.difficulty}
                                            </Grid>
                                        </Grid>
                                        </Typography>
                                        <Typography variant="body2" color="text.secondary">
                                            {task.description}
                                        </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                    <CardActions>
                                        <Button size="small" variant="contained" onClick={() => incompleteTask(task)}>Incomplete</Button>
                                    </CardActions>
                                </Card> 
                            </div>
                        );
                    })
                }
            </section>
        </>
    );
}

export default AddTask;