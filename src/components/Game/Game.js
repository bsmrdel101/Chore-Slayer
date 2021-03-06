import { Grid } from "@mui/material";
import GameCard from "../GameCard/GameCard";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Swal from 'sweetalert2';
import PlayerMinion from "../PlayerMinion/PlayerMinion";
import EnemyMinion from "../EnemyMinion/EnemyMinion";

function Game() {
    const hand = useSelector((store) => store.hand);
    const player = useSelector((store) => store.playerStatBlock);
    const enemy = useSelector((store) => store.enemyStatBlock);
    const deckReducer = useSelector((store) => store.deckReducer);
    const enemyDeck = useSelector((store) => store.enemyDeck);
    const enemyHand = useSelector((store) => store.enemyHand);
    const actions = useSelector((store) => store.actions);
    let [round, setRound] = useState(0);
    const dispatch = useDispatch();
    const playerBoard = useSelector((store) => store.playerBoard);
    const enemyBoard = useSelector((store) => store.enemyBoard);
    const stats = useSelector((store) => store.statsReducer);

    useEffect(() => {
        // Loop through all the cards in our deck and copy them all into a local state called baseHand
        // Shuffle the card order inside the baseHand array, to randomize the cards
        // Loop through the base hand
            // Take the card at index 0 and push it into the modified hand which will store the cards you see on screen
            // Add the card to the discard pile so it can't be drawn again
            // Splice the card at index 0
        fetchDeck();

        // Adds one to total games stat
        dispatch({
            type: 'TOTAL_GAMES'
        });
    }, []);

    // Gets all of the cards in the user's deck
    const fetchDeck = () => {
        dispatch({
            type: 'FETCH_DECK',
            payload: 1
        });
    }

    const handleEndTurn = () => {
        dispatch({
            type: 'HIGHEST_THREAT',
            payload: player.threat
        });
        dispatch({
            type: 'HIGHEST_BLOCK',
            payload: player.block
        });

        const enemyDefence = enemy.threat + enemy.block;

        // Activates enemy's slime machine if it exists on the board
        for (let minion of enemyBoard) {
            if (minion.damage === 0 && minion.health === 6) {
              dispatch({
                type: 'SUMMON_ENEMY_MINION',
                payload: {damage: 1, health: 1, rarity: 'Common'}
              });
              dispatch({
                  type: 'ADD_ENEMY_THREAT',
                  payload: 1
              });
            }
        }

        dispatch({
            type: 'RESET_PLAYER_ENERGY'
        });
        
        if (player.threat > enemyDefence && round > 0) {
            dispatch({
                type: 'TOTAL_DAMAGE',
                payload: player.threat - enemyDefence
            });
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
    // const handlePlayerAttack = (i) => {
    //     if (player.canAttack === true) {
    //         dispatch({
    //             type: 'ATTACK_ENEMY_MINION',
    //             payload: {id: i, attack: player.element.attack_amount, board: enemyBoard}
    //         })
    //     }
    //     player.canAttack = false;
    // }

    // Enemy turn handler
    const handleEnemyTurn = () => {
        dispatch({
            type: 'FETCH_ENEMY_DECK',
            payload: {id: 1, deck: enemyDeck, hand: enemyHand, player: player, enemy: enemy, playerBoard: playerBoard, enemyBoard: enemyBoard, hand: hand, enemyHand: enemyHand, round: round}
        })
        // Handle enemy end turn
        setRound(round + 1);
    }

    // Ends the game when the player clicks the surrender button
    const handleSurrender = () => {
        Swal.fire({
            title: 'Are you sure you want to quit?',
            text: "Nothing will be saved",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#808080',
            confirmButtonText: 'Yes'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: 'You Lost!',
                    text: 'ha ha',
                    icon: 'error',
                    confirmButtonText: 'New Game'
                }).then((result) => {
                    dispatch({
                        type: 'TIMES_SURRENDERED'
                    });
                    document.location.reload();
                })
            }
        })
    }

    return (
        <>
            <Grid container spacing={3}>
                <Grid item xs>
                    {
                        round === 0 ?
                        <h1 className="round-counter-variant">Turn {round}</h1>
                        :
                        <h1 className="round-counter">Turn {round}</h1>
                    }
                    <br/>
                    <br/>
                </Grid>
                <Grid item xs={6} className="board" marginRight={"3rem"}>
                    {enemyBoard.map((minion, i) => {
                        return <EnemyMinion key={i} minion={minion} index={i}/>;
                    })}
                </Grid>
                <Grid item xs={2} className="stat-block-container" paddingBottom={"10px"}>
                    <div className="stat-block">
                        <p><img src="shield.png" className="stat-icon"/> Block: {enemy.block}</p>
                        <p><img src="heart.png" className="stat-icon"/> Health: {enemy.health}</p>
                        {round === 0 ?
                            <p className="threat-variant"><img src="threat.png" className="stat-icon"/> Threat: {enemy.threat}</p>
                        :
                            <p><img src="threat.png" className="stat-icon"/> Threat: {enemy.threat}</p>
                        }
                    </div>
                </Grid>
            </Grid>
            <Grid container spacing={3}>
                <Grid item xs className="deck-picture" marginRight={"3rem"} marginLeft={"3rem"}>
                    <div id="actions">
                        {actions.map((action, i) => {
                            if (action.type === 'enemy') {
                                return <p key={i} className="action enemy-action">{action.name}</p>;
                            } else {
                                return <p key={i} className="action player-action">{action.name}</p>;
                            }
                        })}
                    </div>
                    <br/>
                    <br/>
                </Grid>
                <Grid item xs={6} className="board" marginRight={"3rem"}>
                    {playerBoard.map((minion, i) => {
                        return <PlayerMinion key={i} minion={minion} />;
                    })}
                </Grid>
                <Grid item xs={2} className="stat-block-container">
                    <div className="stat-block">
                        <p><img src="shield.png" className="stat-icon"/> Block: {player.block}</p>
                        <p><img src="heart.png" className="stat-icon"/> Health: {player.health}</p>
                        {round === 0 ?
                            <p className="threat-variant"><img src="threat.png" className="stat-icon"/> Threat: {player.threat}</p>
                        :
                            <p><img src="threat.png" className="stat-icon"/> Threat: {player.threat}</p>
                        }
                        <p><img src="energy.png" className="stat-icon"/> Energy: {player.energy}</p>
                    </div>
                </Grid>
            </Grid>
            <div id="end-turn-btn">
                <button onClick={handleEndTurn}>End Turn</button> 
            </div>
            <div id="surrender-btn">
                <button onClick={handleSurrender}>Surrender</button> 
            </div>
            
            {/* Holds the player's hand */}
            <div className="hand-container">
                {hand.map((card) => {
                    return <GameCard key={card.id} card={card} round={round}/>;
                })}

                {/* If the hand is empty, add an invisible card to prevent the hand from collapsing */}
                {
                    hand.length === 0 &&
                    <div className="filler-card"></div>
                }
            </div>
        </>
    );
}

export default Game;