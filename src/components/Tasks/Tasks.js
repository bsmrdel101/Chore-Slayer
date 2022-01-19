import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";
import { styled } from '@mui/material/styles';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { useHistory } from "react-router-dom";
import { Button } from "@mui/material";

function Tasks() {
    const history = useHistory();
    const dispatch = useDispatch();
    const taskReducer = useSelector((store) => store.taskReducer);
    const taskHistory = useSelector((store) => store.taskHistoryReducer);
    const reward = useSelector((store) => store.rewardsReducer);

    useEffect(() => {
        // Render all of the task cards on the DOM when the page loads
        fetchTasks();
        dispatch({
            type: 'FETCH_HISTORY'
        });
        // Retrieve the current value of users reward progress
        dispatch({
            type: 'FETCH_REWARD_PROGRESS'
        });
        // Check if the user needs a starting deck
        dispatch({
            type: 'FILL_STARTING_DECK'
        });
    }, [])

    // GET tasks
    const fetchTasks = () => {
        dispatch({
            type: 'FETCH_TASKS'
        });
    }

    // Handles the multiple grid items inside the Grid MUI component
    const Item = styled(Paper)(({ theme }) => ({
        ...theme.typography.body2,
        padding: theme.spacing(1),
        textAlign: 'center',
        color: theme.palette.text.secondary,
    }));

    const handleReward = () => {
        // Updates new coin value and stores it in the database
        dispatch({
            type: 'FETCH_COINS',
        });
        // Clear history
        dispatch({
            type: 'CLEAR_HISTORY'
        });
    }

    return (
        <div className="fill-screen">
            <h1 className="chore-list-title">Chores</h1>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={3} id='invisible'>
                    <Item></Item>
                </Grid>
                <Grid item xs={5}>
                    <Item id="grid-background-left">
                        <Button variant="contained" color="success" id="add-task-btn" onClick={() => history.push('/add')}>+</Button>                 
                        <div className='task-list'>
                            {taskReducer.map((task) => {
                                return (
                                    <div key={task.id}>
                                        <TaskCard task={task}/>
                                    </div>
                                );
                            })}
                        </div>
                    </Item>
                </Grid>
                <Grid item xs={5}>
                    <Item id="grid-background-right">
                        <div className="reward-display">
                            <h2>Tasks Left: {taskReducer.length}</h2>
                            <button onClick={() => history.push('/history')} className="complete-btn">See History</button>
                            <hr />
                            <h2>Reward: {taskHistory.length} / 3 completed tasks</h2>
                            {
                                taskHistory.length >= 3 && <button className="success-btn" onClick={handleReward}>Claim Reward</button>
                            }
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </div>    
    );
}

export default Tasks;