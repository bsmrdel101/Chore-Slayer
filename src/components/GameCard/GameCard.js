import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import { useDispatch, useSelector } from 'react-redux';
import Swal from 'sweetalert2';

function GameCard({card, round}) {
    const hand = useSelector((store) => store.hand);
    const player = useSelector((store) => store.playerStatBlock);
    const enemy = useSelector((store) => store.enemyStatBlock);
    const playerBoard = useSelector((store) => store.playerBoard);
    const enemyBoard = useSelector((store) => store.enemyBoard);
    const dispatch = useDispatch();

    const handleClick = () => {
        if (card.type === 'minion' && playerBoard.length === 6) {
            const Toast = Swal.mixin({
                toast: true,
                position: 'top-end',
                showConfirmButton: false,
                timer: 1500,
                timerProgressBar: true,
                didOpen: (toast) => {
                toast.addEventListener('mouseenter', Swal.stopTimer)
                toast.addEventListener('mouseleave', Swal.resumeTimer)
                }
            })      
            Toast.fire({
                icon: 'warning',
                title: 'Max number of minions on board'
            })
        } else {
            if (card.cost <= player.energy) {
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
                dispatch({
                    type: 'REMOVE_PLAYER_ENERGY',
                    payload: card.cost
                })
            } else {
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })      
                Toast.fire({
                    icon: 'error',
                    title: 'Not enough energy'
                })
            }
        }
    }

    const handleBlockCard = (element) => {
        dispatch({type: 'ADD_ACTION', payload: {name: element.name, type: 'player'}});
        element.block_amount && dispatch({
            type: 'ADD_PLAYER_BLOCK',
            payload: element.block_amount
        });
        switch (element.card_id) {
            case 5: // Swap block
                dispatch({type: 'SWAP_BLOCK', payload: {enemyBlock: enemy.block, playerBlock: player.block}});
                break;
            case 6: // Break formation
                dispatch({type: 'BREAK_FORMATION'});
                break;
            case 17: // Coward
                if (enemyBoard.length >= 5) {
                    dispatch({type: 'PLAYER_COWARD'});
                }
                break;
            default:
                break;
        }
    }    

    const handleAttackCard = (element) => {
        dispatch({type: 'ADD_ACTION', payload: {name: element.name, type: 'player'}});
        switch (element.card_id) {
            case 18: // Sweep
                const Toast = Swal.mixin({
                    toast: true,
                    position: 'top-end',
                    showConfirmButton: false,
                    timer: 1500,
                    timerProgressBar: true,
                    didOpen: (toast) => {
                    toast.addEventListener('mouseenter', Swal.stopTimer)
                    toast.addEventListener('mouseleave', Swal.resumeTimer)
                    }
                })      
                Toast.fire({
                    icon: 'info',
                    title: 'Click on the enemy board to attack'
                })
                // Passes the data of the card played to the reducer so Game.js can access it
                dispatch({
                    type: 'ELEMENT',
                    payload: element
                })
                break;
            case 19: // Restart
                dispatch({
                    type: 'RESTART_ATTACK'
                });
                break;
            default:
                allowAttack(element);
                break;
        }
    }
    
    const allowAttack = (element) => {
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 1500,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
        })      
        Toast.fire({
            icon: 'info',
            title: 'Select an enemy minion to attack'
        })
        dispatch({
            type: 'PLAYER_CAN_ATTACK',
            payload: true
        })
        // Passes the data of the card played to the reducer so Game.js can access it
        dispatch({
            type: 'ELEMENT',
            payload: element
        })
    }

    const handleMinionCard = (element) => {
        setTimeout(() => { dispatch({type: 'ADD_ACTION', payload: {name: element.name, type: 'player'}}); }, 300);
        switch (element.card_id) {
            case 20: // Dragon
                if (playerBoard.length >= 5) {
                    for (let i = 0; i < 5; i++) {
                        dispatch({
                            type: 'DRAGON_SACRIFICE_PLAYER'
                        });
                    }
                    summonMinion(element);
                }
                break;
            case 21: // Cleric
                dispatch({
                    type: 'HEAL_PLAYER'
                });
                summonMinion(element);
                break;
            default:
                summonMinion(element);
                break;
        }
    }    

    const summonMinion = (element) => {
        dispatch({
            type: 'SUMMON_PLAYER_MINION',
            payload: {damage: element.damage, health: element.health}
        })
        dispatch({
            type: 'ADD_PLAYER_THREAT',
            payload: element.damage
        })
    }

    return (
        <>
            <Card sx={{ flexGrow: 1, maxWidth: 200 }} onClick={handleClick} className="card">
                <CardActionArea>
                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                        {card.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" textAlign={"center"}>
                        {card.rarity}
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