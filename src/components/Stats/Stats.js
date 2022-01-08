import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";

function Stats() {
    const dispatch = useDispatch();

    const stats = useSelector((store) => store.statsReducer);

    useEffect(()=> {
        dispatch({
            type: 'CHECK_USER'
        });
        dispatch({
            type: 'FETCH_STATS'
        });
    }, [])

    return (
        <>
            <br/>
            <h1 id="stats-title">Game Stats</h1>
            <div className="stats-container">
                <div className="stat-column">
                    <h3>General Stats</h3>
                    <p>Games Won: {stats.games_won}</p>
                    <p>Games Lost: {stats.games_lost}</p>
                    <p>Total Games: {stats.total_games}</p>
                </div>
                <div className="stat-column">
                <h3>Other Stats</h3>
                    <p>Cards Played: {stats.cards_played}</p>
                    <p>Total Damage: {stats.total_damage}</p>
                    <p>Total Block: {stats.total_block}</p>
                    <p>Minions Slain: {stats.minions_slain}</p>
                    <p>Times Surrendered: {stats.times_surrendered}</p>
                    <p>Highest threat in game: {stats.highest_threat}</p>
                    <p>Highest block in game: {stats.highest_block}</p>
                </div>
            </div>
        </>
    );
}

export default Stats;