import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch, useSelector } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import Swal from 'sweetalert2';

function TaskCard({task}) {
    const dispatch = useDispatch();
    const taskHistory = useSelector((store) => store.taskHistoryReducer);
    const rewardsReducer = useSelector((store) => store.rewardsReducer);

    const deleteTask = () => {
        // Sweet alert conformation message for deletion
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                  'Deleted!',
                  'Your file has been deleted.',
                  'success'
                )
                dispatch({
                    type: 'DELETE_TASK',
                    payload: task.id
                })
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1800,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                      toast.addEventListener('mouseenter', Swal.stopTimer)
                      toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                  })
                  
                  Toast.fire({
                    icon: 'success',
                    title: 'Task Deleted'
                  })
            }
        })
    }

    // Show a form to the user
    // Use form data in a PUT route
    const handleEdit = () => {
        Swal.fire({
            title: 'Edit Task',
            html: `<input type="text" id="name" class="swal2-input" placeholder="Name">
            <input type="text" id="description" class="swal2-input" placeholder="Description">`,
            confirmButtonText: 'Save Changes',
            focusConfirm: false,
            preConfirm: () => {
              const name = Swal.getPopup().querySelector('#name').value
              const description = Swal.getPopup().querySelector('#description').value
              dispatch({
                  type: 'EDIT_TASK',
                  payload: {id: task.id, name: name, description: description}
              })
            }
        })
    }

    // Removes task for chores list and adds it to task history
    // Updates task statistics
    const completeTask = () => {
        // Add task to history
        dispatch({
            type: 'STORE_TASK',
            payload: task
        })
        // Removes task card from the list
        dispatch({
            type: 'DELETE_TASK',
            payload: task.id
        })
    }

    return (
        <>
            <div>
                <Card sx={{ maxWidth: 345 }} className="task-card">
                    <CardActionArea>
                        <CardContent onClick={handleEdit}>
                        <Typography gutterBottom variant="h5" component="div">
                        <Grid container spacing={2} columns={16}>
                            <Grid item xs={16}>
                                {task.name}
                            </Grid>
                        </Grid>
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            {task.description}
                        </Typography>
                        </CardContent>
                    </CardActionArea>
                    <CardActions>
                        <button className="complete-btn" onClick={completeTask}>Complete</button>
                        <Button size="small" color="error" id='delete-task-btn' onClick={deleteTask}><DeleteIcon/></Button>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}

export default TaskCard;