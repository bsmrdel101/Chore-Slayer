import { Grid } from "@mui/material";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Game() {
    const hand = useSelector((store) => store.hand);
    const playerBoard = useSelector((store) => store.playerBoard);
    const dispatch = useDispatch();

    useEffect(() => {
        fetchHand();
    }, []);

    if (hand.length === 2 || hand.length === 3 || hand.length === 4) {
        dispatch({
            type: 'FETCH_HAND',
            payload: {one: getRandomInt(1, 13), two: getRandomInt(1, 13), three: getRandomInt(1, 13), four: getRandomInt(1, 13), five: getRandomInt(1, 13), six: getRandomInt(1, 13), seven: getRandomInt(1, 13)}
        });
    }

    const fetchHand = () => {
        dispatch({
            type: 'FETCH_HAND',
            payload: {one: getRandomInt(1, 13), two: getRandomInt(1, 13), three: getRandomInt(1, 13), four: getRandomInt(1, 13), five: getRandomInt(1, 13), six: getRandomInt(1, 13), seven: getRandomInt(1, 13)}
        });
    }

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
            {console.log('hand', hand)}
            
            <div className="hand-container">
                {hand.map((card) => {
                    return <GameCard key={card.id} card={card}/>;
                })}
            </div>
        </>
    );
}

export default Game;