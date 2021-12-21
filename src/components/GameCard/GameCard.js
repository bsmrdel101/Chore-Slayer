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
        let selectedCard = card.card_id;
        let index = 0;
        for (let element of hand) {
            if (element.card_id === selectedCard) {
                console.log(element);
                switch (element.type) {
                    case 'block':
                        handleBlockCard(element);
                        break;
                    case 'attack':
                        handleAttackCard(element);
                        break;
                    case 'minion':
                        handleMinionCard(element);
                        break;
                    default:
                        break;
                }
                dispatch({
                    type: 'SELECT_CARD',
                    payload: index
                })
            }
            index++;
        }
    }

    const handleBlockCard = (element) => {
        element.block_amount && dispatch({
            type: 'ADD_BLOCK',
            payload: element.block_amount
        });
        switch (element.card_id) {
            case 5: // Swap block
                dispatch({type: 'SWAP_BLOCK'})
                break;
            case 6: // Break formation
                console.log('TODO: Break Formation');
                break;
            default:
                break;
        }
    }    

    const handleAttackCard = (element) => {

    }    

    const handleMinionCard = (element) => {
        
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
        </>
    );
}

export default GameCard;