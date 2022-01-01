import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import Swal from 'sweetalert2';

function DisplayCard({id}) {
    const cards = useSelector((store) => store.cardReducer);

    const dispatch = useDispatch();

    const handleDelete = (card) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You cannot undo this action!",
            icon: 'warning',
            showCancelButton: true,
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
          }).then((result) => {
            if (result.isConfirmed) {
                dispatch({
                    type: 'REMOVE_CARD',
                    payload: card.id
                });
            }
          })
    }

    return (
        <>
            {cards.map((card) => {
                if (card.id === id) {
                    return (
                        <Card sx={{ flexGrow: 1, maxWidth: 200 }} key={id} onClick={() => handleDelete(card)}>
                            <CardActionArea>
                                <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                                    {card.name}
                                </Typography>
                                <CardMedia
                                component="img"
                                image={card.token}
                                alt="token"
                                draggable="false"
                                />
                                <CardContent>
                                <Typography varient="h6" textAlign={"center"}>
                                    Energy: {card.cost}
                                </Typography>
                                <Typography variant="body2" color="text.secondary">
                                    {card.block_amount &&
                                        <>
                                            Block: {card.block_amount}
                                            <br/>
                                        </>
                                    }
                                    {card.attack_amount &&
                                        <>
                                            Damage: {card.attack_amount}
                                            <br/>
                                        </>
                                    }
                                    {card.description}
                                </Typography>
                                </CardContent>
                            </CardActionArea>
                        </Card>
                    );
                }
            })}
        </>
    );
}

export default DisplayCard;