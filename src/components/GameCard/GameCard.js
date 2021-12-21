import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';

function GameCard({card}) {
    const hand = useSelector((store) => store.hand);
    const dispatch = useDispatch();

    const handleClick = () => {
        console.log(hand);
        let selectedCard = card.card_id;
        for (let element of hand) {
            if (element.card_id === selectedCard) {
                console.log(element);
                // switch (element.type) {
                //     case block:
                        
                //         break;
                //     case attack:
                    
                //         break;
                //     case minion:
                    
                //         break;
                //     default:
                //         break;
                // }
                dispatch({
                    type: 'SELECT_CARD',
                    payload: element
                })
            }
        }
    }

    return (
        <>
            <Card sx={{ flexGrow: 1, maxWidth: 200 }} onClick={handleClick} className="card">
                <CardActionArea>
                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                        {card.name}
                    </Typography>
                    <CardMedia
                    component="img"
                    image={card.token}
                    alt="token"
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
        </>
    );
}

export default GameCard;