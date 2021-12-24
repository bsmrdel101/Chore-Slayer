import { Grid } from "@mui/material";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import enemyStatBlock from "../../redux/reducers/EnemyStatBlock.reducer";

function Game() {
    const hand = useSelector((store) => store.hand);
    const player = useSelector((store) => store.playerStatBlock);
    const enemy = useSelector((store) => store.enemyStatBlock);
    const deckReducer = useSelector((store) => store.deckReducer);
    const enemyDeck = useSelector((store) => store.enemyDeck);
    const enemyHand = useSelector((store) => store.enemyHand);
    let [round, setRound] = useState(0);
    const dispatch = useDispatch();
    const playerBoard = useSelector((store) => store.playerBoard);
    const enemyBoard = useSelector((store) => store.enemyBoard);

    useEffect(() => {
        // Loop through all the cards in our deck and copy them all into a local state called baseHand
        // Shuffle the card order inside the baseHand array, to randomize the cards
        // Loop through the base hand
            // Take the card at index 0 and push it into the modified hand which will store the cards you see on screen
            // Add the card to the discard pile so it can't be drawn again
            // Splice the card at index 0
        fetchDeck();
    }, []);

    // Gets all of the cards in the user's deck
    const fetchDeck = () => {
        dispatch({
            type: 'FETCH_DECK',
            payload: 1
        });
    }

    const handleEndTurn = () => {
        const enemyDefence = enemy.threat + enemy.block;
        dispatch({
            type: 'RESET_PLAYER_ENERGY'
        })
        if (player.threat > enemyDefence) {
            // Deals dmg to enemy equal to players threat
            dispatch({
                type: 'DEAL_ENEMY_DAMAGE',
                payload: player.threat - enemyDefence
            })
        }
        if (deckReducer.length === 0) {
            dispatch({
                type: 'FETCH_DECK',
                payload: 1
            });
        } else {
            dispatch({
                type: 'FETCH_DECK',
                payload: {deck: deckReducer, hand: hand}
            })
        }
        handleEnemyTurn();
    }

    // Deals damage to a minion that the player has selected
    const handlePlayerAttack = (i) => {
        if (player.canAttack === true) {
            dispatch({
                type: 'ATTACK_ENEMY_MINION',
                payload: {id: i, attack: player.element.attack_amount}
            })
        }
        player.canAttack = false;
    }

    // Enemy turn handler
    const handleEnemyTurn = () => {
        const playerDefence = player.threat + player.block;

        if (enemyDeck.length === 0) {
            dispatch({
                type: 'FETCH_ENEMY_DECK',
                payload: 1
            })
        } else {
            dispatch({
                type: 'FETCH_ENEMY_DECK',
                payload: {deck: enemyDeck, hand: enemyHand}
            })
        }
        // AI turn handler
        // Scores for different actions will be added up conditionally
        // AI executes the action with the highest score at the end
        let blockScore = 0;
        let attackScore = 0;
        let minionScore = 0;
        let selectedCards = [];
        let highestScore = 0;
        
        for (let card of enemyHand) {
            switch (card.type) {
                case 'block':
                    blockScore = 1;
                    break;
                case 'attack':
                    attackScore = 1;
                    break;
                case 'minion':
                    minionScore = 1;
                    break;
                default:
                    break;
            }
        }
        if (attackScore > 0) {
            switch (true) {
                case playerBoard.length === 1:
                    attackScore += 1;
                    break;
                case playerBoard.length > 2:
                    attackScore += 4; 
                    break;
                default:
                    break;
            }
        }
        
        if (blockScore > 0) {
            switch (true) {
                case enemy.threat >= player.threat:
                    blockScore -= 3;
                    break;
                case enemy.block === 0:
                    blockScore += 2;
                default:
                    break;
            }
        }

        if (minionScore > 0) {
            if (enemyBoard.length === 0) {
                minionScore += 3;
            }
            if (playerBoard.length > 2) {
                minionScore += 3;
            }
            if (playerBoard.length === 0) {
                minionScore += 1;
            }
        }

        let type = '';
        if (attackScore > highestScore) {
            type = 'attack';
            highestScore = attackScore;
        }
        if (blockScore > highestScore) {
            type = 'block';
            highestScore = blockScore;
        }
        if (minionScore > highestScore) {
            type = 'minion';
            highestScore = minionScore;
        }
        console.log(type);

        console.log(blockScore, attackScore, minionScore, 'Card: ', selectedCards);
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs>
                    <h1>Turn {round}</h1>
                    <br/>
                    <br/>
                </Grid>
                <Grid item xs={6} className="board" marginRight={"3rem"}>
                    {enemyBoard.map((minion, i) => {
                        return <p key={i} onClick={() => handlePlayerAttack(i)}>{minion.damage} / {minion.health}</p>;
                    })}
                </Grid>
                <Grid item xs={2} className="stat-block-container" paddingBottom={"10px"}>
                    <div className="stat-block">
                        <p>Block: {enemy.block}</p>
                        <p>Health: {enemy.health}</p>
                        <p>Threat: {enemy.threat}</p>
                        <p>Energy: {enemy.energy}</p>
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs className="deck-picture" marginRight={"3rem"} marginLeft={"3rem"}>
                    <p>Deck {deckReducer.length}</p>
                    <br/>
                    <br/>
                </Grid>
                <Grid item xs={6} className="board" marginRight={"3rem"}>
                    {playerBoard.map((minion, i) => {
                        return <p key={i}>{minion.damage} / {minion.health}</p>;
                    })}
                </Grid>
                <Grid item xs={2} className="stat-block-container">
                    <div className="stat-block">
                        <p>Block: {player.block}</p>
                        <p>Health: {player.health}</p>
                        <p>Threat: {player.threat}</p>
                        <p>Energy: {player.energy}</p>
                    </div>
                </Grid>
            </Grid>
            <div id="end-turn-btn">
                <button onClick={handleEndTurn}>End Turn</button>
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