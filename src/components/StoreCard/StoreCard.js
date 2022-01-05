import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Swal from 'sweetalert2';
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";

function StoreCard({card}) {
    const deck = useSelector((store) => store.deckReducer);
    const cards = useSelector((store) => store.cardReducer);
    const rewards = useSelector((store) => store.rewardsReducer);
    let [addCard, setAddCard] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CARDS'
        });
        // Gets the user's coins
        dispatch({
            type: 'GET_REWARD'
        });
    }, [])

    const handleAllowModify = () => {
        // Toggles state of add card to show cards
        addCard === false ? setAddCard(true) : setAddCard(false);
    }

    // Loops through deck reducer and allows the user to add a card if it's not a duplicate
    const handleAddCard = (card) => {
        if (deck.length >= 15) {
            // Warns user if deck is at max cards
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
                title: 'To many cards in deck!'
            })
        } else {
            Swal.fire({
                title: `Would you buy ${card.name}?`,
                text: `Price: ${card.price} coins`,
                icon: 'question',
                showCancelButton: true,
                cancelButtonColor: 'rgb(196, 82, 82)',
                confirmButtonColor: 'rgb(51 135 150)',
                confirmButtonText: 'Yes',
                cancelButtonText: 'No'
            }).then((result) => {
                if (result.isConfirmed) {
                    let cardStatus = true;
                    for (let item of deck) {
                        if (card.id === item) {
                            cardStatus = false;
                            // Shows user warning message
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
                                title: 'Cannot have duplicate cards'
                            })
                            break;   
                        }
                    }
                    if (cardStatus === true) {
                        if (rewards < card.price) {
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
                                title: 'Not enough coins'
                            })
                        } else {     
                            // Shows user success message
                            // Adds card to deck
                            // Removes price from coin amount
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
                                icon: 'success',
                                title: `You bought ${card.name}`
                            })

                            dispatch({
                                type: 'ADD_CARD_TO_DECK',
                                payload: card.id
                            })
                            
                            dispatch({
                                type: 'PAY_COINS',
                                payload: {coins: rewards, price: card.price, id: card.id}
                            })
                        }
                    }
                }
            })
        }
    }

    return (
        <>
            {/* Common Card */}
            {
                card.rarity === 'Common' &&
                <>
                    <Card sx={{ flexGrow: 1, maxWidth: 200, backgroundColor: '#2b5c55', color: 'white' }} onClick={() => handleAddCard(card)}>
                                <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                    Price: {card.price}
                                </Typography>
                        <CardActionArea>
                            <Typography gutterBottom variant="h6" component="div" textAlign={"center"} fontSize="25px">
                                {card.name}
                            </Typography>
                            <Typography variant="body1" color="white" textAlign={"center"}>
                                <em>{card.rarity}</em>
                            </Typography>
                            <center>
                                <CardMedia className='token'
                                component="img"
                                image={card.token}
                                alt="token"
                                draggable="false"
                                />
                            </center>
                            <CardContent>
                            <Typography varient="h6" textAlign={"center"}>
                                Energy: {card.cost}
                            </Typography>
                            <Typography variant="body2" color="white">
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
            }
            {/* Uncommon Card */}
            {
                card.rarity === 'Uncommon' &&
                <>
                    <Card sx={{ flexGrow: 1, maxWidth: 200, backgroundColor: '#3f813f', color: 'white' }} onClick={() => handleAddCard(card)}>
                                <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                    Price: {card.price}
                                </Typography>
                        <CardActionArea>
                            <Typography gutterBottom variant="h6" component="div" textAlign={"center"} fontSize="25px">
                                {card.name}
                            </Typography>
                            <Typography variant="body1" color="white" textAlign={"center"}>
                                <em>{card.rarity}</em>
                            </Typography>
                            <center>
                                <CardMedia className='token'
                                component="img"
                                image={card.token}
                                alt="token"
                                draggable="false"
                                />
                            </center>
                            <CardContent>
                            <Typography varient="h6" textAlign={"center"}>
                                Energy: {card.cost}
                            </Typography>
                            <Typography variant="body2" color="white">
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
            }
            {/* Rare Card */}
            {
                card.rarity === 'Rare' &&
                <>
                    <Card sx={{ flexGrow: 1, maxWidth: 200, backgroundColor: '#343483', color: 'white' }} onClick={() => handleAddCard(card)}>
                                <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                    Price: {card.price}
                                </Typography>
                        <CardActionArea>
                            <Typography gutterBottom variant="h6" component="div" textAlign={"center"} fontSize="25px">
                                {card.name}
                            </Typography>
                            <Typography variant="body1" color="white" textAlign={"center"}>
                                <em>{card.rarity}</em>
                            </Typography>
                            <center>
                                <CardMedia className='token'
                                component="img"
                                image={card.token}
                                alt="token"
                                draggable="false"
                                />
                            </center>
                            <CardContent>
                            <Typography varient="h6" textAlign={"center"}>
                                Energy: {card.cost}
                            </Typography>
                            <Typography variant="body2" color="white">
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
            }
            {/* Very Rare Card */}
            {
                card.rarity === 'Very Rare' &&
                <>
                    <Card sx={{ flexGrow: 1, maxWidth: 200, backgroundColor: '#562772', color: 'white' }} onClick={() => handleAddCard(card)}>
                                <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                    Price: {card.price}
                                </Typography>
                        <CardActionArea>
                            <Typography gutterBottom variant="h6" component="div" textAlign={"center"} fontSize="25px">
                                {card.name}
                            </Typography>
                            <Typography variant="body1" color="white" textAlign={"center"}>
                                <em>{card.rarity}</em>
                            </Typography>
                            <center>
                                <CardMedia className='token'
                                component="img"
                                image={card.token}
                                alt="token"
                                draggable="false"
                                />
                            </center>
                            <CardContent>
                            <Typography varient="h6" textAlign={"center"}>
                                Energy: {card.cost}
                            </Typography>
                            <Typography variant="body2" color="white">
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
            }
            {/* Legendary Card */}
            {
                card.rarity === 'Legendary' &&
                <>
                    <Card sx={{ flexGrow: 1, maxWidth: 200, backgroundColor: '#a73434', color: 'white' }} onClick={() => handleAddCard(card)}>
                                <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                    Price: {card.price}
                                </Typography>
                        <CardActionArea>
                            <Typography gutterBottom variant="h6" component="div" textAlign={"center"} fontSize="25px">
                                {card.name}
                            </Typography>
                            <Typography variant="body1" color="white" textAlign={"center"}>
                                <em>{card.rarity}</em>
                            </Typography>
                            <center>
                                <CardMedia className='token'
                                component="img"
                                image={card.token}
                                alt="token"
                                draggable="false"
                                />
                            </center>
                            <CardContent>
                            <Typography varient="h6" textAlign={"center"}>
                                Energy: {card.cost}
                            </Typography>
                            <Typography variant="body2" color="white">
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
            }
        </>
    );
}

export default StoreCard;