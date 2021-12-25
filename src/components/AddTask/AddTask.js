import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { useState } from "react";
import { TextField } from "@mui/material";
import { Button } from "@mui/material";
import { CircularProgress } from "@mui/material";

function AddTask() {
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

    const incompleteTask = () => {

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
            <section className="task-history-list">
                {
                    taskHistory.length > 0 &&
                    taskHistory.map((task) => {
                        return (
                            <>
                                <Card sx={{ maxWidth: 345 }} className="task-card">
                                    <CardActionArea>
                                        <CardContent onClick={handleEdit}>
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
                                        <Button size="small" variant="contained" color="gray" onClick={incompleteTask}>Incomplete</Button>
                                        <Button size="small" color="error" onClick={deleteTask}><DeleteIcon/></Button>
                                    </CardActions>
                                </Card> 
                            </>
                        );
                    })
                }
            </section>
        </>
    );
}

export default AddTask;