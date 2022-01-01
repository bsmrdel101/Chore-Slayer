import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";

function Deck() {
    const deck = useSelector((store) => store.deckReducer);
    const cards = useSelector((store) => store.cardReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CARDS'
        })
        dispatch({
            type: 'FETCH_RAW_DECK'
        });
        console.log(deck);
    }, [])

    return (
        <>
            <div className="cards-btn-container">
                <Button className="cards-btn" variant="contained" color="error">See all cards</Button>
            </div>
            <section className="deck-gallery">
                {cards.map((card) => {
                    if (deck.includes(card.card_id)) {
                        return <DisplayCard key={card.id} card={card}/>;
                    }
                })}
            </section>
        </>
    );
}

export default Deck;