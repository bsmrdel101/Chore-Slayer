import { Card, CardContent, CardActionArea, Typography, CardActions } from "@mui/material";
import { Grid } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

function History() {
    const dispatch = useDispatch();

    const taskHistory = useSelector((store) => store.taskHistoryReducer);

    useEffect(() => {
        dispatch({
            type: 'FETCH_HISTORY'
        });
    }, [])

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
                    <h1 className="chore-list-title">History</h1>
                    <section id="task-history-list">
                    {
                        taskHistory.length > 0 &&
                        taskHistory.map((task) => {
                            return (
                                <div key={task.id} className="task-list-background">
                                    <Card sx={{ maxWidth: 345 }} className="task-card">
                                        <CardActionArea>
                                            <CardContent>
                                            <Typography gutterBottom variant="h5" component="div">
                                            <Grid container spacing={2} columns={16}>
                                                <Grid item xs={16}>
                                                    <center>
                                                        {task.name}
                                                    </center>
                                                </Grid>
                                            </Grid>
                                            </Typography>
                                            <Typography variant="body2" className='task-description'>
                                                <center>
                                                    {task.description}
                                                </center>
                                            </Typography>
                                            </CardContent>
                                        </CardActionArea>
                                        <CardActions>
                                            <button className="incomplete-btn" onClick={() => incompleteTask(task)}>Incomplete</button>
                                        </CardActions>
                                    </Card> 
                                </div>
                            );
                        })
                    }
                </section>
            </center>
        </>
    );
}

export default History;