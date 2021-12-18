import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));


function Tasks() {
    const dispatch = useDispatch();
    const taskReducer = useSelector((store) => store.taskReducer);

    useEffect(() => {
        fetchTasks();
    }, [])

    const fetchTasks = () => {
        dispatch({
            type: 'FETCH_TASKS'
        });
    }

    return (
        <>
            <h1>Chores</h1>
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
                        <p>side 2</p>
                    </div>
                </Item>
            </Grid>
            </Grid>
        </>    
    );
}

export default Tasks;