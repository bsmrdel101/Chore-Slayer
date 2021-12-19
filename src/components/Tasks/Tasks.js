import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import * as React from 'react';
import { useHistory } from "react-router-dom";

function Tasks() {
    const history = useHistory();
    const dispatch = useDispatch();
    const taskReducer = useSelector((store) => store.taskReducer);

    useEffect(() => {
        // Render all of the task cards on the DOM when the page loads
        fetchTasks();
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
                            <h2>Tasks Completed: 0</h2>
                            <hr />
                            <h2>New Card: 0/3</h2>
                            <h2>Stat Increase: 0/5</h2>
                        </div>
                    </Item>
                </Grid>
            </Grid>
        </>    
    );
}

export default Tasks;