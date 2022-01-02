import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';
import Swal from 'sweetalert2';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';

function Deck() {
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
                dispatch({
                    type: 'ADD_CARD_TO_DECK',
                    payload: card.id
                })
            }
        }
    }

    return (
        <>
            <div className="deck-header">
                <h2>{deck.length} / 15 cards</h2>
                <h3>{rewards} Coins</h3>
                {
                    addCard === false ? <Button variant="contained" color="success" onClick={handleAllowModify}>Add Cards</Button> 
                :
                    <Button variant="contained" color="error" onClick={handleAllowModify}>Show Deck</Button>
                }
            </div>
            {/* Card store */}
            {
                addCard === true ? 
                <section>
                    <center>
                        <h1>Add Cards</h1>
                    </center>
                    <div className="deck-gallery">
                        {cards.map((card) => {
                            return (
                                <>
                                    {/* Common Card */}
                                    {
                                        card.rarity === 'Common' &&
                                        <>
                                            <Card sx={{ flexGrow: 1, maxWidth: 200, backgroundColor: '#2b5c55', color: 'white' }} onClick={() => handleAddCard(card)}>
                                                    {card.price &&
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                                            Price: {card.price}
                                                        </Typography>
                                                    }
                                                <CardActionArea>
                                                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                                                        {card.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="white" textAlign={"center"}>
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
                                                    {card.price &&
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                                            Price: {card.price}
                                                        </Typography>
                                                    }
                                                <CardActionArea>
                                                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                                                        {card.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="white" textAlign={"center"}>
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
                                                    {card.price &&
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                                            Price: {card.price}
                                                        </Typography>
                                                    }
                                                <CardActionArea>
                                                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                                                        {card.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="white" textAlign={"center"}>
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
                                                    {card.price &&
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                                            Price: {card.price}
                                                        </Typography>
                                                    }
                                                <CardActionArea>
                                                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                                                        {card.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="white" textAlign={"center"}>
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
                                                    {card.price &&
                                                        <Typography gutterBottom variant="h4" component="div" textAlign={"center"}>
                                                            Price: {card.price}
                                                        </Typography>
                                                    }
                                                <CardActionArea>
                                                    <Typography gutterBottom variant="h6" component="div" textAlign={"center"}>
                                                        {card.name}
                                                    </Typography>
                                                    <Typography variant="body1" color="white" textAlign={"center"}>
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
                        })}
                    </div>
                </section>
                :
                <section>
                    <center>
                        <h1>Your Cards</h1>
                    </center>
                    <div className="deck-gallery">
                        {deck.map((card_id) => {
                            return <DisplayCard key={card_id} id={card_id}/>;
                        })}
                    </div>
                </section>
            }
        </>
    );
}

export default Deck;