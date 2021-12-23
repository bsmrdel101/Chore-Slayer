import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';
import { useDispatch } from 'react-redux';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import Swal from 'sweetalert2';

function TaskCard({task}) {
    const dispatch = useDispatch();

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

    return (
        <>
            <div>
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
                        <Button size="small" variant="contained" color="success">Complete</Button>
                        <Button size="small" color="primary" onClick={handleEdit}><EditIcon/></Button>
                        <Button size="small" color="error" onClick={deleteTask}><DeleteIcon/></Button>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}

export default TaskCard;