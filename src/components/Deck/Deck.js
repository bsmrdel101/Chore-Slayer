import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

function Deck() {
    const deck = useSelector((store) => store.deckReducer);
    const cards = useSelector((store) => store.cardReducer);
    let [addCard, setAddCard] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CARDS'
        });
    }, [])

    const handleAllowModify = () => {
        // Toggles state of add card to show cards
        addCard === false ? setAddCard(true) : setAddCard(false);
    }

    const handleAddCard = (card) => {
        console.log(card);
    }

    return (
        <>
            <div className="deck-header">
                <h2>{deck.length} / 15 cards</h2>
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
                        {cards.map((card, i) => {
                            return (
                                <Card sx={{ flexGrow: 1, maxWidth: 200 }} key={i} onClick={() => handleAddCard(card)}>
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