import { Button } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import DisplayCard from "../DisplayCard/DisplayCard";
import Swal from 'sweetalert2';
import StoreCard from "../StoreCard/StoreCard";

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
    }

    return (
        <>
            <div className="deck-header">
                <h2>{deck.length} / 15 cards</h2>
                <h3>{rewards} Coins</h3>
                {
                    addCard === false ? <button id="add-cards-btn" onClick={handleAllowModify}>Add Cards</button> 
                :
                    <button id="show-deck-btn" onClick={handleAllowModify}>Show Deck</button>
                }
            </div>
            {/* Card store */}
            {
                addCard === true ? 
                <section>
                    <center>
                        <h1 className="deck-title">Add Cards</h1>
                    </center>
                    <div className="deck-gallery">
                        {cards.map((card, i) => {
                            return <StoreCard key={i} card={card}/>;
                        })}
                    </div>
                </section>
                :
                <section>
                    <center>
                        <h1 className="deck-title">Your Deck</h1>
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