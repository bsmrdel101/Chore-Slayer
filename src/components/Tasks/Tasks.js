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
import Swal from 'sweetalert2';

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
        <>
            <h1>Chores</h1>
            <button className="add-task-btn" onClick={() => history.push('/add')}>+</button>
            <Grid container spacing={2} columns={16}>
                <Grid item xs={8}>
                    <Item>
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
                <Grid item xs={8}>
                    <Item>
                        <div>
                            <h2>Tasks Left: {taskReducer.length}</h2>
                            <h2>Tasks Completed: {taskHistory.length}</h2>
                            <hr />
                            <h2>Reward: {taskHistory.length} / 3 cards</h2>
                            {
                                taskHistory.length >= 3 && <Button variant="contained" color="success" onClick={handleReward}>Claim Reward</Button>
                            }
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </>    
    );
}

export default Tasks;