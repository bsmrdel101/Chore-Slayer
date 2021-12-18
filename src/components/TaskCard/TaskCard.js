import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Button, CardActionArea, CardActions } from '@mui/material';
import Grid from '@mui/material/Grid';

function TaskCard({task}) {
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
                        <Button size="small" color="primary">
                        Share
                        </Button>
                    </CardActions>
                </Card>
            </div>
        </>
    );
}

export default TaskCard;