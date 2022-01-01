import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";

function Deck() {
    const deck = useSelector((store) => store.deckReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CARDS'
        });
    }, [])

    return (
        <>
            <div className="deck-header">
                <h2>{deck.length} / 15 cards</h2>
            </div>
            <section className="deck-gallery">
                {deck.map((card_id) => {
                    return <DisplayCard key={card_id} id={card_id}/>;
                })}
            </section>
        </>
    );
}

export default Deck;