import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";

function Deck() {
    const deck = useSelector((store) => store.deckReducer);
    let [addCard, setAddCard] = useState(false);

    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_CARDS'
        });
    }, [])

    const handleAddCard = () => {
        // Toggles state of add card to show cards
        addCard === false ? setAddCard(true) : setAddCard(false);
        // Conditionally renders the cards if addCard is true
        if(addCard === false) {
            window.scrollTo(2000, 2000);    
        }
    }

    return (
        <>
            <div className="deck-header">
                <h2>{deck.length} / 15 cards</h2>
                {
                    addCard === false ? <Button variant="contained" color="success" onClick={handleAddCard}>Add Cards</Button> 
                :
                    <Button variant="contained" color="error" onClick={handleAddCard}>Hide Cards</Button>
                }
            </div>
            <section className="deck-gallery">
                {deck.map((card_id) => {
                    return <DisplayCard key={card_id} id={card_id}/>;
                })}
            </section>
            {/* Card store */}
            <section>

            </section>
        </>
    );
}

export default Deck;