import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import TaskCard from "../TaskCard/TaskCard";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import ModalUnstyled from '@mui/base/ModalUnstyled';
import * as React from 'react';

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

    const StyledModal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Backdrop = styled('div')`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`;

const style = {
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  p: 2,
  px: 4,
  pb: 3,
};

const [open, setOpen] = React.useState(false);
const handleOpen = () => setOpen(true);
const handleClose = () => setOpen(false);

    return (
        <>
            <h1>Chores</h1>
            <div>
                <button className="add-task-btn" onClick={handleOpen}>+</button>
                <StyledModal
                    aria-labelledby="unstyled-modal-title"
                    aria-describedby="unstyled-modal-description"
                    open={open}
                    onClose={handleClose}
                    BackdropComponent={Backdrop}
                >
                    <Box sx={style}>
                    <h2 id="unstyled-modal-title">Add a Task</h2>
                    <form>
                        
                    </form>
                    </Box>
                </StyledModal>
            </div>
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