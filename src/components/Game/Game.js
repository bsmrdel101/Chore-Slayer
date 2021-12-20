import { Grid } from "@mui/material";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Game() {
    const hand = useSelector((store) => store.hand);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch({
            type: 'FETCH_HAND'
        });
    }, []);

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