import { Grid } from "@mui/material";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

function Game() {
    const hand = useSelector((store) => store.hand);
    const deckReducer = useSelector((store) => store.deckReducer);
    let [baseHand, setBaseHand] = useState([]);
    let [modifiedHand, setModifiedHand] = useState([]);
    const playerBoard = useSelector((store) => store.playerBoard);
    const dispatch = useDispatch();

    // Number of cards in the deck
    const deckSize = deckReducer.length - 1;

    useEffect(() => {
        fetchDeck();
        deckReducer.forEach(card => {
            setBaseHand(baseHand.push(card.card_id));
        });
        shuffleArray(baseHand)
        console.log(baseHand);
        for (let i = 0; i < 5; i++) {
            const card = baseHand[0];
            console.log(baseHand);
            baseHand.splice(0, 1);
            console.log('card', card);
            modifiedHand.push(card);
            console.log('modified hand', modifiedHand);
        }
        console.log(baseHand);
        fetchHand();
    }, []);

    const shuffleArray = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1));
          const temp = array[i];
          array[i] = array[j];
          array[j] = temp;
        }
    }

    // Renders the cards in hand
    const fetchHand = () => {
        dispatch({
            type: 'FETCH_HAND',
            payload: {card1: modifiedHand[0], card2: modifiedHand[1], card3: modifiedHand[2], card4: modifiedHand[3], card5: modifiedHand[4]}
        });
    }

    // Gets all of the cards in the user's deck
    const fetchDeck = () => {
        dispatch({
            type: 'FETCH_DECK'
        });
    }

    console.log('deck', deckReducer);
    // console.log('This: ', hand);

    // Gets a random number
    // Takes in parameters of min/max
    function getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max + 1);
        return Math.floor(Math.random() * (max - min) + min); //The maximum is exclusive and the minimum is inclusive
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs>
                    <h1>Turn 1</h1>
                    <br/>
                    <br/>
                </Grid>
                <Grid item xs={6} className="board" marginRight={"3rem"}>
                </Grid>
                <Grid item xs={2} className="stat-block">
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs className="deck-picture" marginRight={"3rem"} marginLeft={"3rem"}>
                    <p>Deck</p>
                    <br/>
                    <br/>
                </Grid>
                <Grid item xs={6} className="board" marginRight={"3rem"}>
                </Grid>
                <Grid item xs={2} className="stat-block">
                </Grid>
            </Grid>
            <div id="end-turn-btn">
                <button>End Turn</button>
            </div>

            {/* Holds the player's hand */}
            <div className="hand-container">
                {hand.map((card) => {
                    return <GameCard key={card.id} card={card}/>;
                })}
            </div>
        </>
    );
}

export default Game;